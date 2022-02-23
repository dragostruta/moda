import { useEffect, useRef, useState } from "react";
import GeneratePDF from "../../lib/GeneratePDF";
import ResultTable from "../core/ResultTable";

const Preview = ({ handlePreview }) => {
  const [toggleDownload, setToggleDownload] = useState(false);
  return (
    <div className="p-10 text-2xl font-bold flex-1">
      <section className="px-4">
        {!toggleDownload ? <ResultTable /> : ""}
        <div
          onClick={() => handlePreview(false)}
          className="flex float-right font-semibold text-sm bg-teal-400 text-white rounded-md mt-4 p-3 cursor-pointer mr-5"
        >
          Inapoi
        </div>
        <div
          onClick={() => {
            setToggleDownload(true);
          }}
          className="flex float-right font-semibold text-sm bg-teal-400 text-white rounded-md mt-4 p-3 cursor-pointer mr-5"
        >
          {toggleDownload ? <GeneratePDF /> : "Descarcare"}
        </div>
      </section>
    </div>
  );
};

export default Preview;
