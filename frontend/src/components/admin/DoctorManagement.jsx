import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiUsers, FiMail, FiPhone } from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { authAPI } from '../../services/api';
import { Badge, Spinner, EmptyState, Modal } from '../common/UI';
import ImageUpload from '../common/ImageUpload';
import toast from 'react-hot-toast';

const defaultDoctor = {
    name: '',
    email: '',
    password: '',
    phone: '',
    specialization: '',
    experience: 0,
    bio: '',
    avatar: ''
};

const DoctorManagement = () => {
    const { language } = useLanguage();
    const { isDark } = useTheme();

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [formData, setFormData] = useState(defaultDoctor);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const response = await authAPI.getDoctors();
            setDoctors(response.data.doctors || []);
        } catch (error) {
            console.error('Error fetching doctors:', error);
            toast.error(language === 'en' ? 'Error loading doctors' : 'Lỗi tải danh sách bác sĩ');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'experience' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email) {
            toast.error(language === 'en' ? 'Name and email are required' : 'Tên và email là bắt buộc');
            return;
        }
        if (!editingDoctor && !formData.password) {
            toast.error(language === 'en' ? 'Password is required' : 'Mật khẩu là bắt buộc');
            return;
        }

        setSaving(true);
        try {
            if (editingDoctor) {
                const { password, ...updateData } = formData;
                await authAPI.updateDoctor(editingDoctor._id, updateData);
                toast.success(language === 'en' ? 'Doctor updated!' : 'Đã cập nhật bác sĩ!');
            } else {
                await authAPI.createDoctor(formData);
                toast.success(language === 'en' ? 'Doctor added!' : 'Đã thêm bác sĩ!');
            }
            setShowModal(false);
            setFormData(defaultDoctor);
            setEditingDoctor(null);
            fetchDoctors();
        } catch (error) {
            console.error('Error saving doctor:', error);
            toast.error(error.response?.data?.message || (language === 'en' ? 'Error saving' : 'Lỗi khi lưu'));
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (doctor) => {
        setFormData({
            name: doctor.name || '',
            email: doctor.email || '',
            password: '',
            phone: doctor.phone || '',
            specialization: doctor.specialization || '',
            experience: doctor.experience || 0,
            bio: doctor.bio || '',
            avatar: doctor.avatar || ''
        });
        setEditingDoctor(doctor);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!confirm(language === 'en' ? 'Delete this doctor?' : 'Xóa bác sĩ này?')) return;
        try {
            await authAPI.deleteDoctor(id);
            toast.success(language === 'en' ? 'Doctor deleted!' : 'Đã xóa bác sĩ!');
            fetchDoctors();
        } catch (error) {
            toast.error(error.response?.data?.message || (language === 'en' ? 'Error deleting' : 'Lỗi khi xóa'));
        }
    };

    const openAddModal = () => {
        setFormData(defaultDoctor);
        setEditingDoctor(null);
        setShowModal(true);
    };

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up">
            <div className="card-glass overflow-hidden">
                <div className="p-6 border-b border-theme flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-theme flex items-center">
                        <FiUsers className="mr-2 text-primary-400" />
                        {language === 'en' ? 'Doctor Management' : 'Quản lý Bác sĩ'}
                    </h2>
                    <button onClick={openAddModal} className="btn-primary flex items-center gap-2">
                        <FiPlus className="w-4 h-4" />
                        {language === 'en' ? 'Add Doctor' : 'Thêm Bác sĩ'}
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {doctors.length === 0 ? (
                        <div className="col-span-full">
                            <EmptyState
                                icon={<span className="text-4xl">👨‍⚕️</span>}
                                title={language === 'en' ? 'No doctors found' : 'Chưa có bác sĩ'}
                                description={language === 'en' ? 'Add doctors to start managing staff' : 'Thêm bác sĩ để quản lý nhân viên'}
                            />
                        </div>
                    ) : doctors.map((doctor) => (
                        <div key={doctor._id} className={`p-6 rounded-xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center overflow-hidden">
                                    {doctor.avatar ? (
                                        <img src={doctor.avatar} alt={doctor.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-2xl text-white font-bold">{doctor.name?.charAt(0)}</span>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-theme">{doctor.name}</h3>
                                    <p className="text-sm text-theme-secondary">{doctor.specialization || (language === 'en' ? 'General' : 'Đa khoa')}</p>
                                    {doctor.role === 'admin' && (
                                        <Badge variant="primary">Admin</Badge>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2 text-sm">
                                <p className="text-theme-secondary flex items-center gap-2">
                                    <FiMail className="w-4 h-4" /> {doctor.email}
                                </p>
                                {doctor.phone && (
                                    <p className="text-theme-secondary flex items-center gap-2">
                                        <FiPhone className="w-4 h-4" /> {doctor.phone}
                                    </p>
                                )}
                                <p className="text-theme-secondary">
                                    ⭐ {doctor.experience || 0} {language === 'en' ? 'years experience' : 'năm kinh nghiệm'}
                                </p>
                            </div>
                            {doctor.role !== 'admin' && (
                                <div className="mt-4 flex gap-2">
                                    <button
                                        onClick={() => handleEdit(doctor)}
                                        className="btn-ghost flex-1 text-sm py-2 flex items-center justify-center gap-1"
                                    >
                                        <FiEdit2 className="w-4 h-4" />
                                        {language === 'en' ? 'Edit' : 'Sửa'}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(doctor._id)}
                                        className="btn-ghost flex-1 text-sm py-2 text-red-400 hover:text-red-300 flex items-center justify-center gap-1"
                                    >
                                        <FiTrash2 className="w-4 h-4" />
                                        {language === 'en' ? 'Delete' : 'Xóa'}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Add/Edit Doctor Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={editingDoctor
                    ? (language === 'en' ? 'Edit Doctor' : 'Sửa thông tin Bác sĩ')
                    : (language === 'en' ? 'Add New Doctor' : 'Thêm Bác sĩ mới')}
                size="lg"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                {language === 'en' ? 'Full Name' : 'Họ và tên'} *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input"
                                placeholder={language === 'en' ? 'Dr. John Doe' : 'BS. Nguyễn Văn A'}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input"
                                placeholder="doctor@petcare.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {!editingDoctor && (
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    {language === 'en' ? 'Password' : 'Mật khẩu'} *
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="••••••••"
                                    required={!editingDoctor}
                                />
                            </div>
                        )}
                        <div className={editingDoctor ? 'col-span-2' : ''}>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                {language === 'en' ? 'Phone' : 'Số điện thoại'}
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="input"
                                placeholder="0901234567"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                {language === 'en' ? 'Specialization' : 'Chuyên khoa'}
                            </label>
                            <input
                                type="text"
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                                className="input"
                                placeholder={language === 'en' ? 'e.g. Internal Medicine' : 'VD: Nội khoa thú cưng'}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                {language === 'en' ? 'Experience (years)' : 'Kinh nghiệm (năm)'}
                            </label>
                            <input
                                type="number"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                className="input"
                                min="0"
                                placeholder="5"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            {language === 'en' ? 'Bio' : 'Tiểu sử'}
                        </label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="input resize-none"
                            rows={3}
                            placeholder={language === 'en' ? 'Brief introduction...' : 'Giới thiệu ngắn...'}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            {language === 'en' ? 'Avatar' : 'Ảnh đại diện'}
                        </label>
                        <ImageUpload
                            currentImage={formData.avatar}
                            onImageSelect={(file, dataUrl) => setFormData(prev => ({ ...prev, avatar: dataUrl || '' }))}
                            placeholder={language === 'en' ? 'Choose avatar' : 'Chọn ảnh'}
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="btn-ghost flex-1"
                        >
                            <FiX className="w-4 h-4 mr-2" />
                            {language === 'en' ? 'Cancel' : 'Hủy'}
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="btn-primary flex-1 flex items-center justify-center gap-2"
                        >
                            {saving ? <Spinner size="sm" /> : (
                                <>
                                    <FiSave className="w-4 h-4" />
                                    {language === 'en' ? 'Save' : 'Lưu'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default DoctorManagement;
