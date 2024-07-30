import { LoginForm } from "@/components/auth/login-form";
import { H1 } from "@/components/Typography";

const LoginPage = () => {
  return (
    <div className='flex flex-row justify-center'>
      <div className="flex flex-col items-center bg-white min-w-96 rounded-lg gap-4 pt-6 pb-9 px-10">
        <H1>Log In</H1>
        <LoginForm />
      </div >
    </div >
  );
}

export default LoginPage;