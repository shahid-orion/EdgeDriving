// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
	/**
	 * Extending the built-in session types
	 */
	interface Session {
		user: {
			role?: 'admin' | 'user'
		} & DefaultUser
	}
}
