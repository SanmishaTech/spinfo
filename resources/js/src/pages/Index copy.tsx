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

    const tableData = [
        {
            level_1: User?.profile?.level_1,
        },
        {
            level_2: User?.profile?.level_2,
        },
        {
            level_3: User?.profile?.level_3,
        },
        {
            level_4: User?.profile?.level_4,
        },
        {
            level_5: User?.profile?.level_5,
        },
        {
            level_6: User?.profile?.level_6,
        },
        {
            level_7: User?.profile?.level_7,
        },
        {
            level_8: User?.profile?.level_8,
        },
        {
            direct_count: User?.profile?.direct_count,
        },
    ];

    return (
        <div>
            <div className="h-full w-full grid grid-cols-2 max-md:grid-cols-1 content-between gap-5">
                {showProfileWarning && (
                    <div className="flex items-center p-3.5 rounded text-white bg-info col-span-2 mt-5 mb-5 max-md:flex-col max-md:items-start">
                        <span className="text-white w-6 h-6 ltr:mr-4 rtl:ml-4">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M19.0001 9.7041V9C19.0001 5.13401 15.8661 2 12.0001 2C8.13407 2 5.00006 5.13401 5.00006 9V9.7041C5.00006 10.5491 4.74995 11.3752 4.28123 12.0783L3.13263 13.8012C2.08349 15.3749 2.88442 17.5139 4.70913 18.0116C9.48258 19.3134 14.5175 19.3134 19.291 18.0116C21.1157 17.5139 21.9166 15.3749 20.8675 13.8012L19.7189 12.0783C19.2502 11.3752 19.0001 10.5491 19.0001 9.7041Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                                <path opacity="0.5" d="M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </span>
                        <span>
                            <strong className="ltr:mr-1 rtl:ml-1">Warning!</strong>Please Update your profile details.
                        </span>
                        <button
                            onClick={() => {
                                Navigate('/users/profile');
                            }}
                            type="button"
                            className="btn btn-sm bg-white text-black ltr:ml-auto rtl:mr-auto max-md:mt-2 max-md: self-start"
                        >
                            Update Profile
                        </button>
                        <button onClick={() => setShowProfileWarning(false)} type="button" className="ltr:ml-4 rtl:mr-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                )}
                <div className="flex flex-wrap w-full h-full justify-center mb-5 max-md:col-span-2">
                    <div className="min-w-full min-h-full border border-gray-500/20 rounded-md shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] p-6">
                        <div className="text-primary mb-5">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
                                <path
                                    d="M15.5777 3.38197L17.5777 4.43152C19.7294 5.56066 20.8052 6.12523 21.4026 7.13974C22 8.15425 22 9.41667 22 11.9415V12.0585C22 14.5833 22 15.8458 21.4026 16.8603C20.8052 17.8748 19.7294 18.4393 17.5777 19.5685L15.5777 20.618C13.8221 21.5393 12.9443 22 12 22C11.0557 22 10.1779 21.5393 8.42229 20.618L6.42229 19.5685C4.27063 18.4393 3.19479 17.8748 2.5974 16.8603C2 15.8458 2 14.5833 2 12.0585V11.9415C2 9.41667 2 8.15425 2.5974 7.13974C3.19479 6.12523 4.27063 5.56066 6.42229 4.43152L8.42229 3.38197C10.1779 2.46066 11.0557 2 12 2C12.9443 2 13.8221 2.46066 15.5777 3.38197Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                                <path opacity="0.5" d="M21 7.5L12 12M12 12L3 7.5M12 12V21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h5 className="text-lg font-semibold mb-3.5 dark:text-white-light">{User?.profile?.profile_no ? 'Payment Done' : 'Make Payment'}</h5>
                        <p className="text-white-dark text-[15px]  mb-3.5">{User?.profile?.profile_no ? 'You have Already Made your payment' : 'You have not made any payments yet.'}</p>
                        {!User?.profile?.profile_no && (
                            <button onClick={callapi} type="button" className="text-primary font-semibold hover:underline group">
                                Make Payment{' '}
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 ltr:ml-1 rtl:mr-1 inline-block relative transition-all duration-300 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 rtl:rotate-180"
                                >
                                    <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                <div className="max-md:col-span-2">
                    <div
                        className="panel h-full overflow-hidden before:bg-[#1937cc] before:absolute before:-right-44 before:top-0 before:bottom-0 before:m-auto before:rounded-full before:w-96 before:h-96 grid grid-cols-1 content-between"
                        style={{ background: 'linear-gradient(0deg,#00c6fb -227%,#005bea)' }}
                    >
                        <div className="flex items-start justify-between text-white-light mb-16 z-[7]">
                            <h5 className="font-semibold text-lg">Total Balance</h5>

                            <div className="relative text-xl whitespace-nowrap"> {Formatcurrency(User?.profile?.wallet_balance)} </div>
                        </div>
                        <div className="flex items-center justify-between z-10"></div>
                    </div>
                </div>
                <div className="flex justify-evenly col-span-2 gap-5 max-md:flex-col">
                    <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400 w-full">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Total Business</div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">
                                {Formatcurrency(
                                    (User?.profile?.level_1 +
                                        User?.profile?.level_2 +
                                        User?.profile?.level_3 +
                                        User?.profile?.level_4 +
                                        User?.profile?.level_5 +
                                        User?.profile?.level_6 +
                                        User?.profile?.level_7 +
                                        User?.profile?.level_8) *
                                        1000
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400 w-full">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Total Count</div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">
                                {User?.profile?.level_1 +
                                    User?.profile?.level_2 +
                                    User?.profile?.level_3 +
                                    User?.profile?.level_4 +
                                    User?.profile?.level_5 +
                                    User?.profile?.level_6 +
                                    User?.profile?.level_7 +
                                    User?.profile?.level_8}
                            </div>
                        </div>
                    </div>
                    <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400 w-full">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Current Month Count</div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{CurrentMonthCount || 0}</div>
                        </div>
                    </div>
                    <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400 w-full">
                        <div className="flex justify-between">
                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Current Month Business</div>
                        </div>
                        <div className="flex items-center mt-5">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">{Formatcurrency(CurrentMonthCount * 1000) || 0}</div>
                        </div>
                    </div>
                </div>
                <div className="panel col-span-2">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Levels Table</h5>
                    </div>
                    <div className="table-responsive mb-5">
                        <table>
                            <thead>
                                <tr>
                                    <th>Levels</th>
                                    <th className="text-center">Count</th>
                                    <th className="text-right">Direct Business</th>
                                </tr>
                            </thead>
                            <tbody>
                                {User &&
                                    User.profile &&
                                    tableData.map((data, index) => {
                                        if (index === 0) {
                                            return (
                                                <tr key={index}>
                                                    <td>Level 1</td>
                                                    <td className="text-center">{data.level_1}</td>
                                                    <td className="text-right">{Formatcurrency(data.level_1 * 1000)}</td>
                                                </tr>
                                            );
                                        }
                                        if (index === 1) {
                                            return (
                                                <tr key={index}>
                                                    <td>Level 2</td>
                                                    <td className="text-center">{data.level_2}</td>
                                                    <td className="text-right">{Formatcurrency(data.level_2 * 1000)}</td>
                                                </tr>
                                            );
                                        }
                                        if (index === 2) {
                                            return (
                                                <tr key={index}>
                                                    <td>Level 3</td>
                                                    <td className="text-center">{data.level_3}</td>
                                                    <td className="text-right">{Formatcurrency(data.level_3 * 1000)}</td>
                                                </tr>
                                            );
                                        }
                                        if (index === 3) {
                                            return (
                                                <tr key={index}>
                                                    <td>Level 4</td>
                                                    <td className="text-center">{data.level_4}</td>
                                                    <td className="text-right">{Formatcurrency(data.level_4 * 1000)}</td>
                                                </tr>
                                            );
                                        }
                                        if (index === 4) {
                                            return (
                                                <tr key={index}>
                                                    <td>Level 5</td>
                                                    <td className="text-center">{data.level_5}</td>
                                                    <td className="text-right">{Formatcurrency(data.level_5 * 1000)}</td>
                                                </tr>
                                            );
                                        }
                                        if (index === 5) {
                                            return (
                                                <tr key={index}>
                                                    <td>Level 6</td>
                                                    <td className="text-center">{data.level_6}</td>
                                                    <td className="text-right">{Formatcurrency(data.level_6 * 1000)}</td>
                                                </tr>
                                            );
                                        }
                                        if (index === 6) {
                                            return (
                                                <tr key={index}>
                                                    <td>Level 7</td>
                                                    <td className="text-center">{data.level_7}</td>
                                                    <td className="text-right">{Formatcurrency(data.level_7 * 1000)}</td>
                                                </tr>
                                            );
                                        }
                                        if (index === 7) {
                                            return (
                                                <tr key={index}>
                                                    <td>Level 8</td>
                                                    <td className="text-center">{data.level_8}</td>
                                                    <td className="text-right">{Formatcurrency(data.level_8 * 1000)}</td>
                                                </tr>
                                            );
                                        }
                                        if (index === 8) {
                                            return (
                                                <tr key={index}>
                                                    <td className="font-bold">Direct Count</td>
                                                    <td className="font-bold text-center">{data.direct_count}</td>
                                                    <td className="font-bold text-right">{Formatcurrency(data.direct_count * 1000)}</td>
                                                </tr>
                                            );
                                        }
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="panel col-span-2">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Members</h5>
                        <button
                            className="btn btn-primary btn-sm hover:bg-[#1937cc] hover:text-white"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(`${window.location.origin}/register/${User?.profile?.profile_no}/${User?.profile?.profile_no}`);
                                toast.success('Copied to clipboard');
                            }}
                        >
                            Copy To Clipboard
                        </button>
                    </div>
                    <div className="table-responsive mb-5">
                        <table>
                            <thead>
                                <tr>
                                    <th>Profile Number</th>
                                    <th>Names</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {User &&
                                    User?.profile &&
                                    Profiles?.map((data, index) => {
                                        return (
                                            <tr className="hover:bg-[#e0e6ed] dark:hover:bg-[#1a2941] cursor-pointer" onClick={() => Navigate(`/contactedit/${data?.id}`)} key={index}>
                                                <td>{data?.profile_no}</td>
                                                <td>{data?.name}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary btn-sm hover:bg-[#1937cc] hover:text-white"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigator.clipboard.writeText(`${window.location.origin}/register/${data?.profile_no}/${User?.profile?.profile_no}`);
                                                            toast.success('Copied to clipboard');
                                                        }}
                                                    >
                                                        Copy To Clipboard
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* <div className="panel col-span-2">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Calculator</h5>
                    </div>
                    <div className="table-responsive mb-5">
                        <table>
                            <thead>
                                <tr>
                                    <th>Levels</th>
                                    <th>Total Ref</th>
                                    <th>GrandTotal</th>
                                    <th>Income</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Level 1</td>
                                    <td>
                                        <input type="number" className="form-input" placeholder="Enter Level 1" onChange={(e) => setLevel1(e.target.value)} />
                                    </td>
                                    <td>{level1 * 1}</td>
                                    <td>{level1 * 1 * 100}</td>
                                </tr>
                                <tr>
                                    <td>Level 2</td>
                                    <td>
                                        <input type="number" className="form-input" placeholder="Enter Level 2" onChange={(e) => setLevel2(e.target.value)} value={level2} />
                                    </td>
                                    <td>{level2 && level2 * level1 * 1}</td>
                                    <td>{level2 && level2 * level1 * 1 * 50}</td>
                                </tr>
                                <tr>
                                    <td>Level 3</td>
                                    <td>
                                        <input type="number" className="form-input" placeholder="Enter Level 3" onChange={(e) => setLevel3(e.target.value)} value={level3} />
                                    </td>
                                    <td>{level3 && level3 * (level2 * level1 * 1)}</td>
                                    <td>{level3 && level3 * (level2 * level1 * 1 * 50)}</td>
                                </tr>
                                <tr>
                                    <td>Level 4</td>
                                    <td>
                                        <input type="number" className="form-input" placeholder="Enter Level 4" onChange={(e) => setLevel4(e.target.value)} value={level4} />
                                    </td>
                                    <td>{level4 && level4 * (level3 * (level2 * level1 * 1))}</td>
                                    <td>{level4 && level4 * (level3 * (level2 * level1 * 1)) * 50}</td>
                                </tr>
                                <tr>
                                    <td>Level 5</td>
                                    <td>
                                        <input type="number" className="form-input" placeholder="Enter Level 5" onChange={(e) => setLevel5(e.target.value)} value={level5} />
                                    </td>
                                    <td>{level5 && level5 * (level4 * (level3 * (level2 * level1 * 1)))}</td>
                                    <td>{level5 && level5 * (level4 * (level3 * (level2 * level1 * 1))) * 50}</td>
                                </tr>
                                <tr>
                                    <td>Level 6</td>
                                    <td>
                                        <input type="number" className="form-input" placeholder="Enter Level 6" onChange={(e) => setLevel6(e.target.value)} value={level6} />
                                    </td>
                                    <td>{level6 && level6 * (level5 * (level4 * (level3 * (level2 * level1 * 1))))}</td>
                                    <td>{level6 && level6 * (level5 * (level4 * (level3 * (level2 * level1 * 1)))) * 50}</td>
                                </tr>
                                <tr>
                                    <td>Level 7</td>
                                    <td>
                                        <input type="number" className="form-input" placeholder="Enter Level 7" onChange={(e) => setLevel7(e.target.value)} value={level7} />
                                    </td>
                                    <td>{level7 && level7 * (level6 * (level5 * (level4 * (level3 * (level2 * level1 * 1)))))}</td>
                                    <td>{level7 && level7 * (level6 * (level5 * (level4 * (level3 * (level2 * level1 * 1))))) * 50}</td>
                                </tr>
                                <tr>
                                    <td>Level 8</td>
                                    <td>
                                        <input type="number" className="form-input" placeholder="Enter Level 8" onChange={(e) => setLevel8(e.target.value)} value={level8} />
                                    </td>
                                    <td>{level8 && level8 * (level7 * (level6 * (level5 * (level4 * (level3 * (level2 * level1 * 1))))))}</td>
                                    <td>{level8 && level8 * (level7 * (level6 * (level5 * (level4 * (level3 * (level2 * level1 * 1)))))) * 50}</td>
                                </tr>
                                <tr>
                                    <td>Total</td>
                                    <td></td>
                                    <td>{Variable.total}</td>
                                    <td>{Variable.income}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div> */}

                <div className="col-span-2 "></div>
            </div>
        </div>
    );
};

export default Index;
