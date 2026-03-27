export function formatPrice(
  price: number | string | null | undefined
) {
  if (price === null || price === undefined) return "";

  return Number(price).toLocaleString("en-US");
}