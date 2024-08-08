import React, { useState } from 'react';
import { Formatcurrency } from '../components/CurrencyComponent';

const Calculator = () => {
    const [level1, setLevel1] = useState();
    const [level2, setLevel2] = useState();
    const [level3, setLevel3] = useState();
    const [level4, setLevel4] = useState();
    const [level5, setLevel5] = useState();
    const [level6, setLevel6] = useState();
    const [level7, setLevel7] = useState();
    const [level8, setLevel8] = useState();
    const Variable = {
        total:
            level1 * 1 +
            level2 * level1 * 1 +
            level3 * level2 * level1 * 1 +
            level4 * level3 * (level2 * level1 * 1) +
            level5 * level4 * (level3 * (level2 * level1 * 1)) +
            level6 * level5 * (level4 * (level3 * (level2 * level1 * 1))) +
            level7 * level6 * (level5 * (level4 * (level3 * (level2 * level1 * 1)))) +
            level8 * level7 * (level6 * (level5 * (level4 * (level3 * (level2 * level1 * 1))))),
        income:
            level1 * 1 * 100 +
            level2 * level1 * 1 * 50 +
            level3 * level2 * level1 * 1 * 50 +
            level4 * level3 * (level2 * level1 * 1) * 50 +
            level5 * level4 * (level3 * (level2 * level1 * 1)) * 50 +
            level6 * level5 * (level4 * (level3 * (level2 * level1 * 1))) * 50 +
            level7 * level6 * (level5 * (level4 * (level3 * (level2 * level1 * 1)))) * 50 +
            level8 * level7 * (level6 * (level5 * (level4 * (level3 * (level2 * level1 * 1))))) * 50,
    };

    return (
        <div className="panel col-span-2">
            <div className="flex items-center justify-between mb-5">
                <h5 className="font-semibold text-lg dark:text-white-light">Calculator</h5>
            </div>
            <div className="table-responsive mb-5">
                <table>
                    <thead>
                        <tr>
                            <th>Levels</th>
                            <th>Reference</th>
                            <th>Count</th>
                            <th>Income</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>
                                <input className="form-input min-w-[100px]" placeholder="Enter Level 1" onChange={(e) => setLevel1(e.target.value)} />
                            </td>
                            <td>{level1 * 1 || 0}</td>
                            <td>{Formatcurrency(level1 * 1 * 100 || 0)}</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>
                                <input className="form-input min-w-[100px]" placeholder="Enter Level 2" onChange={(e) => setLevel2(e.target.value)} value={level2} />
                            </td>
                            <td>{level2 && level2 * level1 * 1}</td>
                            <td>{Formatcurrency((level2 && level2 * level1 * 1 * 50) || 0)}</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>
                                <input className="form-input min-w-[100px]" placeholder="Enter Level 3" onChange={(e) => setLevel3(e.target.value)} value={level3} />
                            </td>
                            <td>{level3 && level3 * (level2 * level1 * 1)}</td>
                            <td>{Formatcurrency((level3 && level3 * (level2 * level1 * 1 * 50)) || 0)}</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>
                                <input className="form-input min-w-[100px]" placeholder="Enter Level 4" onChange={(e) => setLevel4(e.target.value)} value={level4} />
                            </td>
                            <td>{level4 && level4 * (level3 * (level2 * level1 * 1))}</td>
                            <td>{Formatcurrency((level4 && level4 * (level3 * (level2 * level1 * 1)) * 50) || 0)}</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>
                                <input className="form-input min-w-[100px]" placeholder="Enter Level 5" onChange={(e) => setLevel5(e.target.value)} value={level5} />
                            </td>
                            <td>{level5 && level5 * (level4 * (level3 * (level2 * level1 * 1)))}</td>
                            <td>{Formatcurrency((level5 && level5 * (level4 * (level3 * (level2 * level1 * 1))) * 50) || 0)}</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>
                                <input className="form-input min-w-[100px]" placeholder="Enter Level 6" onChange={(e) => setLevel6(e.target.value)} value={level6} />
                            </td>
                            <td>{level6 && level6 * (level5 * (level4 * (level3 * (level2 * level1 * 1))))}</td>
                            <td>{Formatcurrency((level6 && level6 * (level5 * (level4 * (level3 * (level2 * level1 * 1)))) * 50) || 0)}</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>
                                <input className="form-input min-w-[100px]" placeholder="Enter Level 7" onChange={(e) => setLevel7(e.target.value)} value={level7} />
                            </td>
                            <td>{level7 && level7 * (level6 * (level5 * (level4 * (level3 * (level2 * level1 * 1)))))}</td>
                            <td>{Formatcurrency((level7 && level7 * (level6 * (level5 * (level4 * (level3 * (level2 * level1 * 1))))) * 50) || 0)}</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>
                                <input className="form-input min-w-[100px]" placeholder="Enter Level 8" onChange={(e) => setLevel8(e.target.value)} value={level8} />
                            </td>
                            <td>{level8 && level8 * (level7 * (level6 * (level5 * (level4 * (level3 * (level2 * level1 * 1))))))}</td>
                            <td>{Formatcurrency((level8 && level8 * (level7 * (level6 * (level5 * (level4 * (level3 * (level2 * level1 * 1)))))) * 50) || 0)}</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td>{Variable.total || 0}</td>
                            <td>{Formatcurrency(Variable.income || 0)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Calculator;
