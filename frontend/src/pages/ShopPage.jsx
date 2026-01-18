import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiGrid, FiList, FiShoppingCart, FiHeart, FiSearch, FiX, FiStar, FiTruck, FiShield, FiPercent } from 'react-icons/fi';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { productAPI } from '../services/api';
import toast from 'react-hot-toast';

const categories = [
    { id: 'all', icon: '🛍️', color: 'from-violet-500 to-purple-600' },
    { id: 'food', icon: '🍖', color: 'from-orange-500 to-red-500' },
    { id: 'accessory', icon: '🎀', color: 'from-pink-500 to-rose-500' },
    { id: 'medicine', icon: '💊', color: 'from-green-500 to-emerald-500' },
    { id: 'toy', icon: '🎾', color: 'from-yellow-500 to-amber-500' },
    { id: 'hygiene', icon: '🧴', color: 'from-cyan-500 to-blue-500' },
];

const ShopPage = () => {
    const { t, language } = useLanguage();
    const { isDark } = useTheme();
    const { addToCart } = useCart();
    const [searchParams, setSearchParams] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
    const [sortBy, setSortBy] = useState('newest');
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchProducts();
    }, [activeCategory, sortBy]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = {
                sort: sortBy,
                ...(activeCategory !== 'all' && { category: activeCategory }),
            };
            const response = await productAPI.getAll(params);
            setProducts(response.data.products || []);
        } catch (error) {
            console.error('Error fetching products:', error);
            const allProducts = [
                { _id: '1', name: language === 'en' ? 'Royal Canin Adult Dog Food 10kg' : 'Thức ăn cho chó trưởng thành Royal Canin 10kg', category: 'food', price: 450000, originalPrice: 500000, stock: 50, isFeatured: true, rating: 4.8, soldCount: 120, images: ['/images/products/dog-food-1.jpg'] },
                { _id: '2', name: language === 'en' ? 'Whiskas Cat Food Tuna Flavor' : 'Thức ăn cho mèo Whiskas vị cá ngừ', category: 'food', price: 180000, stock: 100, rating: 4.5, soldCount: 85, images: ['/images/products/cat-food-1.jpg'] },
                { _id: '3', name: language === 'en' ? 'Premium Leather Dog Collar' : 'Vòng cổ da cao cấp cho chó', category: 'accessory', price: 150000, stock: 30, isFeatured: true, rating: 4.7, soldCount: 65, images: ['/images/products/collar-1.jpg'] },
                { _id: '4', name: language === 'en' ? 'Cat Scratching Post Tower' : 'Tháp cào móng cho mèo', category: 'accessory', price: 450000, originalPrice: 550000, stock: 15, rating: 4.6, soldCount: 42, images: ['/images/products/cat-tower-1.jpg'] },
                { _id: '5', name: language === 'en' ? 'Interactive Dog Ball Toy' : 'Bóng đồ chơi tương tác cho chó', category: 'toy', price: 85000, stock: 60, isFeatured: true, rating: 4.9, soldCount: 200, images: ['/images/products/dog-toy-1.jpg'] },
                { _id: '6', name: language === 'en' ? 'Feather Wand Cat Toy Set' : 'Bộ đồ chơi gậy lông vũ cho mèo', category: 'toy', price: 55000, stock: 80, rating: 4.4, soldCount: 150, images: ['/images/products/cat-toy-1.jpg'] },
                { _id: '7', name: language === 'en' ? 'Flea & Tick Prevention Drops' : 'Thuốc nhỏ gáy trị ve bọ chét', category: 'medicine', price: 220000, stock: 40, rating: 4.8, soldCount: 95, images: ['/images/products/medicine-1.jpg'] },
                { _id: '8', name: language === 'en' ? 'Gentle Pet Shampoo 500ml' : 'Dầu gội dịu nhẹ cho thú cưng 500ml', category: 'hygiene', price: 95000, stock: 45, isFeatured: true, rating: 4.7, soldCount: 180, images: ['/images/products/shampoo-1.jpg'] },
                { _id: '9', name: language === 'en' ? 'Dog Dental Chew Treats' : 'Bánh thưởng làm sạch răng cho chó', category: 'food', price: 120000, stock: 70, rating: 4.3, soldCount: 110, images: ['/images/products/dog-treats-1.jpg'] },
                { _id: '10', name: language === 'en' ? 'Cat Litter Premium 10L' : 'Cát vệ sinh cao cấp cho mèo 10L', category: 'hygiene', price: 250000, stock: 35, rating: 4.6, soldCount: 75, images: ['/images/products/cat-litter-1.jpg'] },
                { _id: '11', name: language === 'en' ? 'Dog Raincoat Jacket' : 'Áo mưa cho chó', category: 'accessory', price: 180000, originalPrice: 220000, stock: 25, rating: 4.5, soldCount: 55, images: ['/images/products/dog-raincoat-1.jpg'] },
                { _id: '12', name: language === 'en' ? 'Pet Vitamin Supplement' : 'Vitamin bổ sung cho thú cưng', category: 'medicine', price: 350000, stock: 20, isFeatured: true, rating: 4.9, soldCount: 88, images: ['/images/products/vitamin-1.jpg'] },
            ];
            setProducts(allProducts.filter(p => activeCategory === 'all' || p.category === activeCategory));
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        if (category === 'all') {
            searchParams.delete('category');
        } else {
            searchParams.set('category', category);
        }
        setSearchParams(searchParams);
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        toast.success(language === 'en' ? 'Added to cart!' : 'Đã thêm vào giỏ hàng!');
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price) + '₫';
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getCategoryIcon = (cat) => {
        const icons = { food: '🍖', accessory: '🎀', medicine: '💊', toy: '🎾', hygiene: '🧴' };
        return icons[cat] || '🛍️';
    };

    // Get product image with fallback to placeholder
    const getProductImage = (product) => {
        if (product.images?.[0]) {
            return product.images[0];
        }
        // Fallback to category-specific placeholder
        const placeholders = {
            food: '/images/products/placeholder-food.svg',
            accessory: '/images/products/placeholder-accessory.svg',
            medicine: '/images/products/placeholder-food.svg',
            toy: '/images/products/placeholder-accessory.svg',
            hygiene: '/images/products/placeholder-food.svg'
        };
        return placeholders[product.category] || '/images/products/placeholder-food.svg';
    };

    const renderStars = (rating) => {
        return (
            <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <FiStar
                        key={i}
                        className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
                    />
                ))}
                <span className="text-xs text-theme-muted ml-1">({rating})</span>
            </div>
        );
    };

    return (
        <div className={`min-h-screen ${isDark ? 'bg-dark-300' : 'bg-gray-50'} pt-20 pb-12 transition-colors duration-300`}>
            {/* Hero Banner */}
            <div className="relative overflow-hidden">
                <div className={`${isDark ? 'bg-gradient-to-br from-primary-900/50 via-dark-300 to-secondary-900/50' : 'bg-gradient-to-br from-primary-100 via-white to-secondary-100'} py-16`}>
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl" />
                    </div>
                    <div className="container-custom relative z-10">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="text-center lg:text-left max-w-xl">
                                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${isDark ? 'bg-primary-500/20 text-primary-400' : 'bg-primary-100 text-primary-600'}`}>
                                    🎉 {language === 'en' ? 'Special Offers' : 'Ưu đãi đặc biệt'}
                                </span>
                                <h1 className={`text-4xl md:text-5xl font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {language === 'en' ? 'Pet Shop' : 'Cửa Hàng Thú Cưng'}
                                </h1>
                                <p className={`text-lg mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {language === 'en'
                                        ? 'Quality products for your beloved pets with up to 30% discount'
                                        : 'Sản phẩm chất lượng cho thú cưng yêu quý với giảm giá đến 30%'}
                                </p>
                                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                    <div className="flex items-center gap-2">
                                        <div className={`p-2 rounded-lg ${isDark ? 'bg-green-500/20' : 'bg-green-100'}`}>
                                            <FiTruck className="w-5 h-5 text-green-500" />
                                        </div>
                                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                            {language === 'en' ? 'Free Shipping' : 'Miễn phí vận chuyển'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                                            <FiShield className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                            {language === 'en' ? 'Genuine Products' : 'Sản phẩm chính hãng'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className={`p-2 rounded-lg ${isDark ? 'bg-orange-500/20' : 'bg-orange-100'}`}>
                                            <FiPercent className="w-5 h-5 text-orange-500" />
                                        </div>
                                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                            {language === 'en' ? 'Best Prices' : 'Giá tốt nhất'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden lg:block">
                                <div className="relative">
                                    <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-primary-500/30 to-secondary-500/30 flex items-center justify-center">
                                        <span className="text-8xl">🛒</span>
                                    </div>
                                    <div className={`absolute -top-4 -right-4 px-4 py-2 rounded-xl ${isDark ? 'bg-accent-500' : 'bg-accent-500'} text-white font-bold text-lg shadow-lg`}>
                                        -30%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-custom mt-8">
                {/* Categories - Horizontal Scroll */}
                <div className="mb-8 animate-fade-in-up">
                    <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {language === 'en' ? 'Categories' : 'Danh mục'}
                    </h2>
                    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryChange(cat.id)}
                                className={`flex flex-col items-center min-w-[100px] p-4 rounded-2xl transition-all duration-300 ${activeCategory === cat.id
                                    ? `bg-gradient-to-br ${cat.color} text-white shadow-lg scale-105`
                                    : isDark
                                        ? 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm'
                                    }`}
                            >
                                <span className="text-3xl mb-2">{cat.icon}</span>
                                <span className="text-sm font-medium whitespace-nowrap">
                                    {cat.id === 'all' ? t('shop.all') : t(`shop.${cat.id}`)}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search & Filters Bar */}
                <div className={`${isDark ? 'bg-dark-200/50 border-white/10' : 'bg-white border-gray-200'} backdrop-blur-xl rounded-2xl p-4 mb-8 border animate-fade-in-up delay-100`}>
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full md:w-80">
                            <FiSearch className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                            <input
                                type="text"
                                placeholder={t('common.search')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full pl-12 pr-10 py-3 rounded-xl border transition-all ${isDark
                                    ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-primary-500'
                                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary-500'
                                    }`}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <FiX className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Results & Controls */}
                        <div className="flex items-center gap-4 w-full md:w-auto justify-between">
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {filteredProducts.length} {language === 'en' ? 'products' : 'sản phẩm'}
                            </p>

                            <div className="flex items-center gap-3">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className={`px-4 py-2 rounded-xl border cursor-pointer transition-all ${isDark
                                        ? 'bg-white/5 border-white/10 text-white'
                                        : 'bg-gray-50 border-gray-200 text-gray-900'
                                        }`}
                                >
                                    <option value="newest">{t('shop.newest')}</option>
                                    <option value="price_asc">{t('shop.priceAsc')}</option>
                                    <option value="price_desc">{t('shop.priceDesc')}</option>
                                    <option value="bestselling">{t('shop.bestselling')}</option>
                                </select>

                                <div className={`flex rounded-xl overflow-hidden border ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2.5 transition-colors ${viewMode === 'grid'
                                            ? 'bg-primary-500 text-white'
                                            : isDark ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                                    >
                                        <FiGrid className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2.5 transition-colors ${viewMode === 'list'
                                            ? 'bg-primary-500 text-white'
                                            : isDark ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                                    >
                                        <FiList className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className={`${isDark ? 'bg-dark-200' : 'bg-white'} rounded-2xl p-4 animate-pulse`}>
                                <div className={`h-52 rounded-xl mb-4 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
                                <div className={`h-4 w-1/3 mb-2 rounded ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
                                <div className={`h-5 w-3/4 mb-2 rounded ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
                                <div className={`h-6 w-1/2 rounded ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
                            </div>
                        ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-20 animate-fade-in">
                        <span className="text-6xl mb-4 block">📦</span>
                        <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {t('common.noResults')}
                        </h3>
                        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                            {language === 'en' ? 'Try adjusting your search or filters' : 'Thử điều chỉnh tìm kiếm hoặc bộ lọc'}
                        </p>
                    </div>
                ) : viewMode === 'grid' ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product._id}
                                className={`group rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-fade-in-up ${isDark
                                    ? 'bg-dark-200 border border-white/5 hover:border-primary-500/30'
                                    : 'bg-white border border-gray-100 hover:border-primary-200 shadow-sm'
                                    }`}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {/* Image */}
                                <Link to={`/shop/${product._id}`} className="block">
                                    <div className={`relative h-52 ${isDark ? 'bg-gradient-to-br from-white/5 to-white/10' : 'bg-gradient-to-br from-gray-50 to-gray-100'} flex items-center justify-center overflow-hidden`}>
                                        <img
                                            src={getProductImage(product)}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `/images/products/placeholder-${product.category === 'accessory' ? 'accessory' : 'food'}.svg`;
                                            }}
                                        />

                                        {/* Badges */}
                                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                                            {product.isFeatured && (
                                                <span className="px-2 py-1 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-medium">
                                                    ⭐ {language === 'en' ? 'Featured' : 'Nổi bật'}
                                                </span>
                                            )}
                                            {product.originalPrice && (
                                                <span className="px-2 py-1 rounded-lg bg-red-500 text-white text-xs font-bold">
                                                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                                                </span>
                                            )}
                                        </div>

                                        {/* Wishlist */}
                                        <button
                                            onClick={(e) => e.preventDefault()}
                                            className={`absolute top-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ${isDark ? 'bg-dark-200/80 hover:bg-pink-500/20' : 'bg-white/80 hover:bg-pink-50'
                                                }`}
                                        >
                                            <FiHeart className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'} hover:text-pink-500 transition-colors`} />
                                        </button>

                                        {/* Quick add button */}
                                        <button
                                            onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                                            disabled={product.stock === 0}
                                            className="absolute bottom-3 left-3 right-3 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {product.stock === 0 ? t('shop.outOfStock') : (
                                                <>
                                                    <FiShoppingCart className="w-4 h-4" />
                                                    {t('shop.addToCart')}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </Link>

                                {/* Content */}
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`text-xs uppercase tracking-wide font-medium ${isDark ? 'text-primary-400' : 'text-primary-600'}`}>
                                            {t(`shop.${product.category}`)}
                                        </span>
                                        {product.rating && renderStars(product.rating)}
                                    </div>
                                    <Link to={`/shop/${product._id}`}>
                                        <h3 className={`font-semibold mb-2 line-clamp-2 min-h-[48px] transition-colors ${isDark ? 'text-white hover:text-primary-400' : 'text-gray-900 hover:text-primary-600'}`}>
                                            {product.name}
                                        </h3>
                                    </Link>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-lg font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                                                {formatPrice(product.price)}
                                            </span>
                                            {product.originalPrice && (
                                                <span className={`text-sm line-through ml-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                                    {formatPrice(product.originalPrice)}
                                                </span>
                                            )}
                                        </div>
                                        {product.soldCount && (
                                            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                                {language === 'en' ? `${product.soldCount} sold` : `Đã bán ${product.soldCount}`}
                                            </span>
                                        )}
                                    </div>
                                    {product.stock <= 10 && product.stock > 0 && (
                                        <p className="text-xs text-orange-500 mt-2">
                                            🔥 {language === 'en' ? `Only ${product.stock} left!` : `Chỉ còn ${product.stock}!`}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // List View
                    <div className="space-y-4">
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product._id}
                                className={`flex flex-col sm:flex-row gap-6 p-4 rounded-2xl animate-fade-in-up transition-all duration-300 ${isDark
                                    ? 'bg-dark-200 border border-white/5 hover:border-primary-500/30'
                                    : 'bg-white border border-gray-100 hover:border-primary-200 shadow-sm'
                                    }`}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <Link to={`/shop/${product._id}`} className="block">
                                    <div className={`w-full sm:w-40 h-40 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden group ${isDark ? 'bg-gradient-to-br from-white/5 to-white/10' : 'bg-gradient-to-br from-gray-50 to-gray-100'
                                        }`}>
                                        <img
                                            src={getProductImage(product)}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `/images/products/placeholder-${product.category === 'accessory' ? 'accessory' : 'food'}.svg`;
                                            }}
                                        />
                                    </div>
                                </Link>
                                <div className="flex-1">
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${isDark ? 'bg-primary-500/20 text-primary-400' : 'bg-primary-100 text-primary-600'}`}>
                                            {t(`shop.${product.category}`)}
                                        </span>
                                        {product.isFeatured && (
                                            <span className="px-2 py-1 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                                                ⭐ {language === 'en' ? 'Featured' : 'Nổi bật'}
                                            </span>
                                        )}
                                        {product.originalPrice && (
                                            <span className="px-2 py-1 rounded-lg bg-red-500 text-white text-xs font-bold">
                                                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                                            </span>
                                        )}
                                    </div>
                                    <Link to={`/shop/${product._id}`}>
                                        <h3 className={`text-xl font-semibold mb-2 transition-colors ${isDark ? 'text-white hover:text-primary-400' : 'text-gray-900 hover:text-primary-600'}`}>
                                            {product.name}
                                        </h3>
                                    </Link>
                                    {product.rating && <div className="mb-3">{renderStars(product.rating)}</div>}
                                    <div className="flex items-center justify-between mt-auto">
                                        <div>
                                            <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                                                {formatPrice(product.price)}
                                            </span>
                                            {product.originalPrice && (
                                                <span className={`line-through ml-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                                    {formatPrice(product.originalPrice)}
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            disabled={product.stock === 0}
                                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium flex items-center gap-2 hover:shadow-lg transition-all disabled:opacity-50"
                                        >
                                            <FiShoppingCart />
                                            {product.stock === 0 ? t('shop.outOfStock') : t('shop.addToCart')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopPage;
