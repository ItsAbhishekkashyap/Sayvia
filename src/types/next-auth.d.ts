import 'next-auth'

// ynha pe hm next-auth ke module me jo tnerface hai uske sath kaam kr rhe hai.
declare module 'next-auth'{
    interface User{
        _id?: string;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        username?: string;
    }
    interface Session{
        user: {
            _id?: string;
            isVerified?: boolean;
            isAcceptingMessages?: boolean;
            username?: string;

        } & DefaultSession['user']
    }
} 

declare module 'next-auth/jwt'{
    interface JWT {
        _id?: string;
        isVerified?: boolean;
    }
}
