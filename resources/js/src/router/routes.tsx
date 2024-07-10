import React from 'react';
import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const ToDo = lazy(() => import('../pages/ToDo/Index'));
const LoginBoxed = lazy(() => import('../pages/Login/Login'));
const Register = lazy(() => import('../pages/Login/Register'));
const UpdateProfile = lazy(() => import('../pages/Profile/UpdateProfile'));

const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />,
        layout: 'default',
    },
    {
        path: '/todo',
        element: <ToDo />,
        layout: 'default',
    },
    {
        path: '/login',
        element: <LoginBoxed />,
        layout: 'default',
    },
    {
        path: '/register',
        element: <Register />,
        layout: 'default',
    },
    {
        path: 'users/profile',
        element: <UpdateProfile />,
        layout: 'default',
    },
];

export { routes };
