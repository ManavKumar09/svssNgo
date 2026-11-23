const mongoose = require('mongoose');

const heroSlideSchema = new mongoose.Schema({
    titleLine1: { 
        type: String, 
        default: 'Empowered women,' 
    },
    titleLine2: { 
        type: String, 
        default: 'stronger villages.' 
    },
    subtitle: { 
        type: String, 
        default: 'Self-help groups, sericulture and handlooms — 2.5 lakh women and counting, building dignity through work.' 
    },
    primaryBtnText: { 
        type: String, 
        default: 'Our Work & Impact' 
    },
    primaryBtnLink: { 
        type: String, 
        default: '/completed-projects' 
    },
    secondaryBtnText: { 
        type: String, 
        default: 'Involve with us' 
    },
    secondaryBtnLink: { 
        type: String, 
        default: '/volunteer' 
    },
    imageUrl: { 
        type: String, 
        required: true 
    },
    order: { 
        type: Number, 
        default: 0 
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('HeroSlide', heroSlideSchema);
