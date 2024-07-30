import { H2, P } from '@/components/Typography';
import { NewPasswordForm } from "@/components/auth/new-password-form";

const NewPasswordPage = () => {
  return (
    <div className='flex flex-1 flex-row flex-wrap justify-evenly items-center gap-20'>
      <div className='flex flex-row justify-center'>
        <div className="flex flex-col items-center bg-white min-w-96 rounded-lg gap-4 pt-6 pb-9 px-10">
          <H2 className='flex items-center'>Reset Password</H2>
          <P>Enter your new password and confirm it to reset your password.</P>
          <NewPasswordForm />
        </div>
      </div>
    </div>
  );
}

export default NewPasswordPage;