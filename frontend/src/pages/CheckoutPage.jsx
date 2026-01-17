import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCreditCard, FiTruck, FiCheck, FiShield, FiLock } from 'react-icons/fi';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { orderAPI } from '../services/api';
import { FormInput, FormTextarea } from '../components/common/UI';
import toast from 'react-hot-toast';

const paymentMethods = [
    { id: 'bank_transfer', icon: '🏦', color: 'from-blue-500 to-blue-600' },
    { id: 'e_wallet', icon: '📱', color: 'from-purple-500 to-purple-600' },
    { id: 'cod', icon: '💵', color: 'from-green-500 to-green-600' },
];

const CheckoutPage = () => {
    const { t, language } = useLanguage();
    const { user, isAuthenticated } = useAuth();
    const { items, subtotal, shipping, total, clearCart } = useCart();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [shippingInfo, setShippingInfo] = useState({
        fullName: user?.name || '',
        phone: user?.phone || '',
        address: user?.address || '',
        city: 'TP. Hồ Chí Minh',
        notes: '',
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');

    const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + '₫';

    const handleInputChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address) {
            toast.error(language === 'en' ? 'Please fill in all required fields' : 'Vui lòng điền đầy đủ thông tin');
            return;
        }

        setLoading(true);
        try {
            const orderData = {
                items: items.map(item => ({
                    product: item.product._id,
                    quantity: item.quantity,
                })),
                shippingAddress: shippingInfo,
                paymentMethod,
            };

            const response = await orderAPI.create(orderData);
            setOrderNumber(response.data.order?.orderNumber || 'PMS' + Date.now());
            setShowSuccess(true);
            clearCart();
        } catch (error) {
            toast.error(error.response?.data?.message || t('common.error'));
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    if (items.length === 0 && !showSuccess) {
        navigate('/cart');
        return null;
    }

    if (showSuccess) {
        return (
            <div className="min-h-screen bg-dark-300 pt-24 pb-12 flex items-center justify-center">
                <div className="card-glass p-12 max-w-lg text-center animate-fade-in-up">
                    <div className="w-20 h-20 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <FiCheck className="w-10 h-10 text-green-400" />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-white mb-4">{t('checkout.orderSuccess')}</h1>
                    <p className="text-gray-400 mb-2">
                        {language === 'en' ? 'Order Number:' : 'Mã đơn hàng:'}
                    </p>
                    <p className="text-2xl font-bold text-gradient mb-6">{orderNumber}</p>

                    {paymentMethod === 'bank_transfer' && (
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mb-6 text-left">
                            <h3 className="font-semibold text-blue-400 mb-3">
                                {language === 'en' ? 'Bank Transfer Information' : 'Thông tin chuyển khoản'}
                            </h3>
                            <div className="space-y-2 text-sm text-blue-300">
                                <p><strong>{language === 'en' ? 'Bank:' : 'Ngân hàng:'}</strong> Vietcombank</p>
                                <p><strong>{language === 'en' ? 'Account:' : 'Số TK:'}</strong> 1234567890</p>
                                <p><strong>{language === 'en' ? 'Name:' : 'Chủ TK:'}</strong> PET CARE PRO CO., LTD</p>
                                <p><strong>{language === 'en' ? 'Content:' : 'Nội dung:'}</strong> {orderNumber}</p>
                                <p><strong>{language === 'en' ? 'Amount:' : 'Số tiền:'}</strong> {formatPrice(total)}</p>
                            </div>
                        </div>
                    )}

                    {paymentMethod === 'e_wallet' && (
                        <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6 mb-6">
                            <h3 className="font-semibold text-purple-400 mb-3">
                                {language === 'en' ? 'Scan QR Code to Pay' : 'Quét mã QR để thanh toán'}
                            </h3>
                            <div className="w-48 h-48 bg-white/10 border-2 border-purple-500/30 rounded-xl mx-auto flex items-center justify-center">
                                <span className="text-6xl">📱</span>
                            </div>
                            <p className="text-sm text-purple-400 mt-3">MoMo / ZaloPay / VNPay</p>
                        </div>
                    )}

                    <p className="text-gray-500 mb-6">
                        {language === 'en'
                            ? 'We will send you an email confirmation shortly.'
                            : 'Chúng tôi sẽ gửi email xác nhận trong thời gian sớm nhất.'}
                    </p>

                    <button onClick={() => navigate('/')} className="btn-primary px-8 py-4">
                        {language === 'en' ? 'Back to Home' : 'Về trang chủ'}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-300 pt-24 pb-12">
            <div className="container-custom">
                <h1 className="text-4xl font-display font-bold text-white mb-8 animate-fade-in-up">{t('checkout.title')}</h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Shipping & Payment */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Shipping Info */}
                            <div className="card-glass p-6 animate-fade-in-up">
                                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                                    <FiTruck className="mr-2 text-primary-400" />
                                    {t('checkout.shippingInfo')}
                                </h2>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <FormInput
                                        label={t('checkout.fullName')}
                                        name="fullName"
                                        value={shippingInfo.fullName}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Nguyễn Văn A"
                                    />
                                    <FormInput
                                        label={t('checkout.phone')}
                                        name="phone"
                                        type="tel"
                                        value={shippingInfo.phone}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="0901234567"
                                    />
                                </div>

                                <FormInput
                                    label={t('checkout.address')}
                                    name="address"
                                    value={shippingInfo.address}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="123 Đường ABC, Phường XYZ"
                                    className="mt-4"
                                />

                                <FormInput
                                    label={t('checkout.city')}
                                    name="city"
                                    value={shippingInfo.city}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-4"
                                />

                                <FormTextarea
                                    label={t('checkout.notes')}
                                    name="notes"
                                    value={shippingInfo.notes}
                                    onChange={handleInputChange}
                                    placeholder={language === 'en' ? 'Special delivery instructions...' : 'Hướng dẫn giao hàng đặc biệt...'}
                                    className="mt-4"
                                />
                            </div>

                            {/* Payment Method */}
                            <div className="card-glass p-6 animate-fade-in-up delay-100">
                                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                                    <FiCreditCard className="mr-2 text-primary-400" />
                                    {t('checkout.paymentMethod')}
                                </h2>

                                <div className="space-y-3">
                                    {paymentMethods.map((method) => (
                                        <label
                                            key={method.id}
                                            className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 ${paymentMethod === method.id
                                                    ? 'bg-gradient-primary shadow-glow-sm'
                                                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value={method.id}
                                                checked={paymentMethod === method.id}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="w-5 h-5 text-primary-600 hidden"
                                            />
                                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${method.color} flex items-center justify-center text-xl mr-4`}>
                                                {method.icon}
                                            </div>
                                            <span className="font-medium text-white">{t(`checkout.${method.id.replace('_', '')}`) || t(`checkout.${method.id}`)}</span>
                                            {paymentMethod === method.id && (
                                                <FiCheck className="ml-auto text-white" />
                                            )}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="card-glass p-6 sticky top-24 animate-fade-in-up delay-200">
                                <h2 className="text-xl font-semibold text-white mb-6">
                                    {language === 'en' ? 'Order Summary' : 'Tóm tắt đơn hàng'}
                                </h2>

                                {/* Items */}
                                <div className="space-y-4 mb-6">
                                    {items.map((item) => (
                                        <div key={item.product._id} className="flex justify-between">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-white line-clamp-1">{item.product.name}</p>
                                                <p className="text-xs text-gray-500">x{item.quantity}</p>
                                            </div>
                                            <span className="text-sm font-medium text-white">
                                                {formatPrice(item.product.price * item.quantity)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="divider" />

                                {/* Totals */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-400">
                                        <span>{t('cart.subtotal')}</span>
                                        <span className="text-white">{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>{t('cart.shipping')}</span>
                                        <span className={shipping === 0 ? 'text-green-400' : 'text-white'}>
                                            {shipping === 0 ? (language === 'en' ? 'Free' : 'Miễn phí') : formatPrice(shipping)}
                                        </span>
                                    </div>
                                    <div className="divider" />
                                    <div className="flex justify-between text-xl font-bold">
                                        <span className="text-white">{t('cart.total')}</span>
                                        <span className="text-gradient">{formatPrice(total)}</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary w-full py-4 text-lg justify-center"
                                >
                                    {loading ? (
                                        <span className="flex items-center">
                                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                            {language === 'en' ? 'Processing...' : 'Đang xử lý...'}
                                        </span>
                                    ) : (
                                        t('checkout.placeOrder')
                                    )}
                                </button>

                                {/* Trust badges */}
                                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                                    <div className="flex items-center text-sm text-gray-400">
                                        <FiLock className="w-4 h-4 mr-2 text-green-400" />
                                        {language === 'en' ? 'SSL Encrypted' : 'Mã hóa SSL'}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-400">
                                        <FiShield className="w-4 h-4 mr-2 text-primary-400" />
                                        {language === 'en' ? 'Secure Payment' : 'Thanh toán an toàn'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
