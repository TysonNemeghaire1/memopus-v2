import React from "react";
import NumberOfTermInColumn from "../../interfaces/NumberOfTermInColumn";
import ColumnIndex from "../../interfaces/ColumnIndex";
import {AiOutlineArrowDown} from "react-icons/ai";
import {Link, useParams} from "react-router-dom";
import {useSmallScreen} from "../../hooks/useSmallScreen";
import Coopernet from "../../services/Coopernet";

interface Props {
  numberOfTermInColumn: NumberOfTermInColumn[];
}

function ThematicTable({numberOfTermInColumn}: Props) {
  const isSmallScreen = useSmallScreen();
  const params = useParams();
  const sortByName = () => {
    numberOfTermInColumn.sort((firstTerm, secondTerm) => {
      const firstTermName = firstTerm.name.toUpperCase();
      const secondTermName = secondTerm.name.toUpperCase();

      if (firstTermName < secondTermName) {
        return -1;
      } else if (firstTermName > secondTermName) {
        return 1;
      }
      return 0;
    });
  };
  const sortByCol = (col_id: number) => {
    numberOfTermInColumn.sort(
      (firstItem, secondItem) =>
        secondItem.cols[col_id as ColumnIndex] -
        firstItem.cols[col_id as ColumnIndex]
    );
  };
  const transformText = (string: string) => {
    return string.replace("&#039;", "'").replace("&#34;", '"');
  };

  return (
    <table className="w-full overflow-hidden rounded-xl bg-white text-center text-sm text-blue-800 shadow-xl">
      <thead className="border-b-2 border-b-blue-800">
        <tr>
          <th
            className="flex items-center justify-center border-b-blue-100 bg-blue-800 py-5 text-white border-b-3 gap-1.5"
            scope="col"
            role={"button"}
            onClick={() => sortByName()}
          >
            <span className="flex items-center justify-center gap-1.5">
              {isSmallScreen ? "Thème" : "Thématique"}
              <AiOutlineArrowDown />
            </span>
          </th>
          <th scope="col" role="button" onClick={() => sortByCol(17)}>
            <span className="flex items-center justify-center text-red-600 gap-1">
              {isSmallScreen ? "Apprendre" : "À apprendre"}
              <AiOutlineArrowDown />
            </span>
          </th>
          <th scope="col" role="button" onClick={() => sortByCol(18)}>
            <span className="flex items-center justify-center text-orange-600 gap-1">
              {isSmallScreen ? "Peu" : "Je sais un peu"}
              <AiOutlineArrowDown />
            </span>
          </th>
          <th scope="col" role="button" onClick={() => sortByCol(19)}>
            <span className="flex items-center justify-center text-yellow-600 gap-1">
              {isSmallScreen ? "Bien" : "Je sais bien"}
              <AiOutlineArrowDown />
            </span>
          </th>
          <th scope="col" role="button" onClick={() => sortByCol(20)}>
            <span className="flex items-center justify-center text-green-600 gap-1">
              {isSmallScreen ? "Parfait" : "Je sais parfaitement"}
              <AiOutlineArrowDown />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {numberOfTermInColumn.map((data, index) => (
          <tr
            role={"button"}
            key={data.card_theme_id}
            className={`hover:bg-blue-200 border-b border-b-blue-100 ${
              index === numberOfTermInColumn.length - 1 ? "md:rounded-b-xl" : ""
            }`}
          >
            <td
              className={`font-bold py-3 text-blue-800 bg-blue-50 px-2 sm:px-0 ${
                index === numberOfTermInColumn.length - 1
                  ? "md:rounded-bl-xl"
                  : ""
              }`}
            >
              <Link
                  to={`/users/${
                      params.userId ? params.userId : Coopernet.user.id
                  }/thematics/${data.card_theme_id}`}
                  state={{thematicName: transformText(data.name)}}
                  className="block h-full w-full"
              >
                {transformText(data.name)}{" "}
              </Link>
            </td>
            <td>
              <Link
                  to={`/users/${
                      params.userId ? params.userId : Coopernet.user.id
                  }/thematics/${data.card_theme_id}`}
                  state={{thematicName: transformText(data.name)}}
                  className="block h-full w-full"
              >
                {data.cols["17"]}
              </Link>
            </td>
            <td>
              <Link
                  to={`/users/${
                      params.userId ? params.userId : Coopernet.user.id
                  }/thematics/${data.card_theme_id}`}
                  state={{thematicName: transformText(data.name)}}
                  className="block h-full w-full"
              >
                {data.cols["18"]}
              </Link>
            </td>
            <td>
              <Link
                  to={`/users/${
                      params.userId ? params.userId : Coopernet.user.id
                  }/thematics/${data.card_theme_id}`}
                  state={{thematicName: transformText(data.name)}}
                  className="block h-full w-full"
              >
                {data.cols["19"]}
              </Link>
            </td>
            <td>
              <Link
                  to={`/users/${
                      params.userId ? params.userId : Coopernet.user.id
                  }/thematics/${data.card_theme_id}`}
                  state={{thematicName: transformText(data.name)}}
                  className="block h-full w-full"
              >
                {data.cols["20"]}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ThematicTable;
