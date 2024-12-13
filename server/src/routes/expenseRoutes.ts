import {Router} from "express";
import { getExpensesbyCategory } from "../controllers/expenseController";
const router = Router();
router.get("/", getExpensesbyCategory);

export default router;