// ab hm ynha pe apna saara logic likhenge signUp ka.
import dbConnect from "@/lib/dbconnect";
//database connection hr ek route pe lgta hai
import UserModel from "@/model/user";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    // jb kisi ne request kri tb hmne database ko connect kra.
    await dbConnect()
    try {
        const { username, email, password } = await request.json()
        // sbse pahle check krna hai ki user ka email exist krta hai aur vo verified hai  kya?
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })

        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
            }, { status: 400 })
        }

        const existingUserByEmail = await UserModel.findOne({ email })

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
        if (existingUserByEmail) {
            // ab agr user aaya hi pahli bar hai to usee fresh register karaynge
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User alredy exists with this email"
                }, { status: 400 })
            } else {
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await existingUserByEmail.save()
            }




        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            // is new date ke andr hme ek object mil rha aur object reference point ke andr ek area hai aur uske andr jo values hai vo change hoti hai.
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })

            await newUser.save()
        }

        //send verificaton Email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        )

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, { status: 500 })
        }

        return Response.json({
            success: true,
            message: "User registerd successfully. Please verify your email"
        }, { status: 201 })

    } catch (error) {
        // phle error console kra lete hai ye acha hoga.
        console.error("Error registering user", error)
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            },
            {
                status: 500
            }
        )
    }
}

