One Click Shopping Hub

A modern React + Firebase e-commerce platform that connects sellers and buyers in one place. Sellers can easily register, log in, and post products (with images and categories), while buyers can explore items conveniently organized by category — all in one click.

🚀 Features
🧭 General

Responsive Landing Page with navigation and category-based product display

Sticky Navbar and Footer using Tailwind CSS

Loader and Confirmation Modal for smooth user interaction

👨‍💼 Seller

Secure Firebase Authentication (Register / Login)

Add, View, and Manage Products

Automatic image upload to Firebase Storage

Data storage in Firebase Firestore

🛒 Buyer

Browse products by category

View product details (image, name, price, description)

🧩 Tech Stack
Category	Technology
Frontend Framework	React (Vite)
Styling	Tailwind CSS
Backend / Database	Firebase (Auth, Firestore, Storage)
Routing	React Router DOM
State Management	React Hooks
Icons & UI	Heroicons / Lucide-react

📁 Folder Structure
OneClick_Shopping_Hub/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ConfirmModal.jsx
│   │   └── Loader.jsx
│   │
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Register.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SellerHome.jsx
│   │   └── AddProductPage.jsx
│   │
│   ├── utils/
│   │   └── categories.js
│   │
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   └── firebaseConfig.js
│
├── public/
│   └── favicon.ico
│
├── .gitignore
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/yourusername/one-click-shopping-hub.git
cd one-click-shopping-hub

2️⃣ Install dependencies
npm install

3️⃣ Setup Tailwind CSS (if not already)

Make sure Tailwind is configured correctly:

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


Then ensure your tailwind.config.js has:

content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],

4️⃣ Configure Firebase

Create a file:
📄 src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

⚠️ Important:

In your Firebase Console:

Enable Email/Password Authentication

Enable Firestore Database

Enable Storage

Allow correct CORS configuration for image uploads

🧠 Common Issues
Error	Cause	Fix
auth/operation-not-allowed	Email/Password sign-in not enabled	Enable it under Firebase Authentication settings
CORS policy: No 'Access-Control-Allow-Origin'	Firebase Storage not allowing uploads	Configure CORS for your storage bucket using Firebase CLI
Blank Page	Routing issue or missing outlet	Ensure <Outlet /> or <Routes> are defined in App.jsx
🧪 Run the Project

Start the development server:

npm run dev


Then open in your browser:

http://localhost:5173