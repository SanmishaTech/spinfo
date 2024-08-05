import React from 'react';

const ClubMemberShip = () => {
    return (
        <div>
            <table className="table table-bordered table-hover">
                <tbody>
                    <tr className="bg-[#eb353a] text-white p-8 border border-[#eb353a]">
                        <th>LEVEL</th>
                        <th>TRADE COUNT</th>
                        <th>PERIOD</th>
                        <th>REWARD</th>
                    </tr>
                    <tr>
                        <td className="text-center">Silver</td>
                        <td className="text-center">10</td>
                        <td className="text-center">1 Month</td>
                        <td className="text-center">1000</td>
                    </tr>
                    <tr>
                        <td className="text-center">Gold</td>
                        <td className="text-center">100</td>
                        <td className="text-center">2 Month</td>
                        <td className="text-center">Domestic Trip</td>
                    </tr>
                    <tr>
                        <td className="text-center">Platinum</td>
                        <td className="text-center">1000</td>
                        <td className="text-center">4 Month</td>
                        <td className="text-center">Laptop / Mobile</td>
                    </tr>
                    <tr>
                        <td className="text-center">Diamond</td>
                        <td className="text-center">10000</td>
                        <td className="text-center">6 Month</td>
                        <td className="text-center">Bike Fund</td>
                    </tr>
                    <tr>
                        <td className="text-center">Vice President</td>
                        <td className="text-center">1 LAKH</td>
                        <td className="text-center">9 Month</td>
                        <td className="text-center">Car Fund</td>
                    </tr>
                    <tr>
                        <td className="text-center">Director</td>
                        <td className="text-center">10 LAKH</td>
                        <td className="text-center">12 Month</td>
                        <td className="text-center">Home Fund</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ClubMemberShip;
