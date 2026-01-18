import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiCalendar, FiEye, FiArrowLeft, FiUser, FiClock, FiEdit3, FiBookmark, FiShare2, FiHeart, FiMessageCircle, FiTrendingUp } from 'react-icons/fi';
import { format } from 'date-fns';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { newsAPI } from '../services/api';
import { Spinner, Badge, Modal } from '../components/common/UI';
import ImageUpload from '../components/common/ImageUpload';
import toast from 'react-hot-toast';

// Placeholder images for news - uses local images from public folder
const newsImages = [
    '/images/news/pet-care-1.jpg',
    '/images/news/pet-care-2.jpg',
    '/images/news/pet-health-1.jpg',
    '/images/news/pet-nutrition-1.jpg',
    '/images/news/pet-training-1.jpg',
    '/images/news/pet-news-1.jpg'
];

const categories = {
    en: [
        { value: 'all', label: 'All', icon: '📚', color: 'from-violet-500 to-purple-600' },
        { value: 'health', label: 'Health', icon: '❤️', color: 'from-red-500 to-pink-500' },
        { value: 'nutrition', label: 'Nutrition', icon: '🥗', color: 'from-green-500 to-emerald-500' },
        { value: 'care', label: 'Care Tips', icon: '🛁', color: 'from-cyan-500 to-blue-500' },
        { value: 'training', label: 'Training', icon: '🎓', color: 'from-yellow-500 to-orange-500' },
        { value: 'news', label: 'News', icon: '📰', color: 'from-indigo-500 to-purple-500' }
    ],
    vi: [
        { value: 'all', label: 'Tất cả', icon: '📚', color: 'from-violet-500 to-purple-600' },
        { value: 'health', label: 'Sức khỏe', icon: '❤️', color: 'from-red-500 to-pink-500' },
        { value: 'nutrition', label: 'Dinh dưỡng', icon: '🥗', color: 'from-green-500 to-emerald-500' },
        { value: 'care', label: 'Mẹo chăm sóc', icon: '🛁', color: 'from-cyan-500 to-blue-500' },
        { value: 'training', label: 'Huấn luyện', icon: '🎓', color: 'from-yellow-500 to-orange-500' },
        { value: 'news', label: 'Tin tức', icon: '📰', color: 'from-indigo-500 to-purple-500' }
    ]
};

const mockNews = [
    {
        _id: '1',
        title: 'Cách chăm sóc thú cưng mùa đông',
        titleEn: 'How to Care for Pets in Winter',
        summary: 'Những tips hữu ích giúp thú cưng của bạn khỏe mạnh trong mùa lạnh',
        summaryEn: 'Useful tips to keep your pet healthy during cold season',
        content: 'Nội dung chi tiết về cách chăm sóc thú cưng mùa đông...',
        category: 'care',
        views: 1250,
        likes: 89,
        comments: 23,
        readTime: 5,
        createdAt: new Date('2026-01-15'),
        author: { name: 'BS. Nguyễn Văn An', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop' }
    },
    {
        _id: '2',
        title: 'Chế độ dinh dưỡng cho chó con',
        titleEn: 'Nutrition Guide for Puppies',
        summary: 'Hướng dẫn chi tiết về chế độ ăn uống phù hợp cho chó con',
        summaryEn: 'Detailed guide on proper diet for puppies',
        content: 'Nội dung chi tiết về dinh dưỡng cho chó con...',
        category: 'nutrition',
        views: 890,
        likes: 67,
        comments: 15,
        readTime: 7,
        createdAt: new Date('2026-01-14'),
        author: { name: 'BS. Trần Thị Bình', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop' }
    },
    {
        _id: '3',
        title: 'Phòng ngừa bệnh cho mèo',
        titleEn: 'Preventing Diseases in Cats',
        summary: 'Các bệnh thường gặp ở mèo và cách phòng ngừa hiệu quả',
        summaryEn: 'Common cat diseases and effective prevention methods',
        content: 'Nội dung chi tiết về phòng ngừa bệnh cho mèo...',
        category: 'health',
        views: 2100,
        likes: 156,
        comments: 42,
        readTime: 6,
        createdAt: new Date('2026-01-13'),
        author: { name: 'BS. Nguyễn Văn An', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop' }
    },
    {
        _id: '4',
        title: 'Huấn luyện chó cơ bản',
        titleEn: 'Basic Dog Training',
        summary: 'Các kỹ thuật huấn luyện chó cơ bản cho người mới nuôi',
        summaryEn: 'Basic dog training techniques for new pet owners',
        content: 'Nội dung chi tiết về huấn luyện chó...',
        category: 'training',
        views: 1560,
        likes: 98,
        comments: 31,
        readTime: 8,
        createdAt: new Date('2026-01-12'),
        author: { name: 'Trainer Minh Đức', avatar: '' }
    },
    {
        _id: '5',
        title: 'Khai trương chi nhánh mới',
        titleEn: 'New Branch Opening',
        summary: 'Pet Care Pro khai trương chi nhánh mới tại Quận 7',
        summaryEn: 'Pet Care Pro opens new branch in District 7',
        content: 'Nội dung chi tiết về khai trương...',
        category: 'news',
        views: 3200,
        likes: 234,
        comments: 56,
        readTime: 3,
        createdAt: new Date('2026-01-10'),
        author: { name: 'Admin', avatar: '' }
    }
];

const NewsPage = () => {
    const { t, language } = useLanguage();
    const { user, isAuthenticated, isStaff } = useAuth();
    const { isDark } = useTheme();
    const { id } = useParams();
    const [news, setNews] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Article writing state
    const [showWriteModal, setShowWriteModal] = useState(false);
    const [articleForm, setArticleForm] = useState({
        title: '',
        summary: '',
        content: '',
        category: 'care',
        image: ''
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (id) {
            fetchNewsDetail(id);
        } else {
            fetchNews();
        }
    }, [id, selectedCategory, currentPage]);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const response = await newsAPI.getAll({
                category: selectedCategory,
                page: currentPage
            });
            let newsData = response.data.news || [];

            // Enrich with images if missing
            newsData = newsData.map((item, index) => ({
                ...item,
                image: item.image || newsImages[index % newsImages.length],
                readTime: item.readTime || Math.floor(Math.random() * 8) + 3,
                likes: item.likes || Math.floor(Math.random() * 200),
                comments: item.comments || Math.floor(Math.random() * 50)
            }));

            setNews(newsData);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error('Error fetching news:', error);
            // Use mock data
            const filteredMock = selectedCategory === 'all'
                ? mockNews
                : mockNews.filter(n => n.category === selectedCategory);
            setNews(filteredMock.map((item, index) => ({
                ...item,
                image: newsImages[index % newsImages.length],
                title: language === 'en' ? item.titleEn : item.title,
                summary: language === 'en' ? item.summaryEn : item.summary
            })));
        } finally {
            setLoading(false);
        }
    };

    const fetchNewsDetail = async (newsId) => {
        setLoading(true);
        try {
            const response = await newsAPI.getOne(newsId);
            setSelectedNews(response.data.news);
        } catch (error) {
            console.error('Error fetching news detail:', error);
            // Use mock data
            const mockItem = mockNews.find(n => n._id === newsId);
            if (mockItem) {
                setSelectedNews({
                    ...mockItem,
                    image: newsImages[0],
                    title: language === 'en' ? mockItem.titleEn : mockItem.title,
                    summary: language === 'en' ? mockItem.summaryEn : mockItem.summary
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitArticle = async (e) => {
        e.preventDefault();
        if (!articleForm.title || !articleForm.summary || !articleForm.content) {
            toast.error(language === 'en' ? 'Please fill all required fields' : 'Vui lòng điền đầy đủ thông tin');
            return;
        }

        setSubmitting(true);
        try {
            await newsAPI.create({
                ...articleForm,
                status: isStaff ? 'published' : 'pending'
            });
            toast.success(
                isStaff
                    ? (language === 'en' ? 'Article published!' : 'Bài viết đã được đăng!')
                    : (language === 'en' ? 'Article submitted for review!' : 'Bài viết đã gửi chờ duyệt!')
            );
            setShowWriteModal(false);
            setArticleForm({ title: '', summary: '', content: '', category: 'care', image: '' });
            fetchNews();
        } catch (error) {
            console.error('Error creating article:', error);
            toast.error(language === 'en' ? 'Failed to submit article' : 'Không thể gửi bài viết');
        } finally {
            setSubmitting(false);
        }
    };

    const getCategoryLabel = (categoryValue) => {
        const cat = categories[language].find(c => c.value === categoryValue);
        return cat ? cat.label : categoryValue;
    };

    const getCategoryData = (categoryValue) => {
        return categories[language].find(c => c.value === categoryValue) || categories[language][0];
    };

    // Get news image with fallback to placeholder
    const getNewsImage = (item, index = 0) => {
        if (item.image) {
            return item.image;
        }
        // Try local news images first, then fallback to placeholder
        if (newsImages[index % newsImages.length]) {
            return newsImages[index % newsImages.length];
        }
        return '/images/news/placeholder-news.svg';
    };

    if (loading) {
        return (
            <div className={`min-h-screen ${isDark ? 'bg-dark-300' : 'bg-gray-50'} flex items-center justify-center pt-20`}>
                <Spinner size="lg" />
            </div>
        );
    }

    // News detail view
    if (id && selectedNews) {
        return (
            <div className={`min-h-screen ${isDark ? 'bg-dark-300' : 'bg-gray-50'} pt-20 pb-12 transition-colors duration-300`}>
                {/* Hero Image */}
                <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
                    <img
                        src={getNewsImage(selectedNews)}
                        alt={selectedNews.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/news/placeholder-news.svg';
                        }}
                    />
                    <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-dark-300 via-dark-300/50 to-transparent' : 'bg-gradient-to-t from-white via-white/50 to-transparent'}`} />

                    {/* Back Button */}
                    <Link
                        to="/news"
                        className={`absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md transition-all ${isDark ? 'bg-dark-300/50 text-white hover:bg-dark-300/70' : 'bg-white/50 text-gray-900 hover:bg-white/70'
                            }`}
                    >
                        <FiArrowLeft className="w-5 h-5" />
                        {language === 'en' ? 'Back' : 'Quay lại'}
                    </Link>
                </div>

                {/* Content */}
                <div className="container-custom max-w-4xl -mt-32 relative z-10">
                    <article className={`rounded-3xl overflow-hidden ${isDark ? 'bg-dark-200 border border-white/10' : 'bg-white border border-gray-100 shadow-xl'}`}>
                        <div className="p-8 md:p-12">
                            {/* Category & Meta */}
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <span className={`px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${getCategoryData(selectedNews.category).color} text-white`}>
                                    {getCategoryData(selectedNews.category).icon} {getCategoryLabel(selectedNews.category)}
                                </span>
                                <div className={`flex items-center gap-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <span className="flex items-center gap-1">
                                        <FiCalendar className="w-4 h-4" />
                                        {format(new Date(selectedNews.createdAt), 'dd/MM/yyyy')}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FiEye className="w-4 h-4" />
                                        {selectedNews.views} {language === 'en' ? 'views' : 'lượt xem'}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FiClock className="w-4 h-4" />
                                        {selectedNews.readTime || 5} {language === 'en' ? 'min read' : 'phút đọc'}
                                    </span>
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {selectedNews.title}
                            </h1>

                            {/* Author */}
                            {selectedNews.author && (
                                <div className={`flex items-center gap-4 pb-8 mb-8 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                                    <div className={`w-12 h-12 rounded-full overflow-hidden ${isDark ? 'bg-primary-500/20' : 'bg-primary-100'} flex items-center justify-center`}>
                                        {selectedNews.author.avatar ? (
                                            <img src={selectedNews.author.avatar} alt={selectedNews.author.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <FiUser className={`w-6 h-6 ${isDark ? 'text-primary-400' : 'text-primary-600'}`} />
                                        )}
                                    </div>
                                    <div>
                                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedNews.author.name}</p>
                                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {language === 'en' ? 'Author' : 'Tác giả'}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Summary */}
                            <p className={`text-xl leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                {selectedNews.summary}
                            </p>

                            {/* Content */}
                            <div className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
                                <div className={`leading-relaxed whitespace-pre-line ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {selectedNews.content || (language === 'en'
                                        ? 'Full article content would appear here with detailed information about the topic, including tips, recommendations, and expert advice for pet owners.\n\nThis comprehensive guide covers everything you need to know about caring for your beloved pet. From daily routines to special care requirements, we\'ve got you covered.\n\nRemember to consult with a veterinarian for specific health concerns about your pet.'
                                        : 'Nội dung chi tiết của bài viết sẽ xuất hiện ở đây với thông tin đầy đủ về chủ đề, bao gồm các mẹo, khuyến nghị và lời khuyên chuyên gia dành cho chủ nuôi thú cưng.\n\nHướng dẫn toàn diện này bao gồm mọi thứ bạn cần biết về việc chăm sóc thú cưng yêu quý của mình. Từ thói quen hàng ngày đến các yêu cầu chăm sóc đặc biệt, chúng tôi đều có.\n\nHãy nhớ tham khảo ý kiến bác sĩ thú y nếu có vấn đề sức khỏe cụ thể về thú cưng của bạn.'
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className={`flex items-center justify-between mt-12 pt-8 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                                <div className="flex items-center gap-4">
                                    <button className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${isDark ? 'bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400' : 'bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-500'}`}>
                                        <FiHeart className="w-5 h-5" />
                                        <span>{selectedNews.likes || 0}</span>
                                    </button>
                                    <button className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${isDark ? 'bg-white/5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400' : 'bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-500'}`}>
                                        <FiMessageCircle className="w-5 h-5" />
                                        <span>{selectedNews.comments || 0}</span>
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className={`p-2 rounded-xl transition-all ${isDark ? 'bg-white/5 hover:bg-white/10 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>
                                        <FiBookmark className="w-5 h-5" />
                                    </button>
                                    <button className={`p-2 rounded-xl transition-all ${isDark ? 'bg-white/5 hover:bg-white/10 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>
                                        <FiShare2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        );
    }

    // News list view
    const featuredNews = news[0];
    const otherNews = news.slice(1);

    return (
        <div className={`min-h-screen ${isDark ? 'bg-dark-300' : 'bg-gray-50'} pt-20 pb-12 transition-colors duration-300`}>
            {/* Hero Header */}
            <div className="relative overflow-hidden">
                <div className={`${isDark ? 'bg-gradient-to-br from-primary-900/30 via-dark-300 to-secondary-900/30' : 'bg-gradient-to-br from-primary-50 via-white to-secondary-50'} py-16`}>
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
                    </div>
                    <div className="container-custom relative z-10 text-center">
                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${isDark ? 'bg-primary-500/20 text-primary-400' : 'bg-primary-100 text-primary-600'}`}>
                            <FiTrendingUp className="w-4 h-4" />
                            {language === 'en' ? 'Latest Updates' : 'Cập nhật mới nhất'}
                        </span>
                        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {language === 'en' ? 'Pet Care News' : 'Tin Tức Thú Cưng'}
                        </h1>
                        <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {language === 'en'
                                ? 'Stay updated with the latest pet care tips, health guides, and expert advice'
                                : 'Cập nhật những mẹo chăm sóc thú cưng, hướng dẫn sức khỏe và lời khuyên chuyên gia'}
                        </p>

                        {/* Write Article Button */}
                        {isAuthenticated && (
                            <button
                                onClick={() => setShowWriteModal(true)}
                                className="mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium flex items-center gap-2 mx-auto hover:shadow-lg hover:shadow-primary-500/25 transition-all"
                            >
                                <FiEdit3 className="w-5 h-5" />
                                {language === 'en' ? 'Write Article' : 'Viết bài'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="container-custom mt-8">
                {/* Categories */}
                <div className="mb-12 animate-fade-in-up">
                    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                        {categories[language].map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => {
                                    setSelectedCategory(cat.value);
                                    setCurrentPage(1);
                                }}
                                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium transition-all duration-300 whitespace-nowrap ${selectedCategory === cat.value
                                    ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                                    : isDark
                                        ? 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm'
                                    }`}
                            >
                                <span className="text-xl">{cat.icon}</span>
                                <span>{cat.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured Article */}
                {featuredNews && (
                    <Link
                        to={`/news/${featuredNews._id}`}
                        className={`block mb-12 rounded-3xl overflow-hidden group animate-fade-in-up ${isDark ? 'bg-dark-200 border border-white/5' : 'bg-white border border-gray-100 shadow-lg'
                            }`}
                    >
                        <div className="grid md:grid-cols-2 gap-0">
                            <div className="relative h-64 md:h-auto overflow-hidden">
                                <img
                                    src={getNewsImage(featuredNews, 0)}
                                    alt={featuredNews.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/images/news/placeholder-news.svg';
                                    }}
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                                        ⭐ {language === 'en' ? 'Featured' : 'Nổi bật'}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 flex flex-col justify-center">
                                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 w-fit bg-gradient-to-r ${getCategoryData(featuredNews.category).color} text-white`}>
                                    {getCategoryData(featuredNews.category).icon} {getCategoryLabel(featuredNews.category)}
                                </span>
                                <h2 className={`text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary-500 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {featuredNews.title}
                                </h2>
                                <p className={`mb-6 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {featuredNews.summary}
                                </p>
                                <div className={`flex items-center gap-6 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    <span className="flex items-center gap-1">
                                        <FiClock className="w-4 h-4" />
                                        {featuredNews.readTime || 5} {language === 'en' ? 'min' : 'phút'}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FiEye className="w-4 h-4" />
                                        {featuredNews.views}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FiHeart className="w-4 h-4" />
                                        {featuredNews.likes || 0}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                )}

                {/* News Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherNews.map((item, index) => (
                        <Link
                            key={item._id}
                            to={`/news/${item._id}`}
                            className={`group rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl animate-fade-in-up ${isDark
                                ? 'bg-dark-200 border border-white/5 hover:border-primary-500/30'
                                : 'bg-white border border-gray-100 hover:border-primary-200 shadow-sm'
                                }`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={getNewsImage(item, index)}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/images/news/placeholder-news.svg';
                                    }}
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-dark-200' : 'from-white'} via-transparent to-transparent opacity-60`} />
                                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryData(item.category).color} text-white`}>
                                    {getCategoryData(item.category).icon} {getCategoryLabel(item.category)}
                                </span>
                            </div>
                            <div className="p-5">
                                <div className={`flex items-center gap-3 mb-3 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    <span className="flex items-center gap-1">
                                        <FiClock className="w-3.5 h-3.5" />
                                        {item.readTime || 5} {language === 'en' ? 'min' : 'phút'}
                                    </span>
                                    <span>•</span>
                                    <span>{format(new Date(item.createdAt), 'dd/MM/yyyy')}</span>
                                </div>
                                <h3 className={`text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {item.title}
                                </h3>
                                <p className={`text-sm line-clamp-2 mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {item.summary}
                                </p>
                                <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                                    <div className="flex items-center gap-2">
                                        {item.author?.avatar ? (
                                            <img src={item.author.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                                        ) : (
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isDark ? 'bg-primary-500/20' : 'bg-primary-100'}`}>
                                                <FiUser className={`w-3 h-3 ${isDark ? 'text-primary-400' : 'text-primary-600'}`} />
                                            </div>
                                        )}
                                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {item.author?.name || 'Admin'}
                                        </span>
                                    </div>
                                    <div className={`flex items-center gap-3 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                        <span className="flex items-center gap-1">
                                            <FiEye className="w-3.5 h-3.5" />
                                            {item.views}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <FiHeart className="w-3.5 h-3.5" />
                                            {item.likes || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 mt-12">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 ${currentPage === i + 1
                                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                                    : isDark
                                        ? 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Write Article Modal */}
            <Modal
                isOpen={showWriteModal}
                onClose={() => setShowWriteModal(false)}
                title={language === 'en' ? 'Write New Article' : 'Viết bài mới'}
                size="lg"
            >
                <form onSubmit={handleSubmitArticle} className="space-y-4">
                    {!isStaff && (
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-100 text-yellow-800'} text-sm`}>
                            ℹ️ {language === 'en'
                                ? 'Your article will be reviewed before publishing.'
                                : 'Bài viết của bạn sẽ được duyệt trước khi đăng.'}
                        </div>
                    )}

                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {language === 'en' ? 'Title' : 'Tiêu đề'} *
                        </label>
                        <input
                            type="text"
                            value={articleForm.title}
                            onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                            className={`w-full px-4 py-3 rounded-xl border transition-all ${isDark
                                ? 'bg-white/5 border-white/10 text-white focus:border-primary-500'
                                : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-primary-500'
                                }`}
                            placeholder={language === 'en' ? 'Enter article title...' : 'Nhập tiêu đề bài viết...'}
                            required
                        />
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {language === 'en' ? 'Category' : 'Danh mục'} *
                        </label>
                        <select
                            value={articleForm.category}
                            onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                            className={`w-full px-4 py-3 rounded-xl border transition-all cursor-pointer ${isDark
                                ? 'bg-white/5 border-white/10 text-white'
                                : 'bg-gray-50 border-gray-200 text-gray-900'
                                }`}
                        >
                            {categories[language].filter(c => c.value !== 'all').map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.icon} {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {language === 'en' ? 'Summary' : 'Tóm tắt'} *
                        </label>
                        <textarea
                            value={articleForm.summary}
                            onChange={(e) => setArticleForm({ ...articleForm, summary: e.target.value })}
                            className={`w-full px-4 py-3 rounded-xl border transition-all resize-none ${isDark
                                ? 'bg-white/5 border-white/10 text-white focus:border-primary-500'
                                : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-primary-500'
                                }`}
                            rows={2}
                            placeholder={language === 'en' ? 'Brief summary of the article...' : 'Tóm tắt ngắn gọn về bài viết...'}
                            required
                        />
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {language === 'en' ? 'Content' : 'Nội dung'} *
                        </label>
                        <textarea
                            value={articleForm.content}
                            onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                            className={`w-full px-4 py-3 rounded-xl border transition-all resize-none ${isDark
                                ? 'bg-white/5 border-white/10 text-white focus:border-primary-500'
                                : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-primary-500'
                                }`}
                            rows={8}
                            placeholder={language === 'en' ? 'Write your article content here...' : 'Viết nội dung bài viết tại đây...'}
                            required
                        />
                    </div>

                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {language === 'en' ? 'Cover Image' : 'Ảnh bìa'}
                        </label>
                        <ImageUpload
                            onImageSelect={(file, preview) => setArticleForm({ ...articleForm, image: preview, imageFile: file })}
                            currentImage={articleForm.image}
                            placeholder={language === 'en' ? 'Select image from computer' : 'Chọn ảnh từ máy tính'}
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50"
                            disabled={submitting}
                        >
                            {submitting ? (
                                <Spinner size="sm" />
                            ) : (
                                <>
                                    <FiEdit3 className="w-5 h-5" />
                                    {isStaff
                                        ? (language === 'en' ? 'Publish' : 'Đăng bài')
                                        : (language === 'en' ? 'Submit for Review' : 'Gửi chờ duyệt')}
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowWriteModal(false)}
                            className={`px-6 py-3 rounded-xl font-medium transition-all ${isDark ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {language === 'en' ? 'Cancel' : 'Hủy'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default NewsPage;
