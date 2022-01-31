import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ReactTemplatePDF from "./reactTemplatePDF";

const GeneratePDF = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="hidden">
        <ReactTemplatePDF ref={componentRef} />
      </div>
      <button onClick={handlePrint} className="font-semibold">
        Descarcare
      </button>
    </>
  );
};

export default GeneratePDF;
