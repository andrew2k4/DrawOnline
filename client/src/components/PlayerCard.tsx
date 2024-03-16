import React from "react";
import Image from "next/image";
export const PlayerCard = ({ row }: { row: boolean }) => {
  return (
    <div
      className={`flex  gap-4 ${
        row ? "flex-row" : "flex-col"
      }  rounded-3xl container items-center p-3   shadow-lg shadow-slate-500  `}
    >
      <Image src="/woman.png" alt="avatar" width={120} height={150} />
      <p className="">ANDREW JONATHAN</p>
    </div>
  );
};
