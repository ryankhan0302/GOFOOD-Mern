const express = require('express');
const Order = require('../models/Orders');
const router = express.Router();

router.post('/orderData', async (req, res) => {
    try {
        let data = {
            Order_date: req.body.order_date,
            // Other properties if any
        };

        // Splice the data object into the order_data array
        let orderDataArray = req.body.order_data || [];
        orderDataArray.unshift(data);

        // Check if the email exists in the database
        let existingOrder = await Order.findOne({ 'email': req.body.email });
        if (!existingOrder) {
            // If email doesn't exist, create a new order document
            await Order.create({
                email: req.body.email,
                order_data: orderDataArray
            });
        } else {
            // If email exists, update the existing order document
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
        }
        
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error: ' + error.message);
    }
});

router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});

module.exports = router;
