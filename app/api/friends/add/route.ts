import { fetchRedis } from '@/app/helpers/redis';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { addFriendValidator } from '@/lib/validation/add-friend';
import { log } from 'console';
import { NextApiResponse } from 'next';
import { z } from 'zod';

export async function POST(req: Request, res: NextApiResponse) {
	try {
		const body = await req.json();
		const { email: emailToAdd } = addFriendValidator.parse(body.email);
		const RESTResponse = await fetch(
			`${process.env.UPSTASH_REDIS_REST_URL}/get/user:email:${emailToAdd}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
				},
				cache: 'no-store',
			}
		);
		const data = (await RESTResponse.json()) as { result: string };
		const idToAdd = data.result;
		if (!idToAdd) {
			return new Response('This person does not exist.', { status: 400 });
		}
		const session = await auth();
		if (!session) {
			return new Response('Unathorized', { status: 401 });
		}
		if (idToAdd === session.user.id) {
			return new Response('you can not add your self', { status: 400 });
		}
		// check if user already added
		const isAlreadyAdded = (await fetchRedis(
			'sismember',
			`user:${idToAdd}:incoming_friend_requests`,
			session.user.id
		)) as 0 | 1;
		if (isAlreadyAdded) {
			return new Response('the user already added', { status: 400 });
		}
		// check if user already added
		const isAlreadyFriends = (await fetchRedis(
			'sismember',
			`user:${session.user.id}:friends`,
			idToAdd
		)) as 0 | 1;
		if (isAlreadyFriends) {
			return new Response('already friend with this user', { status: 400 });
		}
		// valid request, send friend request
		db.sadd(`user${idToAdd}:incoming_friend_requests`, session.user.id);
		// console.log(data);
		return new Response('ok', { status: 200 });
		// res.status(200).json(data);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response('Invalid request Payload', { status: 422 });
		}
		res.status(500).json({ error: error.message || 'Something went wrong' });
	}
}
