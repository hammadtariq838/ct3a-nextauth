import React from 'react';
import { redirect } from "next/navigation";
import { Button } from '@/components/ui/button';
import { H1, H2, P, Muted } from '@/components/Typography';
import { TUserRoleGroupCombination, UserRoleGroupCombinationSchema } from '@/schemas';
import { StudentRegisterForm } from "@/components/auth/student-register-form";
import { TutorRegisterForm } from '@/components/auth/tutor-register-form';

const RoleSelectionCards = async () => {
  const RoleSelectionForm = ({ role, group }: Readonly<TUserRoleGroupCombination>) => (
    <form className='w-full'>
      <input type="hidden" name="role" value={role} />
      <input type="hidden" name="group" value={group} />
      <Button type="submit" className='w-full'>Sign Up</Button>
    </form>
  )

  return (
    <React.Fragment>
      <div className='flex flex-col gap-4 bg-white rounded-lg p-6 text-wrap max-w-80 items-center'>
        <img src='/parent-svg.svg' alt='parent-role-selection-svg' />
        <H1>Parent</H1>
        <Muted className='text-center'>Sign up as a parent to provide your children with the top-tier tutoring they deserve.</Muted>
        <RoleSelectionForm {...{ role: 'STUDENT', group: 'PARENT' }} />
      </div>
      <div className='flex flex-col gap-4 bg-white rounded-lg p-6 text-wrap max-w-80 items-center'>
        <img src='/student-svg.svg' alt='student-role-selection-svg' />
        <H1>Student</H1>
        <Muted className='text-center'>Sign up as a student to chat with tutors, book lessons, and meet your tutor.</Muted>
        <RoleSelectionForm {...{ role: 'STUDENT', group: 'SELF' }} />
      </div>
      <div className='flex flex-col gap-4 bg-white rounded-lg p-6 text-wrap max-w-80 items-center'>
        <img src='/tutor-svg.svg' alt='tutor-role-selection-svg' />
        <H1>Tutor</H1>
        <Muted className='text-center'>Sign up as a tutor to view booking requests and inspire new students.</Muted>
        <RoleSelectionForm {...{ role: 'TUTOR', group: 'ENROLLED' }} />
      </div>
    </React.Fragment>
  )
}

const SignUpCard = async ({ role, group }: Readonly<TUserRoleGroupCombination>) => (
  <div className='flex flex-row justify-center'>
    <div className="flex flex-col items-center bg-white min-w-96 rounded-lg gap-4 pt-6 pb-9 px-10">
      <div className="flex items-center">
        <H2>Sign Up</H2>
        <H2>&nbsp;|&nbsp;</H2>
        <P>{role === 'TUTOR' ? role.charAt(0).toUpperCase() + role.slice(1) : group.charAt(0).toUpperCase() + group.slice(1)}</P>
      </div>
      {
        role === 'TUTOR' ? <TutorRegisterForm group={group} /> :
          role === 'STUDENT' ? <StudentRegisterForm group={group} /> :
            redirect('/auth/login')
      }
    </div>
  </div>
)

const RegisterPage = async ({ searchParams }: Readonly<{ searchParams: unknown }>) => {

  let params: TUserRoleGroupCombination | undefined = undefined;
  try {
    params = UserRoleGroupCombinationSchema.parse(searchParams);
  } catch (error) {
    params = undefined;
  }

  return (
    <div className='flex flex-1 flex-row flex-wrap justify-evenly items-center gap-20'>
      {params ? <SignUpCard {...params} /> : <RoleSelectionCards />}
    </div>
  );
}

export default RegisterPage;
