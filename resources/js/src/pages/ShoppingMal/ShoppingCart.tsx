import React from 'react';
import { useNavigate } from 'react-router-dom';
import Electronics from '../../components/Images/OIP.jpeg';
import ComputerSvg from '../../components/Images/computer-svgrepo-com (1).svg';
import SoftwareSvg from '../../components/Images/Software.svg';
const ShoppingCart = () => {
    const Navigate = useNavigate();
    return (
        <div>
            <div className="panel col-span-2 w-full flex flex-wrap justify-center">
                <div className="flex flex-wrap mb-5 flex items-center justify-evenly gap-5 mt-8 flex-col">
                    <div className="w-full flex flex-wrap mb-5 flex items-center justify-evenly gap-5 mt-8">
                        <h5 className="flex flex-wrap font-semibold text-lg dark:text-white-light  ">Shopping Mall</h5>
                    </div>
                    <div>
                        <div className="flex flex-wrap mb-5 flex items-center justify-evenly gap-5 mt-8">
                            <div onClick={() => Navigate('/shoppingcart')} className="mb-5 flex items-center justify-center min-w-[300px] max-sm:min-w-[100px] cursor-pointer">
                                <div className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                    <div className="flex flex-col items-center justify-center py-7 px-6">
                                        <div className="bg-[#3b3f5c] mb-5 inline-block p-3 text-[#f1f2f3] rounded-full">
                                            <img src={Electronics} alt="electronics" className="w-6 h-6" />
                                        </div>
                                        <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">Electronics</h5>
                                    </div>
                                </div>
                            </div>
                            <div onClick={() => Navigate('/ShoppingComputer')} className="mb-5 flex items-center justify-center min-w-[300px]  max-sm:min-w-[100px] cursor-pointer">
                                <div className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                    <div className="flex flex-col items-center justify-center  py-7 px-6">
                                        <div className="bg-[#3b3f5c] mb-5 inline-block p-3 text-[#f1f2f3] rounded-full">
                                            <img src={ComputerSvg} alt="electronics" className="w-6 h-6" />
                                        </div>
                                        <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">Computer</h5>
                                    </div>
                                </div>
                            </div>
                            <div onClick={() => Navigate('/ShoppingSoftware')} className="mb-5 flex items-center justify-center min-w-[300px]  max-sm:min-w-[100px] cursor-pointer">
                                <div className="max-w-[19rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                                    <div className="flex flex-col items-center justify-center  py-7 px-6">
                                        <div className="bg-[#3b3f5c] mb-5 inline-block p-3 text-[#f1f2f3] rounded-full">
                                            <img src={SoftwareSvg} alt="electronics" className="w-6 h-6" />
                                        </div>
                                        <h5 className="text-[#3b3f5c] text-xl font-semibold mb-4 dark:text-white-light">Software</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
