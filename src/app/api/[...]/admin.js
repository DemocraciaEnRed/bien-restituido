import { exportUsers } from "@/app/api/_lib/controllers/adminController";
import { changeEmailByAdmin, changePasswordByAdmin, forceVerifyByAdmin, get, list, setRole, update } from "@/app/api/_lib/controllers/userController";
import { authorize } from "@/app/api/_lib/middlewares/authorize";
import { userRoles } from "@/lib/utils/constants";
import { dataValidate, paramsValidate, queryValidate } from "@/lib/validators/data-validate";
import { emailSchema } from "@/lib/validators/data-validate/auth";
import { queryUserListSchema } from "@/lib/validators/data-validate/query";
import { forceVerifiedSchema, roleSchema, singlePasswordSchema, updateUserSchema, userIdSchema } from "@/lib/validators/data-validate/user";
import validate from "@/lib/validators/validate";
import NextApiRouter from "@billyen2012/next-api-router";

// initialize router
const router = NextApiRouter()

// -----------------------------------------------
// BASE     /admin
// -----------------------------------------------
// GET 		/admin/users
// GET    /admin/users/authors
// GET 		/admin/users/:userId
// PUT    /admin/users/:userId
// PUT    /admin/users/:userId/role
// GET    /admin/projects
// -----------------------------------------------

// GET 		/admin/users
router.get('/users',
  authorize(userRoles.ADMIN),
  queryValidate(queryUserListSchema),
  validate,
  list
)

router.get('/users/csv',
  authorize(userRoles.ADMIN),
  exportUsers
)



// GET 		/admin/users/:userId
router.get('/users/:userId',
  authorize(userRoles.ADMIN),
  paramsValidate(userIdSchema),
  validate,
  get
)

// PUT    /admin/users/:userId
router.put('/users/:userId',
  authorize(userRoles.ADMIN),
  paramsValidate(userIdSchema),
  dataValidate(updateUserSchema),
  validate,
  update
)

router.put('/users/:userId/role',
  authorize(userRoles.ADMIN),
  paramsValidate(userIdSchema),
  dataValidate(roleSchema),
  validate,
  setRole
)



router.post('/users/:userId/force-verify',
  authorize(userRoles.ADMIN),
  paramsValidate(userIdSchema),
  validate,
  forceVerifyByAdmin
)

router.put('/users/:userId/password',
  authorize(userRoles.ADMIN),
  paramsValidate(userIdSchema),
  dataValidate(singlePasswordSchema),
  validate,
  changePasswordByAdmin
)

router.put('/users/:userId/email',
  authorize(userRoles.ADMIN),
  paramsValidate(userIdSchema),
  dataValidate(emailSchema),
  dataValidate(forceVerifiedSchema),
  validate,
  changeEmailByAdmin
)

export default router;