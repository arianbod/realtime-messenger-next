import { UpstashRedisAdapter } from '@auth/upstash-redis-adapter';
import NextAuth from 'next-auth';
import { db } from './lib/db';
import google from 'next-auth/providers/google';

const getGoogleCrendetials = () => {
	const clientId = process.env.GOOGLE_CLIENT_ID;
	const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
	if (!clientId || clientId.length === 0) {
		throw new Error('Missing Google clientId');
	}
	if (!clientSecret || clientSecret.length === 0) {
		throw new Error('Missing Google clientSecret');
	}
	return { clientId, clientSecret };
};
export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: UpstashRedisAdapter(db),
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/login',
	},
	providers: [
		google({
			clientId: getGoogleCrendetials().clientId,
			clientSecret: getGoogleCrendetials().clientSecret,
		}),
	],
});
