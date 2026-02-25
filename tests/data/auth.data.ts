import * as dotenv from 'dotenv';
dotenv.config();

export const authData = {
    validUser: {
        username: process.env.ORANGE_USERNAME || 'Admin', 
        password: process.env.ORANGE_PASSWORD || 'admin123'
    },
    invalidUser: {
        username: 'Admin',
        password: 'wrongPassword'
    }
};