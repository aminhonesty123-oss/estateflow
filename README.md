# EstateFlow — Smart Property Management System

A frontend-only property, rental and tenant management demonstration built with React, Vite, React Router, Recharts and Lucide React. It uses realistic starter data and browser `localStorage`; no backend or database is required.

## 1. Requirements

- Node.js 18.18+ (Node.js 20 LTS recommended)
- npm
- VS Code or another code editor

Check installation:

```bash
node -v
npm -v
```

## 2. Install and run

1. Extract `smart-property-management.zip`.
2. Open the extracted `smart-property-management` folder in VS Code.
3. Open the integrated terminal (**Terminal → New Terminal**).
4. Install dependencies:

```bash
npm install
```

5. Start the Vite development server:

```bash
npm run dev
```

6. Open the local URL printed in the terminal (normally `http://localhost:5173`).

To create and preview a production build:

```bash
npm run build
npm run preview
```

## 3. Demo login accounts

All passwords are simulated and stored locally. Select an account button on the login screen to autofill it.

| Role | Email | Password |
|---|---|---|
| Administrator | admin@estateflow.demo | admin123 |
| Property Owner | owner@estateflow.demo | demo123 |
| Property Manager | manager@estateflow.demo | demo123 |
| Accountant | accounts@estateflow.demo | demo123 |
| Maintenance Technician | tech@estateflow.demo | demo123 |
| Tenant | tenant@estateflow.demo | demo123 |

## 4. Main workflows to demonstrate

- **Property and unit setup:** create a property, then add rental units and set their availability.
- **Applications:** create an application for an available unit. Approving it creates a tenant and a one-year lease, then marks the unit occupied.
- **Leases:** create leases for available units. The app checks date overlap and updates tenant/unit assignments for active leases.
- **Rent collection:** create an invoice, then use the payment action to record full or partial payments. The invoice balance and status update automatically.
- **Maintenance:** add requests, assign a technician and update their status. Completing a request updates the related unit's status to available.
- **Expenses and utilities:** record expenses and meter readings. Utility charges are calculated as `(current reading - previous reading) × rate`.
- **Reports:** view live totals and export module records or the financial summary as CSV.
- **Persistence:** refresh the browser; records, user session and theme remain saved in localStorage.

## 5. Project structure

```text
smart-property-management/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    └── data.js
```

- `data.js` — realistic starter records and reusable module form definitions.
- `App.jsx` — routing, localStorage state, authentication, role navigation, CRUD forms, workflows, charts and reports.
- `App.css` — responsive layout, tables, forms, modals, dark theme and login screen.
- `main.jsx` — React entry point.

## 6. Reset the demo data

The app saves data in the current browser. To restore the starter data, open browser developer tools → **Application** (Chrome/Edge) → **Local Storage** → your localhost origin, then delete:

- `estateflow-data`
- `estateflow-user`
- `estateflow-theme`

Refresh the page to seed the original demo data again.

## 7. Important project notes

This is a frontend learning project, not a production property-management or payment system. Authentication and passwords are simulated in browser storage and are not secure. Payments are mock records; no real money is collected. Data is stored per browser and is not shared between devices or users. Role-based navigation is a frontend demonstration, not server-enforced security.

The project includes working CRUD screens for the core modules, filtering, sorting, pagination, CSV export, print views, role-based navigation, local persistence and interconnected application/lease/payment/maintenance/utility workflows. It is a practical foundation for extending the remaining production-grade workflows.
