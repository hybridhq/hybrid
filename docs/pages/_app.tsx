import "~/styles/globals.css"

import Head from "next/head"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"

import DocsLayout from "~/layouts/DocsLayout"

function App({ Component, pageProps }: AppProps) {
	const router = useRouter()

	if (router.pathname === "/_error") {
		return <Component {...pageProps} />
	}

	return (
		<>
			<Head>
				<title>Hybrid - Solidity + Typscript Development Framework</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no"
				/>
				<meta name="description" content="" />
				<meta name="author" content="hybrid" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/docs/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/docs/favicon-16x16.png"
				/>
				<link rel="manifest" href="/docs/site.webmanifest" />
				<meta name="msapplication-TileColor" content="#06050A" />
				<meta name="theme-color" content="#06050A" />
				<script
					defer
					data-domain="hybrid.dev"
					src="https://plausible.io/js/script.js"
				/>
			</Head>
			<DocsLayout>
				<Component {...pageProps} />
			</DocsLayout>
		</>
	)
}

export default App
