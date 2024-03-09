"use client"
import React from "react"
import useSWR from "swr"
import axios from "axios"
import { DOMAIN, NEWS } from "@/utils/urls"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

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

const fetcher = async (url: string): Promise<INews[]> => {
	try {
		const { data } = await axios(url)
		return data
	} catch (error) {
		console.error(error)
		throw new Error("Failed to fetch data")
	}
}

const HomeNews = () => {
	const params = useSearchParams()
	const categoryId = params.get("category")
	const uri = categoryId ? `${NEWS}?category=${categoryId}` : NEWS

	const { data, error, isLoading } = useSWR(uri, fetcher)

	const dateGetter = (str: string) => {
		const date = new Date(str)
		return `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`
	}

	if (error) {
		console.error(error)
	}

	if (isLoading) {
		return (
			<div className="flex items-center justify-center pt-4">
				<div
					className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
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
		<div className="h-full px-3 pb-4 overflow-y-auto mt-3 flex flex-col gap-3 cursor-pointer">
			{data?.map((news) => (
				<Link
					href={`/news/${news.id}`}
					key={news.id}
					className="w-full rounded-lg bg-black/5 p-3 hover:bg-black/10 flex flex-col sm:flex-row gap-3"
				>
					<img className="hidden sm:w-[20%] sm:block" src={DOMAIN + news.image} alt={news.name} />

					<div className="flex flex-col gap-2 sm:w-[80%] w-full">
						<h1 className="font-semibold text-lg">{news.name}</h1>

						<p className="text-sm">{news.about}</p>

						<div>
							<p className="font-semibold">{news.author}</p>

							<p className="text-sm">{dateGetter(news.date)}</p>
						</div>
					</div>
				</Link>
			))}
		</div>
	)
}

export default HomeNews
