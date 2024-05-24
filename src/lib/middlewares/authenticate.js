import { verify } from "jsonwebtoken";
import User from "../models/User";


export default async (req, res, next) => {
    // if there is no token, continue
    // if (!req.headers.authorization) return next();
    // console.log('optionalAuthenticate')
    try {
        const authHeader = req.headers.get('authorization')
        let token
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7, authHeader.length);
        } else {
            return next();
        }
        const user = verify(token, process.env.JWT_SECRET)


        req.user = await User.findById(user._id);
        // set up locale
        return next();
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }

};