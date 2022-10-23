import React, {useContext} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import {Context} from "../index";
import basketImg from '../images/basket.png'




const NavBar = observer(() => {
    const {user} = useContext(Context)
    const {basket} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        localStorage.clear()
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink to={SHOP_ROUTE} style={{color:'white'}}>⭐Yuranius-Shop🎁️</NavLink>
                <span style={{color:'white'}}>{user.user.email}{user.user.role === 'ADMIN' && " - Администратор"}</span>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color:'white'}}>
                        {user.user.role === 'ADMIN' && <Button variant={"outline-light"}  className='mx-4' onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</Button>}
                        <div className='mx-1 text-black d-flex align-items-center justify-content-center'
                             style={{width:30, height:30, backgroundColor:"white", borderRadius:50, fontWeight:700}}>
                            {basket.quantityDevices}
                        </div>
                        <img src={basketImg} alt="" style={{width:50, height:50, cursor:'pointer'}} onClick={()=> navigate(BASKET_ROUTE)}/>
                        <Button variant={"outline-light"} onClick={() => logOut()} className='mx-4' >Выйти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color:'white'}}>
                        <Button variant={"outline-light"}  onClick={()=> navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
})

export default NavBar;