import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {check} from "../http/userApi";
import {observer} from "mobx-react-lite";
import Toasts from "../components/Custom/Toasts";
import {Context} from "../index";
import Acc from "../components/Custom/Accordion";
import {useShowMessageToasts} from "../hooks/useMassage";
import {useMutation} from "@apollo/client";
import {LOGIN, REGISTRATION} from "../query/authAPI";

const Auth = observer(() => {
			const {user} = useContext(Context)
			const location = useLocation()
			const isLogin = location.pathname === LOGIN_ROUTE

			const [newUser] = useMutation(REGISTRATION)
			const [auth] = useMutation(LOGIN)

			const addUser = () => {
				newUser({
					variables: {
						email: email,
						password: password,
						username: email,
						role: 'USER',
					}
				})
			}

			const login = () => {
				auth({
					variables: {
						username: email,
						password: password
					}
				}).then( res => {
							user.setUser({
								id: res.data.logIn.viewer.user.id,
								email: res.data.logIn.viewer.user.username,
								role: res.data.logIn.viewer.user.role
							})
							localStorage.setItem('token', res.data.logIn.viewer.sessionToken)
							user.setIsAuth(true)
							navigate(SHOP_ROUTE, {from: 'auth_page'})
						}
				)
			}

			const [email, setEmail] = useState('')
			const [password, setPassword] = useState('')

			const {showWarning, variant, message, showToasts, title, setShowToasts} = useShowMessageToasts()

			const navigate = useNavigate()

			const click = async () => {
				try {
					if (isLogin) {
						login()
					} else {
						addUser()
					}
					// check().then(data => {
					// 	user.setUser(data)
					// 	user.setIsAuth(true)
					// })
					// user.setUser(data)
					// user.setIsAuth(true)
					//navigate(SHOP_ROUTE, {from: 'auth_page'})
				} catch (error) {
					console.log('📌:', error.message, '🌴 🏁')

					showWarning(error.response.data.message, 'Ошибка!')
				}
			}

			return (
					<Container className='d-flex justify-content-center align-items-center flex-column'
					           style={{height: window.innerHeight - 100}}>
						<Card style={{width: 600}} className='p-5'>
							<h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
							<Form className='d-flex flex-column'>
								<Form.Control className='my-2' placeholder='Введите ваш email...' type='email' value={email}
								              onChange={(e) => setEmail(e.target.value)}/>
								<Form.Control className='my-2' placeholder='Введите пароль...' type='password' value={password}
								              onChange={(e) => setPassword(e.target.value)}/>
								<div className='d-flex justify-content-between mt-3'>
									{isLogin ?
											<div>
												Нет аккаунта? <Link to={REGISTRATION_ROUTE}>Зарегестрируйся!</Link>
											</div>
											:
											<div>
												Зарегестрирован? <Link to={LOGIN_ROUTE}>Войти!</Link>
											</div>
									}
									<Button variant="outline-secondary" className='px-4'
									        onClick={click}>{isLogin ? 'Войти' : 'Регистрация'}</Button>
								</div>
							</Form>
						</Card>
						<Toasts variant={variant} title={title} show={showToasts} text={message} setShow={setShowToasts}
						        position={'top-center'}/>
						<div className='mt-2' style={{width: 600}}><Acc/></div>
					</Container>
			);
		}
)

export default Auth;