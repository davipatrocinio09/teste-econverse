import { useId, useState } from "react";
import { Header } from "./components/Header";
import { Categories } from "./components/Categories";
import { ProductShelf } from "./components/ProductShelf";
import { ProductModal } from "./components/ProductModal";
import { Promotions, Brands } from "./components/Promotions";
import { Footer } from "./components/Footer";
import { Dialog } from "./components/Dialog";
import { useProducts } from "./hooks/useProducts";
import { formatCurrency } from "./utils/currency";
import type { CartItem, Product } from "./types/product";

export function App() {
  const catalog = useProducts();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tecnologia");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [panel, setPanel] = useState<"cart" | "favorites" | "account" | null>(
    null,
  );
  const panelTitle = useId();
  const filtered = catalog.products.filter((product) =>
    product.productName
      .toLocaleLowerCase("pt-BR")
      .includes(query.trim().toLocaleLowerCase("pt-BR")),
  );
  const shelfProps = {
    ...catalog,
    products: filtered,
    onSelect: setSelectedProduct,
    category,
  };
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  function buy(product: Product, quantity: number) {
    setCart((items) => {
      const existing = items.find(
        (item) => item.product.productName === product.productName,
      );
      return existing
        ? items.map((item) =>
            item === existing
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [...items, { product, quantity }];
    });
    setSelectedProduct(null);
    setPanel("cart");
  }

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <div id="inicio" />
      <Header
        query={query}
        onSearch={(value) => {
          setQuery(value);
          setCategory("Tecnologia");
        }}
        cartCount={count}
        onCart={() => setPanel("cart")}
        onFavorites={() => setPanel("favorites")}
        onAccount={() => setPanel("account")}
      />
      <main id="conteudo">
        <section className="hero" aria-labelledby="hero-title">
          <div className="container">
            <h1 id="hero-title">
              Venha conhecer nossas
              <br />
              promoções
            </h1>
            <p>50% Off nos produtos</p>
            <a href="#produtos" className="button">
              Ver produto
            </a>
          </div>
        </section>
        <Categories
          selected={category}
          onSelect={(value) => {
            setCategory(value);
            document
              .getElementById("produtos")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        />
        <div id="produtos">
          <ProductShelf {...shelfProps} withTabs />
        </div>
        <Promotions title="Parceiros" id="parceiros" />
        <ProductShelf {...shelfProps} />
        <Promotions title="Produtos" />
        <Brands />
        <ProductShelf {...shelfProps} />
      </main>
      <Footer />
      {selectedProduct && (
        <ProductModal
          key={selectedProduct.productName}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onBuy={buy}
        />
      )}
      {panel && (
        <Dialog
          titleId={panelTitle}
          onClose={() => setPanel(null)}
          className="information-modal"
        >
          <h2 id={panelTitle}>
            {panel === "cart"
              ? "Seu carrinho"
              : panel === "favorites"
                ? "Seus favoritos"
                : "Minha conta"}
          </h2>
          {panel === "cart" ? (
            <>
              {cart.length ? (
                <>
                  <ul className="cart-items">
                    {cart.map((item) => (
                      <li key={item.product.productName}>
                        <img
                          src={item.product.photo}
                          alt=""
                          width="56"
                          height="65"
                        />
                        <div>
                          <strong>{item.product.productName}</strong>
                          <span>
                            {item.quantity} ×{" "}
                            {formatCurrency(item.product.price)}
                          </span>
                          <button
                            onClick={() =>
                              setCart((items) =>
                                items.filter((value) => value !== item),
                              )
                            }
                          >
                            Remover
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="cart-total">
                    Total{" "}
                    <strong>
                      {formatCurrency(
                        cart.reduce(
                          (sum, item) =>
                            sum + item.product.price * item.quantity,
                          0,
                        ),
                      )}
                    </strong>
                  </p>
                  <p className="muted">
                    Carrinho demonstrativo. Nenhuma compra ou cobrança será
                    realizada.
                  </p>
                </>
              ) : (
                <p>Seu carrinho está vazio. Explore nossos produtos.</p>
              )}
              <button className="button" onClick={() => setPanel(null)}>
                Continuar comprando
              </button>
            </>
          ) : (
            <>
              <p>
                {panel === "favorites"
                  ? "Você ainda não tem produtos favoritos."
                  : "O acesso à conta não está disponível nesta demonstração."}
              </p>
              <button className="button" onClick={() => setPanel(null)}>
                Voltar para a loja
              </button>
            </>
          )}
        </Dialog>
      )}
    </>
  );
}
