## Shop
	 
fetchTypes
		res: [
		{createdAt: "2022-08-27T20:18:45.653Z"
		id: 1
		name: "Холодильники"
		updatedAt: "2022-08-27T20:18:45.653Z" }
		]

fetchBrands 
	res:[
		{createdAt: "2022-08-27T20:19:39.143Z"
		id: 1 
		name: "LG"
		updatedAt: "2022-08-27T20:19:39.143Z"}
		]

fetchDevices -> ( typeId: null, brandId: null, device.page, device.limit)
	res:
		count: 10
		rows: [
			{brandId: 2
			createdAt: "2022-08-28T07:13:11.857Z"
			id: 12
			img: "fec64ed0-29c7-437c-a254-2d196080e332.webp"
			name: "Sams-2345"
			price: 40000
			rating: 2.3
			typeId: 5
			updatedAt: "2022-09-11T05:06:21.628Z"}
		]
