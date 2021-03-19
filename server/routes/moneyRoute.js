import express from 'express';

const router = express.Router();

// middlewares
import { requireLogin } from '../middlewares/index';
// controllers
import { createMoney, readMoney, totalMoney } from '../controllers/moneyController';

router.post("/create-money", requireLogin, createMoney);
router.get("/read-money", requireLogin, readMoney);
router.get("/total-money", requireLogin, totalMoney);

module.exports = router;