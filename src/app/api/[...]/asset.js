import { paramsValidate, queryValidate } from "@/lib/validators/data-validate";
import { assetIdSchema, queryAssetListSchema } from "@/lib/validators/data-validate/assets";
import NextApiRouter from "@billyen2012/next-api-router";
import { get, list } from "../_lib/controllers/assetsController";
import validate from "@/lib/validators/validate";

// initialize router
const router = NextApiRouter()

// -----------------------------------------------
// BASE     /asset/
// -----------------------------------------------
// GET 		/asset/
// GET 		/asset/:assetId
// -----------------------------------------------

// GET /asset/
router.get('/',
  queryValidate(queryAssetListSchema),
  validate,
  list
)

// GET 		/asset/:assetId
router.get('/:assetId',
  paramsValidate(assetIdSchema),
  validate,
  get
)

export default router