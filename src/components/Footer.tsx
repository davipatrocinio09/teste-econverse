import { useState, type FormEvent } from "react";
import { Logo } from "./Logo";

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }
  return (
    <footer className="footer" id="atendimento">
      <div className="container footer-main">
        <div>
          <h2>Sobre nós</h2>
          <ul>
            <li>
              <a href="#inicio">Conheça</a>
            </li>
            <li>
              <a href="#atendimento">Como comprar</a>
            </li>
            <li>
              <a href="#atendimento">Indicação e desconto</a>
            </li>
          </ul>
          <div className="socials" aria-label="Redes sociais">
            <span aria-label="Facebook">f</span>
            <span aria-label="Instagram">◎</span>
            <span aria-label="YouTube">▶</span>
          </div>
        </div>
        <div>
          <h2>Informações úteis</h2>
          <ul>
            <li>
              <a href="#atendimento">Fale conosco</a>
            </li>
            <li>
              <a href="#atendimento">Dúvidas</a>
            </li>
            <li>
              <a href="#atendimento">Prazos de entrega</a>
            </li>
            <li>
              <a href="#atendimento">Formas de pagamento</a>
            </li>
            <li>
              <a href="#atendimento">Política de privacidade</a>
            </li>
            <li>
              <a href="#atendimento">Trocas e devoluções</a>
            </li>
          </ul>
        </div>
        <div>
          <h2>Formas de pagamento</h2>
          <ul className="payments" aria-label="Bandeiras aceitas">
            {[
              "VISA",
              "elo",
              "Mastercard",
              "AMEX",
              "Diners",
              "Hipercard",
              "Pix",
              "Boleto",
            ].map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
        <section
          className="newsletter"
          id="newsletter"
          aria-labelledby="newsletter-title"
        >
          <h2 id="newsletter-title">
            Cadastre-se e receba nossas <strong>novidades e promoções</strong>
          </h2>
          <p>Seja o primeiro a receber nossas ofertas.</p>
          {subscribed ? (
            <p className="newsletter-success" role="status">
              Obrigado pelo interesse! Este cadastro é demonstrativo e nenhum
              dado foi enviado.
            </p>
          ) : (
            <form onSubmit={subscribe}>
              <label className="sr-only" htmlFor="newsletter-email">
                Seu e-mail
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="Seu e-mail"
                required
                autoComplete="email"
              />
              <button className="button" type="submit">
                OK
              </button>
            </form>
          )}
        </section>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>
            Copyright © {new Date().getFullYear()}. Todos os direitos
            reservados.
            <br />
            Projeto demonstrativo para o teste de desenvolvimento front-end.
          </p>
          <div className="footer-signatures">
            <span>econverse</span>
            <Logo />
          </div>
        </div>
      </div>
    </footer>
  );
}
