import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css'; // Define the validation schema using Zod
import { Toaster, toast } from 'sonner';
import { addDoc, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { auth } from '../../components/Firebase';
import { app } from '../../components/Firebase';
import { firestore } from '../../components/Firebase';

const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    nsc: z.string().min(1, 'NSC is required'),
    bse: z.string().min(1, 'BSE is required'),
    cin: z.string().min(21, 'CIN must be 21 Characters').max(21, 'CIN must be 21 Characters'),
    doi: z.string().min(1, 'Date of Incorporation is required'),
});

type LoginFormInputs = z.infer<typeof registerSchema>;

const UpdateProfile = () => {
    interface Usertypes {
        id: number;
        name: string;
        mobile: string;
        pan: string;
        address_1: string;
        address_2: string;
        city: string;
        state: string;
        pincode: string;
        bank_name: string;
        account_name: string;
        account_no: string;
        ifsc: string;
        business_name: string;
        gstin: string;
        pan_verified: boolean;
        bank_verified: boolean;
        gstin_verified: boolean;
    }
    const User = JSON.parse(localStorage.getItem('user'));
    const [uniqueData, setUniqueData] = useState<any>({});
    const [phone, setPhone] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [defaultData, setDefaultData] = useState<any>({});
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const db = getFirestore(app);
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: LoginFormInputs) => {
        // You can handle the form submission here, for example:

        console.log(data);

        const docRef = doc(db, 'companies', data.name);
        await addDoc(collection(firestore, 'companies'), {
            name: data.name,
            nsc: data.nsc,
            bse: data.bse,
            cin: data.cin,
            doi: data.doi,
        });
        navigate('/dashboard');
    };

    return (
        <div className="max-h-[100vh] flex justify-center items-center mb-[70px] p-2 ">
            <div className=" h-full w-[90%]  ">
                <h2 className="font-bold text-2xl ">Update Profile</h2>
                <p className="mb-7">Enter your details to Update</p>
                <form className=" grid grid-cols-2 mb-[50px] bg-slate-50 rounded-md p-6 " onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ backgroundColor: '#FFFFFF' }} className=" w-full flex flex-col  col-span-2 max-h-[490px]  ">
                        <div className=" flex flex-col justify-center">
                            <label htmlFor="Personal" className="font-bold text-[20px] mb-6">
                                Personal Details
                            </label>
                        </div>
                        <div className="w-full grid grid-cols-2 gap-4 justify-items-center mb-[50px] col-span-2">
                            <div className="w-full flex flex-col justify-center">
                                <label htmlFor="mobile">Company Name</label>
                                <input type="text" {...register('name')} className="form-input" placeholder="Enter Company Name" />
                                {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                            </div>
                            <div className="w-full flex flex-col justify-center">
                                <label htmlFor="nsc">NSC</label>
                                <input type="text" {...register('nsc')} className="form-input" placeholder="Enter NSC Name" />
                                {errors.nsc && <span className="text-red-600">{errors.nsc.message}</span>}
                            </div>
                            <div className="w-full flex flex-col justify-center">
                                <label htmlFor="bse">BSE</label>
                                <input type="text" {...register('bse')} className="form-input" placeholder="Enter NSC Name" />
                                {errors.bse && <span className="text-red-600">{errors.bse.message}</span>}
                            </div>
                            <div className="w-full flex flex-col justify-center">
                                <label htmlFor="bse">CIN</label>
                                <input type="text" {...register('cin')} className="form-input" placeholder="Enter NSC Name" />
                                {errors.cin && <span className="text-red-600">{errors.cin.message}</span>}
                            </div>
                            <div className="w-full flex flex-col justify-center">
                                <label htmlFor="bse">Date of Incorporation</label>
                                <input type="date" {...register('doi')} className="form-input" placeholder="Enter NSC Name" />
                                {errors.doi && <span className="text-red-600">{errors.doi.message}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-end col-span-2">
                        <button type="submit" className="btn btn-primary  self-end">
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
