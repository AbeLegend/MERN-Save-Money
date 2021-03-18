import express from 'express';

const router = express.Router();

// middlewares
import { requireLogin } from '../middlewares/index';
// controllers
import { createMoney, readMoney } from '../controllers/moneyController';

router.post("/create-money", requireLogin, createMoney);
router.get("/read-money", requireLogin, readMoney);

module.exports = router;