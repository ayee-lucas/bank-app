'use server'
import dbConnect from "@/app/db/connection"
import AccountType from "@/app/models/AccountType";
import { redirect } from 'next/navigation';

export async function reload(){
    redirect("/console/AccountType")
}

export async function deleteAccount(_id:any){
    try {
    dbConnect();
        window.location.reload()
        const account = await AccountType.findById(_id)

        if(!account) {
            return new Error('No user found')
        }

        const deletedUser = await AccountType.findByIdAndDelete(_id)
        console.log(deletedUser)
        
        
    } catch (err) {
        console.log(err)
        return err
    }
}