# Karigar Coast — E-commerce Checkout Flow

A responsive vanilla HTML/CSS/JavaScript e-commerce experience inspired by the provided Mapusa Handicrafts reference screens, renamed **Karigar Coast**.

## Files
- `index.html` — page structure and UI
- `style.css` — responsive visual design
- `app.js` — search, filters, cart, coupons, checkout, localStorage and orders
- `data.js` — 24 seeded products + 4 coupon rules

## How to run
1. Keep all four files in the same folder.
2. Open `index.html` in Chrome/Edge, or use VS Code Live Server.
3. The product photos are real photography hosted by Unsplash and therefore require an internet connection.
4. Cart and orders are stored in browser `localStorage`.

## Main features
- 24 products across Textiles, Pottery, Spices, Jewellery and Home Decor.
- Product search, category filtering, price range and sorting.
- Product detail modal with quantity selector.
- Cart drawer with quantity limits based on stock.
- 4 coupon types:
  - `WELCOME10` — 10% off.
  - `SAVE150` — ₹150 off orders of ₹1,000+.
  - `FREESHIP` — free delivery on orders of ₹999+.
  - `B2G1POTTERY` — buy 2, get 1 free on Pottery when 3+ qualifying units are in the cart.
- Delivery charge: ₹50 for standard zone, plus ₹70 for non-Goa pincode zones; free over ₹1,499.
- GST: 5% of discounted merchandise total.
- 3-step checkout: Delivery → Payment → Review.
- Order number generation and order history.
- Reorder restores available quantities to the cart.
- WhatsApp share action after successful order.
- Responsive mobile layout.

## Design direction
The interface follows the supplied screenshots with:
- warm cream/peach backgrounds
- deep coastal teal navigation and buttons
- rounded cards and soft shadows
- large coastal hero photography
- artisan-style serif/script typography
- playful icons and Goa-inspired visual details

## Internship submission
For the internship evidence, capture:
1. Shop/product grid
2. Cart drawer
3. Delivery step
4. Payment step
5. Review step
6. Order confirmation
7. Order history
8. Mobile view

For a live preview, deploy this folder with GitHub Pages, Netlify or Vercel.
