import React, {useEffect, useState} from 'react';
import Coopernet from "../../services/Coopernet";
import NumberOfTermInColumnInterface from "../../interfaces/NumberOfTermInColumn";
import columnIndexType from "../../interfaces/columnIndex";

function HomeTable() {

    const [numberOfTermInColumn, setNumberOfTermInColumn] = useState<NumberOfTermInColumnInterface[]>([]);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        (async () => {
            setNumberOfTermInColumn(await Coopernet.getTermsAndColumns());
        })()

        if (window.screen.width < 762) {
            setIsSmallScreen(true);
        }
    }, [])

    const sortByName = () => {
        const numberOfTermInColumnCopy = [...numberOfTermInColumn];
        numberOfTermInColumnCopy.sort((firstTerm, secondTerm) => {
            const firstTermName = firstTerm.name.toUpperCase();
            const secondTermName = secondTerm.name.toUpperCase();

            if (firstTermName < secondTermName) {
                return -1;
            } else if (firstTermName > secondTermName) {
                return 1;
            }
            return 0;
        });
        setNumberOfTermInColumn(numberOfTermInColumnCopy);
    };
    const sortByCol = (col_id: number) => {
        const numberOfTermInColumnCopy = [...numberOfTermInColumn];
        numberOfTermInColumnCopy.sort((firstItem, secondItem) => secondItem.cols[col_id as columnIndexType] - firstItem.cols[col_id as columnIndexType]);
        setNumberOfTermInColumn(numberOfTermInColumnCopy);
    }
    const transformText = (string: string) => {
        return string.replace('&#039;', "'").replace('&#34;', "\"");
    };

    return (
        <>
            <div className="mx-auto h-full w-full lg:w-11/12">
                <h1 className="p-6 text-xl lg:text-2xl font-extrabold text-blue-800">Mes tableaux</h1>
                <table className="w-full overflow-hidden lg:rounded-3xl bg-white text-center text-blue-800 shadow-2xl">
                    <thead className="border-b-2 border-b-blue-800">
                    <tr>
                        <th className="border-b-2 border-b-blue-100 bg-blue-800 py-2 text-white" scope="col"
                            role={"button"} onClick={() => sortByName()}>{isSmallScreen ? 'Thème' : 'Thématique'}</th>
                        <th scope="col" role="button"
                            onClick={() => sortByCol(17)}>{isSmallScreen ? 'Apprendre' : 'À apprendre'}</th>
                        <th scope="col" role="button"
                            onClick={() => sortByCol(18)}>{isSmallScreen ? 'Peu' : 'Je sais un peu'}</th>
                        <th scope="col" role="button"
                            onClick={() => sortByCol(19)}>{isSmallScreen ? 'Bien' : 'Je sais bien'}</th>
                        <th scope="col" role="button"
                            onClick={() => sortByCol(20)}>{isSmallScreen ? 'Parfaitement' : 'Je sais parfaitement'}</th>
                    </tr>
                    </thead>
                    <tbody>{numberOfTermInColumn.map((data, index) => (
                        <tr role={'button'} key={data.card_theme_id}
                            className={`hover:bg-blue-200 border-y border-y-blue-100 ${index === numberOfTermInColumn.length - 1 ? "lg:rounded-b-3xl" : ""}`}>
                            <td className={`py-3 text-white bg-blue-800 ${index === numberOfTermInColumn.length - 1 ? "lg:rounded-bl-3xl" : ""}`}>{transformText(data.name)}</td>
                            <td>{data.cols['17']}</td>
                            <td>{data.cols['18']}</td>
                            <td>{data.cols['19']}</td>
                            <td>{data.cols['20']}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>

        </>
    );
}

export default HomeTable;