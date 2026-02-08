# MobileShop Enterprise Platform

![Mobile Shop Banner](https://img.shields.io/badge/MobileShop-Enterprise-indigo?style=for-the-badge&logo=react&logoColor=white) ![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

A state-of-the-art e-commerce solution built with a modern tech stack, featuring a high-performance customer storefront and a "Corporate Boom" styled admin dashboard. The platform is designed for scalability, aesthetics, and a premium user experience, utilizing the latest web technologies.

## 🚀 Tech Stack

### Monorepo Architecture
-   **Turborepo**: High-performance build system for TypeScript monorepos, ensuring fast builds and efficient package management.

### **Frontend (`apps/web`)**
An immersive Next.js application powering both the customer-facing store and the enterprise admin panel.
-   **Framework**: Next.js 14 (App Router)
-   **Structure**: TypeScript, React Server Components
-   **Styling**: Tailwind CSS, PostCSS
-   **Animations**: Framer Motion for smooth transitions and interactive elements.
-   **Icons**: Lucide React for consistent iconography.
-   **Design Language**: Glassmorphism, Neon Accents ("Corporate Boom"), Dark Mode First.

### **Backend (`apps/backend`)**
A robust Express.js API serving data and handling business logic.
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MongoDB (Mongoose schemas)
-   **Authentication**: JWT-based secure auth flow.

### **Shared Packages (`packages/`)**
Reusable code libraries ensuring consistency across the monorepo.
-   **`ui`**: Shared React component library (`Button`, `Card`, `Input`) implementing the design system.
-   **`eslint-config`**: Standardized linting rules.
-   **`typescript-config`**: Base TypeScript configurations.

---

## ✨ Key Features

### 👑 Enterprise Admin Dashboard
A powerful control center for managing the entire platform.
-   **Corporate Dark Theme**: A premium aesthetic with deep slate backgrounds, glassmorphism, and vibrant neon accents (Indigo, Emerald, Rose).
-   **Real-time Overview**: Interactive dashboard with key metrics (Revenue, Orders, Users).
-   **Product Management**: Full CRUD capabilities for inventory.
-   **Order Processing**: Track and manage customer orders efficiently.
-   **Service Management**: Specialized Kanban-style board for tracking repair tickets (Pending -> In Progress -> Completed).
-   **User Management**: Customer data and role management.
-   **Settings**: Configure store details, notifications, and security (2FA).

### 🛍️ Customer Storefront
A modern, responsive e-commerce experience.
-   **Fast & Responsive**: Optimized for all devices (Mobile, Tablet, Desktop).
-   **Service Booking**: Integrated system for customers to book device repairs.
-   **Product Catalog**: Browse and purchase mobile devices and accessories.
-   **User Accounts**: Order history and profile management.

---

## 🛠️ Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
-   **Node.js** (v18 or higher)
-   **npm** or **pnpm**
-   **MongoDB** (Local instance or MongoDB Atlas URI)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/TamilselvanRaman/Mobile_Shop_App.git
    cd Mobile_Shop_App
    ```

2.  **Install Dependencies**
    Using `npm` (installs dependencies for all workspaces):
    ```bash
    npm install
    ```

3.  **Environment Setup**
    -   Create `.env` files in `apps/web` and `apps/backend` if required, following the `.env.example` templates (if available).
    -   Ensure your MongoDB connection string is configured in the backend.

4.  **Run the Project**
    You can start the entire monorepo or individual apps.

    **Option A: Using the provided batch script (Windows)**
    ```bash
    ./start.bat
    ```

    **Option B: Using Turborepo (Manual)**
    ```bash
    # Start all apps (Frontend + Backend) concurrently
    npm run dev
    ```

    The applications will be available at:
    -   **Frontend**: `http://localhost:3000`
    -   **Backend API**: `http://localhost:3001` (or configured port)

---

## 📂 Project Structure

```
Mobile_Shop_App/
├── apps/
│   ├── web/            # Next.js Frontend Application
│   │   ├── app/        # App Router (Pages & Layouts)
│   │   ├── components/ # Local components
│   │   └── public/     # Static assets
│   └── backend/        # Express Backend Server
│       ├── models/     # Mongoose Schemas
│       ├── routes/     # API Endpoints
│       └── controllers/# Request Logic
├── packages/
│   ├── ui/             # Shared UI Component Library
│   ├── eslint-config/  # ESLint Configs
│   └── typescript-config/ # TS Configs
├── package.json        # Root dependencies & scripts
└── turbo.json          # Turborepo configuration
```

## 🤝 Contribution

Contributions are welcome! Please fork the repository and submit a pull request for review.

## 📄 License

This project is licensed under the MIT License.

---
*Built with ❤️ by the MobileShop Team*
