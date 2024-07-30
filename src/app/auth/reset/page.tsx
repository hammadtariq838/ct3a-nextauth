import { H2, P } from '@/components/Typography';
import { ResetForm } from "@/components/auth/reset-form";

const ResetPage = () => {
  return (
    <div className='flex flex-1 flex-row flex-wrap justify-evenly items-center gap-20'>
      <div className='flex flex-row justify-center'>
        <div className="flex flex-col items-center bg-white min-w-96 rounded-lg gap-4 pt-6 pb-9 px-10">
          <H2 className='flex items-center'>Forgot Password</H2>
          <P>Enter your email address and we will send you a link to reset your password.</P>
          <ResetForm />
        </div>
      </div>
    </div>
  );
}

export default ResetPage;