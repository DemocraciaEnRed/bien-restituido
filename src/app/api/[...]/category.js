import { paramsValidate, queryValidate } from "@/lib/validators/data-validate";
import { assetIdSchema, queryAssetListSchema } from "@/lib/validators/data-validate/assets";
import NextApiRouter from "@billyen2012/next-api-router";
import validate from "@/lib/validators/validate";
import { categoryIdSchema } from "@/lib/validators/data-validate/category";
import { get, list } from "../_lib/controllers/categoryController";

// initialize router
const router = NextApiRouter()

// -----------------------------------------------
// BASE     /category
// -----------------------------------------------
// GET 		/category/
// GET 		/category/:categoryId
// -----------------------------------------------

// GET /asset/
router.get('/',
  // queryValidate(queryAssetListSchema),
  validate,
  list
)

// GET 		/category/:categoryId
router.get('/:categoryId',
  paramsValidate(categoryIdSchema),
  validate,
  get
)

export default router