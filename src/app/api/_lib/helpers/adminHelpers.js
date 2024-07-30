import { userRoles } from "@/lib/utils/constants";
import User from "../models/User";


export const listAllUsers = async () => {
    try {
        const privateSelect = {
            password: false,
            __v: false,
        };
        const users = await User.find({}, privateSelect)
        return users;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getAppStats = async () => {
    try {

        // get the users
        const totalUsers = await User.countDocuments();
        const totalAdmins = await User.countDocuments({ role: userRoles.ADMIN });
        const totalVerified = await User.countDocuments({ isVerified: true });
        const totalUnverified = await User.countDocuments({ isVerified: false });
        const totalDeleted = await User.countDocuments({ deletedAt: { $ne: null } });
        // count of the users who logged in in the last 30 days
        const last30Days = new Date(new Date().setDate(new Date().getDate() - 30));
        const last30DaysLogins = await User.countDocuments({ lastLogin: { $gte: last30Days } });
        // count of the users who logged in in the last 7 days
        const last7Days = new Date(new Date().setDate(new Date().getDate() - 7));
        const last7DaysLogins = await User.countDocuments({ lastLogin: { $gte: last7Days } });




        return {
            users: {
                totalUsers,
                totalAdmins,
                totalAuthors,
                totalVerified,
                totalUnverified,
                totalDeleted,
                last30DaysLogins,
                last7DaysLogins,
            },

        }

    } catch (error) {
        console.error(error);
        throw error;
    }
}