# CLAUDE.md - Rules for BrasiLândia Store Project

## Tech Stack & Architecture
- **Framework:** Next.js 14+ (App Router, TypeScript).
- **Styling:** Tailwind CSS + Lucide React Icons.
- **Backend:** Next.js API Routes (Serverless functions).
- **Database:** Supabase (PostgreSQL).
- **Payment:** Mercado Pago SDK.
- **Game Integration:** Pterodactyl Client API (Direct command dispatch).

## Design System: "Brazilcore Clean"
- **Vibe:** Modern, Summer, Brazil, Clean, Pixelmon.
- **Colors (Tailwind Config):**
  - Primary Green: `#009C3B` (Buttons, Success states)
  - Primary Blue: `#002776` (Headers, Accents)
  - Primary Yellow: `#FFDF00` (Highlights, VIP badges)
  - Background: `#F5F5F7` (Clean Light Grey/White) or White `#FFFFFF`.
  - Text: `#000000` (Main), Dark Gray for secondary.
- **UI Elements:** Rounded corners (`rounded-xl`), subtle shadows, glassmorphism effects for modals.

## Core Data Structure
- **Product:** Has `name`, `price`, `image`, `category_id`, and `commands` (array of strings).
- **Command Placeholder:** Use `{player}` in commands to be replaced by the user's nickname.

## Critical Workflows
1. **Checkout:** User selects items -> Carts -> Inputs Nickname -> Generates Pix QR Code (Mercado Pago).
2. **Webhook (The Delivery):**
   - Receive MP notification.
   - Verify payment status == 'approved'.
   - Fetch `order_items` from Supabase.
   - Loop through items -> commands.
   - **Pterodactyl Action:** Send POST to `/api/client/servers/{server_id}/command` for each command.
   - Update Order Status to 'delivered'.

## Pterodactyl Logic
- Use `node-fetch` or native `fetch` to call Pterodactyl API.
- Header: `Authorization: Bearer <API_KEY>`
- Body: `{ "command": "console command here" }`

## Coding Standards
- Use functional React components.
- Use strict types for all props and API responses.
- Keep `page.tsx` clean, move logic to `components/`.
- Handle API errors gracefully (try/catch).

## Admin Dashboard Requirements (New)
- **Route:** `/admin` (Protected route).
- **Authentication:** Use Supabase Auth. Only allow users whose email exists in `admin_whitelist` table.
- **Features needed:**
  1. **Overview:** Charts showing Sales (Daily/Monthly) and Recent Orders.
  2. **Product Manager:** CRUD (Create, Read, Update, Delete) for Products. Must allow editing commands and image URLs.
  3. **Category Manager:** CRUD for Categories.
  4. **Settings:** A form to edit `store_settings` (Name, Logo, Colors, API Keys).
  5. **Orders:** List of all transactions with status filter (Pending/Approved).

## UI/UX for Admin
- Use a Sidebar Layout for `/admin`.
- Use a different simpler visual style (Dashboard style) compared to the Storefront.
- Use `recharts` for the analytics charts.