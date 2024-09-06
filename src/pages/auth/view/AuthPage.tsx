import { FormAuth } from "./components/FormAuth";



export const AuthPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-200 "
    >
      <div
        className="
          flex flex-col
          bg-white
          shadow-xl
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          rounded-xl
          w-50
          max-w-md
        "
      >
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Welcome Back
        </div>
        <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
          Enter your credentials to access your account
        </div>

        
          <FormAuth/>
        
      </div>
      <div className="flex justify-center items-center mt-6">
        <a
          href="#"
          target="_blank"
          className="
            inline-flex
            items-center
            text-gray-700
            font-medium
            text-xs text-center
          "
        >
          <span className="ml-2"
            >You don't have an account?
            <a
              href="#"
              className="text-xs ml-2 text-blue-500 font-semibold"
              >Register now</a
            ></span
          >
        </a>
      </div>
    </div>
  );
};

