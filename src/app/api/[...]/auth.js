import requiresAnon from "@/lib/middlewares/requiresAnon";
import { doblePasswordSchema, loginSchema, registerSchema, } from "@/lib/validators/data-validate/auth";
import validate from "@/lib/validators/validate";
import NextApiRouter from "@billyen2012/next-api-router";
import { forgot, loggedIn, login, refreshToken, register, resendToken, resetPassword, verify } from '@/lib/controllers/authController'
import { authorize } from "@/lib/middlewares/authorize";
import { dataValidate, paramsValidate } from "@/lib/validators/data-validate";
import { emailSchema } from "@/lib/validators/data-validate/auth";
dataValidate(emailSchema)


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
    dataValidate(registerSchema),
    validate,
    register
);

router.post('/login',
    requiresAnon,
    dataValidate(loginSchema),
    validate,
    login
);

router.post('/refresh-token',
    authorize(),
    refreshToken
);

router.get('/verify/:token',
    paramsValidate(tokenSchema),
    validate,
    verify
);

router.post('/resend',
    requiresAnon,
    dataValidate(emailSchema),
    validate,
    resendToken
);

router.post('/forgot',
    requiresAnon,
    dataValidate(emailSchema),
    validate,
    forgot
);


router.post('/reset/:token',
    requiresAnon,
    dataValidate(doblePasswordSchema),
    validate,
    resetPassword
);

router.get('/logged-in',
    loggedIn
);

export default router