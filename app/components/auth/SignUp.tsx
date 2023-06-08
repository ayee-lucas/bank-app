import SignUpForm from './SignUpForm'
import Link from 'next/link'
import Image from 'next/image'
import logo from "../../../public/Images/Logos/NovarisLogo.png"

export const SignUp = () => {
  return (
    <main className="bg-violet-100 dark:bg-violet-950 relative min-h-screen w-full flex flex-col justify-center items-center">
      
      <div className="flex items-center justify-center mb-10 text-7xl font-bold text-gray-900 dark:text-white">
          <Image
            className="mr-2"
            src={logo}
            width={100}
            height={100}
            alt="logo"
          />
          Novaris 
        </div>
      
      <div className="bg-white dark:bg-[#190a37] w-3/5 max-w-full h-full rounded-xl shadow-lg z-10">       

        <div className="flex items-center justify-between p-4">

          <div className="w-full h-full p-4">
            <SignUpForm />
            <h1 className="text-sm py-4 text-gray-400 dark:text-gray-200">
              Already have an account?
              {' '}
              <Link
                    href="/auth/Login"
                    type="button"
                    className=" hover:underline font-medium text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-gray-200"
                >
                Login
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignUp;
