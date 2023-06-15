import React from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfConverter = ({ text }) => {
  const convertToPdf = () => {
    const documentDefinition = {
      content: [{ text: text, fontSize: 12, margin: [0, 0, 0, 12] }],
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download("convertedText.pdf");
  };

  return (
    <div>
      <button
        disabled={text.length === 0}
        className="btn btn-primary mx-2 my-2"
        onClick={convertToPdf}
      >
        Download PDF
      </button>
    </div>
  );
};

export default PdfConverter;
