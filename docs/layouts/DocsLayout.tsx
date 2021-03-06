import Header from "~/components/Header"
import DocsNav from "../components/DocsNav"
import styles from "./DocsLayout.module.css"

export default function DocsLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Header className={styles.DocsHeader} />
			<section className={styles.DocsLayout}>
				<div className="flex flex-col-reverse gap-10 pt-24 mx-auto sm:flex-row">
					<div className="">
						<DocsNav className="w-[180px] sticky top-24" />
					</div>
					<main className="w-full space-y-5 sm:pb-20">{children}</main>
				</div>
			</section>
		</>
	)
}
