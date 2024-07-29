import Reac, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import Eset from '../../components/Images/Electronics/SP Shopping Mall/Software/Eset Logo.png';
import Kasper from '../../components/Images/Electronics/SP Shopping Mall/Software/KASPERSKY_ANTI_VIRUS-logo.png';
import QuickHeal from '../../components/Images/Electronics/SP Shopping Mall/Software/Quick-Heal-Logo.png';

const Electronics = [
    {
        name: 'Quick Heal',
        src: QuickHeal,
    },
];

const Contacts = () => {
    const { id, refid } = useParams();
    const [Profiles, setProfiles] = useState([]);
    const User = JSON.parse(localStorage.getItem('user') as string);
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
                <h1 className="font-bold text-lg dark:text-white-light text-[2rem]">Software</h1>

                <div className="flex flex-wrap items-center justify-center mb-5 gap-5">
                    {Electronics.map((src) => {
                        return (
                            <div onClick={() => toast.success('Coming Soon')} className="mb-5 flex items-center justify-center cursor-pointer">
                                <div className="min-w-[19rem] max-w-[19rem] bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                    <div className="py-7 px-6">
                                        <div className="-mt-7 mb-7 -mx-6 rounded-tl rounded-tr h-[215px] flex items-center justify-center overflow-hidden">
                                            <img src={src.src} alt="cover" className="w-full min-h-[115px] object-cover" />
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
