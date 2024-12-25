// kis type se hmara response dikhna chahiye.
// and ye hmesha interface hi hota hai
import { Message } from "@/model/user";

export interface ApiResponse{
    success: boolean;
    message: string;
    isAcceptingMessage?: boolean 
    messages?: Array<Message>
}

