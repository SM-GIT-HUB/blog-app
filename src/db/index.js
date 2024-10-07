import mongoose from "mongoose"

let isConnected = false;

async function dbConnect()
{
    try {
        if (isConnected) {
            return;
        }

        const url = process.env.MONGO_URL || "mongodb://localhost:27017/nextblog";
        await mongoose.connect(url);

        isConnected = true;
        console.log("db connection successful");
    }
    catch(err) {
        console.log("error in dbConnect", err.message);
    }
}

export default dbConnect