const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            phone,
            address
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                address: user.address,
                avatar: user.avatar
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                address: user.address,
                avatar: user.avatar
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                address: user.address,
                avatar: user.avatar,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
    try {
        const { name, phone, address, avatar } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name, phone, address, avatar },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                address: user.address,
                avatar: user.avatar
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all users (Admin only)
// @route   GET /api/auth/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all staff members
// @route   GET /api/auth/staff
// @access  Private
exports.getStaff = async (req, res) => {
    try {
        const staff = await User.find({ role: { $in: ['staff', 'admin'] } }).select('name email role avatar');

        res.status(200).json({
            success: true,
            count: staff.length,
            staff
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all doctors/staff with detailed info
// @route   GET /api/auth/doctors
// @access  Public
exports.getDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ role: { $in: ['staff', 'admin'] } })
            .select('name email role avatar specialization experience bio certificates phone');

        res.status(200).json({
            success: true,
            count: doctors.length,
            doctors
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Create new doctor/staff
// @route   POST /api/auth/doctors
// @access  Private/Admin
exports.createDoctor = async (req, res) => {
    try {
        const { name, email, password, phone, specialization, experience, bio, avatar } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Create doctor/staff
        const doctor = await User.create({
            name,
            email,
            password,
            phone,
            role: 'staff',
            specialization,
            experience: experience || 0,
            bio,
            avatar
        });

        res.status(201).json({
            success: true,
            message: 'Doctor created successfully',
            doctor: {
                _id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                phone: doctor.phone,
                role: doctor.role,
                specialization: doctor.specialization,
                experience: doctor.experience,
                bio: doctor.bio,
                avatar: doctor.avatar
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update doctor/staff
// @route   PUT /api/auth/doctors/:id
// @access  Private/Admin
exports.updateDoctor = async (req, res) => {
    try {
        const { name, email, phone, specialization, experience, bio, avatar } = req.body;

        const doctor = await User.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        // Check if email is being changed and already exists
        if (email && email !== doctor.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already in use'
                });
            }
        }

        // Update fields
        doctor.name = name || doctor.name;
        doctor.email = email || doctor.email;
        doctor.phone = phone || doctor.phone;
        doctor.specialization = specialization || doctor.specialization;
        doctor.experience = experience !== undefined ? experience : doctor.experience;
        doctor.bio = bio !== undefined ? bio : doctor.bio;
        doctor.avatar = avatar !== undefined ? avatar : doctor.avatar;

        await doctor.save();

        res.status(200).json({
            success: true,
            message: 'Doctor updated successfully',
            doctor: {
                _id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                phone: doctor.phone,
                role: doctor.role,
                specialization: doctor.specialization,
                experience: doctor.experience,
                bio: doctor.bio,
                avatar: doctor.avatar
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete doctor/staff
// @route   DELETE /api/auth/doctors/:id
// @access  Private/Admin
exports.deleteDoctor = async (req, res) => {
    try {
        const doctor = await User.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        // Prevent deleting admin accounts
        if (doctor.role === 'admin') {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete admin account'
            });
        }

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Doctor deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
