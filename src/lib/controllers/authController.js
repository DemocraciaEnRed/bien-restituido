import { messages } from "../utils/messages";
import Token from "../models/Token";
import User from "../models/User";
import { formatString } from "../utils/format-string";
import { renderHtml, sendNow } from "../services/mailer";
import verifyTemplate from "@/lib/services/templates/verify";
import reset from "../services/templates/reset";
import singUp from "../services/templates/singUp";



export const register = async (req, res) => {
    try {
        const { email, password, name } = req.data;

        // Make sure this account doesn't already exist
        const user = await User.findOne({ email });

        if (user) {
            return res.status(401).json({ message: messages.auth.error.emailAssociated });
        }

        const newUser = new User({
            email: email,
            password: password,
            name: name,
        });

        await newUser.save();

        // generate and set password reset token
        const token = newUser.generateVerificationToken();
        // save the verification token
        await token.save()
        // make the url
        const url = `${process.env.NEXT_PUBLIC_URL_APP}/autenticacion/verificacion/${token.token}`;

        // send email
        await sendNow(email, 'Confirmá tu registro', `${renderHtml(singUp, { url: url })}`);

        return res.status(201).json({ message: formatString(messages.auth.success.verificationMailSent, newUser.email) });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: messages.error.default })
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.data;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: messages.auth.error.invalidCredentials });
        }

        //validate password
        if (!user.comparePassword(password)) {
            return res.status(401).json({ message: messages.auth.error.invalidCredentials });
        }

        // Make sure the user has been verified
        if (!user.isVerified) {
            return res.status(401).json({ message: messages.auth.error.unverified });
        }

        const outputUser = {
            _id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
        }
        // Login successful, write token, and send back user
        return res.status(200).json({ token: await user.generateJWT(), user: outputUser });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: messages.error.default })
    }
};

export const refreshToken = async (req, res) => {
    try {
        // authenticate middleware already checked if the user is logged
        const user = req.user;
        // Login successful, write token, and send back user
        return res.status(200).json({ token: await user.generateJWT() });

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: messages.error.default })
    }
}

export const verify = async (req, res) => {
    try {
        // Find a matching token
        const token = await Token.findOne({ token: req.params.token });
        // if the token is not found, return an error 
        if (!token) {
            return res.status(400).json({ message: messages.auth.error.tokenNotFound });
        }
        // If we found a token, find a matching user
        const user = await User.findOne({ _id: token.userId });
        // if the user is not found return an error
        if (!user) {
            return res.status(400).json({ message: messages.auth.error.userNotFound });
        }
        // if the user is already verified, return error
        if (user.isVerified) {
            return res.status(400).json({ message: messages.auth.error.alreadyVerified });
        }
        // token exists and the user is not verified, so we can verify the user
        user.isVerified = true;
        // save it
        await user.save();
        // return success
        return res.status(200).json({ message: messages.auth.success.verification });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: messages.error.default })
    }
};

export const resendToken = async (req, res) => {
    try {
        const { email } = req.data;
        const user = await User.findOne({ email });
        // if the user was not found, return error
        if (!user) {
            return res.status(401).json({ message: messages.auth.error.emailNotFound });
        }
        // if the user is already verified, return error
        if (user.isVerified) {
            return res.status(400).json({ message: messages.auth.error.alreadyVerified });
        }
        // generate a new token 
        const token = user.generateVerificationToken();
        // Save the verification token
        await token.save();
        // make the url
        const url = `${process.env.NEXT_PUBLIC_URL_APP}/autenticacion/verificacion/${token.token}`;

        // send email

        await sendNow(email, 'Verifica tu email', `${renderHtml(verifyTemplate, { url: url })}`);


        return res.status(200).json({ message: formatString(messages.auth.success.verificationMailResent, user.email) });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: messages.error.default })
    }
};


export const forgot = async (req, res) => {
    try {
        const { email } = req.data;
        // find the user with the email
        const user = await User.findOne({ email });
        // if user is not found, return error
        if (!user) {
            return res.status(401).json({ message: formatString(messages.auth.error.emailNotAssociated, email) });
        }
        // generate and set password reset token
        user.generatePasswordReset();
        // Save the updated user object
        await user.save();
        // now send the password change request email

        // make the url
        const protocol = req.headers.get('x-forwarded-proto') || 'http';
        const url = `${process.env.NEXT_PUBLIC_URL_APP}/autenticacion/verificacion/${user.resetPasswordToken}`;

        await sendNow(email, 'Restablecer tu contraseña', `${renderHtml(reset, { url: url })}`);;

        res.status(200).json({ message: formatString(messages.auth.success.resetMailSent, email) });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: messages.error.default })
    }
};


export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

        if (!user) return res.status(401).json({ message: messages.auth.error.tokenNotFound });

        //Set the new password
        user.password = req.data.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.isVerified = true;
        // Save the updated user object
        await user.save();

        // let subject = "Your password has been changed";
        // let to = user.email;
        // let from = process.env.FROM_EMAIL;
        // let html = `<p>Hi ${user.username}</p>
        //             <p>This is a confirmation that the password for your account ${user.email} has just been changed.</p>`

        // await sendEmail({to, from, subject, html});

        return res.status(200).json({ message: messages.auth.success.passwordUpdated });

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: messages.error.default })
    }
};


export const loggedIn = async (req, res) => {
    try {
        let loggedIn = false;
        if (req.user) loggedIn = true;
        // return if the user is loggedIn
        return res.status(200).json({ loggedIn: loggedIn });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: req.__('error.default') })
    }
}