import Reac, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import Acer from '../../components/Images/Electronics/SP Shopping Mall/IT Computer Brand Brands/Acer Logo.png';
import Dell from '../../components/Images/Electronics/SP Shopping Mall/IT Computer Brand Brands/Dell Logo.jpg';
import HP from '../../components/Images/Electronics/SP Shopping Mall/IT Computer Brand Brands/HP Logo.png';
import { useNavigate } from 'react-router-dom';
import Hp from '../../components/Images/HP.png';
import Lenovo from '../../components/Images/Lenovo.png';
const Electronics = [
    {
        name: 'Acer',
        src: Acer,
    },
    {
        name: 'Dell',
        src: Dell,
    },
    {
        name: 'HP',
        src: Hp,
    },
    {
        name: 'Lenovo',
        src: Lenovo,
    },
];

const Contacts = () => {
    const Navigate = useNavigate();
    const { id, refid } = useParams();
    const [Profiles, setProfiles] = useState([]);
    const User = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        const response = async () => {
            const response = await axios
                .get(`/api/profiles/${id}/get_profiles`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                })
                .then((response: any) => {
                    setProfiles(response?.data?.data?.Profiles);
                });
            console.log(response);
        };
        response();
    }, [User?.profile?.id]);
    return (
        <div>
            <div className="panel flex flex-col gap-5 col-span-2">
                <div className="flex items-center gap-5 mb-5">
                    <button className="w-[100px] btn btn-primary btn-sm hover:bg-[#1937cc] hover:text-white" onClick={() => Navigate('/shoppingmal')}>
                        Go back to shopping mall
                    </button>
                    <h1 className="font-bold text-lg dark:text-white-light text-[2rem]">Computer</h1>
                </div>
                <div className="flex flex-wrap items-center justify-center mb-5 gap-5">
                    {Electronics.map((src, index) => {
                        return (
                            <div key={index} onClick={() => toast.success('Coming Soon')} className="mb-5 flex items-center justify-center cursor-pointer">
                                <div className="w-[19rem] max-md:w-[15rem] max-w-[19rem] bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                    <div className="py-7 px-6">
                                        <div className="-mt-7 mb-7 -mx-6 rounded-tl rounded-tr h-[215px] flex items-center justify-center overflow-hidden">
                                            <img src={src.src} alt="cover" className="w-full min-full object-cover" />
                                        </div>
                                        <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">{src.name}</h5>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Contacts;
