import { useId, useState } from "react";
import type { Product } from "../types/product";
import { formatCurrency } from "../utils/currency";
import { Dialog } from "./Dialog";
import { Icon } from "./Icon";

export function ProductModal({
  product,
  onClose,
  onBuy,
}: {
  product: Product;
  onClose: () => void;
  onBuy: (product: Product, quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [details, setDetails] = useState(false);
  const titleId = useId();
  return (
    <Dialog titleId={titleId} onClose={onClose} className="product-modal">
      <img
        className="modal-photo"
        src={product.photo}
        alt={product.productName}
        width="280"
        height="280"
      />
      <div className="modal-info">
        <h2 id={titleId}>{product.productName}</h2>
        <p className="modal-price">{formatCurrency(product.price)}</p>
        <p className="modal-description">{product.descriptionShort}</p>
        <button
          className="details-link"
          aria-expanded={details}
          onClick={() => setDetails((value) => !value)}
        >
          Veja mais detalhes do produto <span aria-hidden="true">»</span>
        </button>
        {details && (
          <p className="expanded-details">
            {product.descriptionShort}. Pagamento em até 2x de{" "}
            {formatCurrency(product.price / 2)} sem juros. Frete grátis.
          </p>
        )}
        <div className="quantity" role="group" aria-label="Quantidade">
          <button
            aria-label="Diminuir quantidade"
            disabled={quantity === 1}
            onClick={() => setQuantity((value) => value - 1)}
          >
            <Icon name="minus" size={17} />
          </button>
          <output aria-live="polite" aria-label="Quantidade selecionada">
            {quantity}
          </output>
          <button
            aria-label="Aumentar quantidade"
            disabled={quantity === 99}
            onClick={() => setQuantity((value) => value + 1)}
          >
            <Icon name="plus" size={17} />
          </button>
        </div>
        <button className="button" onClick={() => onBuy(product, quantity)}>
          Comprar
        </button>
      </div>
    </Dialog>
  );
}
