import { userRoles } from "@/lib/utils/constants";
import { listUsers } from "../helpers/userHelper";
import { renderHtml, sendNow } from "../services/mailer";
import { messages } from "@/lib/utils/messages";
import verifyTemplate from "@/app/api/_lib/services/templates/verify";
import { User } from "@/lib/models";
import logger from "@/lib/utils/debugger";


export const me = async function (req, res) {
    try {
        // check if the query has a "refreshToken" param
        const refreshToken = req.query.refreshToken || null;
        // get the userId
        const userId = req.user.id;
        const output = {};

        // get the user
        const user = await User.findById(userId, {
            password: false,
            resetPasswordToken: false,
            resetPasswordExpires: false,
            createdAt: false,
            updatedAt: false,
            deletedAt: false,
            __v: false
        },)
        output.user = user;
        // if there is a refreshToken, generate a new token
        if (refreshToken) {
            output.token = await user.generateJWT();
        }
        logger('user', `get data user ${user._id}`)

        return res.status(200).json(output);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: messages.error.default });
    }
};

export const get = async function (req, res) {
    try {
        const userId = req.params.userId;
        const userLogged = req.user;
        let querySelect = {
            email: false,
            password: false,
            resetPasswordToken: false,
            resetPasswordExpires: false,
            isVerified: false,
            createdAt: false,
            updatedAt: false,
            __v: false
        }
        const querySelectForAdmins = {
            password: false,
            __v: false
        }

        let queryProjection = querySelect;

        if (userLogged && userLogged.role == userRoles.ADMIN) {
            queryProjection = querySelectForAdmins;
        }

        const user = await User.findById(userId, queryProjection)

        if (!user) return res.status(401).json({ message: messages.user.error.notFound });
        logger('user', `get data user ${user._id}`)
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: messages.error.default });
    }
};

export const update = async function (req, res) {
    try {
        const update = req.data;
        const userId = req.params.userId || req.user.id;
        const loggedUser = req.user;


        const user = await User.findById(userId)

        if ('currentPassword' in update) {
            if (!loggedUser.comparePassword(update.currentPassword)) {
                return res.status(401).json({ message: messages.auth.error.invalidCredentials });
            }
            user.password = update.newPassword
        }

        user.username = update.username
        user.email = update.email
        await user.save()

        if (!user) return res.status(404).json({ message: messages.user.error.notFound });
        logger('user', `update user ${user._id}`)
        return res.status(200).json({ user, message: messages.user.success.updated });
        // return res.status(200).json({ message: messages.user.success.updated });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: messages.error.default });
    }
};

export const changePassword = async function (req, res) {
    try {
        const userId = req.user.id
        const { currentPassword, newPassword } = req.data;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: messages.user.error.notFound });

        if (!user.comparePassword(currentPassword)) {
            return res.status(401).json({ message: messages.user.error.invalidPassword });
        }

        user.password = newPassword;
        await user.save();
        logger('user', `change password user ${user._id}`)
        return res.status(200).json({ message: messages.user.success.passwordUpdated });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: messages.error.default });
    }
};

export const changeEmail = async function (req, res) {
    // the user will have to match the current password
    // then a new verification email will be sent
    try {
        const userId = req.user.id;
        const { email, password } = req.data;

        const user = await User.findById(userId)
        if (!user) return res.status(404).json({ message: messages.user.error.notFound });

        if (!user.comparePassword(password)) {
            return res.status(401).json({ message: messages.user.error.invalidPassword });
        }

        user.email = email;
        user.isVerified = false;
        await user.save();

        // generate a new token 
        const token = user.generateVerificationToken();
        // Save the verification token
        await token.save();
        // make the url
        const url = `${process.env.APP_URL}/auth/verify/${token.token}`;
        // send email
        await sendNow(email, 'Verifica tu email', `${renderHtml(verifyTemplate, { url: url })}`);
        logger('user', `change email user ${user._id}`)
        return res.status(200).json({
            message: messages.auth.success.verificationMailSent.invalidPassword
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: messages.error.default });
    }
}



//Admin functions
export const list = async function (req, res) {
    try {
        const user = req.user;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const query = req.query.query || null;
        let includeDeleted = false;
        let ispublic = true;
        let extraQuery = null;
        // if it is an admin
        if (user && user.role === userRoles.ADMIN) {
            ispublic = false;
            // check req.query.includeDeleted
            if (req.query.includeDeleted && req.query.includeDeleted === 'true') {
                includeDeleted = true;
            }
        }

        // if there is a query
        if (query) {
            // query can be a string that is for the username or the email
            extraQuery = {
                $or: [
                    { username: { $regex: query, $options: 'i' } },
                    { email: { $regex: query, $options: 'i' } }
                ]
            }
        }

        // get the users
        const output = await listUsers(page, limit, extraQuery, ispublic, includeDeleted);
        logger('user', `serving users`)
        return res.json(output);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: messages.error.default });
    }
}

export const setRole = async (req, res) => {
    try {
        const userId = req.params.userId;
        const role = req.data.role;

        // check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: messages.user.error.notFound });
        }

        // check if the role is valid
        user.role = role;
        await user.save();
        logger('user', `change role user ${user._id}`)
        return res.status(200).send({ message: `User role has been modified to ${role}` })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: messages.error.default });
    }
}

export const forceVerifyByAdmin = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId)
        if (!user) return res.status(404).json({ message: messages.user.error.notFound });

        user.isVerified = !user.isVerified;
        await user.save();
        logger('user', `force verify user ${user._id}`)
        return res.status(200).json({ message: 'User has been verified' });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: messages.error.default })
    }
}

export const changePasswordByAdmin = async (req, res) => {
    try {
        const userId = req.params.userId;
        const password = req.data.password;

        const user = await User.findById(userId)
        if (!user) return res.status(404).json({ message: messages.user.error.notFound });

        user.password = password;
        await user.save();
        logger('user', `change password user ${user._id} from admin`)
        return res.status(200).json({ message: messages.user.success.passwordUpdated });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: messages.error.default })
    }
}

export const changeEmailByAdmin = async (req, res) => {
    try {
        const userId = req.params.userId;
        const email = req.data.email;
        const forceVerified = req.data.forceVerified || false;

        const user = await User.findById(userId)
        if (!user) return res.status(404).json({ message: messages.user.error.notFound });

        user.email = email;
        if (forceVerified && req.user.role == userRoles.ADMIN) {
            user.isVerified = true;
            await user.save();
            return res.status(200).json({ message: messages.user.success.emailAndUserVerified });
        }

        // by default, changing the email address will make the user unverified
        user.isVerified = false;
        await user.save();

        // generate a new token 
        const token = user.generateVerificationToken();
        // Save the verification token
        await token.save();
        // make the url
        const url = `${process.env.APP_URL}/auth/verify/${token.token}`;
        // send email
        await sendNow(email, 'Verifica tu email', `${renderHtml(verifyTemplate, { url: url })}`);
        logger('user', `change email user ${user._id} from admin`)
        return res.status(200).json({
            message: messages.user.success.emailChanged
        });

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: messages.error.default })
    }
}