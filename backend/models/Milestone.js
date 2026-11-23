const mongoose = require('mongoose');

const milestoneItemSchema = new mongoose.Schema({
    year: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    }
});

const milestoneConfigSchema = new mongoose.Schema({
    subtitle: {
        type: String,
        default: 'OUR JOURNEY'
    },
    title: {
        type: String,
        default: 'Milestones along the way'
    },
    milestones: {
        type: [milestoneItemSchema],
        default: [
            {
                year: '1988',
                text: 'SVSS founded in Bhopal with young community groups for grass-root development.'
            },
            {
                year: '1990s',
                text: '12A & 80G registrations. First audited annual reports.'
            },
            {
                year: '1995',
                text: 'FCRA registration — opened the door to international funding partners.'
            },
            {
                year: '2005',
                text: 'Launch of Radio Awaz 91.2 MHz FM — the SVSS community radio station.'
            },
            {
                year: '2010s',
                text: 'Major scale-up with NHM, NABARD, UNICEF, WFP and Childline India partnerships.'
            },
            {
                year: '2024',
                text: '12 fields of work, 2.5 lakh+ community members engaged, 3.5 lakh+ adolescents reached.'
            }
        ]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Milestone', milestoneConfigSchema);
