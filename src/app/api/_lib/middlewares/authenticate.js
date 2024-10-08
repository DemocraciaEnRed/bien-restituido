import { User } from "@/lib/models";
import { verify } from "jsonwebtoken";


const authorize = async (req, res, next) => {
    // if there is no token, continue
    if (!req.headers.get('Authorization')) return next();
    try {
        const authHeader = req.headers.get('Authorization')
        let token
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7, authHeader.length);
        } else {
            return next();
        }

        const userToken = verify(token, process.env.JWT_SECRET)

        const user = await User.findById(userToken._id);
        req.user = user
        // set up locale
        return next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: err.message });
    }

};

export default authorize