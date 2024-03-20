// app/_app.tsx
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

// Type the props with AppProps
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<Component {...pageProps} />
		</SessionProvider>
	)
}

export default MyApp
