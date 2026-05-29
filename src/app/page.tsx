"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";

const carouselCards = [
  "Маг",
  "Жрица",
  "Сила",
  "Повешенный",
  "Смерть",
  "Звезда",
];

const suits = [
  {
    name: "Мечи",
    element: "Воздух",
    totems: "ворон и орёл",
    text: "Интеллект и ясность, духовное прозрение и способность видеть за пределами возможного.",
  },
  {
    name: "Жезлы",
    element: "Огонь",
    totems: "ягуар и пантера",
    text: "Энергия, сила воли, творческая мотивация и импульс к действию.",
  },
  {
    name: "Пентакли",
    element: "Земля",
    totems: "бык и бизон",
    text: "Практичность, труд и достижения, баланс между духовным и материальным.",
  },
  {
    name: "Кубки",
    element: "Вода",
    totems: "рыбы и дельфины",
    text: "Эмоции, интуиция, поиск глубокого смысла, философия и внутренняя гармония.",
  },
];

const practiceCards = [
  ["Маг", "управление вниманием и энергией"],
  ["Верховная Жрица", "Безмолвное Знание"],
  ["Сила", "рост личной энергии через контроль эмоций"],
  ["Повешенный", "опыт смещения точки привязки"],
  ["Смерть", "переход в новое состояние"],
  ["Звезда", "соединение со Вторым Вниманием и Намерением"],
];

const deck = [
  ["Маг", "Соберите внимание в одной точке и сделайте первый точный шаг."],
  ["Верховная Жрица", "Слушайте знание, которое приходит до слов."],
  ["Императрица", "Дайте форме созреть, не торопя естественное движение силы."],
  ["Император", "Проверьте границы и верните себе право действовать."],
  ["Иерофант", "Отделите живое знание от привычной догмы."],
  ["Влюблённые", "Выберите союз, который усиливает ваш путь."],
  ["Колесница", "Направьте энергию туда, где нужен прорыв."],
  ["Сила", "Удержите эмоцию без подавления и без капитуляции."],
  ["Отшельник", "Сделайте шаг внутрь, чтобы увидеть внешний путь яснее."],
  ["Колесо Фортуны", "Заметьте цикл и войдите в него осознанно."],
  ["Справедливость", "Назовите точную цену выбора и примите её."],
  ["Повешенный", "Смените точку взгляда, пока ситуация не откроет иной смысл."],
  ["Смерть", "Отпустите форму, которая уже выполнила свою задачу."],
  ["Умеренность", "Соберите противоположности в спокойное движение."],
  ["Дьявол", "Увидьте привязку, которая выдаёт себя за необходимость."],
  ["Башня", "Позвольте ложной опоре разрушиться без торговли с правдой."],
  ["Звезда", "Доверьтесь намерению, которое ведёт дальше страха."],
  ["Луна", "Идите медленно: неясность тоже может быть проводником."],
  ["Солнце", "Действуйте открыто, когда сила больше не требует маски."],
  ["Суд", "Примите перерождение и не возвращайтесь в старую роль."],
  ["Мир", "Завершите круг и заберите опыт как новую свободу."],
];

function TarotCard({
  title,
  index,
  small = false,
}: {
  title: string;
  index: number;
  small?: boolean;
}) {
  return (
    <div className={small ? "tarot-card tarot-card-small" : "tarot-card"}>
      <div className="tarot-card-inner">
        <div className="tarot-card-face tarot-card-front">
          <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
          <span className="card-sigil" />
          <strong>{title}</strong>
          <span className="card-line">Путь Воина</span>
        </div>
        <div className="tarot-card-face tarot-card-back" aria-hidden="true">
          <span className="back-corner">TARO</span>
          <span className="back-mark" />
          <strong>Путь Воина</strong>
          <span className="back-corner">Art of Seeing</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [spread, setSpread] = useState(deck.slice(0, 3));
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const shuffledDeck = useMemo(() => deck, []);

  function drawCards() {
    const result = [...shuffledDeck].sort(() => Math.random() - 0.5).slice(0, 3);
    setSpread(result);
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("sending");

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        contact: formData.get("contact"),
        message: formData.get("message"),
      }),
    }).catch(() => null);

    setFormState(response?.ok ? "sent" : "error");
    if (response?.ok) {
      event.currentTarget.reset();
    }
  }

  return (
    <main>
      <header className="site-nav">
        <a href="#top" className="brand">TARO</a>
        <nav aria-label="Основная навигация">
          <a href="#wisdom">Учение</a>
          <a href="#structure">Колода</a>
          <a href="#spread">Расклад</a>
          <a href="#contact">Заявка</a>
        </nav>
      </header>

      <section id="top" className="hero section">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-art" aria-hidden="true">
          <Image
            src="/media/warrior-mask.png"
            alt=""
            width={1536}
            height={1024}
            priority
            sizes="(max-width: 768px) 120vw, 980px"
          />
        </div>
        <div className="hero-content">
          <p className="overline">«Прыжок в бесконечность начинается здесь»</p>
          <h1>
            <span>TARO</span>
            «Путь Воина»
          </h1>
          <p className="lead">
            Карты, которые вы держите в руках, это не ответы, а двери.
            За каждой из них скрывается шаг, который навсегда изменит вас.
          </p>
          <a className="primary-link" href="#spread">Вытянуть 3 карты</a>
        </div>
      </section>

      <section className="section carousel-section" aria-label="Карусель карт">
        <div className="card-track">
          {[...carouselCards, ...carouselCards].map((card, index) => (
            <TarotCard key={`${card}-${index}`} title={card} index={index % 6} />
          ))}
        </div>
      </section>

      <section id="wisdom" className="section split-section">
        <div className="rich-copy wisdom-copy">
          <h2>Древняя мудрость тольтеков</h2>
          <p>
            Оригинальное ТАРО «Путь Воина» было создано как проводник в мир
            учений и традиций тольтеков. Колода объединяет адаптацию системы
            ТАРО с древними знаниями о пути Воина.
          </p>
          <p className="accent">
            Совершенство, намерение, перепросмотр, контроль внимания и смещение
            точки привязки.
          </p>
          <p className="sparkle-copy">
            ТАРО «Путь Воина» раскрывает это знание через Арканы, даже если вы
            никогда не читали Карлоса Кастанеду.
          </p>
          <p className="final-accent">
            Каждая карта это урок силы и шаг к трансформации.
          </p>
        </div>
        <div className="wisdom-empty" aria-hidden="true" />
      </section>

      <div className="ancient-texture-group">
        <section className="section practice-gate">
          <div className="wide-copy">
            <p className="eyebrow">Четвёртый экран</p>
            <h2>Каждая карта это врата к практике</h2>
            <p>
              Просто возьмите Аркан, изучите его суть и примените в своей жизни,
              и тогда учение перестанет быть просто текстом и станет вашим личным
              опытом.
            </p>
            <p>
              Так Арканы становятся проводниками на пути воина, позволяя шаг за
              шагом раскрывать тайну восприятия, энергии и свободы.
            </p>
            <blockquote>
              «Есть только один путь, и он ведёт в неизвестность. Но пройти его
              ты должен сам, с открытыми глазами, без страха и без жалости к себе.»
              <cite>Дон Хуан Матус</cite>
            </blockquote>
          </div>
        </section>

      <section className="section example-section">
          <div className="video-card">
            <div className="video-card-frame">
              <iframe
                src="https://player.vimeo.com/video/1196251431?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&badge=0&transparent=0&dnt=1"
                title="Путь Воина - пример аркана"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
          <article className="example-copy">
            <h2>XX. Суд</h2>
            <p className="muted">(Старший Аркан)</p>
            <blockquote>
              «Путь воина это путь перерождения. Каждый раз, когда он постигает
              новую истину, он умирает для старого мира и рождается в новом.»
              <cite>«Внутренний огонь»</cite>
            </blockquote>
            <p>
              Аркан Суд символизирует перерождение, окончательное осознание и
              переход на новый уровень духовного развития. Это напрямую связано с
              идеей Кастанеды о том, что осознанность ведёт к духовному обновлению.
            </p>
          </article>
        </section>

        <section className="section video-section">
          <article className="example-copy">
            <h2>2 Кубков</h2>
            <p className="muted">(Младший Аркан)</p>
            <blockquote>
              «Воин знает, что истинный союз это соединение двух душ, стремящихся
              к одной цели. Такой союз делает их сильными.»
              <cite>«Путешествие в Икстлан»</cite>
            </blockquote>
            <p>
              Двойка Кубков символизирует любовь, гармоничные отношения и духовное
              партнёрство. Цитата отражает идею глубокого единства, которое делает
              людей сильнее на их пути.
            </p>
          </article>
          <div className="video-card">
            <div className="video-card-frame">
              <iframe
                src="https://player.vimeo.com/video/1196251432?autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0&badge=0&transparent=0&dnt=1"
                title="Пример 2 Кубков"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      </div>

      <section id="structure" className="section structure-section">
        <div className="section-heading">
          <p className="eyebrow">Седьмой экран</p>
          <h2>Структура колоды</h2>
          <p>
            Колода состоит из 22 Старших Арканов и 56 Младших Арканов,
            разделённых на четыре масти.
          </p>
        </div>
        <div className="structure-grid">
          <div className="stat">
            <strong>22</strong>
            <span>Старших Аркана</span>
            <p>Этапы и концепции Пути Воина.</p>
          </div>
          <div className="stat">
            <strong>56</strong>
            <span>Младших Арканов</span>
            <p>Практика силы через четыре масти.</p>
          </div>
        </div>
        <div className="suits-grid">
          {suits.map((suit) => (
            <article key={suit.name} className="suit-card">
              <h3>{suit.name}</h3>
              <p className="muted">Стихия: {suit.element}</p>
              <p className="muted">Тотемы: {suit.totems}</p>
              <p>{suit.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section practice-list">
        <div className="section-heading practice-heading">
          <h2>Колода как инструмент практики</h2>
          <p>Каждая карта это практика осознанности.</p>
        </div>
        <div className="practice-visual" aria-hidden="true">
          <img src="/media/practice-89.avif" alt="" />
        </div>
        <div className="practice-grid">
          {practiceCards.map(([name, text], index) => (
            <article key={name} className="practice-item">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{name}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="spread" className="section spread-section">
        <div className="section-heading">
          <p className="eyebrow">Десятый экран</p>
          <h2>Интерактивный расклад карт</h2>
          <p>
            Нажмите кнопку, чтобы случайным образом вытянуть 3 карты из колоды
            из 21 карты и получить краткое описание каждой.
          </p>
        </div>
        <button className="draw-button" type="button" onClick={drawCards}>
          Вытянуть карты
        </button>
        <div className="spread-grid">
          {spread.map(([name, text], index) => (
            <article key={`${name}-${index}`} className="spread-card">
              <TarotCard title={name} index={deck.findIndex(([card]) => card === name)} small />
              <div>
                <h3>{name}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="contact-copy">
          <p className="eyebrow">Заявка</p>
          <h2>Получить колоду или задать вопрос</h2>
          <p>
            Оставьте контакт, и заявка уйдёт в Telegram через серверный API-роут.
            Токен бота и chat id задаются переменными окружения на VPS или в Dokploy.
          </p>
        </div>
        <form className="lead-form" onSubmit={submitLead}>
          <label>
            Имя
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label>
            Telegram, телефон или email
            <input name="contact" type="text" autoComplete="email" required />
          </label>
          <label>
            Сообщение
            <textarea name="message" rows={4} />
          </label>
          <button type="submit" disabled={formState === "sending"}>
            {formState === "sending" ? "Отправка..." : "Отправить заявку"}
          </button>
          {formState === "sent" && <p className="form-note">Заявка отправлена.</p>}
          {formState === "error" && (
            <p className="form-note error">Не удалось отправить. Проверьте настройки Telegram.</p>
          )}
        </form>
      </section>
    </main>
  );
}
