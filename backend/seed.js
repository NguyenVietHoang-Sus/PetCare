const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load models
const User = require('./models/User');
const Pet = require('./models/Pet');
const Product = require('./models/Product');
const Appointment = require('./models/Appointment');
const News = require('./models/News');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        console.log('Clearing existing data...');
        await User.deleteMany({});
        await Pet.deleteMany({});
        await Product.deleteMany({});
        await Appointment.deleteMany({});
        await News.deleteMany({});

        // Create Users
        console.log('Creating users...');
        // Note: Don't hash password here - User model pre-save hook will handle it
        const plainPassword = '123456';

        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@petcare.com',
            password: plainPassword,
            role: 'admin',
            phone: '0901234567',
            address: '123 Đường Nguyễn Huệ, Quận 1, TP.HCM',
            specialization: 'Quản lý hệ thống',
            experience: 10,
            bio: 'Quản trị viên hệ thống Pet Care Pro'
        });

        const doctor1 = await User.create({
            name: 'BS. Nguyễn Văn An',
            email: 'doctor1@petcare.com',
            password: plainPassword,
            role: 'staff',
            phone: '0901234568',
            address: '456 Đường Lê Lợi, Quận 1, TP.HCM',
            specialization: 'Nội khoa thú cưng',
            experience: 8,
            bio: 'Chuyên gia về nội khoa và chẩn đoán bệnh cho chó mèo',
            avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop'
        });

        const doctor2 = await User.create({
            name: 'BS. Trần Thị Bình',
            email: 'doctor2@petcare.com',
            password: plainPassword,
            role: 'staff',
            phone: '0901234569',
            address: '789 Đường Hai Bà Trưng, Quận 3, TP.HCM',
            specialization: 'Phẫu thuật thú cưng',
            experience: 12,
            bio: 'Chuyên gia phẫu thuật và chăm sóc sau phẫu thuật',
            avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop'
        });

        const customer1 = await User.create({
            name: 'Nguyễn Minh Châu',
            email: 'customer1@gmail.com',
            password: plainPassword,
            role: 'customer',
            phone: '0909876543',
            address: '101 Đường CMT8, Quận 10, TP.HCM'
        });

        const customer2 = await User.create({
            name: 'Lê Hoàng Dũng',
            email: 'customer2@gmail.com',
            password: plainPassword,
            role: 'customer',
            phone: '0909876544',
            address: '202 Đường Cộng Hòa, Tân Bình, TP.HCM'
        });

        console.log('Users created!');

        // Create Pets
        console.log('Creating pets...');
        const pet1 = await Pet.create({
            owner: customer1._id,
            name: 'Lucky',
            species: 'dog',
            breed: 'Golden Retriever',
            age: 3,
            weight: 28,
            gender: 'male',
            avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop',
            medicalHistory: [
                {
                    date: new Date('2025-12-15'),
                    type: 'vaccination',
                    description: 'Tiêm vaccine 5 bệnh',
                    veterinarian: 'BS. Nguyễn Văn An',
                    nextDueDate: new Date('2026-12-15')
                }
            ]
        });

        const pet2 = await Pet.create({
            owner: customer1._id,
            name: 'Miu',
            species: 'cat',
            breed: 'British Shorthair',
            age: 2,
            weight: 4.5,
            gender: 'female',
            avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop'
        });

        const pet3 = await Pet.create({
            owner: customer2._id,
            name: 'Buddy',
            species: 'dog',
            breed: 'Labrador',
            age: 5,
            weight: 32,
            gender: 'male',
            avatar: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop'
        });

        console.log('Pets created!');

        // Create Products
        console.log('Creating products...');
        const products = await Product.insertMany([
            {
                name: 'Thức ăn cho chó trưởng thành Royal Canin 10kg',
                description: 'Thức ăn cao cấp cho chó trưởng thành, giàu dinh dưỡng và dễ tiêu hóa',
                price: 450000,
                originalPrice: 500000,
                category: 'food',
                stock: 50,
                isFeatured: true,
                images: ['https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop']
            },
            {
                name: 'Thức ăn cho mèo Whiskas vị cá ngừ',
                description: 'Thức ăn hạt cho mèo với hương vị cá ngừ thơm ngon',
                price: 180000,
                category: 'food',
                stock: 100,
                images: ['https://images.unsplash.com/photo-1600279475050-b08e95e81b1a?w=400&h=400&fit=crop']
            },
            {
                name: 'Vòng cổ da cao cấp cho chó',
                description: 'Vòng cổ da thật, bền đẹp, phù hợp với chó cỡ vừa và lớn',
                price: 150000,
                category: 'accessory',
                stock: 30,
                isFeatured: true,
                images: ['https://images.unsplash.com/photo-1599839619722-0bba4a32abab?w=400&h=400&fit=crop']
            },
            {
                name: 'Tháp cào móng cho mèo',
                description: 'Tháp cào móng cao cấp với nhiều tầng cho mèo leo trèo',
                price: 450000,
                originalPrice: 550000,
                category: 'accessory',
                stock: 15,
                images: ['https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400&h=400&fit=crop']
            },
            {
                name: 'Bóng đồ chơi tương tác cho chó',
                description: 'Bóng cao su bền, an toàn cho chó chơi và cắn',
                price: 85000,
                category: 'toy',
                stock: 60,
                isFeatured: true,
                images: ['https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=400&fit=crop']
            },
            {
                name: 'Dầu gội dịu nhẹ cho thú cưng 500ml',
                description: 'Dầu gội thảo mộc an toàn, không gây kích ứng da',
                price: 95000,
                category: 'hygiene',
                stock: 45,
                isFeatured: true,
                images: ['https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?w=400&h=400&fit=crop']
            },
            {
                name: 'Thuốc nhỏ gáy trị ve bọ chét',
                description: 'Hiệu quả trong 30 ngày, an toàn cho chó mèo trên 2 tháng tuổi',
                price: 220000,
                category: 'medicine',
                stock: 40,
                images: ['https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop']
            },
            {
                name: 'Vitamin bổ sung cho thú cưng',
                description: 'Bổ sung vitamin và khoáng chất cần thiết cho sức khỏe thú cưng',
                price: 350000,
                category: 'medicine',
                stock: 20,
                isFeatured: true,
                images: ['https://images.unsplash.com/photo-1550831107-1553da8c8464?w=400&h=400&fit=crop']
            }
        ]);

        console.log('Products created!');

        // Create Appointments
        console.log('Creating appointments...');
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        await Appointment.insertMany([
            {
                customer: customer1._id,
                pet: pet1._id,
                staff: doctor1._id,
                service: 'checkup',
                date: today,
                timeSlot: '09:00-10:00',
                status: 'confirmed',
                notes: 'Khám sức khỏe định kỳ'
            },
            {
                customer: customer1._id,
                pet: pet2._id,
                staff: doctor2._id,
                service: 'vaccination',
                date: today,
                timeSlot: '14:00-15:00',
                status: 'pending',
                notes: 'Tiêm vaccine cho mèo'
            },
            {
                customer: customer2._id,
                pet: pet3._id,
                staff: doctor1._id,
                service: 'grooming',
                date: tomorrow,
                timeSlot: '10:00-11:00',
                status: 'pending',
                notes: 'Tắm và cắt tỉa lông'
            }
        ]);

        console.log('Appointments created!');

        // Create News Articles
        console.log('Creating news articles...');
        await News.insertMany([
            {
                title: 'Cách chăm sóc thú cưng mùa đông',
                content: 'Mùa đông là thời điểm thú cưng cần được chăm sóc đặc biệt. Hãy đảm bảo chúng có chỗ ở ấm áp, chế độ ăn uống đầy đủ dinh dưỡng và được vận động hợp lý. Tránh để thú cưng ra ngoài quá lâu trong thời tiết lạnh.',
                summary: 'Những tips hữu ích giúp thú cưng của bạn khỏe mạnh trong mùa lạnh',
                image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=400&fit=crop',
                author: doctor1._id,
                category: 'care',
                status: 'approved',
                isPublished: true,
                approvedBy: admin._id,
                approvedAt: new Date(),
                views: 1250
            },
            {
                title: 'Chế độ dinh dưỡng cho chó con',
                content: 'Chó con cần được cho ăn thức ăn chuyên dụng với hàm lượng protein và canxi cao để phát triển xương và cơ bắp. Nên cho ăn 3-4 bữa nhỏ mỗi ngày và luôn có nước sạch.',
                summary: 'Hướng dẫn chi tiết về chế độ ăn uống phù hợp cho chó con',
                image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&h=400&fit=crop',
                author: doctor2._id,
                category: 'nutrition',
                status: 'approved',
                isPublished: true,
                approvedBy: admin._id,
                approvedAt: new Date(),
                views: 890
            },
            {
                title: 'Phòng ngừa bệnh cho mèo',
                content: 'Để mèo luôn khỏe mạnh, cần tiêm vaccine định kỳ, tẩy giun thường xuyên và giữ môi trường sống sạch sẽ. Nếu mèo có dấu hiệu bất thường, hãy đưa đến bác sĩ thú y ngay.',
                summary: 'Các bệnh thường gặp ở mèo và cách phòng ngừa hiệu quả',
                image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=400&fit=crop',
                author: doctor1._id,
                category: 'health',
                status: 'approved',
                isPublished: true,
                approvedBy: admin._id,
                approvedAt: new Date(),
                views: 2100
            },
            {
                title: 'Huấn luyện chó cơ bản',
                content: 'Huấn luyện chó nên bắt đầu từ khi còn nhỏ với các lệnh cơ bản như ngồi, nằm, đứng yên. Sử dụng phương pháp khen thưởng tích cực và kiên nhẫn trong quá trình huấn luyện.',
                summary: 'Các kỹ thuật huấn luyện chó cơ bản cho người mới nuôi',
                image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&h=400&fit=crop',
                author: doctor2._id,
                category: 'training',
                status: 'approved',
                isPublished: true,
                approvedBy: admin._id,
                approvedAt: new Date(),
                views: 1560
            },
            {
                title: 'Khai trương chi nhánh mới tại Quận 7',
                content: 'Pet Care Pro vui mừng thông báo khai trương chi nhánh mới tại Quận 7 với đầy đủ dịch vụ khám chữa bệnh, spa và shop. Chương trình ưu đãi 20% cho 100 khách hàng đầu tiên.',
                summary: 'Pet Care Pro khai trương chi nhánh mới với nhiều ưu đãi',
                image: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800&h=400&fit=crop',
                author: admin._id,
                category: 'news',
                status: 'approved',
                isPublished: true,
                approvedBy: admin._id,
                approvedAt: new Date(),
                views: 3200
            }
        ]);

        console.log('News articles created!');

        console.log('\n========================================');
        console.log('✅ Seed data created successfully!');
        console.log('========================================');
        console.log('\n📧 Tài khoản đăng nhập:');
        console.log('  Admin: admin@petcare.com / 123456');
        console.log('  Bác sĩ 1: doctor1@petcare.com / 123456');
        console.log('  Bác sĩ 2: doctor2@petcare.com / 123456');
        console.log('  Khách hàng 1: customer1@gmail.com / 123456');
        console.log('  Khách hàng 2: customer2@gmail.com / 123456');
        console.log('========================================\n');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
