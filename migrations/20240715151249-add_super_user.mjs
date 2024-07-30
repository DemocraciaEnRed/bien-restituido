import bcrypt from "bcrypt";

import 'dotenv/config'

export const up = async (db, client) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(process.env.ADMIN_PASS, salt);
    const user = {
        email: process.env.ADMIN_MAIL,
        password: hash,
        username: process.env.ADMIN_USERNAME,
        role: 'admin',
        isVerified: true,
    }
    await db.collection('users').insertOne(user)
};

export const down = async (db, client) => {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
};
