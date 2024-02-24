const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://gofood:ryankhan03@cluster0.bm5oxz0.mongodb.net/gofoodapp?retryWrites=true&w=majority';

const MongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log('Connected to MongoDB');
        const fetchedData = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const catData = await mongoose.connection.db.collection("food_Category").find({}).toArray();

    
        
        global.food_items=fetchedData;
        global.food_Category=catData;
        return { food_items: fetchedData, food_Category: catData };

       
    // If you need to return data from this function
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    
    }
};

module.exports = MongoDB;
