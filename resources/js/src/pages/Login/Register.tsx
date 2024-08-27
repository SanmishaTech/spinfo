import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Toaster, toast } from 'sonner';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import { addDoc, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { auth } from '../../components/Firebase';
import { app } from '../../components/Firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
    mobile: z.string().min(1, 'Mobile is required'),
    pan: z
        .string()
        .min(1, 'Pan is required')
        .regex(/^[a-zA-Z]{5}([0-9]){4}([a-zA-Z0-9]){1}?$/),
    password_confirmation: z.string().min(1, 'Password confirmation is required'),
    dob: z.any(),
});

type LoginFormInputs = z.infer<typeof registerSchema>;

const RegisterBoaxed = () => {
    const [uniqueData, setUniqueData] = useState<any>({});
    const [phone, setPhone] = useState<Number | null>(null);
    const [profiles, setProfiles] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const db = getFirestore(app);

    function sumDigits(num) {
        // Convert the number to a string, split into individual characters (digits),
        // convert them back to numbers, and sum them up
        return num
            .toString()
            .split('')
            .map(Number)
            .reduce((a, b) => a + b, 0);
    }
    // useEffect(() => {
    //     axios
    //         .get(`/api/profiles/${refid}/get_ref_profile`, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: 'Bearer ' + localStorage.getItem('token'),
    //             },
    //         })
    //         .then((response: any) => {
    //             setProfiles(response?.data?.data?.Profiles);
    //         });
    // }, []);

    const {
        register,
        control,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(registerSchema),
    });

    function sumDateDigits(dateStr) {
        // Remove non-digit characters, split into individual digits, convert them to numbers, and sum them up
        return dateStr
            .replace(/\D/g, '') // Remove non-digit characters (e.g., dashes)
            .split('') // Split into individual characters (digits)
            .map(Number) // Convert to numbers
            .reduce((a, b) => a + b, 0); // Sum them up
    }

    useEffect(() => {
        const date = '02-02-2000';
        const newdate = new Date(date);
        console.log(newdate.getDate());
        const sum = sumDateDigits(date);
        console.log('sum', sum);
    }, []);
    const onSubmit = (data: LoginFormInputs) => {
        if (data.password !== data.password_confirmation) {
            toast.warning('Passwords do not match');
            return;
        }
        // data.parent_id = id;
        // data.ref_id = refid;
        data.mobile = data.mobile.replace(' ', '');
        data.mobile = data.mobile.replace('-', '');
        console.log(data);
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                const userRef = doc(db, 'users', user.uid);
                setDoc(userRef, {
                    name: data.name,
                    email: data.email,
                    mobile: data.mobile,
                    pan: data.pan,
                    driver: sumDigits(new Date(data.dob).getDate()),
                    conductor: sumDateDigits(data.dob),
                    dob: data.dob,
                });
            })
            .then(() => {
                toast.success('Registration successful');
                navigate('/');
            });
    };

    return (
        <div className="max-h-[100vh] flex justify-center items-center bg-cover bg-center bg-[url('/assets/images/map.svg')] dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="flex flex-col items-center justify-center h-full mt-[120px]">
                <div className=" panel sm:w-[450px] min-h-[400px] m-6 max-w-lg w-full">
                    <h2 className="font-bold text-2xl mb-3">Sign Up</h2>
                    <p className="mb-7">Enter your email and password to Register</p>
                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" {...register('name')} className="form-input" placeholder="Enter Name" />
                            {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" {...register('email')} className="form-input" placeholder="Enter Email" />
                            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="Date of Birth">Date of birth</label>
                            <input {...register('dob')} type="date" className="form-input" />
                            {errors.email && <span className="text-red-600">{errors.dob.message} </span>}
                        </div>
                        <div>
                            <label htmlFor="mobile">Mobile</label>
                            <PhoneInput
                                inputStyle={{
                                    width: '100%',
                                    borderRadius: '5px',
                                    padding: '10px',
                                    fontSize: '16px',
                                    color: '#000',
                                }}
                                defaultCountry="in"
                                {...register('mobile')}
                                className="form-input"
                                placeholder="Enter Mobile"
                            />
                            {errors.mobile && <span className="text-red-600">{errors.mobile.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="pan">Pan</label>
                            <Controller
                                name="pan"
                                control={control}
                                render={({ field }) => (
                                    <input id="pan" placeholder="Enter Pan number" {...field} value={field?.value?.toUpperCase()} className={errors.pan ? 'border-red-500 form-input' : 'form-input'} />
                                )}
                            />{' '}
                            {errors.pan && <span className="text-red-600">{errors.pan.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" {...register('password')} className="form-input" placeholder="Enter Password" />
                            {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="password_confirmation">Password Confirmation</label>
                            <input id="password_confirmation" type="password" {...register('password_confirmation')} className="form-input" placeholder="Enter Password Confirmation" />
                            {errors.password_confirmation && <span className="text-red-600">{errors.password_confirmation.message}</span>}
                        </div>

                        <button type="submit" className="btn btn-primary w-full">
                            SIGN UP
                        </button>
                    </form>

                    <p className="text-center mt-8">
                        Already have an account?
                        <Link to="/login" className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterBoaxed;
