import { paramsValidate, queryValidate } from "@/lib/validators/data-validate";
import { assetIdSchema, queryAssetDownloadSchema, queryAssetListSchema } from "@/lib/validators/data-validate/assets";
import NextApiRouter from "@billyen2012/next-api-router";
import { archive, create, download, get, list, publish, update } from "../_lib/controllers/assetsController";
import validate from "@/lib/validators/validate";
import { authorize } from "../_lib/middlewares/authorize";
import { userRoles } from "@/lib/utils/constants";

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

// POST 		/asset
router.post('/',
  authorize([userRoles.ADMIN, userRoles.GESTOR]),
  validate,
  router.bodyParser.form(),
  create
)

// PUT 		/asset
router.put('/:assetId',
  authorize([userRoles.ADMIN, userRoles.GESTOR]),
  validate,
  router.bodyParser.form(),
  update
)

// GET 		/asset/:assetId
router.get('/:assetId',
  paramsValidate(assetIdSchema),
  validate,
  get
)

// GET 		/asset/archive/:assetId
router.get('/archive/:assetId',
  authorize([userRoles.ADMIN, userRoles.GESTOR]),
  paramsValidate(assetIdSchema),
  validate,
  archive
)

router.get('/publish/:assetId',
  authorize([userRoles.ADMIN, userRoles.GESTOR]),
  paramsValidate(assetIdSchema),
  validate,
  publish
)

router.get('/download',
  queryValidate(queryAssetDownloadSchema),
  validate,
  download
)

export default router