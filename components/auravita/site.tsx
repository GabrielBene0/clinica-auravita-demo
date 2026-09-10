"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  Check,
  Plus,
  Send,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { specialties, professionals, reviews, faqs } from "@/lib/auravita-data";

const Actions = createContext({
  book: (_specialty?: string) => {},
  chat: () => {},
});
const asset = (name: string) => `/images/${name}.webp`;

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20.4 11.6a8.4 8.4 0 0 1-12.5 7.3L3 20.3l1.4-4.7a8.4 8.4 0 1 1 16-4Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M8.2 7.4c-.5 0-1.1.8-1 1.6.2 3.5 3.5 6.5 6.7 7 .9.1 2-.7 2-1.3l-2.4-1.3-.9 1c-1.6-.5-3-1.8-3.6-3.4l.8-.9-1.1-2.7Z"
        fill="currentColor"
      />
    </svg>
  );
}
function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Clínica Auravita — início">
      <img src="/favicon.svg" width="54" height="54" alt="" />
      <span>
        <span className="brand-small">CLÍNICA</span>
        <span className="brand-name">AURAVITA</span>
        <span className="brand-tag">SAÚDE & ESTÉTICA</span>
      </span>
    </Link>
  );
}
function BookingButton({
  children = "Agendar consulta",
  whatsapp = false,
  specialty,
  className = "",
}: {
  children?: ReactNode;
  whatsapp?: boolean;
  specialty?: string;
  className?: string;
}) {
  const a = useContext(Actions);
  return (
    <button
      className={`outline-button ${whatsapp ? "green" : ""} ${className}`}
      onClick={() => (whatsapp ? a.chat() : a.book(specialty))}
    >
      {whatsapp && <WhatsAppIcon />}
      {children}
    </button>
  );
}

function Header() {
  const [menu, setMenu] = useState(false);
  const [drop, setDrop] = useState(false);
  return (
    <header className="site-header container">
      <Brand />
      <nav className="desktop-nav" aria-label="Navegação principal">
        <Link href="/">Início</Link>
        <Link href="/institucional">Institucional</Link>
        <div
          className="nav-dropdown"
          onMouseEnter={() => setDrop(true)}
          onMouseLeave={() => setDrop(false)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setDrop(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setDrop(false);
          }}
        >
          <Link href="/#especialidades" className="active">
            Especialidades
          </Link>
          <button
            aria-label="Abrir especialidades"
            aria-expanded={drop}
            onClick={() => setDrop(!drop)}
          >
            <ChevronDown size={13} />
          </button>
          {drop && (
            <div className="dropdown-panel">
              {specialties.map((s) => (
                <Link key={s.slug} href={`/especialidades/${s.slug}`}>
                  {s.name}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link href="/profissionais">Profissionais</Link>
        <Link href="/contato">Contato</Link>
      </nav>
      <BookingButton className="header-book">Agende aqui</BookingButton>
      <button
        className="menu-toggle"
        aria-label="Abrir menu"
        aria-expanded={menu}
        onClick={() => setMenu(true)}
      >
        <Menu size={28} />
      </button>
      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent className="mobile-menu" showCloseButton={false}>
          <SheetClose className="close-control" aria-label="Fechar menu">
            <X />
          </SheetClose>
          <SheetTitle className="sr-only">Menu principal</SheetTitle>
          <SheetDescription className="sr-only">
            Navegue pela Clínica Auravita
          </SheetDescription>
          <Brand />
          <nav aria-label="Navegação mobile">
            {[
              ["/", "Início"],
              ["/institucional", "Institucional"],
              ["/#especialidades", "Especialidades"],
              ["/profissionais", "Profissionais"],
              ["/contato", "Contato"],
            ].map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setMenu(false)}>
                {label}
              </Link>
            ))}
          </nav>
          <div onClick={() => setMenu(false)}>
            <BookingButton>Agende aqui</BookingButton>
          </div>
          <p className="fine-print">Cuidado em cada detalhe.</p>
        </SheetContent>
      </Sheet>
    </header>
  );
}

function Form({
  initial = "",
  onComplete,
}: {
  initial?: string;
  onComplete?: () => void;
}) {
  const [specialty, setSpecialty] = useState(initial);
  const [success, setSuccess] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    setSuccess(true);
  }
  if (success)
    return (
      <div className="form-success" role="status">
        <span className="success-icon">
          <Check size={30} />
        </span>
        <h3>Seu pedido foi simulado, {name.trim().split(" ")[0]}.</h3>
        <p>
          Você concluiu a experiência de agendamento da Auravita. Nenhum dado
          foi enviado e nenhuma consulta real foi marcada.
        </p>
        <button
          className="outline-button"
          onClick={() => {
            if (onComplete) onComplete();
            else {
              setSuccess(false);
              setPhone("");
              setName("");
              setSpecialty("");
            }
          }}
        >
          {onComplete ? "Concluir" : "Simular outro agendamento"}
        </button>
      </div>
    );
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-grid">
        <label>
          Nome <span>*</span>
          <input
            name="name"
            autoComplete="name"
            placeholder="Como podemos chamar você?"
            required
            minLength={2}
            maxLength={80}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          WhatsApp ou telefone <span>*</span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(11) 99999-9999"
            required
            value={phone}
            minLength={14}
            maxLength={15}
            pattern="\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}"
            onChange={(e) => {
              const d = e.target.value.replace(/\D/g, "").slice(0, 11);
              setPhone(
                d.length > 6
                  ? `(${d.slice(0, 2)}) ${d.slice(2, -4)}-${d.slice(-4)}`
                  : d,
              );
            }}
          />
        </label>
        <label>
          E-mail <span>*</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="voce@exemplo.com"
            required
            maxLength={120}
          />
        </label>
        <div className="field-label">
          <label htmlFor="specialty">Especialidade</label>
          <Select
            value={specialty}
            onValueChange={setSpecialty}
            name="specialty"
          >
            <SelectTrigger id="specialty" className="form-select">
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((s) => (
                <SelectItem key={s.slug} value={s.name}>
                  {s.name}
                </SelectItem>
              ))}
              <SelectItem value="Ainda não sei">Ainda não sei</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <label>
        Como podemos ajudar?
        <textarea
          name="message"
          placeholder="Conte brevemente o que procura. Use apenas dados de exemplo."
          rows={3}
          maxLength={500}
        />
      </label>
      <p className="fine-print">
        Demonstração: use informações fictícias. O formulário não envia nem
        armazena seus dados.
      </p>
      <button type="submit" className="outline-button form-submit">
        Simular agendamento <ArrowRight size={18} />
      </button>
    </form>
  );
}

function Shell({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState(false);
  const [chat, setChat] = useState(false);
  const [specialty, setSpecialty] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <Actions.Provider
      value={{
        book: (s = "") => {
          setSpecialty(s);
          setBooking(true);
        },
        chat: () => {
          setSent(false);
          setMessage("");
          setChat(true);
        },
      }}
    >
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
      <button
        className="floating-whatsapp"
        aria-label="Abrir WhatsApp demonstrativo"
        onClick={() => {
          setSent(false);
          setChat(true);
        }}
      >
        <WhatsAppIcon size={32} />
        <span>Converse com a Auravita</span>
      </button>
      <Dialog open={booking} onOpenChange={setBooking}>
        <DialogContent className="booking-dialog" showCloseButton={false}>
          <DialogClose
            className="close-control"
            aria-label="Fechar agendamento"
          >
            <X />
          </DialogClose>
          <span className="eyebrow">SEU MOMENTO DE CUIDADO</span>
          <DialogTitle className="modal-title">Agendar consulta</DialogTitle>
          <DialogDescription>
            Vamos conhecer você. Experimente nosso agendamento demonstrativo.
          </DialogDescription>
          <Form initial={specialty} onComplete={() => setBooking(false)} />
        </DialogContent>
      </Dialog>
      <Dialog open={chat} onOpenChange={setChat}>
        <DialogContent className="chat-dialog" showCloseButton={false}>
          <DialogClose className="close-control" aria-label="Fechar WhatsApp">
            <X />
          </DialogClose>
          <WhatsAppIcon size={32} />
          <DialogTitle className="modal-title">
            Converse com a Auravita
          </DialogTitle>
          <DialogDescription>
            WhatsApp demonstrativo · (11) 99999-9999
          </DialogDescription>
          <div className="chat-bubble">
            Olá! Que bom ter você aqui. Como podemos ajudar a cuidar de você?
          </div>
          {sent ? (
            <div role="status" className="chat-bubble response">
              Mensagem simulada com sucesso. Nenhuma conversa real foi iniciada.
              Para continuar a experiência, experimente agendar uma consulta.
            </div>
          ) : (
            <form
              className="chat-compose"
              onSubmit={(e) => {
                e.preventDefault();
                if (message.trim()) setSent(true);
              }}
            >
              <label className="sr-only" htmlFor="chat-message">
                Sua mensagem demonstrativa
              </label>
              <input
                id="chat-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite uma mensagem de exemplo"
                required
                maxLength={500}
              />
              <button aria-label="Simular envio da mensagem">
                <Send size={20} />
              </button>
            </form>
          )}
          <button
            className="outline-button"
            onClick={() => {
              setChat(false);
              setBooking(true);
            }}
          >
            Agendar consulta
          </button>
          <p className="fine-print">
            Clínica fictícia. Nenhuma mensagem será enviada ao WhatsApp.
          </p>
        </DialogContent>
      </Dialog>
    </Actions.Provider>
  );
}

const heroImages = [
  {
    name: "care",
    alt: "Imagem gerada de atendimento dermatológico acolhedor",
    pos: "50% 48%",
  },
  {
    name: "interior",
    alt: "Recepção sofisticada da clínica fictícia Auravita",
    pos: "60% 55%",
  },
  {
    name: "laser",
    alt: "Tecnologia a laser em ambiente clínico sofisticado, em imagem gerada",
    pos: "50% 52%",
  },
  {
    name: "consultation",
    alt: "Consulta facial com espelho de análise em ambiente clínico, em imagem gerada",
    pos: "65% 48%",
  },
];
function HeroMosaic() {
  const [slide, setSlide] = useState(0);
  const touch = useRef(0);
  return (
    <div className="hero-visual">
      <div
        className="mosaic"
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const delta = touch.current - e.changedTouches[0].clientX;
          if (Math.abs(delta) > 40)
            setSlide((v) => (v + (delta > 0 ? 1 : 3)) % 4);
        }}
      >
        {heroImages.map((im, i) => (
          <div
            key={i}
            className={`mosaic-cell cell-${i} ${slide === i ? "is-current" : ""}`}
          >
            <img
              src={asset(im.name)}
              alt={im.alt}
              width="768"
              height="512"
              style={{ objectPosition: im.pos }}
              fetchPriority={i === 0 ? "high" : undefined}
            />
          </div>
        ))}
      </div>
      <div className="hero-dots dots">
        {heroImages.map((im, i) => (
          <button
            key={i}
            aria-label={`Ver imagem ${i + 1}`}
            aria-current={slide === i ? "true" : undefined}
            className={slide === i ? "selected" : ""}
            onClick={() => setSlide(i)}
          />
        ))}
      </div>
    </div>
  );
}
function Hero() {
  return (
    <section className="hero container">
      <div className="hero-copy">
        <h1>
          Saúde e estética
          <br className="desktop-break" /> para cuidar de você
          <br className="desktop-break" /> por inteiro.
        </h1>
        <p>
          Conheça nossos cuidados médicos e estéticos e descubra uma experiência
          pensada para o seu bem-estar.
        </p>
        <span className="gold-rule" />
        <BookingButton whatsapp>Agendar pelo WhatsApp</BookingButton>
      </div>
      <HeroMosaic />
    </section>
  );
}
function SectionHeading({
  title,
  children,
  level = 2,
}: {
  title: string;
  children?: ReactNode;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div className="section-heading">
      <Heading>{title}</Heading>
      {children && <p>{children}</p>}
      <span className="gold-rule" />
    </div>
  );
}

function Specialties() {
  const [index, setIndex] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const [paused, setPaused] = useState(false);
  const touch = useRef(0);
  useEffect(() => {
    const update = () =>
      setPerPage(
        window.innerWidth < 700 ? 1 : window.innerWidth < 1050 ? 2 : 3,
      );
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const max = specialties.length - perPage;
  useEffect(() => {
    setIndex((i) => Math.min(i, max));
  }, [max]);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const timer = setInterval(
      () => setIndex((i) => (i >= max ? 0 : i + 1)),
      6500,
    );
    return () => clearInterval(timer);
  }, [max, paused]);
  return (
    <section id="especialidades" className="specialties section container">
      <SectionHeading title="Cuidado completo, em cada detalhe">
        Dermatologia, estética, nutrologia e outras especialidades.
        <br />
        Um olhar integrado para cuidar de você.
      </SectionHeading>
      <div
        className="carousel"
        aria-roledescription="carrossel"
        aria-label="Especialidades"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
        }}
        onTouchStart={(e) => {
          touch.current = e.touches[0].clientX;
          setPaused(true);
        }}
        onTouchEnd={(e) => {
          const d = touch.current - e.changedTouches[0].clientX;
          if (Math.abs(d) > 35)
            setIndex((i) => Math.max(0, Math.min(max, i + (d > 0 ? 1 : -1))));
        }}
      >
        <div
          className="specialty-track"
          style={{
            transform: `translateX(calc(-${index} * ((100% + var(--card-gap)) / ${perPage})))`,
          }}
        >
          {specialties.map((s, i) => (
            <Link
              key={s.slug}
              href={`/especialidades/${s.slug}`}
              className="specialty-card"
              tabIndex={i >= index && i < index + perPage ? 0 : -1}
              aria-label={`Saiba mais sobre ${s.name}`}
            >
              <img
                src={asset(s.image)}
                style={{ objectPosition: s.position }}
                alt=""
                width="600"
                height="700"
                loading="lazy"
              />
              <div className="card-copy">
                <h3>{s.name}</h3>
                <span>
                  Saiba mais <ArrowRight size={21} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="carousel-controls">
        <button
          className="carousel-arrow"
          aria-label="Especialidades anteriores"
          disabled={index === 0}
          onClick={() => {
            setPaused(true);
            setIndex((i) => Math.max(0, i - 1));
          }}
        >
          <ArrowLeft size={20} />
        </button>
        <div className="dots">
          {Array.from({ length: max + 1 }, (_, i) => (
            <button
              key={i}
              aria-label={`Ver grupo de especialidades ${i + 1}`}
              aria-current={index === i ? "true" : undefined}
              className={index === i ? "selected" : ""}
              onClick={() => {
                setPaused(true);
                setIndex(i);
              }}
            />
          ))}
        </div>
        <button
          className="carousel-arrow"
          aria-label="Próximas especialidades"
          disabled={index === max}
          onClick={() => {
            setPaused(true);
            setIndex((i) => Math.min(max, i + 1));
          }}
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}

function Team({ full = false }: { full?: boolean }) {
  return (
    <section className="section container team-section" id="profissionais">
      <SectionHeading title="Pessoas que cuidam de pessoas">
        Acolhimento, atenção e um olhar individual em cada consulta.
      </SectionHeading>
      <div className="team-grid">
        {professionals.map((p, i) => (
          <article className="team-card" key={p.name}>
            <div className="portrait">
              <img
                src={asset(`doctor-${i}`)}
                alt={`Retrato gerado de ${p.name}, profissional fictício`}
                width="480"
                height="600"
                loading="lazy"
              />
            </div>
            <h3>{p.name}</h3>
            <p>{p.role}</p>
            {full && <p className="bio">{p.bio}</p>}
            {full && (
              <BookingButton
                specialty={
                  i === 0
                    ? "Dermatologia"
                    : i === 1
                      ? "Nutrologia"
                      : "Endocrinologia"
                }
              >
                Agendar consulta
              </BookingButton>
            )}
          </article>
        ))}
      </div>
      <p className="fine-print centered">
        Profissionais e retratos fictícios, criados para esta demonstração.
      </p>
      {!full && (
        <Link href="/profissionais" className="text-link">
          Conheça nossa equipe <ArrowRight size={18} />
        </Link>
      )}
    </section>
  );
}
function Testimonials() {
  return (
    <section className="section container" id="depoimentos">
      <SectionHeading title="Cuidado que deixa boas memórias">
        Histórias que representam a experiência que queremos oferecer.
      </SectionHeading>
      <div className="review-grid">
        {reviews.map((r) => (
          <figure className="review" key={r.name}>
            <figcaption>
              <span className="avatar">{r.initials}</span>
              <span>
                <strong>{r.name}</strong>
                <small>Experiência demonstrativa</small>
              </span>
              <span className="review-mark">a.</span>
            </figcaption>
            <div className="stars" aria-label="5 de 5 estrelas">
              ★★★★★
            </div>
            <blockquote>{r.text}</blockquote>
          </figure>
        ))}
      </div>
      <p className="fine-print centered">
        Depoimentos fictícios para fins de apresentação comercial.
      </p>
    </section>
  );
}
function FAQ() {
  return (
    <section className="section container faq-section" id="duvidas">
      <SectionHeading title="Podemos ajudar?">
        Algumas respostas para você se sentir à vontade.
      </SectionHeading>
      <div className="faq-list">
        {faqs.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <Plus size={20} />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
function CTA() {
  return (
    <section className="cta section container">
      <SectionHeading title="Seu cuidado começa com uma conversa">
        Reserve um momento para você. Conheça a Auravita
        <br className="desktop-break" /> e descubra uma nova forma de se cuidar.
      </SectionHeading>
      <BookingButton whatsapp>Agendar pelo WhatsApp</BookingButton>
    </section>
  );
}
function ContactTiles() {
  const a = useContext(Actions);
  return (
    <div className="contact-tiles container">
      <button onClick={() => a.book()}>
        <Phone />
        <span>(11) 99999-9999</span>
        <small>Agende sua consulta</small>
      </button>
      <button onClick={() => a.chat()}>
        <WhatsAppIcon size={40} />
        <span>Atendimento pelo WhatsApp</span>
        <small>Converse com a gente</small>
      </button>
      <Link href="/contato">
        <Mail />
        <span>contato@clinicaauravita.com.br</span>
        <small>Estamos por aqui</small>
      </Link>
      <Link href="/contato#localizacao">
        <MapPin />
        <span>Jardim Paulista, São Paulo</span>
        <small>Conheça nosso espaço</small>
      </Link>
    </div>
  );
}
function Footer() {
  return (
    <footer>
      <div className="footer-main container">
        <div className="footer-brand">
          <Brand />
          <p>
            Av. das Palmeiras, 850
            <br />
            Jardim Paulista – São Paulo/SP
          </p>
          <p className="fine-print">
            Cuidado, saúde e bem-estar
            <br />
            em cada detalhe.
          </p>
          <BookingButton>Agendar consulta</BookingButton>
        </div>
        <div>
          <h3>Institucional</h3>
          <Link href="/institucional">Sobre a Auravita</Link>
          <Link href="/institucional#estrutura">Nosso espaço</Link>
          <Link href="/profissionais">Profissionais</Link>
          <Link href="/contato">Fale conosco</Link>
        </div>
        <div>
          <h3>Especialidades</h3>
          {specialties.slice(0, 3).map((s) => (
            <Link key={s.slug} href={`/especialidades/${s.slug}`}>
              {s.name}
            </Link>
          ))}
          <Link href="/#especialidades">Todas as especialidades</Link>
        </div>
        <div>
          <h3>Atendimento</h3>
          <p>
            Segunda a sexta
            <br />
            08h às 19h
          </p>
          <p>
            Sábado
            <br />
            08h às 13h
          </p>
          <Link href="/contato#duvidas">Dúvidas frequentes</Link>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>
          © {new Date().getFullYear()} Clínica Auravita · Demonstração comercial
        </p>
        <Link href="/privacidade">Privacidade</Link>
        <p>Clínica, equipe e informações fictícias.</p>
      </div>
    </footer>
  );
}

function Clinic() {
  return (
    <section className="section container clinic-section" id="estrutura">
      <img
        src={asset("interior")}
        width="900"
        height="700"
        alt="Imagem gerada do espaço de recepção da clínica fictícia Auravita"
        loading="lazy"
      />
      <div>
        <span className="eyebrow">BEM-VINDO À AURAVITA</span>
        <h2>
          Um espaço pensado
          <br />
          para o seu bem-estar.
        </h2>
        <p>
          Do primeiro contato ao momento da consulta, nossa proposta é simples:
          ouvir com atenção e cuidar de cada detalhe.
        </p>
        <p>
          Ambientes tranquilos, uma equipe próxima e tempo para conversar. Aqui,
          você encontra um lugar para olhar para si com cuidado.
        </p>
        <span className="gold-rule" />
        <BookingButton>Conheça nosso cuidado</BookingButton>
      </div>
    </section>
  );
}
function Location() {
  return (
    <div className="location" id="localizacao">
      <div
        className="map-diagram"
        aria-label="Mapa esquemático fictício da localização, sem coordenadas reais"
      >
        <svg
          viewBox="0 0 540 310"
          role="img"
          aria-label="Mapa ilustrativo com a clínica na Avenida das Palmeiras"
        >
          <rect width="540" height="310" fill="#171b1b" />
          <g stroke="#303737" strokeWidth="24">
            <path d="M-20 90H560M-20 250H560M100-20V350M400-20V350" />
            <path d="M-20 320 440-20" strokeWidth="38" />
          </g>
          <g stroke="#454941" strokeWidth="1">
            <path d="M-20 90H560M-20 250H560M100-20V350M400-20V350" />
            <path d="M-20 320 440-20" />
          </g>
          <text x="238" y="285" fill="#9da49d" fontSize="13">
            JARDIM PAULISTA
          </text>
          <text
            x="95"
            y="168"
            transform="rotate(-36 95 168)"
            fill="#a5aaa1"
            fontSize="12"
          >
            AV. DAS PALMEIRAS
          </text>
          <circle cx="290" cy="155" r="25" fill="#d7b85b" />
          <path
            d="m282 164 8-20 8 20m-13-7h10"
            fill="none"
            stroke="#141715"
            strokeWidth="2"
          />
        </svg>
        <span>Localização fictícia · mapa ilustrativo</span>
      </div>
      <div className="location-copy">
        <span className="eyebrow">ENCONTRE A AURAVITA</span>
        <h3>Esperamos por você.</h3>
        <p>
          <MapPin size={20} />
          Av. das Palmeiras, 850
          <br />
          Jardim Paulista – São Paulo/SP
        </p>
        <p>
          <Clock size={20} />
          Segunda a sexta, das 08h às 19h
          <br />
          Sábado, das 08h às 13h
        </p>
        <span className="fine-print">Endereço e horários demonstrativos.</span>
      </div>
    </div>
  );
}
export function HomePage() {
  return (
    <Shell>
      <Hero />
      <Specialties />
      <Testimonials />
      <CTA />
      <ContactTiles />
    </Shell>
  );
}
export function InteriorPage({ page }: { page: string }) {
  return (
    <Shell>
      {page === "institucional" ? (
        <>
          <section className="hero container">
            <div className="hero-copy">
              <h1>
                O cuidado está
                <br />
                na nossa essência.
              </h1>
              <p>
                Conheça a Auravita. Um encontro entre saúde, estética e atenção
                ao que faz você se sentir bem.
              </p>
              <span className="gold-rule" />
              <BookingButton whatsapp>Agendar pelo WhatsApp</BookingButton>
            </div>
            <HeroMosaic />
          </section>
          <Clinic />
          <Team />
          <Testimonials />
          <CTA />
        </>
      ) : page === "profissionais" ? (
        <>
          <section className="hero container">
            <div className="hero-copy">
              <h1>
                Um olhar humano.
                <br />
                Um cuidado por inteiro.
              </h1>
              <p>
                Conheça as pessoas por trás de uma experiência de cuidado
                próxima e acolhedora.
              </p>
              <span className="gold-rule" />
              <BookingButton>Agendar consulta</BookingButton>
            </div>
            <img
              className="team-hero"
              src={asset("team")}
              width="768"
              height="512"
              alt="Equipe inteiramente fictícia da Auravita, imagem gerada"
            />
          </section>
          <Team full />
          <Testimonials />
          <CTA />
        </>
      ) : page === "contato" ? (
        <>
          <section className="section container contact-section">
            <SectionHeading level={1} title="Vamos conversar sobre você?">
              Nosso primeiro cuidado é ouvir. Experimente agendar seu momento na
              Auravita.
            </SectionHeading>
            <div className="contact-form-wrap">
              <Form />
            </div>
            <Location />
          </section>
          <FAQ />
          <CTA />
        </>
      ) : (
        <section className="section container privacy">
          <h1>Privacidade da demonstração</h1>
          <p>
            A Clínica Auravita é uma identidade fictícia criada para
            apresentação comercial. Pessoas, retratos, avaliações, contatos e
            endereço são demonstrativos.
          </p>
          <h2>Formulários e mensagens</h2>
          <p>
            Os campos funcionam somente nesta página. As informações digitadas
            não são transmitidas à clínica, ao WhatsApp ou a um serviço de
            agendamento, nem persistidas pelo aplicativo. Use apenas informações
            de exemplo. O provedor de hospedagem pode processar dados técnicos
            de acesso para operar o site.
          </p>
          <h2>Imagens e conteúdo</h2>
          <p>
            As imagens foram geradas para este projeto. Não representam
            profissionais ou instalações reais. Não há vínculo com a clínica
            usada como referência visual.
          </p>
          <Link className="text-link" href="/">
            Voltar ao início <ArrowRight size={18} />
          </Link>
        </section>
      )}
      <ContactTiles />
    </Shell>
  );
}
export function SpecialtyPage({
  item,
}: {
  item: (typeof specialties)[number];
}) {
  return (
    <Shell>
      <section className="detail-hero container">
        <img
          src={asset(item.image)}
          style={{ objectPosition: item.position }}
          alt="Imagem ilustrativa gerada para a especialidade"
          width="1400"
          height="700"
        />
        <div>
          <Link className="breadcrumb" href="/#especialidades">
            Especialidades
          </Link>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <span className="gold-rule" />
          <BookingButton specialty={item.name}>Agendar consulta</BookingButton>
        </div>
      </section>
      <section className="section container detail-content">
        <div>
          <span className="eyebrow">CUIDADO INDIVIDUALIZADO</span>
          <h2>
            Um plano que começa
            <br />
            por conhecer você.
          </h2>
          <p>{item.detail}</p>
          <p>
            Na Auravita, cada encontro é uma oportunidade para ouvir, orientar e
            planejar os próximos passos com tranquilidade.
          </p>
          <BookingButton specialty={item.name}>
            Agendar {item.name.toLowerCase()}
          </BookingButton>
        </div>
        <img
          src={asset("interior")}
          alt="Ambiente de atendimento fictício da Auravita"
          width="700"
          height="550"
          loading="lazy"
        />
      </section>
      <FAQ />
      <CTA />
      <ContactTiles />
    </Shell>
  );
}
