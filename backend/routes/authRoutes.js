const express = require('express');
const router = express.Router();
const {
    register,
    login,
    getMe,
    updateProfile,
    getAllUsers,
    getStaff,
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.get('/users', protect, authorize('admin'), getAllUsers);
router.get('/staff', protect, getStaff);
router.get('/doctors', getDoctors);
router.post('/doctors', protect, authorize('admin'), createDoctor);
router.put('/doctors/:id', protect, authorize('admin'), updateDoctor);
router.delete('/doctors/:id', protect, authorize('admin'), deleteDoctor);

module.exports = router;
