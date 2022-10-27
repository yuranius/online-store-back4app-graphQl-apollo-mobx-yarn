import {BrowserRouter as Router} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {useContext, useEffect} from "react";

import NavBar from "./components/Navbar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import Loader from "./components/Custom/Loader";
import {useQuery} from "@apollo/client";
import {GET_LOGGED_USER} from "./query/authAPI";


const App = observer(() => {
	const {user} = useContext(Context)

	const {data, loading, error} = useQuery(GET_LOGGED_USER)
	

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


	return (
			<Router>
				<NavBar/>
				{loading ?
						<Loader animation={'border'} variant={'primary'}/>
						:
						<AppRouter/>
				}
			</Router>

	);
})

export default App;
