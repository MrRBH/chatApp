
import mongoose from 'mongoose'; 
export const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true, // Still recommended
            useUnifiedTopology: true // Helps with better connection handling
        });
        console.log(`MongoDB Connected: ${db.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit the process on failure
    }
};

