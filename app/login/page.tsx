'use client';
import { FcGoogle } from 'react-icons/fc';
import Button from '@/components/ui/Button';
import { FC, ReactNode, useState } from 'react';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

interface pageProps {}
const Page: FC<pageProps> = ({}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	async function loginWithGoogle() {
		try {
			await signIn('google');
			toast.success('you are in');
			setIsLoading(true);
		} catch (error) {
			toast.error('something went wrong');
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<>
			<div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<div className='w-full flex flex-col items-center max-w-md space-y-8'>
					<div className='flex flex-col items-center gap-8'>Logo</div>
					<h2 className='mt-6 capitalize text-center text-3xl font-bold tracking-tight text-gray-900'>
						sign in to your account
					</h2>
					<Button
						isLoading={isLoading}
						type='button'
						className='max-w-sm mx-auto w-full bg-slate-800 text-white'
						onClick={loginWithGoogle}>
						{!isLoading && <FcGoogle />}Google
					</Button>
				</div>
			</div>
		</>
	);
};
export default Page;
