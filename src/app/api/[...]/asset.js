import { queryValidate } from "@/lib/validators/data-validate";
import { queryAssetListSchema } from "@/lib/validators/data-validate/assets";
import NextApiRouter from "@billyen2012/next-api-router";
import { list } from "../_lib/controllers/assetsController";
import validate from "@/lib/validators/validate";

// initialize router
const router = NextApiRouter()

// -----------------------------------------------
// BASE     /asset
// -----------------------------------------------
// GET 		/asset
// -----------------------------------------------


router.get('/',
  queryValidate(queryAssetListSchema),
  validate,
  list
)

export default router