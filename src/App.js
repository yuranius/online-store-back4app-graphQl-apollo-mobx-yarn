import {BrowserRouter as Router} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {useContext, useEffect, useState} from "react";

import NavBar from "./components/Navbar";
import {observer} from "mobx-react-lite";
import {Spinner} from "react-bootstrap";
import {Context} from "./index";
import Loader from "./components/Custom/Loader";
import {useQuery} from "@apollo/client";
import {GET_LOGGED_USER} from "./query/authAPI";
import Shop from "./pages/Shop";

const App = observer(() => {
	const {user} = useContext(Context)

	
	const {data, loading, error} = useQuery(GET_LOGGED_USER)
	
	//
	// useEffect(()=> {
	//     check().then(data => {
	//         user.setUser(data)
	//         user.setIsAuth(true)
	//     }).finally(() =>  setLoading(false))
	// },[])

	
	useEffect( () => {
		if (data) {
			user.setUser({
				id: data.viewer.user.id,
				email: data.viewer.user.username,
				role: data.viewer.user.role
			})
			user.setIsAuth(true)
		}
	}, [data])


	if (loading) {
		return <Spinner animation={"grow"}/>
	}

	return (
			<Router>
				{/*<NavBar/>*/}
				{/*{loading ?*/}
				{/*		<Loader animation={'border'} variant={'primary'}/>*/}
				{/*		:*/}
				{/*		<AppRouter/>*/}
				{/*}*/}

				<Shop />

			</Router>

	);
})

export default App;
