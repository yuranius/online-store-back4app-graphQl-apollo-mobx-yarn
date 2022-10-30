import {useMutation} from "@apollo/client";

export const [deleteCategorie, { loading, error }] = useMutation(DELETE_CATEGORIE, {
	update: (cache, deleteCategorie) => {
		const idToRemove = deleteCategorie.data.deleteCategorie.categorie_id;
		const existingData = cache.readQuery({
					query: GET_CATEGORIES_AND_PRODUCTS,
					variables: {
						site_id: localStorage.getItem("site_id"),
						page: (page   1),
				first: rowsPerPage,
				orderBy: [order],
				} });


		const deletedObject = existingData.productcategories.data.find((t) => (t.categorie_id === idToRemove));
		const newCats = existingData.productcategories.data.filter((t) => (t.categorie_id !== idToRemove));
		console.log(cache.writeQuery({
					query: GET_CATEGORIES_AND_PRODUCTS,
					variables: {
						site_id: localStorage.getItem("site_id"),
						page: (page   1),
				first: rowsPerPage,
				orderBy: [order],
	},
		data: {
			productcategories: {
				data: [
					...newCats
				]
			}
		}
	}));
	}
});