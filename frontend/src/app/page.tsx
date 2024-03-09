import Sidebar from "@/components/Sidebar"
import HomeNews from "@/components/HomeNews"

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col sm:flex-row">
			<Sidebar />

			<div className="container sm:w-[80%] w-full">
				<HomeNews />
			</div>
		</div>
	)
}
