import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductModal } from "./ProductModal";

const product = {
  productName: "IPHONE 13 MINI",
  descriptionShort: "Descrição do iPhone 13",
  photo: "https://example.com/iphone.png",
  price: 1499.9,
};

describe("ProductModal", () => {
  it("mostra os dados do produto selecionado e adiciona a quantidade escolhida", async () => {
    const user = userEvent.setup();
    const onBuy = vi.fn();
    render(<ProductModal product={product} onClose={vi.fn()} onBuy={onBuy} />);
    expect(
      screen.getByRole("dialog", { name: product.productName }),
    ).toBeVisible();
    expect(screen.getByText(product.descriptionShort)).toBeVisible();
    expect(screen.getByText(/1\.499,90/)).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Diminuir quantidade" }),
    ).toBeDisabled();
    await user.click(
      screen.getByRole("button", { name: "Aumentar quantidade" }),
    );
    await user.click(screen.getByRole("button", { name: /^Comprar$/ }));
    expect(onBuy).toHaveBeenCalledWith(product, 2);
  });

  it("fecha pelo botão e pelo cancelamento nativo e restaura a rolagem", async () => {
    const onClose = vi.fn();
    const { unmount } = render(
      <ProductModal product={product} onClose={onClose} onBuy={vi.fn()} />,
    );
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent(
      screen.getByRole("dialog"),
      new Event("cancel", { cancelable: true }),
    );
    expect(onClose).toHaveBeenCalledOnce();
    await userEvent.click(screen.getByRole("button", { name: "Fechar modal" }));
    expect(onClose).toHaveBeenCalledTimes(2);
    unmount();
    expect(document.body.style.overflow).toBe("");
  });
});
