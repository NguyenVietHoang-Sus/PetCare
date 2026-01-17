# 🐾 Pet Care Pro - Hệ Thống Quản Lý Thú Cưng

<div align="center">

![Pet Care Pro](https://img.shields.io/badge/Pet%20Care%20Pro-v1.0.0-06b6d4?style=for-the-badge&logo=paw&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?style=flat-square&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=flat-square&logo=tailwindcss)

**Ứng dụng web full-stack quản lý thú cưng, đặt lịch khám thú y và mua sắm sản phẩm thú cưng.**

[English](#english) | [Tiếng Việt](#tiếng-việt)

</div>

---

## 📋 Mục Lục

- [Giới Thiệu](#-giới-thiệu)
- [Công Nghệ Sử Dụng](#-công-nghệ-sử-dụng)
- [Tính Năng](#-tính-năng)
- [Cài Đặt](#-cài-đặt)
- [Cấu Trúc Dự Án](#-cấu-trúc-dự-án)
- [API Documentation](#-api-documentation)
- [Tài Khoản Demo](#-tài-khoản-demo)
- [Screenshots](#-screenshots)

---

## 🎯 Giới Thiệu

**Pet Care Pro** là một hệ thống quản lý thú cưng toàn diện được xây dựng với công nghệ web hiện đại. Ứng dụng cung cấp các tính năng:

- 🐕 **Quản lý thú cưng** - Theo dõi thông tin, lịch sử y tế
- 📅 **Đặt lịch hẹn** - Đặt lịch khám, tiêm phòng, làm đẹp
- 🛒 **Cửa hàng online** - Mua sắm thức ăn, phụ kiện
- 💬 **Chat trực tiếp** - Trao đổi với bác sĩ thú y
- 📰 **Tin tức** - Đọc và viết bài về thú cưng
- 👨‍💼 **Dashboard quản lý** - Dành cho Admin/Staff

---

## 🚀 Công Nghệ Sử Dụng

### Frontend
| Công nghệ | Phiên bản | Mô tả |
|-----------|-----------|-------|
| React.js | 18.x | Library UI hiện đại |
| Vite | 5.x | Build tool nhanh |
| Tailwind CSS | 3.x | Utility-first CSS framework |
| React Router | 6.x | Client-side routing |
| React Hot Toast | 2.x | Thông báo đẹp mắt |
| React Icons | 5.x | Icon library |
| date-fns | 3.x | Xử lý ngày tháng |

### Backend
| Công nghệ | Phiên bản | Mô tả |
|-----------|-----------|-------|
| Node.js | 18.x | JavaScript runtime |
| Express.js | 4.x | Web framework |
| MongoDB | 6.x | NoSQL database |
| Mongoose | 8.x | MongoDB ODM |
| JWT | - | Authentication |
| bcryptjs | 2.x | Password hashing |
| express-validator | 7.x | Request validation |

---

## ✨ Tính Năng

### 🐕 Quản Lý Thú Cưng
- Thêm/sửa/xóa thông tin thú cưng
- Upload ảnh đại diện
- Timeline sức khỏe với biểu đồ trực quan
- Lịch sử y tế chi tiết (tiêm phòng, khám bệnh, thuốc)
- Nhắc nhở lịch tiêm phòng/tẩy giun

### 📅 Đặt Lịch Hẹn
- Wizard đặt lịch 4 bước
- Chọn dịch vụ (Làm đẹp, Tiêm phòng, Khám bệnh, Phẫu thuật, Trông giữ, Huấn luyện)
- Chọn ngày/giờ với khung giờ trống
- Chọn bác sĩ/nhân viên
- Xác nhận và theo dõi trạng thái

### 🛒 Cửa Hàng Online
- Danh mục sản phẩm (Thức ăn, Phụ kiện, Thuốc, Đồ chơi, Vệ sinh)
- Tìm kiếm và lọc sản phẩm
- Giỏ hàng với tính năng tăng/giảm số lượng
- Checkout với nhiều phương thức thanh toán
- Theo dõi đơn hàng với timeline trạng thái

### 👨‍💼 Admin Dashboard
- **Tổng quan**: Thống kê nhanh (lịch hẹn, đơn hàng, doanh thu)
- **Lịch hẹn**: Xem theo ngày, lọc All/Pending, cập nhật trạng thái
- **Đơn hàng**: Quản lý đơn hàng, cập nhật trạng thái giao hàng
- **Sản phẩm**: Thêm/sửa/xóa sản phẩm (Admin)
- **Bài viết**: Duyệt bài viết, quản lý tin tức
- **Bác sĩ**: Quản lý nhân viên (Admin)

### 💬 Chat Trực Tiếp
- Giao diện chat hiện đại
- Hỗ trợ light/dark mode
- Online indicators
- Tìm kiếm bác sĩ/nhân viên
- Polling tin nhắn mới tự động

### 🌐 Đa Ngôn Ngữ
- Hỗ trợ Tiếng Việt và English
- Chuyển đổi ngôn ngữ dễ dàng
- Translations đầy đủ cho tất cả tính năng

### 🎨 Giao Diện
- Dark mode / Light mode
- Thiết kế responsive (mobile, tablet, desktop)
- Animations mượt mà
- Glassmorphism design

---

## 🛠 Cài Đặt

### Yêu Cầu Hệ Thống
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **MongoDB** >= 6.0 (local hoặc MongoDB Atlas)
- **Git**

### Bước 1: Clone Repository

```bash
git clone https://github.com/your-username/pet-management-system.git
cd pet-management-system
```

### Bước 2: Cài Đặt Backend

```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt dependencies
npm install

# Tạo file .env (hoặc chỉnh sửa file có sẵn)
# Nội dung file .env:
# MONGO_URI=mongodb://localhost:27017/petcare
# JWT_SECRET=your_jwt_secret_key_here
# PORT=5000

# Seed dữ liệu demo (tùy chọn nhưng khuyến khích)
node seed.js

# Khởi động server
npm run dev
```

> ⚠️ Backend chạy tại: `http://localhost:5000`

### Bước 3: Cài Đặt Frontend

```bash
# Mở terminal mới, di chuyển vào thư mục frontend
cd frontend

# Cài đặt dependencies
npm install

# Khởi động development server
npm run dev
```

> ⚠️ Frontend chạy tại: `http://localhost:5173`

### Cài Đặt Nhanh (Windows)

```powershell
# Terminal 1 - Backend
cd backend && npm install && node seed.js && npm run dev

# Terminal 2 - Frontend
cd frontend && npm install && npm run dev
```

---

## 📁 Cấu Trúc Dự Án

```
pet-management-system/
├── 📂 backend/                    # Node.js API Server
│   ├── 📂 config/
│   │   └── db.js                  # Kết nối MongoDB
│   ├── 📂 controllers/
│   │   ├── appointmentController.js
│   │   ├── authController.js
│   │   ├── messageController.js
│   │   ├── newsController.js
│   │   ├── orderController.js
│   │   ├── petController.js
│   │   └── productController.js
│   ├── 📂 middleware/
│   │   └── authMiddleware.js      # JWT authentication
│   ├── 📂 models/
│   │   ├── Appointment.js
│   │   ├── Message.js
│   │   ├── News.js
│   │   ├── Order.js
│   │   ├── Pet.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── 📂 routes/
│   │   ├── appointmentRoutes.js
│   │   ├── authRoutes.js
│   │   ├── messageRoutes.js
│   │   ├── newsRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── petRoutes.js
│   │   └── productRoutes.js
│   ├── 📂 utils/
│   │   └── sendEmail.js
│   ├── .env                       # Environment variables
│   ├── package.json
│   ├── seed.js                    # Demo data seeder
│   └── server.js                  # Entry point
│
├── 📂 frontend/                   # React Application
│   ├── 📂 public/
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── 📂 admin/          # Admin components
│   │   │   └── 📂 common/         # Shared components
│   │   ├── 📂 context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── CartContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── 📂 i18n/
│   │   │   ├── LanguageContext.jsx
│   │   │   └── translations.js
│   │   ├── 📂 pages/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── BookingPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── ChatPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── DoctorsPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── MyPetsPage.jsx
│   │   │   ├── NewsPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── ShopPage.jsx
│   │   ├── 📂 services/
│   │   │   └── api.js             # API client
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Headers
```
Authorization: Bearer <jwt_token>
```

---

### 🔐 Auth Endpoints

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| POST | `/auth/register` | Đăng ký tài khoản mới | ❌ |
| POST | `/auth/login` | Đăng nhập | ❌ |
| GET | `/auth/me` | Lấy thông tin user hiện tại | ✅ |
| PUT | `/auth/profile` | Cập nhật profile | ✅ |
| GET | `/auth/staff` | Lấy danh sách staff | ✅ |
| GET | `/auth/doctors` | Lấy danh sách bác sĩ | ✅ |

**Request Body - Register:**
```json
{
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "password": "password123",
  "phone": "0901234567",
  "address": "123 Đường ABC, Quận 1, TP.HCM"
}
```

---

### 🐕 Pet Endpoints

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/pets` | Lấy danh sách pet của user | ✅ |
| GET | `/pets/:id` | Lấy chi tiết 1 pet | ✅ |
| POST | `/pets` | Thêm pet mới | ✅ |
| PUT | `/pets/:id` | Cập nhật thông tin pet | ✅ |
| DELETE | `/pets/:id` | Xóa pet | ✅ |
| POST | `/pets/:id/medical` | Thêm hồ sơ y tế | ✅ |
| GET | `/pets/reminders/all` | Lấy tất cả nhắc nhở | ✅ |

**Request Body - Create Pet:**
```json
{
  "name": "Buddy",
  "species": "dog",
  "breed": "Golden Retriever",
  "age": 3,
  "weight": 25,
  "gender": "male",
  "avatar": "https://example.com/image.jpg"
}
```

---

### 📅 Appointment Endpoints

| Method | Endpoint | Mô tả | Auth | Role |
|--------|----------|-------|------|------|
| GET | `/appointments` | Lấy danh sách lịch hẹn | ✅ | All |
| GET | `/appointments/:id` | Lấy chi tiết lịch hẹn | ✅ | All |
| POST | `/appointments` | Tạo lịch hẹn mới | ✅ | Customer |
| PUT | `/appointments/:id` | Cập nhật lịch hẹn | ✅ | Staff/Admin |
| DELETE | `/appointments/:id` | Hủy lịch hẹn | ✅ | All |
| GET | `/appointments/available-slots` | Lấy khung giờ trống | ✅ | All |
| GET | `/appointments/today` | Lịch hẹn hôm nay | ✅ | Staff/Admin |
| GET | `/appointments/by-date` | Lịch hẹn theo ngày | ✅ | Staff/Admin |

**Request Body - Create Appointment:**
```json
{
  "pet": "pet_id",
  "service": "checkup",
  "date": "2026-01-20",
  "timeSlot": "09:00-10:00",
  "staff": "staff_id",
  "notes": "Khám định kỳ"
}
```

**Services:**
- `grooming` - Làm đẹp
- `vaccination` - Tiêm phòng
- `checkup` - Khám bệnh
- `surgery` - Phẫu thuật
- `boarding` - Trông giữ
- `training` - Huấn luyện

---

### 🛒 Product Endpoints

| Method | Endpoint | Mô tả | Auth | Role |
|--------|----------|-------|------|------|
| GET | `/products` | Lấy danh sách sản phẩm | ❌ | - |
| GET | `/products/:id` | Lấy chi tiết sản phẩm | ❌ | - |
| GET | `/products/featured` | Sản phẩm nổi bật | ❌ | - |
| GET | `/products/category/:category` | Sản phẩm theo danh mục | ❌ | - |
| POST | `/products` | Thêm sản phẩm | ✅ | Admin |
| PUT | `/products/:id` | Cập nhật sản phẩm | ✅ | Admin |
| DELETE | `/products/:id` | Xóa sản phẩm | ✅ | Admin |

**Categories:**
- `food` - Thức ăn
- `accessory` - Phụ kiện
- `medicine` - Thuốc
- `toy` - Đồ chơi
- `hygiene` - Vệ sinh

---

### 📦 Order Endpoints

| Method | Endpoint | Mô tả | Auth | Role |
|--------|----------|-------|------|------|
| GET | `/orders` | Lấy danh sách đơn hàng | ✅ | All |
| GET | `/orders/:id` | Lấy chi tiết đơn hàng | ✅ | All |
| POST | `/orders` | Tạo đơn hàng mới | ✅ | Customer |
| PUT | `/orders/:id/status` | Cập nhật trạng thái | ✅ | Staff/Admin |
| POST | `/orders/:id/payment` | Xử lý thanh toán | ✅ | Customer |
| PUT | `/orders/:id/cancel` | Hủy đơn hàng | ✅ | All |
| GET | `/orders/stats` | Thống kê đơn hàng | ✅ | Staff/Admin |

**Order Status:**
- `pending` - Chờ xử lý
- `processing` - Đang xử lý
- `shipping` - Đang giao
- `delivered` - Đã giao
- `cancelled` - Đã hủy

---

### 💬 Message Endpoints

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/messages/conversations` | Lấy danh sách cuộc hội thoại | ✅ |
| GET | `/messages/:userId` | Lấy tin nhắn với user | ✅ |
| POST | `/messages` | Gửi tin nhắn | ✅ |
| PUT | `/messages/:userId/read` | Đánh dấu đã đọc | ✅ |
| GET | `/messages/unread/count` | Đếm tin chưa đọc | ✅ |
| GET | `/messages/staff` | Lấy danh sách staff để chat | ✅ |

---

### 📰 News Endpoints

| Method | Endpoint | Mô tả | Auth | Role |
|--------|----------|-------|------|------|
| GET | `/news` | Lấy danh sách bài viết | ❌ | - |
| GET | `/news/:id` | Lấy chi tiết bài viết | ❌ | - |
| GET | `/news/featured` | Bài viết nổi bật | ❌ | - |
| POST | `/news` | Tạo bài viết | ✅ | All |
| PUT | `/news/:id` | Cập nhật bài viết | ✅ | Author/Admin |
| DELETE | `/news/:id` | Xóa bài viết | ✅ | Author/Admin |
| GET | `/news/my-articles` | Bài viết của tôi | ✅ | All |
| GET | `/news/pending` | Bài chờ duyệt | ✅ | Staff/Admin |
| PUT | `/news/:id/approve` | Duyệt bài viết | ✅ | Staff/Admin |
| PUT | `/news/:id/reject` | Từ chối bài viết | ✅ | Staff/Admin |

---

## 🔐 Tài Khoản Demo

Sau khi chạy `node seed.js`, các tài khoản sau sẽ được tạo:

| Role | Email | Password | Quyền hạn |
|------|-------|----------|-----------|
| 👑 Admin | admin@petcare.com | admin123 | Toàn quyền quản lý |
| 👨‍⚕️ Staff | staff@petcare.com | staff123 | Quản lý lịch hẹn, đơn hàng, duyệt bài |
| 👤 Customer | customer@example.com | customer123 | Đặt lịch, mua hàng, chat |

---

## 📸 Screenshots

### 🏠 Trang Chủ
- Hero section với CTA buttons
- Featured services
- Best selling products

### 📅 Đặt Lịch
- Multi-step wizard
- Calendar picker
- Time slot selection

### 🛒 Cửa Hàng
- Product grid với filters
- Shopping cart sidebar
- Checkout flow

### 👨‍💼 Dashboard
- Statistics cards
- Appointment management
- Order tracking

---

## 🎨 Tùy Chỉnh

### Màu Sắc
Chỉnh sửa file `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: { 500: '#06b6d4' },
  secondary: { 500: '#8b5cf6' },
}
```

### Ngôn Ngữ
Thêm translations trong `frontend/src/i18n/translations.js`

### Theme
Chỉnh sửa CSS variables trong `frontend/src/index.css`

---

## 🐛 Troubleshooting

### Lỗi EADDRINUSE (Port đang được sử dụng)
```bash
# Windows
netstat -ano | findstr :5000
taskkill /F /PID <PID>

# Linux/Mac
lsof -i :5000
kill -9 <PID>
```

### Lỗi MongoDB connection
- Kiểm tra MongoDB service đang chạy
- Kiểm tra MONGO_URI trong file .env
- Đảm bảo MongoDB Atlas whitelist IP của bạn

### Lỗi CORS
- Đảm bảo frontend chạy đúng port (5173)
- Kiểm tra CORS config trong server.js

---

## 📝 License

MIT License - Tự do sử dụng cho mục đích học tập và dự án cá nhân!

---

## 👥 Đóng Góp

Mọi đóng góp đều được chào đón! Vui lòng:

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

---

<div align="center">

**Built with ❤️ for pet lovers everywhere 🐾**

[⬆ Về đầu trang](#-pet-care-pro---hệ-thống-quản-lý-thú-cưng)

</div>
