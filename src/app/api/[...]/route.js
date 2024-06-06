import NextApiRouter from "@billyen2012/next-api-router";
import dbConnect from "@/lib/db/dbConnect";

import authRoutes from '@/app/api/[...]/auth'
import userRoutes from '@/app/api/[...]/user'
import adminRoutes from '@/app/api/[...]/admin'


import authenticate from "@/app/api/_lib/middlewares/authenticate";
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
app.use("/admin", adminRoutes)
app.use("/user", userRoutes)
app.get("/hello", (req, res, next) => {
  res.send("world")
})


const handler = app.handler();
export const dynamic = "force-dynamic";
export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
