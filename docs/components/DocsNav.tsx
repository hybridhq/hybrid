import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "./DocsNav.module.css"

export default function DocsNav({
	className,
	style
}: {
	className?: string
	active?: string
	style?: object
}) {
	const router = useRouter()

	return (
		<nav className={clsx(styles.DocsNav, className)} style={style}>
			{NAV.map(({ label, links }) => (
				<ul className="mb-5" key={label}>
					<p className="mb-1 text-xs font-medium text-gray-700 uppercase">
						{label}
					</p>

					{links.map(({ label, href }, i) => (
						<li className="mb-1 mr-6" key={`DocsNav-${i}`}>
							<Link
								className={clsx(
									router.asPath === href && styles.DocsNavItemActive
								)}
								href={href}
							>
								{label}
							</Link>
						</li>
					))}
				</ul>
			))}
		</nav>
	)
}

const NAV = [
	{
		label: "Overview",
		links: [
			{
				label: "Introduction",
				href: "/"
			},
			{
				label: "Smart Contracts",
				href: "/smart-contracts"
			},
			{
				label: "Deployment",
				href: "/deployment"
			},
			{
				label: "Configuration",
				href: "/configuration"
			}

			// {
			// 	label: "Twitter",
			// 	href: "https://twitter.com/hybrid__dev",
			// 	target: "_blank"
			// }
		]
	},
	{
		label: "Quickstart",
		links: [
			{
				label: "Next.js",
				href: "/quickstart/nextjs"
			},
			{
				label: "React",
				href: "/quickstart/react"
			}
			// {
			// 	label: "Remix",
			// 	href: "/docs/quickstart/remix"
			// },
			// {
			// 	label: "Redwood",
			// 	href: "/docs/quickstart/redwood"
			// }
		]
	},
	{
		label: "CLI",
		links: [
			// {
			// 	label: "build",
			// 	href: "/docs/cli#build"
			// },
			{
				label: "dev",
				href: "/cli/dev"
			},
			{
				label: "deploy",
				href: "/cli/deploy"
			}
		]
	},
	// {
	// 	label: "Smart Contracts",
	// 	links: [
	// 		{
	// 			label: "Overview",
	// 			href: "/docs/contracts/overview"
	// 		}
	// 		// {
	// 		// 	label: "ERC721",
	// 		// 	href: "/docs/contracts/ERC721"
	// 		// }
	// 	]
	// },
	{
		label: "Wallet Connection",
		links: [
			{
				label: "Connectkit",
				href: "/wallet/connectkit"
			},
			// {
			// 	label: "Magic Link",
			// 	href: "/docs/wallet/magiclink"
			// },
			{
				label: "Rainbowkit",
				href: "/wallet/rainbowkit"
			}
		]
	},
	{
		label: "Components",
		links: [
			{
				label: "<ConnectedAs />",
				href: "/components/ConnectedAs"
			},
			{
				label: "<ContractRead />",
				href: "/components/ContractRead"
			},
			{
				label: "<ContractWrite />",
				href: "/components/ContractWrite"
			},
			{
				label: "<TokenGate />",
				href: "/components/TokenGate"
			}
		]
	},
	{
		label: "Hooks",
		links: [
			// {
			// 	label: "useAllowList",
			// 	href: "/docs/hooks/useAllowList"
			// },
			// {
			// 	label: "useCounts",
			// 	href: "/docs/hooks/useCounts"
			// },
			{
				label: "useWallet",
				href: "/hooks/useWallet"
			}
			// {
			// 	label: "useTokenGating",
			// 	href: "/hooks/useTokenGating"
			// }
		]
	}
]
