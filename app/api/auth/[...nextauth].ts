// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'admin' },
				password: { label: 'Password', type: 'password' }
			},
			authorize: async (credentials) => {
				// Here you should verify the credentials with your users data
				// For simplicity, let's assume any user with the username "admin" and password "password" is an admin
				if (
					credentials?.username === 'admin' &&
					credentials.password === 'password'
				) {
					return {
						id: 1,
						name: 'Admin',
						email: 'admin@example.com',
						role: 'admin'
					}
				}
				// Return null if user data could not be retrieved
				return null
			}
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.role = user.role
			}
			return token
		},
		async session({ session, token }) {
			if (token) {
				session.user.role = token.role as 'admin' | 'user'
			}
			return session
		}
	},
	// Configure NextAuth session behavior
	session: {
		strategy: 'jwt'
	},
	// Add custom pages for login, etc.
	pages: {
		signIn: '/app/login/page' // The login page you previously created
		// You can add other custom pages if necessary
	}
})
