const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const Bid = require('../models/bidModel');
const authMiddleware = require('../middlewares/authenticate');

// API endpoint to handle bidding on a product
router.post('http://localhost:8000/api/v1/:productId/bid', authMiddleware.isAuthenticatedUser, async (req, res) => {
    const { productId } = req.params;
    const { amount } = req.body;
    const userId = req.user.id;

    try {
        // Check if the bid amount is greater than the current highest bid
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        
        if (product.user.toString() === userId) {
            return res.status(403).json({ success: false, message: 'You cannot bid on your own product' });
        }

        if (amount <= product.highestBid) {
            return res.status(400).json({ success: false, message: 'Bid amount must be greater than the current highest bid' });
        }

        // Create a new bid
        const bid = await Bid.create({ product: productId, user: userId, amount });

        // Update the highest bid for the product
        await Product.findByIdAndUpdate(productId, { highestBid: amount });

        res.status(201).json({ success: true, bid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;
