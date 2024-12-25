import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/user";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema"

const UsernameQuerySchema = z.object({
    username: usernameValidation,

})

export async function GET(request: Request) {

    await dbConnect()
    // localhost:3000/api/cuu?username=hitesh?phone=android

    try {
        const {searchParams} = new URL(request.url)
        // is search params me se hme apni query nikalni hai. kyoki ho skta hai usme bhut saare parameters aaye ho lekin hme apna parameters chahiye.
        const queryParam = {
            username: searchParams.get('username')
        }
        // ynha se hme username mil jaye ga

        // Validate with zod

        const result = UsernameQuerySchema.safeParse(queryParam)

        // ye check kr lega ki queryparams me jo value hai use validate kr lega.
        console.log(result) // TODO remove
        
        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                success: false,
                message: usernameErrors?.length > 0 ? usernameErrors.join(','): 'Invalid query parameters',
            }, {status: 400})
        }

        const {username} = result.data

        const existingVerifiedUser = await UserModel.findOne({username, isVerified: true})

        if(existingVerifiedUser){
            return Response.json({
                success: false,
                message: 'Username is already taken',
            }, {status: 400})
        }

        return Response.json({
            success: true,
            message: 'Username is unique',
        }, {status: 400})


    } catch (error) {
        console.error("Error checking username", error)
        return Response.json(
            {
                success: false,
                message: "Error checking username"
            },
            { status: 500 }
        )
    }
}
