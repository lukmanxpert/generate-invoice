# 🧾 Generate Invoice

A modern invoice generation and management web application built with **Next.js, TypeScript, Tailwind CSS, Shadcn UI, MongoDB, and NextAuth**.  
Users can create invoices, send them to clients, and track payments via an interactive dashboard.

🌍 **Live Demo**: [https://generate-invoice-five.vercel.app](https://generate-invoice-five.vercel.app)

---

## 🚀 Features

- 🔐 **Authentication with Magic Link** (NextAuth + MongoDB Adapter)
- 📝 **Invoice Generation**
  - Add multiple services/items with price & quantity
  - Automatic calculations (subtotal, discount, tax, total)
  - Downloadable & sharable PDF invoices
- 📧 **Invoice Sharing**
  - Clients receive invoice links via email
- 📊 **Dashboard & Analytics**
  - Revenue statistics with charts (Recharts)
  - Paid vs Unpaid invoices
  - Recent invoice history
- 💾 **Database Integration**
  - MongoDB with Mongoose
  - Users automatically stored in database after login
- 🎨 **Modern UI**
  - Styled with Tailwind CSS + Shadcn UI
  - Responsive design

---

## 🖼️ Screenshots

### Invoice Example
![Invoice Example](./public/screenshots/invoice.png)

### Dashboard
![Dashboard](./public/screenshots/dashboard.png)

---

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [NextAuth.js](https://next-auth.js.org/) (Magic Link Authentication)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- [Recharts](https://recharts.org/) (Charts & Analytics)
- [Zod](https://zod.dev/) (Form Validation)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/generate-invoice.git
cd generate-invoice
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env.local` file in the root:

```env
# MongoDB
MONGODB_URI=your-mongodb-connection-string

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Email Provider (for magic link auth + sending invoices)
EMAIL_SERVER=smtp://username:password@smtp.mailtrap.io:2525
EMAIL_FROM=your-email@example.com
```

### 4️⃣ Run the Development Server
```bash
npm run dev
```
App runs on [http://localhost:3000](http://localhost:3000).

---

## 📤 Deployment

Deployed on [Vercel](https://vercel.com/).

🌍 **Live Demo**: [https://generate-invoice-five.vercel.app](https://generate-invoice-five.vercel.app)

1. Push code to GitHub
2. Connect repository with Vercel
3. Add environment variables in Vercel dashboard
4. Deploy 🚀

---

## 📌 Roadmap

- ✅ Invoice PDF download & shareable link
- ✅ Magic link authentication
- ✅ Dashboard with charts
- ⏳ Payment gateway integration (Stripe/PayPal)
- ⏳ Multi-language support
- ⏳ Invoice templates & customization

---

## 🤝 Contributing

1. Fork the repo  
2. Create a new branch (`feature/awesome-feature`)  
3. Commit changes  
4. Push branch and create a PR  

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Sheikh MD Lukman Miah**  
🚀 MERN & Next.js Developer | Building scalable apps  
