import { paramsValidate, queryValidate } from "@/lib/validators/data-validate";
import NextApiRouter from "@billyen2012/next-api-router";
import validate from "@/lib/validators/validate";
import { get, list } from "../_lib/controllers/extraFieldsController";
import { extraFieldIdSchema } from "@/lib/validators/data-validate/extraField";

// initialize router
const router = NextApiRouter()

// -----------------------------------------------
// BASE     /extrafield
// -----------------------------------------------
// GET 		/extrafield/
// GET 		/extrafield/:extraFieldId
// -----------------------------------------------

// GET /extrafield/
router.get('/',
  // queryValidate(queryAssetListSchema),
  validate,
  list
)

// GET 		/extrafield/:extraFieldId
router.get('/:extraFieldId',
  paramsValidate(extraFieldIdSchema),
  validate,
  get
)

export default router