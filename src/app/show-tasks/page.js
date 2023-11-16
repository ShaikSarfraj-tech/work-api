
import React from 'react'
import ShowTasks from './ShowTasks'

export const metadata = {
	title: "All Tasks : Work Manager"
}

export async function getData() {
	const response = await fetch('http://localhost:4000/products', {
		cache: 'force-cache'
	});
	const prods = await response.json();
	console.log("prods: ", prods);
}

const ShowTasksPage = async () => {
	const response = await fetch(`${process.env.BASE_URL}/api/current`);
	const user = await response.json();
	console.log(user);
	return (
		// <ShowTasks />
		<h1>hi</h1>
	)
}


export default ShowTasksPage

