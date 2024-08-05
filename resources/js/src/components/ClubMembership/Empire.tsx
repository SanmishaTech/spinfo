import React from 'react';

const Empire = () => {
    return (
        <div>
            <table className="table table-bordered table-hover">
                <tbody className="min-h-[300px]">
                    <tr className="bg-[#eb353a] text-white p-8 border border-[#eb353a]">
                        <th>LEVEL</th>
                        <th>TRADE COUNT</th>
                        <th>MARGIN</th>
                        <th>LEVEL INCOME</th>
                    </tr>
                    <tr className="text-center">
                        <td className="text-center">LEVEL 1</td>
                        <td className="text-center">10</td>
                        <td className="text-center">100</td>
                        <td className="text-center">1,000</td>
                    </tr>
                    <tr>
                        <td className="text-center">LEVEL 2</td>
                        <td className="text-center">100</td>
                        <td className="text-center">50</td>
                        <td className="text-center">5,000</td>
                    </tr>
                    <tr>
                        <td className="text-center">LEVEL 3</td>
                        <td className="text-center">1,000</td>
                        <td className="text-center">50</td>
                        <td className="text-center">50,000</td>
                    </tr>
                    <tr>
                        <td className="text-center">LEVEL 4</td>
                        <td className="text-center">10,000</td>
                        <td className="text-center">50</td>
                        <td className="text-center">5 LAKH</td>
                    </tr>
                    <tr>
                        <td className="text-center">LEVEL 5</td>
                        <td className="text-center">1 LAKH</td>
                        <td className="text-center">50</td>
                        <td className="text-center">50 LAKH</td>
                    </tr>
                    <tr>
                        <td className="text-center">LEVEL 6</td>
                        <td className="text-center">10 LAKH</td>
                        <td className="text-center">50</td>
                        <td className="text-center">5 CR</td>
                    </tr>
                    <tr>
                        <td className="text-center">LEVEL 7</td>
                        <td className="text-center">1 CR</td>
                        <td className="text-center">50</td>
                        <td className="text-center">50 CR</td>
                    </tr>
                    <tr>
                        <td className="text-center">LEVEL 8</td>
                        <td className="text-center">10 CR</td>
                        <td className="text-center">50</td>
                        <td className="text-center">500 CR</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Empire;
