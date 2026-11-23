const Inquiry = require('../models/Inquiry');
const sendEmail = require('../utils/sendEmail');

// @desc    Submit Contact Form
// @route   POST /api/forms/contact
// @access  Public
const submitContactForm = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Save to database
        const newInquiry = new Inquiry({
            type: 'contact',
            name,
            email,
            subject: subject || 'General Inquiry',
            message
        });
        await newInquiry.save();

        // Attempt email notification (graceful fallback)
        try {
            const emailMessage = `
                You have received a new message from the SVSS Contact Form:
                
                Name: ${name}
                Email: ${email}
                Subject: ${subject}
                Message: ${message}
            `;

            await sendEmail({
                email: process.env.RECEIVER_EMAIL,
                subject: `New Contact Form Submission: ${subject}`,
                message: emailMessage,
            });
        } catch (mailErr) {
            console.warn('Notification email could not be sent (inquiry saved to DB):', mailErr.message);
        }

        res.status(200).json({ success: true, message: 'Message received and saved successfully' });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ success: false, message: 'Failed to process message' });
    }
};

// @desc    Submit Volunteer Form
// @route   POST /api/forms/volunteer
// @access  Public
const submitVolunteerForm = async (req, res) => {
    try {
        const { first_name, last_name, email, college_employer, recommender, resume_link, statement_of_purpose } = req.body;
        const fullName = `${first_name || ''} ${last_name || ''}`.trim() || 'Anonymous Applicant';
        const resumeFile = req.file ? `/uploads/${req.file.filename}` : '';

        // Save to database
        const newInquiry = new Inquiry({
            type: 'volunteer',
            name: fullName,
            email,
            subject: 'Volunteer Application',
            message: statement_of_purpose,
            college_employer,
            recommender,
            resume_link,
            resume_file: resumeFile
        });
        await newInquiry.save();

        // Attempt email notification
        try {
            let emailMessage = `
                You have received a new Volunteer Application:
                
                Name: ${fullName}
                Email: ${email}
                College/Employer: ${college_employer}
                Recommender: ${recommender}
                Resume Link: ${resume_link || 'Not provided'}
                
                Statement of Purpose:
                ${statement_of_purpose}
            `;

            let attachments = [];
            if (req.file) {
                attachments.push({
                    filename: req.file.originalname,
                    path: req.file.path
                });
            }

            await sendEmail({
                email: process.env.RECEIVER_EMAIL,
                subject: `New Volunteer Application: ${fullName}`,
                message: emailMessage,
                attachments
            });
        } catch (mailErr) {
            console.warn('Volunteer email could not be sent (saved to DB):', mailErr.message);
        }

        res.status(200).json({ success: true, message: 'Application received and saved successfully' });
    } catch (error) {
        console.error('Volunteer form error:', error);
        res.status(500).json({ success: false, message: 'Failed to process application' });
    }
};

// @desc    Get all inquiries (with optional ?type=contact|volunteer filter)
// @route   GET /api/forms/inquiries
// @access  Private (Admin)
const getInquiries = async (req, res) => {
    try {
        const { type } = req.query;
        const query = type ? { type } : {};
        const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete an inquiry
// @route   DELETE /api/forms/inquiries/:id
// @access  Private (Admin)
const deleteInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);
        if (inquiry) {
            await Inquiry.deleteOne({ _id: inquiry._id });
            res.json({ message: 'Inquiry removed' });
        } else {
            res.status(404).json({ message: 'Inquiry not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { 
    submitContactForm, 
    submitVolunteerForm,
    getInquiries,
    deleteInquiry
};
