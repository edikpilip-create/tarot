import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { rmSync } from "node:fs";
import type { Readable } from "node:stream";
import test from "node:test";

const testPort = 3100;
const testHost = "127.0.0.1";
const testSiteUrl = `http://${testHost}:${testPort}`;

test("localized routes render matching html lang attributes", { timeout: 240_000 }, async (t) => {
  rmSync(".next", { recursive: true, force: true });

  await runCommand(npmCommand(), ["run", "build"], {
    NEXT_PUBLIC_SITE_URL: testSiteUrl,
    DEPLOYMENT_ENV: "production",
  });

  const server = spawn("node", [".next/standalone/server.js"], {
    cwd: process.cwd(),
    env: buildEnv({
      NEXT_PUBLIC_SITE_URL: testSiteUrl,
      DEPLOYMENT_ENV: "production",
      HOSTNAME: testHost,
      NODE_ENV: "production",
      PORT: String(testPort),
    }),
    stdio: ["ignore", "pipe", "pipe"],
  });
  const serverOutput = collectOutput(server);

  t.after(() => {
    server.kill();
  });

  await waitForServer(`${testSiteUrl}/en`, server, serverOutput);

  for (const locale of ["en", "uk", "ru"]) {
    const response = await fetch(`${testSiteUrl}/${locale}`);
    const html = await response.text();
    const htmlLang = html.match(/<html[^>]*lang="([^"]+)"/)?.[1];

    assert.equal(response.status, 200);
    assert.equal(htmlLang, locale);
  }
});

function npmCommand(): string {
  return process.platform === "win32" ? "npm.cmd" : "npm";
}

function runCommand(
  command: string,
  args: string[],
  env: Record<string, string>,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const commandLine = getSpawnCommand(command, args);
    const child = spawn(commandLine.command, commandLine.args, {
      cwd: process.cwd(),
      env: buildEnv(env),
      stdio: ["ignore", "pipe", "pipe"],
    });
    const output = collectOutput(child);

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${commandLine.label} exited with ${code}\n${output()}`));
    });
  });
}

function getSpawnCommand(command: string, args: string[]) {
  if (process.platform === "win32" && command.endsWith(".cmd")) {
    const label = [command, ...args].join(" ");

    return {
      command: "cmd.exe",
      args: ["/d", "/s", "/c", label],
      label,
    };
  }

  return {
    command,
    args,
    label: [command, ...args].join(" "),
  };
}

function buildEnv(env: Record<string, string>): NodeJS.ProcessEnv {
  return Object.fromEntries(
    Object.entries({
      ...process.env,
      ...env,
    }).filter((entry): entry is [string, string] => typeof entry[1] === "string"),
  ) as NodeJS.ProcessEnv;
}

function collectOutput(child: { stdout: Readable; stderr: Readable }): () => string {
  const chunks: string[] = [];
  const collect = (chunk: Buffer) => {
    chunks.push(chunk.toString());

    if (chunks.length > 50) {
      chunks.shift();
    }
  };

  child.stdout.on("data", collect);
  child.stderr.on("data", collect);

  return () => chunks.join("");
}

async function waitForServer(
  url: string,
  server: { exitCode: number | null },
  getServerOutput: () => string,
): Promise<void> {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Server exited with ${server.exitCode}\n${getServerOutput()}`);
    }

    const response = await fetch(url).catch(() => null);

    if (response?.ok) {
      await response.arrayBuffer();
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Timed out waiting for ${url}\n${getServerOutput()}`);
}
