'user server'
import dbConnect from "@/app/db/connection"
import AccountType from "@/app/models/AccountType";
import { revalidatePath } from "next/cache";

export async function deleteAccount(id:any){
    try {
    dbConnect();
        const account = await AccountType.findById(id)

        if(!account) {
            return new Error('No user found')
        }

        const deletedUser = await AccountType.findByIdAndDelete(id)

        revalidatePath('/console/AccountType')
        
    } catch (err) {
        console.log(err)
        return err
    }
}