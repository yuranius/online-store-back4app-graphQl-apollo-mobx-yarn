import React, {useContext} from 'react';
import {Route, Routes, Navigate } from "react-router-dom";
import {adminRoutes, authRoutes, publicRoutes} from "../routes";
import {Context} from "../index";
import {observer} from "mobx-react-lite";






const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {/*Роуты на компоненты для авторизированных пользователей*/}
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} exact/>
            )}
            {/*Роуты на компоненты для пользователей с ролью администратор*/}
            {user.user.role === 'ADMIN' && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} exact/>
            )}
            {/*Роут на компоненты для пользователей*/}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} exact/>
            )}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
})

export default AppRouter;