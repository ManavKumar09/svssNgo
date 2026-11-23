const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
const { securityHeaders, sanitizeInput } = require('./middleware/securityMiddleware');

app.use(securityHeaders);
app.use(cors({
    origin: true, // Allow frontend & admin-panel on any local/production domain
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(sanitizeInput);

// Serve static files from the uploads directory (for resumes/images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/svss_ngo';
        await mongoose.connect(mongoURI);
        console.log('MongoDB Connected Successfully');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        console.log('Server continuing to run without killing process...');
    }
};

connectDB();

// Basic Route for Testing
app.get('/', (req, res) => {
    res.send('SVSS NGO API is running...');
});

// Import Routes
const authRoutes = require('./routes/auth');
const formRoutes = require('./routes/forms');
const projectRoutes = require('./routes/projects');
const policyRoutes = require('./routes/policies');
const galleryRoutes = require('./routes/gallery');
const teamRoutes = require('./routes/team');
const statRoutes = require('./routes/stats');
const partnerRoutes = require('./routes/partners');
const voiceRoutes = require('./routes/voices');
const settingRoutes = require('./routes/settings');
const heroRoutes = require('./routes/hero');
const activityRoutes = require('./routes/activities');
const milestoneRoutes = require('./routes/milestones');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/voices', voiceRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/milestones', milestoneRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
