import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../components/Firebase';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios';
import { toast } from 'sonner';
import { app } from '../../components/Firebase'; // Assume db is your Firestore instance
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { signInWithEmailAndPassword, sendPasswordResetEmail, fetchSignInMethodsForEmail, getAuth } from 'firebase/auth';
import Cookies from 'js-cookie';

// Define the validation schema using Zod
const loginSchema = z.object({
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    password: z.string().min(6, 'Password is required'),
    isAdmin: z.any().optional(),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginBoxed = () => {
    const dispatch = useDispatch();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const [isAdmin, setIsAdmin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setopen] = useState(false);
    const [forgotemail, setforgotemail] = useState('');
    const [user, setuser] = useState();
    const navigate = useNavigate();
    const db = getFirestore(app);

    const handlesignin = async (data) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                const usersRef = collection(db, 'users'); // Adjust "users" to your collection name
                const q = query(usersRef, where('email', '==', user.email));
                try {
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        console.log(doc.data());
                        setuser(doc.data());
                        Cookies.set(
                            'user',
                            JSON.stringify({
                                email: doc.data().email,
                                role: doc.data().role,
                                username: doc.data().username,
                                uid: doc.id,
                            }),
                            { expires: 7 }
                        );
                        if (user.role === 'admin') {
                            navigate('/services');
                        } else {
                            navigate('/dashboard');
                        }
                    });
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    toast.error('Emial or password is incorrect');
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                toast.error('Emial or password is incorrect');
            });
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    function sumDigits(num) {
        // Convert the number to a string, split into individual characters (digits),
        // convert them back to numbers, and sum them up
        return num
            .toString()
            .split('')
            .map(Number)
            .reduce((a, b) => a + b, 0);
    }
    const onSubmit = (data: LoginFormInputs) => {
        console.log(data.isAdmin);
        data.isAdmin = watch('isAdmin') === true;
        setIsAdmin(data.isAdmin || false);
        console.log(data);
        console.log('BOOLonSUbmt', isAdmin);
        const date = '12-12-2022';
        const newdate = new Date(date);
        console.log(newdate.getDate());
        const sum = sumDigits(newdate.getDate());
        console.log(sum);
        handlesignin(data);
    };

    return (
        <div className="max-h-[100vh] flex justify-center items-center bg-cover bg-center bg-[url('/assets/images/map.svg')] dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="flex flex-col items-center justify-center h-full mt-[100px]">
                <div className=" panel sm:w-[450px] min-h-[400px] m-6 max-w-lg w-full">
                    <h2 className="font-bold text-2xl mb-3">Sign In</h2>
                    <p className="mb-7">Enter your email and password to login</p>
                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" {...register('email')} className="form-input" placeholder="Enter Email" />
                            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" {...register('password')} className="form-input" placeholder="Enter Password" />
                            {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                        </div>

                        <button type="submit" className="btn btn-primary w-full">
                            SIGN IN
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginBoxed;
