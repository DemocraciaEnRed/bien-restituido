import NextApiRouter from "@billyen2012/next-api-router";
import dbConnect from "@/lib/db/dbConnect";

import authRoutes from '@/app/api/[...]/auth'
import userRoutes from '@/app/api/[...]/user'
import adminRoutes from '@/app/api/[...]/admin'


import authenticate from "@/lib/middlewares/authenticate";
import { renderHtml } from "@/lib/services/mailer";
import verify from "@/lib/services/templates/verify";
//=== 1 - CREATE APP
const app = NextApiRouter({
  timeout: 20 * 1000, // you can set this to false to completely disabled the timeout mechanism, however, this is not reocmmanded.
  apiFolderPath: "/api", // '/api' will be the default
  ejsFolderPath: "/src/app/views", // need include all folder encounter from the route (there is no default value). No need to set this up if you are not using ejs.
  treatReturnAsResponse: false, // if set to true, return data will be treated as a response.
});

app.use(app.bodyParser.json());

//=== 2 - SET UP DATABASE & MIGRATIONS
app.use(async (req, res, next) => {
  await dbConnect()
  next()
})



app.use(authenticate)
app.use("/auth", authRoutes);
app.use("/user", userRoutes)
app.use("/admin", adminRoutes)




app.get("/hello", (req, res, next) => {

  res.json(req.user);
});


/* const te = renderHtml(verify, { url: 'holi' })

res.writeLine(`${te}`); */
app.get("/writeline",
  /**
   * This callback must not be an async proces.
   * Instead, put everything into a async function locally
   * and call it at the end (just see example below)
   **/
  (req, res, next) => {
    res.writeHead(200, { "content-type": "text/html" });
    const te = renderHtml(verify, { url: 'esta.es.una.url' })
    res.writeLine(`${te}`);
    res.end("");

  });

const handler = app.handler();
export const dynamic = "force-dynamic";
export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
