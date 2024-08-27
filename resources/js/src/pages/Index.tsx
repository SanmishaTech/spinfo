import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { toggleRTL, toggleTheme, toggleMenu, toggleLayout, toggleAnimation, toggleNavbar, toggleLocale, toggleSemidark } from '../store/themeConfigSlice';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formatcurrency } from '../components/CurrencyComponent';
import Electronics from '../components/Images/OIP.jpeg';
import ComputerSvg from '../components/Images/computer-svgrepo-com (1).svg';
import SoftwareSvg from '../components/Images/Software.svg';
import { collection, getDocs } from 'firebase/firestore';
import { app } from '../components/Firebase';
import { getFirestore } from 'firebase/firestore';
const Index = () => {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);

    const dispatch = useDispatch();
    const [PaymentDone, setPaymentDone] = useState(false);
    const [showProfileWarning, setShowProfileWarning] = useState(true);
    const [Profiles, setProfiles] = useState([]);
    const [CurrentMonthCount, setCurrentMonthCount] = useState(0);
    const [level1, setLevel1] = useState(0);
    const [level2, setLevel2] = useState(0);
    const [level3, setLevel3] = useState(0);
    const [level4, setLevel4] = useState(0);
    const [level5, setLevel5] = useState(0);
    const [level6, setLevel6] = useState(0);
    const [level7, setLevel7] = useState(0);
    const [level8, setLevel8] = useState(0);
    const [tableData, setTableData] = useState([]);
    const db = getFirestore(app);
    const [search, setSearch] = useState('');
    const location = useLocation();
    useEffect(() => {
        dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
        dispatch(toggleMenu(localStorage.getItem('menu') || themeConfig.menu));
        dispatch(toggleLayout(localStorage.getItem('layout') || themeConfig.layout));
        dispatch(toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass));
        dispatch(toggleAnimation(localStorage.getItem('animation') || themeConfig.animation));
        dispatch(toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar));
        dispatch(toggleLocale(localStorage.getItem('i18nextLng') || themeConfig.locale));
        dispatch(toggleMenu('vertical'));
        dispatch(toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark));
    }, [dispatch, themeConfig.theme, themeConfig.menu, themeConfig.layout, themeConfig.rtlClass, themeConfig.animation, themeConfig.navbar, themeConfig.locale, themeConfig.semidark]);
    const User = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        console.log('Fetching data...');
        const companies = collection(db, 'companies');
        getDocs(companies).then((querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            setTableData(data);
        });
    }, []);

    const Navigate = useNavigate();

    // useEffect(() => {
    //     const getCount = async () => {
    //         const response = await axios
    //             .get(`/api/current_month_count`, {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     Authorization: 'Bearer ' + localStorage.getItem('token'),
    //                 },
    //             })
    //             .then((response: any) => {
    //                 setCurrentMonthCount(response?.data?.data?.Count);
    //             });
    //         console.log(response);
    //     };
    //     getCount();
    // }, []);

    const callapi = async () => {
        try {
            const response = await axios
                .get(`/api/payment/${User?.profile?.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                })
                .then((response: any) => {
                    setPaymentDone(true);
                    localStorage.setItem('user', JSON.stringify(response?.data?.data?.user));
                    localStorage.setItem('token', response?.data?.data?.token);
                    // localStorage.setItem('token', response.data.data.token);
                    toast.success('Payment done Successly.');
                });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('user'))) {
            Navigate('/');
        }
    }, [User]);

    useEffect(() => {
        const response = async () => {
            const response = await axios
                .get(`/api/profiles/${User?.profile?.id}/get_profiles`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                })
                .then((response: any) => {
                    setProfiles(response?.data?.data?.Profiles);
                    // window.location.reload();
                });
            console.log(response);
        };
        response();
    }, [User?.profile?.id]);

    return (
        <div className="flex gap-4 flex-col">
            <div>
                <p>Search For your Company</p>
                <input onChange={(e) => setSearch(e.target.value)} type="text" className="form-input" />
            </div>
            <div className="max-md:col-span-2 flex flex-col gap-5">
                {tableData
                    .filter((data) => data.name.toLowerCase().includes(search.toLowerCase()))
                    .map((data, index) => {
                        return (
                            <div
                                key={index}
                                className="bg-[#f2f2f2] gap-2 p-5 rounded-md h-full overflow-hidden before:absolute text-black before:-right-44 before:top-0 before:bottom-0 before:m-auto before:rounded-full before:w-96 before:h-96 grid grid-cols-1 content-between"
                            >
                                <div className="flex items-start justify-between text-white-light mb-16 z-[7] flex-col">
                                    <h5 className="font-bold  text-4xl text-black">{data.name}</h5>
                                    <div className="relative text-xl text-black font-semibold whitespace-nowrap"> {data.cin} </div>
                                </div>
                                <div className="flex items-center justify-between z-10 text-white w-full justify-end">
                                    {/* <p className="font-semibold text-black">Suggestion</p> */}
                                    {/* <button className="btn btn-primary bg-green-500 border-none outline-none self-end text-black">Buy</button> */}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Index;
