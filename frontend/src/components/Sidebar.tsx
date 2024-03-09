"use client"
import React, { Fragment } from "react"
import useSWR from "swr"
import axios from "axios"
import { CATEGORIES } from "@/utils/urls"
import Link from "next/link"

interface ICategories {
	id: number
	name: string
}

const fetcher = async (url: string): Promise<ICategories[]> => {
	try {
		const { data } = await axios(url)
		return data
	} catch (error) {
		console.error(error)
		throw new Error("Failed to fetch data")
	}
}

const Sidebar = () => {
	const { data, error, isLoading } = useSWR(CATEGORIES, fetcher)

	if (error) {
		console.error(error)
	}

	return (
		<Fragment>
			<aside
				id="logo-sidebar"
				className="min-w-64 hidden sm:w-[20%] sm:block min-h-screen pt-5 transition-transform -translate-x-full bg-gray-100 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
				aria-label="Sidebar"
			>
				{!isLoading ? (
					<div className="h-full px-3 pb-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
						<ul className="space-y-2 font-medium">
							<li>
								<Link
									href="/"
									className="flex items-center p-2 text-gray-900 hover:bg-gray-200 bg-gray-200 rounded-lg dark:text-white dark:bg-gray-700 dark:hover:bg-gray-700 group"
								>
									<span className="ms-3">All Categories</span>
								</Link>
							</li>
							{data?.map((category) => (
								<li key={category.id}>
									<Link
										href={{ pathname: "", query: { category: category.id } }}
										className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
									>
										<span className="ms-3">{category.name}</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
				) : (
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
				)}
			</aside>

			<aside
				id="logo-sidebar"
				className="w-full sm:hidden pt-5 bg-gray-100 border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
				aria-label="Sidebar"
			>
				{!isLoading ? (
					<div className="h-full px-3 pb-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
						<ul className="space-y-2 font-medium">
							<p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group">
								<span className="ms-3">All Categories</span>
							</p>
							{data?.map((category) => (
								<li key={category.id}>
									<p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
										<span className="ms-3">{category.name}</span>
									</p>
								</li>
							))}
						</ul>
					</div>
				) : (
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
				)}
			</aside>
		</Fragment>
	)
}

export default Sidebar
