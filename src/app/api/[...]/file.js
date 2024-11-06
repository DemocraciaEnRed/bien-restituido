import fs from "fs";
import NextApiRouter from "@billyen2012/next-api-router";

// initialize router
const router = NextApiRouter()

// -----------------------------------------------
// BASE     /file
// -----------------------------------------------
// GET 		/file/
// GET 		/file/:uploadName
// -----------------------------------------------


// GET 		/file/:uploadName
router.get('/:uploadName',
  (req, res) => {
    const { uploadName } = req.params

    const file = fs.readFileSync(process.cwd() + `/upload/${uploadName}`);
    // just send it
    res.send(file);
  }
)

export default router