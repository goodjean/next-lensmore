import React from "react";
import LensResultListContainer from "../global/LensResultListContainer";

interface LensByPeriodListProps {
  lensList: {
    id: number;
    name: string;
    price: number;
    img: string;
    reviewcount: number;
  }[];
  listCount: number;
}

function LensByPeriodList({ lensList, listCount }: LensByPeriodListProps) {
  return (
    <>
      <LensResultListContainer lensList={lensList} listCount={listCount} />
    </>
  );
}

export default LensByPeriodList;
