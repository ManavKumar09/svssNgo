const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        const targetEmail = process.env.ADMIN_EMAIL || process.env.ADMIN_USERNAME || 'svssngo@hotmail.com';
        const targetPassword = process.env.ADMIN_PASSWORD;

        if (!targetPassword) {
            console.error('Please specify ADMIN_PASSWORD in environment variables (.env).');
            process.exit(1);
        }

        let user = await User.findOne({ email: targetEmail });

        if (user) {
            console.log(`Found existing user with email: ${targetEmail}. Updating username & password...`);
            user.username = targetEmail;
            user.password = targetPassword;
            await user.save();
            console.log(`Admin credentials updated successfully for ${targetEmail}`);
        } else {
            console.log(`Creating new admin user: ${targetEmail}`);
            // Check if any other admin user exists and update/replace
            const existingUsers = await User.find({});
            if (existingUsers.length > 0) {
                console.log(`Updating first existing user (${existingUsers[0].email}) to ${targetEmail}`);
                const firstUser = existingUsers[0];
                firstUser.username = targetEmail;
                firstUser.email = targetEmail;
                firstUser.password = targetPassword;
                await firstUser.save();
            } else {
                await User.create({
                    username: targetEmail,
                    email: targetEmail,
                    password: targetPassword
                });
            }
            console.log(`Admin user ${targetEmail} set up successfully!`);
        }

        const allUsers = await User.find({}).select('-password');
        console.log('Current Admin Users in DB:', allUsers);

        process.exit(0);
    } catch (err) {
        console.error('Error seeding admin user:', err);
        process.exit(1);
    }
};

seedAdmin();
