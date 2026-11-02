import { Logo } from "./Logo";

export function Promotions({ title, id }: { title: string; id?: string }) {
  return (
    <section
      className={`promotions container ${title === "Produtos" ? "compact" : ""}`}
      id={id}
      aria-label={title}
    >
      {[1, 2].map((value) => (
        <article key={value}>
          <div>
            <h2>{title}</h2>
            <p>
              Conheça nossa seleção de
              <br />
              produtos para você.
            </p>
            <a className="button" href="#produtos">
              Confira
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}

export function Brands() {
  return (
    <section className="brands container" aria-labelledby="brands-title">
      <h2 className="section-title" id="brands-title">
        Navegue por marcas
      </h2>
      <div className="brand-list">
        {[1, 2, 3, 4, 5].map((value) => (
          <a
            key={value}
            href="#produtos"
            aria-label={`Ver produtos VTEX — seleção ${value}`}
          >
            <Logo />
          </a>
        ))}
      </div>
    </section>
  );
}
