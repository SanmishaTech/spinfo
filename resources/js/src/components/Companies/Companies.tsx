import React, { useState, useEffect } from 'react';
import Tippy from '@tippyjs/react';
import { addDoc, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { auth } from '../../components/Firebase';
import { app } from '../../components/Firebase';
import { useNavigate } from 'react-router-dom';
const Companies = () => {
    const [open, setOpen] = useState(false);
    const [tableData, setTableData] = useState([]);
    const db = getFirestore(app);
    const Navigate = useNavigate();

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
    return (
        <>
            <div>
                <div className="w-full ">
                    <div className="flex items-center justify-between mb-5">
                        <div className="p-2 flex justify-between w-full  rounded-lg">
                            <p className="font-bold text-lg">Companies</p>

                            <button onClick={() => Navigate('/addcompanies')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Add Company
                            </button>
                        </div>
                    </div>
                    <div className="table-responsive mb-5">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>NSC</th>
                                    <th>BSE</th>
                                    <th>CIN</th>
                                    <th>DOI</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((data) => {
                                    return (
                                        <tr key={data.id}>
                                            <td>
                                                <div className="whitespace-nowrap">{data.name}</div>
                                            </td>
                                            <td>{data.nsc}</td>
                                            <td>{data.bse}</td>
                                            <td>{data.cin}</td>
                                            <td>{data.doi}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Companies;
