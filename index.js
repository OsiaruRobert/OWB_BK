import express from "express";
import cors from "cors";
const app = express();

//Production ready

import { connectDB } from "./functions/mongoose.func.js";
import { getCurrentDateTime } from "./functions/moment.func.js";
import authRouter from "./routers/auth.routes.js";
import buyRouter from "./routers/buy.routes.js";
import fundRouter from "./routers/fund.routes.js";
import cfg from "./cfg.js";

import { admin } from "./controllers/admin.controllers.js";

app.use(express.json());
app.use(cors("*"));

app.use((req, res, next) => {
 req.reqtime = getCurrentDateTime().toString();
 console.log(req.reqtime);
 next();
});

app.get("/", (req, res) => {
 res.status(200).json({
  message:
   "Welcome to OWB! Please Read our Doc https://onlinewithbeta.name.ng/docs"
 });
});
app.use("/v1/auth", authRouter);
app.use("/v1/buy", buyRouter);
app.use("/v1/fund", fundRouter);

app.use((req, res) => {
 res.status(404).json({
  message:
   "Wrong EndPoint Please Read our Doc https://onlinewithbeta.name.ng/docs"
 });
});

app.listen(cfg.PORT || 2025, async () => {
 try {
  console.clear();

  await connectDB();
  console.log(`http://localhost:${cfg.PORT || 2025}`);
 // await admin();
 } catch (err) {
  console.log(err.message);
  console.log("Exit sadly");
  process.exit(1);
 }
});
