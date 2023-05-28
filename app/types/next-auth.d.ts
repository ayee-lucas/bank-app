import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user:{
            id: number;
            sub:  string;
            username: string;
            email: string; 
            role: string
            accessToken: string;
            image: string;
            picture:string;
        }
    }
}