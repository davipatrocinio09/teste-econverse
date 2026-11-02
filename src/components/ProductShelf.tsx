import { useId, useRef, useState } from "react";
import type { Product } from "../types/product";
import { Icon } from "./Icon";
import { ProductCard } from "./ProductCard";

const tabs = [
  "Celular",
  "Acessórios",
  "Tablets",
  "Notebooks",
  "TVs",
  "Ver todos",
];

interface ProductShelfProps {
  products: Product[];
  loading: boolean;
  error: string;
  retry: () => void;
  onSelect: (product: Product) => void;
  withTabs?: boolean;
  category?: string;
}

export function ProductShelf({
  products,
  loading,
  error,
  retry,
  onSelect,
  withTabs = false,
  category = "Tecnologia",
}: ProductShelfProps) {
  const [tab, setTab] = useState("Celular");
  const track = useRef<HTMLUListElement>(null);
  const id = useId();
  const visibleProducts =
    category !== "Tecnologia" ||
    (withTabs && !["Celular", "Ver todos"].includes(tab))
      ? []
      : products;

  function scroll(direction: number) {
    const element = track.current;
    if (element)
      element.scrollBy({
        left: element.clientWidth * direction,
        behavior: "smooth",
      });
  }

  return (
    <section className="product-shelf container" aria-labelledby={id}>
      <h2 className="section-title" id={id}>
        Produtos relacionados
      </h2>
      {withTabs ? (
        <div
          className="product-tabs"
          role="group"
          aria-label="Filtrar por tipo de produto"
        >
          {tabs.map((value) => (
            <button
              key={value}
              onClick={() => {
                setTab(value);
                track.current?.scrollTo({ left: 0 });
              }}
              className={tab === value ? "selected" : ""}
              aria-pressed={tab === value}
            >
              {value}
            </button>
          ))}
        </div>
      ) : (
        <a className="see-all" href="#produtos">
          Ver todos
        </a>
      )}
      {loading ? (
        <div
          className="skeletons"
          role="status"
          aria-label="Carregando produtos"
        >
          {[0, 1, 2, 3].map((value) => (
            <div className="skeleton" key={value} />
          ))}
        </div>
      ) : error ? (
        <div className="empty-state" role="alert">
          <p>{error}</p>
          <button className="button" onClick={retry}>
            Tentar novamente
          </button>
        </div>
      ) : !visibleProducts.length ? (
        <p className="empty-state">Nenhum produto encontrado nesta seleção.</p>
      ) : (
        <div className="shelf-carousel">
          <button
            className="shelf-arrow previous"
            aria-label="Produtos anteriores"
            onClick={() => scroll(-1)}
          >
            <Icon name="left" size={28} />
          </button>
          <ul
            ref={track}
            className="product-track"
            aria-label="Lista de produtos"
          >
            {visibleProducts.map((product) => (
              <li key={product.productName}>
                <ProductCard product={product} onSelect={onSelect} />
              </li>
            ))}
          </ul>
          <button
            className="shelf-arrow next"
            aria-label="Próximos produtos"
            onClick={() => scroll(1)}
          >
            <Icon name="right" size={28} />
          </button>
        </div>
      )}
    </section>
  );
}
