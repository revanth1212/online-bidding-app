
const APIFeatures = require('../utils/apifeatures');
const Bid=require('../models/productModel')

/* app.post('/api/v1/products/:productId/bid', async (req, res) => {
    const { productId } = req.params;
    const { userId, amount } = req.body;

    try {
        // Check if the bid amount is greater than the current highest bid
        const product = await Product.findById(productId);
        if (amount <= product.highestBid) {
            return res.status(400).json({ success: false, message: 'Bid amount must be greater than the current highest bid' });
        }

        // Create a new bid
        const bid = await Bid.create({ product: productId, user: userId, amount });

        // Update the highest bid for the product
        await Product.findByIdAndUpdate(productId, { highestBid: amount });

        res.status(201).json({ success: true, bid });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// API endpoint to retrieve the current highest bid for a product
app.get('/api/v1/products/:productId/highest-bid', async (req, res) => {
    const { productId } = req.params;

    try {
        const highestBid = await Bid.findOne({ product: productId }).sort({ amount: -1 }).populate('user');
        res.status(200).json({ success: true, highestBid });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}); */


app.post('http://localhost:8000/api/v1/products/:productId/bid', async (req, res) => {
    const { productId } = req.params;
    const { amount } = req.body;
    const userId = req.user.id; // Extract user ID from the authenticated user
    
    try {
        // Check if the bid amount is greater than the current highest bid
        const product = await Product.findById(productId);
        if (amount <= product.highestBid) {
            return res.status(400).json({ success: false, message: 'Bid amount must be greater than the current highest bid' });
        }

        // Create a new bid
        const bid = await Bid.create({ product: productId, user: userId, amount });

        // Update the highest bid for the product
        await Product.findByIdAndUpdate(productId, { highestBid: amount });

        res.status(201).json({ success: true, bid });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});