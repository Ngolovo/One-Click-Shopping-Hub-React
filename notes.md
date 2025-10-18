Let's organize the **One Click Shopping Hub** project by file, clearly separated for easy copying.

---

### 🗂️ File: `package.json`
```json
{
  "name": "one-click-shopping-hub",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "firebase": "^10.12.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.23.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.15",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.4.1",
    "vite": "^5.1.0"
  }
}
```

---

### ⚙️ File: `vite.config.js`
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

---

### ⚙️ File: `tailwind.config.js`
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

---

### 🧩 File: `postcss.config.js`
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

### 🌐 File: `index.html`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>One Click Shopping Hub</title>
  </head>
  <body class="bg-gray-50">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

### ⚛️ File: `src/main.jsx`
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

---

### ⚛️ File: `src/App.jsx`
```jsx

```

---

### 🧩 File: `src/firebase.js`
```js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

---

### 🧠 File: `src/context/AuthContext.jsx`
```jsx

```

---

### 🧩 File: `src/components/Navbar.jsx`
```jsx

```

---

### 🧩 File: `src/components/Footer.jsx`
```jsx

```

---

### 🧩 File: `src/components/ProductCard.jsx`
```jsx

```

---

### 🧩 File: `src/pages/Landing.jsx`
```jsx

```

---

### 🧩 File: `src/pages/Register.jsx`
```jsx

```

---

### 🧩 File: `src/pages/Login.jsx`
```jsx

```

---

### 🧩 File: `src/pages/SellerHome.jsx`
```jsx

```

---

### 🧩 File: `src/pages/AddProduct.jsx`
```jsx

```

---

### 🧩 File: `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Inter', sans-serif;
}
```

---

### 📘 File: `README.md`
```md
# One Click Shopping Hub

A React + Firebase web application for sellers to post categorized products and buyers to view them and contact sellers via WhatsApp.

## Features
- Seller registration and login via Firebase Auth
- Add, view, and categorize products
- Image uploads stored in Firebase Storage
- Firestore database for product management
- WhatsApp integration for easy communication

## Setup
```bash
npm install
npm run dev
```

Replace credentials in `firebase.js` with your Firebase config.
```
