'use server'

const url = process.env.NEXTAUTH_URL as string;

export async function SignUpAction(data:{}) {
    try{
        const response = await fetch(`${url}/api/register`, {
            body:JSON.stringify(data),
            method:"POST",
            headers:{"Content-Type": "application/json"}
        } );

        return await response.json();

    }catch(err){
        console.log(err);
    }
}