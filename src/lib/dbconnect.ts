import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config({
//     path: './env'
// })

// isme hm focus karenge database ke conncetion pe


// ynha pe hm connecton ke type ko check kr rhe hai
type ConnectionObject = {
    isConnected?: number
    // here question mark represent optional hai value ho bhi skti hai aur nhi bhi
}

// ye ek variable connection hai jiska data type ConnectionObject hai
const connection: ConnectionObject = {}

// ab database connection se jo value return hogi vo ek promise hoga uske andr kya value aati hai usse hme koi mtlb nhi is liye hm vnha void likh denge  Promise<void>
async function dbConnect(): Promise<void>{
    // hm check karenge database connection hai ki nhi
    if(connection.isConnected){
        console.log("Alredy connected to database");
        return
    }
     
    try {
         const db = await mongoose.connect(process.env.MONGODB_URI || "", {})

         console.log(db)
         connection.isConnected = db.connections[0].readyState
         // readystate apne aap me ek number hota hai aur usi ko hme extract krna tha. nhi krte hai agr to bhi koi dikat wali bat nhi hai.

         console.log("DB Connected Successfully");

    } catch (error) {
        // ab agr connection nhi hua hai to process ko gracefully exit krdo. kyo ki jb connect hi nhi hua hai to baki application kaam krengi hi nhi.
        console.log("Database connection failed", error)
        process.exit()
    }
}

export default dbConnect; 