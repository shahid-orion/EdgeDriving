import React from 'react'

type Props = {
	title: string
	content: string
	titleColor?: string // Optional prop for title text color
	contentColor?: string // Optional prop for content text color
}

const Card = ({
	title,
	content,
	titleColor = 'text-indigo-700',
	contentColor = 'text-gray-600'
}: Props) => {
	return (
		<div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white ml-5">
			{/* <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white h-auto min-h-[300px]"> */}
			<h2 className={`font-bold text-xl mb-2 ${titleColor}`}>{title}</h2>
			<p className={`text-base ${contentColor}`}>{content}</p>
		</div>
	)
}

export default Card
