"use client"
import React from "react"
import axios from "axios"
import useSWR from "swr"
import { DOMAIN, NEWS_ITEM } from "@/utils/urls"
import { usePathname } from "next/navigation"

interface INews {
	id: number
	name: string
	about: string
	author: string
	categorys: number
	date: string
	file: string
	image: string
}

const fetcher = async (url: string): Promise<INews> => {
	try {
		const { data } = await axios(url)
		return data
	} catch (error) {
		console.error(error)
		throw new Error("Failed to fetch data")
	}
}

const NewsDetail = () => {
	const pathname = usePathname()
	const { data: news, error, isLoading } = useSWR(NEWS_ITEM.replace("{id}", pathname.split("/")[2]), fetcher)

	const dateGetter = (str: string | undefined) => {
		if (!str) return ""
		const date = new Date(str)
		return `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`
	}

	if (error) {
		console.error(error)
	}

	if (isLoading) {
		return (
			<div className="flex items-center justify-center pt-4 min-h-[90vh]">
				<div
					className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
					role="status"
				>
					<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
						Loading...
					</span>
				</div>
			</div>
		)
	}

	return (
		<div className="container min-h-[90vh] flex justify-between p-10">
			<div className="w-[70%]">
				<p className="text-sm mb-2">{dateGetter(news?.date)}</p>

				<p className="mt-3 font-semibold">{news?.author}</p>

				<h1 className="text-[22px] font-semibold mb-3">{news?.name}</h1>

				<p className="text-[18px] font-medium mb-2 text-gray-900">Description</p>

				<p className="text-[16px] mb-4">{news?.about}</p>
			</div>

			<div className="w-1 border-r border-r-gray-900"></div>

			<div className="w-[20%]">
				<img className="hidden sm:w-[100%] sm:block h-fit" src={DOMAIN + news?.image} alt={news?.name} />

				<a
					href={DOMAIN + news?.file}
					target="_blank"
					className="text-white w-full text-[18px] bg-[#4285F4] hover:bg-[#4285F4]/90 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center justify-center me-2 mb-2 mt-3"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V11C19 11.5523 19.4477 12 20 12C20.5523 12 21 11.5523 21 11V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM10.3078 23.5628C10.4657 23.7575 10.6952 23.9172 10.9846 23.9762C11.2556 24.0316 11.4923 23.981 11.6563 23.9212C11.9581 23.8111 12.1956 23.6035 12.3505 23.4506C12.5941 23.2105 12.8491 22.8848 13.1029 22.5169C14.2122 22.1342 15.7711 21.782 17.287 21.5602C18.1297 21.4368 18.9165 21.3603 19.5789 21.3343C19.8413 21.6432 20.08 21.9094 20.2788 22.1105C20.4032 22.2363 20.5415 22.3671 20.6768 22.4671C20.7378 22.5122 20.8519 22.592 20.999 22.6493C21.0755 22.6791 21.5781 22.871 22.0424 22.4969C22.3156 22.2768 22.5685 22.0304 22.7444 21.7525C22.9212 21.4733 23.0879 21.0471 22.9491 20.5625C22.8131 20.0881 22.4588 19.8221 22.198 19.6848C21.9319 19.5448 21.6329 19.4668 21.3586 19.4187C21.11 19.3751 20.8288 19.3478 20.5233 19.3344C19.9042 18.5615 19.1805 17.6002 18.493 16.6198C17.89 15.76 17.3278 14.904 16.891 14.1587C16.9359 13.9664 16.9734 13.7816 17.0025 13.606C17.0523 13.3052 17.0824 13.004 17.0758 12.7211C17.0695 12.4497 17.0284 12.1229 16.88 11.8177C16.7154 11.4795 16.416 11.1716 15.9682 11.051C15.5664 10.9428 15.1833 11.0239 14.8894 11.1326C14.4359 11.3004 14.1873 11.6726 14.1014 12.0361C14.0288 12.3437 14.0681 12.6407 14.1136 12.8529C14.2076 13.2915 14.4269 13.7956 14.6795 14.2893C14.702 14.3332 14.7251 14.3777 14.7487 14.4225C14.5103 15.2072 14.1578 16.1328 13.7392 17.0899C13.1256 18.4929 12.4055 19.8836 11.7853 20.878C11.3619 21.0554 10.9712 21.2584 10.6746 21.4916C10.4726 21.6505 10.2019 21.909 10.0724 22.2868C9.9132 22.7514 10.0261 23.2154 10.3078 23.5628ZM11.8757 23.0947C11.8755 23.0946 11.8775 23.0923 11.8824 23.0877C11.8783 23.0924 11.8759 23.0947 11.8757 23.0947ZM16.9974 19.5812C16.1835 19.7003 15.3445 19.8566 14.5498 20.0392C14.9041 19.3523 15.2529 18.6201 15.5716 17.8914C15.7526 17.4775 15.9269 17.0581 16.0885 16.6431C16.336 17.0175 16.5942 17.3956 16.8555 17.7681C17.2581 18.3421 17.6734 18.911 18.0759 19.4437C17.7186 19.4822 17.3567 19.5287 16.9974 19.5812ZM16.0609 12.3842C16.0608 12.3829 16.0607 12.3823 16.0606 12.3823C16.0606 12.3822 16.0607 12.3838 16.061 12.3872C16.061 12.386 16.0609 12.385 16.0609 12.3842Z"
							fill="#fff"
						/>
					</svg>
					<span className="ml-2">Pdf</span>
				</a>
			</div>
		</div>
	)
}

export default NewsDetail
