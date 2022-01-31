import { useRef } from "react";
import GeneratePDF from "../../lib/GeneratePDF";
import ResultTable from "../core/ResultTable";

const Preview = ({ handlePreview }) => {
  return (
    <div className="p-10 text-2xl font-bold flex-1">
      <section className="px-4">
        <ResultTable />
        <div
          onClick={() => handlePreview(false)}
          className="flex float-right font-semibold text-sm bg-teal-400 text-white rounded-md mt-4 p-3 cursor-pointer mr-5"
        >
          Inapoi
        </div>
        <div className="flex float-right font-semibold text-sm bg-teal-400 text-white rounded-md mt-4 p-3 cursor-pointer mr-5">
          <GeneratePDF />
        </div>
      </section>
    </div>
  );
};

export default Preview;
