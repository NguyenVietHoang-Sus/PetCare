# 🐾 Pet Care Pro - Pet Management System

A comprehensive full-stack web application for pet management, veterinary appointments, and pet product shopping.

## 🚀 Tech Stack

- **Frontend**: React.js + Vite
- **Styling**: Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT

## 📁 Project Structure

```
pet-management-system/
├── backend/                 # Node.js API server
│   ├── config/              # Database connection
│   ├── controllers/         # Route handlers
│   ├── middleware/          # Auth middleware
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API routes
│   ├── utils/               # Helper utilities
│   ├── server.js            # Entry point
│   └── seed.js              # Demo data seeder
│
├── frontend/                # React application
│   ├── public/              # Static assets
│   └── src/
│       ├── components/      # Reusable components
│       ├── context/         # React contexts
│       ├── i18n/            # Translations (EN/VI)
│       ├── pages/           # Page components
│       ├── services/        # API services
│       └── App.jsx          # Main app
│
└── README.md
```

## ⚡ Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment
# Edit .env file with your MongoDB URI

# Seed demo data (optional)
node seed.js

# Start server
npm run dev
```

Backend runs at: `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs at: `http://localhost:5173`

## 🔐 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@petcare.com | admin123 |
| Staff | staff@petcare.com | staff123 |
| Customer | customer@example.com | customer123 |

## ✨ Features

### 🐕 Pet Management
- Add/edit/delete pets
- Track medical history
- Health timeline visualization
- Vaccination & deworming reminders

### 📅 Appointment Booking
- Multi-step booking wizard
- Service selection (grooming, vaccination, checkup, etc.)
- Date/time slot selection
- Staff preference
- Conflict detection

### 🛒 Pet Shop
- Product categories (food, accessories, medicine, toys, hygiene)
- Search and filter
- Shopping cart
- Mock checkout with payment options

### 👨‍💼 Admin Dashboard
- Today's appointments overview
- Quick status updates
- Order statistics
- Revenue tracking

### 🌐 Internationalization
- English and Vietnamese support
- Easy language toggle

### 📱 Responsive Design
- Mobile-first approach
- Works on all screen sizes

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get profile
- `GET /api/auth/staff` - Get staff list

### Pets
- `GET /api/pets` - Get user's pets
- `POST /api/pets` - Add pet
- `POST /api/pets/:id/medical` - Add medical record
- `GET /api/pets/reminders/all` - Get all reminders

### Appointments
- `GET /api/appointments` - Get appointments
- `POST /api/appointments` - Create booking
- `GET /api/appointments/available-slots` - Check availability
- `GET /api/appointments/today` - Today's schedule (staff)

### Products
- `GET /api/products` - List products
- `GET /api/products/featured` - Featured products

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get orders
- `POST /api/orders/:id/payment` - Process payment

## 🎨 Customization

### Colors
Edit `frontend/tailwind.config.js` to customize the color palette.

### Translations
Add/edit translations in `frontend/src/i18n/translations.js`

## 📝 License

MIT License - feel free to use for learning and personal projects!

---

Built with ❤️ for pet lovers everywhere 🐾
