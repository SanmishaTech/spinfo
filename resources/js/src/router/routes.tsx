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
        path: '/register/:id/:refid',
        element: <Register />,
        layout: 'blank',
    },
    {
        path: '/users/profile',
        element: <UpdateProfile />,
        layout: 'default',
    },
    {
        path: '/profiles',
        element: <AdminProfiles />,
        layout: 'default',
    },
    {
        path: '/profile/:id',
        element: <AdminEditProfile />,
        layout: 'default',
    },
    {
        path: '/contactedit/:id',
        element: <Contact />,
        layout: 'default',
    },
    {
        path: '/shoppingcart',
        element: <ShoppingCart />,
        layout: 'default',
    },
    {
        path: '/ShoppingComputer',
        element: <ShoppingCartComputer />,
        layout: 'default',
    },
    {
        path: '/ShoppingSoftware',
        element: <ShoppingSoftware />,
        layout: 'default',
    },
    {
        path: '/shoppingmal',
        element: <ShoppingMall />,
        layout: 'default',
    },
    {
        path: '/clubmember',
        element: <ClubMembership />,
        layout: 'default',
    },
    {
        path: '/empire',
        element: <ClubEmpire />,
        layout: 'default',
    },
    {
        path: '/calculator',
        element: <Calculator />,
        layout: 'default',
    },
];

export { routes };
