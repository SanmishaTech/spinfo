import React from 'react';
import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const ToDo = lazy(() => import('../pages/ToDo/Index'));
const LoginBoxed = lazy(() => import('../pages/Login/Login'));
const Register = lazy(() => import('../pages/Login/Register'));
const AdminProfiles = lazy(() => import('../pages/AdminProfiles/Profiles'));
const UpdateProfile = lazy(() => import('../pages/Profile/UpdateProfile'));
const AdminEditProfile = lazy(() => import('../pages/AdminProfiles/UpdateProfile'));
const Contact = lazy(() => import('../pages/Contactsbelow/Contacts'));
const ShoppingCart = lazy(() => import('../pages/Contactsbelow/ShoppingCart'));
const ShoppingCartComputer = lazy(() => import('../pages/Contactsbelow/ShoppingCartComputer'));
const ShoppingSoftware = lazy(() => import('../pages/Contactsbelow/ShoppingcartSoftware'));
const ShoppingMall = lazy(() => import('../pages/ShoppingMal/ShoppingCart'));
const ClubEmpire = lazy(() => import('../components/ClubMembership/Empire'));
const ClubMembership = lazy(() => import('../components/ClubMembership/ClubMemberShip'));
const Calculator = lazy(() => import('../pages/Calculator'));
const Portfolio = lazy(() => import('../pages/Portfolio/portfolio'));
const Companies = lazy(() => import('../components/Companies/Companies.tsx'));
const Addcompanies = lazy(() => import('../components/Companies/Addcompanies'));
const routes = [
    // dashboard
    {
        path: '/',
        element: <LoginBoxed />,
        layout: 'blank',
    },
    {
        path: '/dashboard',
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
        layout: 'blank',
    },
    {
        path: '/register',
        element: <Register />,
        layout: 'blank',
    },
    {
        path: '/portfolio',
        element: <Portfolio />,
        layout: 'default',
    },
    {
        path: '/companies',
        element: <Companies />,
        layout: 'default',
    },
    {
        path: '/addcompanies',
        element: <Addcompanies />,
        layout: 'default',
    },
];

export { routes };
