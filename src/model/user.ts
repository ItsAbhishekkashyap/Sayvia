import mongoose, {Schema, Document} from "mongoose";

//  niche hmne ek interface bnaya hai message nam se jo typescript me bnana pdta hai. Pahle hme interface bnana padega. ye ek custom data type hai
export interface Message extends Document{
    content: string;
    createdAt: Date
}

//ab hm ek message schema bnayenge  ab kyoki ypr hmne interface bnaya hai to usse ynha use bhi krna padega as message schema ka type kya hai.

// niche hmne iska type Schema diya hai aur usme bhi konsa schema to ye ek message schema hai jo tuoescriot me type safety deta hai.

// iske sentence ko dhan rakhna Schema<Message>

// NOTE* = typrscript me string small me likhi jati hai(string) jb ki schema me Capital hota hai phla word (String)
const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },

    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    }
})

// Jaese hmne message ka Interface bnaya ab user ka bnana pde ga.

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isAcceptingMessage: boolean;
    isVerified: boolean;
    messages: Message[]
}

// ab aese hi exactly iska schema bnnana padega.
const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        trim: true,
        unique: true
    },

    email:{
        type: String,
        required: [true, "Mail is required"],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/
        , "Please use a valid email addredd"]
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    },

    verifyCode: {
        type: String,
        required: [true, "VerifyCode is required"]
    },

    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify Code expiry is required"]
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    isAcceptingMessage: {
        type: Boolean,
        default: true,
    },

    messages: [MessageSchema]

})

// Next js edge pe run krta hai usko nhi pta ki first time meri application boot up ho rhi ya isse phle bhi kyi bar ho chuki hai.
// to ye thoda issue aata hai isliye hm mongoose ko jb export krte hai vo thoda s a different hota hai.

// to jo hm user model export karenge vo do tarike se karenge ki hoskta hai ki oahle se bna hua ho air agr nhi ho to aur lga ke uske jgha mongoose me jake databse bna de.

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)
// ye syntax typescript hai as mongoose.Model<User>

export default UserModel;


// Very important jb mongoose ke through hm schema likhte hai to  vo likhte hai hm mongodb ke liye.

// lekin jo schemas folder me hm schemas likhenge vo likhenge dusre purpose ke liye like for validation.

// Refer to schemas folder
