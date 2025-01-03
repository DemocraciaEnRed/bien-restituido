import { AsyncParser } from '@json2csv/node';
import { listAllUsers } from '../helpers/adminHelpers'
import { messages } from '@/lib/utils/messages';
import logger from '@/lib/utils/debugger';

export const exportUsers = async (req, res) => {
    try {
        const users = await listAllUsers();

        const data = [];
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const userOutput = {
                _id: user._id,
                email: user.email,
                username: user.username,
                role: user.role,
                isVerified: user.isVerified,
                lastLogin: user.lastLogin,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                deletedAt: user.deletedAt,
            }
            data.push(userOutput);
        }

        const dateNow = new Date();
        const filename = `users-${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDate()}-${dateNow.getHours()}-${dateNow.getMinutes()}-${dateNow.getSeconds()}.csv`;

        const opts = {}
        const transformOpts = {}
        const asyncOpts = {}
        const parser = new AsyncParser(opts, transformOpts, asyncOpts);

        const csv = await parser.parse(data).promise();

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        logger('admin', 'serving csv of users')
        return res.send(csv);

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: messages.error.default })
    }
}

export const getAppStats = async (req, res) => {
    try {
        const stats = await AdminHelper.getAppStats();
        logger('admin', 'serving asset stats')
        return res.json(stats);
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: messages.error.default })
    }
}