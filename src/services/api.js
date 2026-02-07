// Change this later if your backend runs on a different host/port.
// For now, assume Vite proxy or same-origin.
const BASE_URL = "";

/**
 * locationId: 1..4 (your four restaurant locations)
 *
 * Expected response shape (your example):
 * [
 *   { currentStock:499, dailyBurnRate:40.0, daysUntilStockout:12,
 *     ingredientName:"Beef Patty (Frozen)", recommendation:"None", status:"OK" },
 *   ...
 * ]
 */
export async function fetchInventoryHealth(locationId) {
  const url = `${BASE_URL}/api/inventory-health?locationId=${encodeURIComponent(locationId)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Inventory health failed (${res.status})`);
  return res.json();
}

/**
 * Optional: if you have endpoints for shipments/orders/sales.
 * Keep these as placeholders so you can wire them later without touching UI.
 */
export async function fetchSalesSeries(locationId) {
  // Example endpoint. If you don't have it yet, return null and we’ll fallback.
  const url = `${BASE_URL}/api/sales-weekly?locationId=${encodeURIComponent(locationId)}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}
