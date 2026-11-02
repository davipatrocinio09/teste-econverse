import type { Product } from "../types/product";

export const PRODUCTS_URL =
  "https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json";

function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== "object") return false;
  const product = value as Record<string, unknown>;
  return (
    typeof product.productName === "string" &&
    typeof product.descriptionShort === "string" &&
    typeof product.photo === "string" &&
    /^https:\/\//.test(product.photo) &&
    typeof product.price === "number" &&
    Number.isFinite(product.price) &&
    product.price >= 0
  );
}

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  // Desenvolvimento e produção usam um proxy na mesma origem para evitar CORS.
  const response = await fetch("/api/products", { signal });
  if (!response.ok) throw new Error("Não foi possível carregar os produtos.");
  const data: unknown = await response.json();
  if (
    !data ||
    typeof data !== "object" ||
    !("products" in data) ||
    !("success" in data) ||
    data.success !== true ||
    !Array.isArray(data.products) ||
    !data.products.every(isProduct)
  ) {
    throw new Error("A lista de produtos recebida é inválida.");
  }
  return data.products;
}
