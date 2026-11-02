import { getProducts } from "./products";

const product = {
  productName: "iPhone",
  descriptionShort: "Smartphone",
  photo: "https://example.com/iphone.png",
  price: 1499.9,
};

describe("getProducts", () => {
  it("lê os produtos do endpoint e preserva o preço recebido", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, products: [product] }),
      });
    vi.stubGlobal("fetch", fetchMock);
    const controller = new AbortController();
    await expect(getProducts(controller.signal)).resolves.toEqual([product]);
    expect(fetchMock).toHaveBeenCalledWith("/api/products", {
      signal: controller.signal,
    });
  });

  it("informa falhas HTTP", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    await expect(getProducts()).rejects.toThrow("Não foi possível carregar");
  });

  it.each([
    { success: false, products: [product] },
    { success: true, products: [{ ...product, price: "1499" }] },
    { success: true, products: [{ ...product, price: -1 }] },
    { success: true, products: [{ ...product, photo: "javascript:alert(1)" }] },
    null,
  ])("rejeita respostas malformadas: %j", async (payload) => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => payload }),
    );
    await expect(getProducts()).rejects.toThrow("inválida");
  });
});
