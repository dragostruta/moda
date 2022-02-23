import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ReactTemplatePDF from "./reactTemplatePDF";

const GeneratePDF = ({ toggleDownload, setToggleDownload }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      {toggleDownload ? (
        <div className="hidden">
          <ReactTemplatePDF ref={componentRef} />
        </div>
      ) : (
        ""
      )}
      <button
        onClick={() => {
          setToggleDownload(true);
          setTimeout(handlePrint, 1000);
        }}
        className="font-semibold"
      >
        Descarcare
      </button>
    </>
  );
};

export default GeneratePDF;
