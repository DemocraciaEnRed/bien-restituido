import { paramsValidate, queryValidate } from "@/lib/validators/data-validate";
import { assetIdSchema, queryAssetListSchema } from "@/lib/validators/data-validate/assets";
import NextApiRouter from "@billyen2012/next-api-router";
import validate from "@/lib/validators/validate";
import { get, list } from "../_lib/controllers/subCategoryController";
import { subCategoryIdSchema } from "@/lib/validators/data-validate/subcatergory";

// initialize router
const router = NextApiRouter()

// -----------------------------------------------
// BASE     /subCategory
// -----------------------------------------------
// GET 		/subCategory/
// GET 		/subCategory/:subCategoryId
// -----------------------------------------------

// GET /subCategory/
router.get('/',
  // queryValidate(queryAssetListSchema),
  validate,
  list
)

// GET 		/subCategory/:subCategoryId
router.get('/:subCategoryId',
  paramsValidate(subCategoryIdSchema),
  validate,
  get
)

export default router