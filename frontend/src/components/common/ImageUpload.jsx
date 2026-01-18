import { useState, useRef } from 'react';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const ImageUpload = ({
    onImageSelect,
    currentImage = '',
    placeholder = 'Chọn ảnh từ máy',
    accept = 'image/*',
    maxSize = 5 * 1024 * 1024 // 5MB
}) => {
    const { isDark } = useTheme();
    const [preview, setPreview] = useState(currentImage);
    const [error, setError] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const handleFile = (file) => {
        setError('');

        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Vui lòng chọn file ảnh');
            return;
        }

        // Validate file size
        if (file.size > maxSize) {
            setError(`File quá lớn. Tối đa ${maxSize / 1024 / 1024}MB`);
            return;
        }

        // Create preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
            onImageSelect?.(file, reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleChange = (e) => {
        const file = e.target.files?.[0];
        handleFile(file);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        handleFile(file);
    };

    const handleRemove = () => {
        setPreview('');
        onImageSelect?.(null, '');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className="w-full">
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                onChange={handleChange}
                className="hidden"
            />

            {preview ? (
                <div className="relative rounded-xl overflow-hidden">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                        <FiX className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => inputRef.current?.click()}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`w-full h-48 rounded-xl border-2 border-dashed cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${dragActive
                            ? 'border-primary-500 bg-primary-500/10'
                            : isDark
                                ? 'border-white/20 hover:border-white/40 bg-white/5'
                                : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                        }`}
                >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-gray-200'
                        }`}>
                        <FiImage className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    </div>
                    <div className="text-center">
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
                            <FiUpload className="inline mr-2" />
                            {placeholder}
                        </p>
                        <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            Kéo thả hoặc click để chọn ảnh
                        </p>
                    </div>
                </div>
            )}

            {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
        </div>
    );
};

export default ImageUpload;
