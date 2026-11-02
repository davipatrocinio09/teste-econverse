import { Icon } from "./Icon";
import { Logo } from "./Logo";

interface HeaderProps {
  query: string;
  onSearch: (value: string) => void;
  cartCount: number;
  onCart: () => void;
  onFavorites: () => void;
  onAccount: () => void;
}

export function Header({
  query,
  onSearch,
  cartCount,
  onCart,
  onFavorites,
  onAccount,
}: HeaderProps) {
  return (
    <header className="header container">
      <div className="benefits">
        <span>
          <Icon name="shield" size={20} />
          Compra <strong>100% segura</strong>
        </span>
        <span>
          <Icon name="truck" size={20} />
          <strong>Frete grátis</strong> acima de R$ 200
        </span>
        <span>
          <Icon name="card" size={20} />
          <strong>Parcele</strong> suas compras
        </span>
      </div>
      <div className="header-main">
        <a href="#inicio" aria-label="VTEX — início">
          <Logo />
        </a>
        <form
          className="search"
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            document
              .getElementById("produtos")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <label className="sr-only" htmlFor="search">
            Buscar produtos
          </label>
          <input
            id="search"
            type="search"
            placeholder="O que você está buscando?"
            value={query}
            onChange={(event) => onSearch(event.target.value)}
          />
          <button aria-label="Buscar" type="submit">
            <Icon name="search" size={28} />
          </button>
        </form>
        <div className="header-actions">
          <a href="#parceiros" aria-label="Nossos parceiros">
            <Icon name="box" size={29} />
          </a>
          <button aria-label="Favoritos" onClick={onFavorites}>
            <Icon name="heart" size={29} />
          </button>
          <button aria-label="Minha conta" onClick={onAccount}>
            <Icon name="user" size={29} />
          </button>
          <button
            className="cart-button"
            aria-label={`Carrinho, ${cartCount} itens`}
            onClick={onCart}
          >
            <Icon name="cart" size={29} />
            {cartCount > 0 && <span>{cartCount}</span>}
          </button>
        </div>
      </div>
      <nav className="main-nav" aria-label="Navegação principal">
        <a href="#categorias">Todas categorias</a>
        <a href="#categorias">Supermercado</a>
        <a href="#categorias">Livros</a>
        <a href="#categorias">Moda</a>
        <a href="#produtos">Lançamentos</a>
        <a href="#produtos" className="active">
          Ofertas do dia
        </a>
        <a href="#newsletter">
          <Icon name="crown" size={20} />
          Assinatura
        </a>
      </nav>
    </header>
  );
}
