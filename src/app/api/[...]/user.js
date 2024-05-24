import { changeEmail, changePassword, get, me, update } from "@/lib/controllers/userController";
import { authorize } from "@/lib/middlewares/authorize";
import { loginValidator } from "@/lib/validators/auth";
import { changePasswordValidator, updateUserValidator } from "@/lib/validators/user";
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
    updateUserValidator,
    validate,
    update
);

// PUT 	  /users/me/password
router.put('/me/password',
    authorize(),
    changePasswordValidator,
    validate,
    changePassword
);

// PUT 	  /users/me/email
router.put('/me/email',
    authorize(),
    loginValidator,
    validate,
    changeEmail
);

// GET 		/users/:userId
router.get('/:userId',
    get
);

export default router;