import { Router } from "express";
import {
  getGraphDataController,
  getData,
  yearsData,
} from "../controllers/data.controller.js";
const router = Router();

router.route("/graphData").get(getGraphDataController);
router.route("/data").get(getData);
router.route("/years-data").get(yearsData);

export default router;
