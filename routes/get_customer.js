import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/api/customers/:phone", (req, res) => {
    const phone = req.params.phone;
    const sql = `SELECT * FROM customer 
                WHERE phone = ?
                ORDER BY customer_id ASC`;
    db.query(sql, [phone], (err, results) => {
        if (err) {
            console.error("GET Error:", err.message);
            return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
            res.json({
                message: "success",
                data: results[0],
            });
        }
        else {
            res.json({
                message: "not_found",
                error: "ไม่พบข้อมูล กรุณาตรวจสอบเบอร์"
            });
        }
    });
});

export default router;