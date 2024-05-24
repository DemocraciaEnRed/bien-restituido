import requiresAnon from "@/lib/middlewares/requiresAnon";
import { doblePasswordValidator, emailValidator, loginValidator, registerValidator, tokenValidator } from "@/lib/validators/auth";
import validate from "@/lib/validators/validate";
import NextApiRouter from "@billyen2012/next-api-router";
import { forgot, loggedIn, login, refreshToken, register, resendToken, resetPassword, verify } from '@/lib/controllers/authController'
import { authorize } from "@/lib/middlewares/authorize";


// initialize router
const router = NextApiRouter()

// -----------------------------------------------
// BASE     /auth
// -----------------------------------------------
// POST 	/auth/register
// POST 	/auth/login
// POST 	/auth/refresh-token
// GET 		/auth/verify/:token
// POST 	/auth/resend
// POST 	/auth/forgot
// POST 	/auth/reset/:token
// GET 		/auth/logged-in
// -----------------------------------------------



router.post('/register',
    requiresAnon,
    registerValidator,
    validate,
    register
);

router.post('/login',
    requiresAnon,
    loginValidator,
    validate,
    login
);

router.post('/refresh-token',
    authorize(),
    refreshToken
);

router.get('/verify/:token',
    tokenValidator,
    validate,
    verify
);

router.post('/resend',
    requiresAnon,
    emailValidator,
    validate,
    resendToken
);

router.post('/forgot',
    requiresAnon,
    emailValidator,
    validate,
    forgot
);


router.post('/reset/:token',
    requiresAnon,
    doblePasswordValidator,
    validate,
    resetPassword
);

router.get('/logged-in',
    loggedIn
);

export default router