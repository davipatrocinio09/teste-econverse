import type { Product } from "../types/product";
import { formatCurrency } from "../utils/currency";

export function ProductCard({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: (product: Product) => void;
}) {
  return (
    <article className="product-card">
      <button
        className="product-card-content"
        onClick={() => onSelect(product)}
        aria-label={`Ver detalhes de ${product.productName}`}
      >
        <img
          src={product.photo}
          alt={product.productName}
          width="248"
          height="248"
          loading="lazy"
        />
        <h3>{product.productName}</h3>
        <span className="price">{formatCurrency(product.price)}</span>
        <span className="installments">
          ou 2x de {formatCurrency(product.price / 2)} sem juros
        </span>
        <span className="free-shipping">Frete grátis</span>
      </button>
      <button
        className="button"
        onClick={() => onSelect(product)}
        aria-label={`Comprar ${product.productName}`}
      >
        Comprar
      </button>
    </article>
  );
}
