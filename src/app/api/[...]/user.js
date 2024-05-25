import { changeEmail, changePassword, get, me, update } from "@/lib/controllers/userController";
import { authorize } from "@/lib/middlewares/authorize";
import { dataValidate } from "@/lib/validators/data-validate";
import { loginSchema, } from "@/lib/validators/data-validate/auth";
import { changePasswordSchema, updateUserSchema } from "@/lib/validators/data-validate/user";
import validate from "@/lib/validators/validate";
import NextApiRouter from "@billyen2012/next-api-router";

const router = NextApiRouter()


// -----------------------------------------------
// BASE     /users
// -----------------------------------------------
// GET 		/users/me
// PUT 	  /users/me
// PUT 	  /users/me/password
// PUT 	  /users/me/email
// GET 		/users/:userId
// -----------------------------------------------

// GET 		/users/me
router.get('/me',
    authorize(),
    me
);

// PUT 	  /users/me
router.put('/me',
    authorize(),
    dataValidate(updateUserSchema),
    validate,
    update
);

// PUT 	  /users/me/password
router.put('/me/password',
    authorize(),
    dataValidate(changePasswordSchema),
    validate,
    changePassword
);

// PUT 	  /users/me/email
router.put('/me/email',
    authorize(),
    dataValidate(loginSchema),
    validate,
    changeEmail
);

// GET 		/users/:userId
router.get('/:userId',
    get
);

export default router;
