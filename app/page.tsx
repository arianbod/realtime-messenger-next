import { db } from '@/lib/db';
import Image from 'next/image';

export default async function Home() {
	await db.set('id220-3331-xd2-22', {
		hello1: 'hello2',
		hello2: 'hello2',
		hello3: 'hello2',
	 hello4: 'hello2'});
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			hello
		</main>
	);
}
