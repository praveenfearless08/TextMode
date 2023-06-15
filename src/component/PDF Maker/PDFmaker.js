import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import "./PDFmaker.css";

const PDFmaker = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]);
  };
  const handleReset = () => {
    setSelectedFiles([]);
  };
  const handleMergeClick = async () => {
    const pdfDoc = await PDFDocument.create();
    const images = [];

    await Promise.all(
      selectedFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = async (e) => {
            const fileData = e.target.result;
            const image = await pdfDoc.embedPng(fileData);
            images.push(image);
            resolve();
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsArrayBuffer(file);
        });
      })
    );

    const pageWidth = 600; // Width of the page
    const pageHeight = 800; // Height of the page
    const padding = 3; // Padding between images and page edges

    let page = pdfDoc.addPage([pageWidth, pageHeight]);
    let availableHeight = pageHeight - padding * 2;
    let y = padding;

    for (const image of images) {
      const { width, height } = image.size();

      const scaleFactor = Math.min(
        (pageWidth - padding * 2) / width,
        availableHeight / height
      );

      const scaledWidth = width * scaleFactor;
      const scaledHeight = height * scaleFactor;

      if (y + scaledHeight > pageHeight - padding) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        availableHeight = pageHeight - padding * 2;
        y = padding;
      }

      const x = padding;
      page.drawImage(image, {
        x,
        y,
        width: scaledWidth,
        height: scaledHeight,
      });

      y += scaledHeight + padding;
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "merged.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="div">
      <div
        className="pdf-merge-container"
        style={{
          backgroundColor: props.mode === "dark" ? "#394867" : "white",
          color: props.mode === "dark" ? "white" : "#394867",
        }}
      >
        <div className="text-box">
          <h1>Select Files to Convert into PDF</h1>
        </div>
        <div className="input">
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            multiple
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#f7f7f7",
              color: "#333",
              fontSize: "14px",
              marginTop: "10px",
              // fontSize: "18px",
              // fontFamily: "Montserrat, sans-serif",
            }}
            onChange={handleFileChange}
          />
        </div>

        <div className="pdf-button">
          <button
            onClick={selectedFiles.length > 0 ? handleMergeClick : null}
            className="btn btn-primary mx-2 my-2"
          >
            Merge to PDF
          </button>
          <button onClick={handleReset} className="btn btn-primary mx-2 my-2">
            Reset
          </button>
        </div>

        <div>
          {selectedFiles.map((file, index) => (
            <div key={index}>{file.name}</div>
          ))}
        </div>
      </div>
      <div
        className="footer"
        style={{
          color: props.mode === "dark" ? "white" : "#394867",
        }}
      >
        <p>© 2022-2023 | textmode.com</p>
      </div>
    </div>
  );
};

export default PDFmaker;

// import React, { useState } from "react";
// import { PDFDocument } from "pdf-lib";
// import "./PDFmaker.css";

// const PDFmaker = (props) => {
//   const [isDraggingOver, setIsDraggingOver] = useState(false);
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleDragEnter = (event) => {
//     event.preventDefault();
//     setIsDraggingOver(true);
//   };

//   const handleDragLeave = (event) => {
//     event.preventDefault();
//     setIsDraggingOver(false);
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     setIsDraggingOver(false);

//     const files = Array.from(event.dataTransfer.files);
//     setSelectedFiles(files);
//   };

//   const handleMergeClick = async () => {
//     const pdfDoc = await PDFDocument.create();
//     const images = [];

//     for (const file of selectedFiles) {
//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         const fileData = e.target.result;
//         const image = await pdfDoc.embedPng(fileData);
//         images.push(image);

//         if (images.length === selectedFiles.length) {
//           const pageWidth = 600; // Width of the page
//           const pageHeight = 800; // Height of the page
//           const padding = 3; // Padding between images and page edges

//           const page = pdfDoc.addPage([pageWidth, pageHeight]);

//           const availableWidth = pageWidth - padding * 2;
//           const availableHeight = pageHeight - padding * 2;

//           let x = padding;
//           let y = padding;

//           for (const image of images) {
//             const { width, height } = image.size();

//             const scaleFactor = Math.min(
//               availableWidth / width,
//               availableHeight / height
//             );

//             const scaledWidth = width * scaleFactor;
//             const scaledHeight = height * scaleFactor;

//             // If the image exceeds the available height, start a new row
//             if (y + scaledHeight > pageHeight - padding) {
//               x += scaledWidth + padding;
//               y = padding;
//             }

//             page.drawImage(image, {
//               x,
//               y,
//               width: scaledWidth,
//               height: scaledHeight,
//             });

//             y += scaledHeight + padding;
//           }

//           const pdfBytes = await pdfDoc.save();
//           const blob = new Blob([pdfBytes], { type: "application/pdf" });
//           const url = URL.createObjectURL(blob);
//           const link = document.createElement("a");
//           link.href = url;
//           link.download = "merged.pdf";
//           link.click();
//           URL.revokeObjectURL(url);
//         }
//       };

//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <div
//       className={`pdf-merge-container ${isDraggingOver ? "drag-over" : ""}`}
//       onDragOver={handleDragOver}
//       onDragEnter={handleDragEnter}
//       onDragLeave={handleDragLeave}
//       onDrop={handleDrop}
//       style={{
//         backgroundColor: props.mode === "dark" ? "#394867" : "white",
//         color: props.mode === "dark" ? "white" : "#394867",
//       }}
//     >
//       <div className="text-box">
//         <h1>Select Files to Convert into PDF</h1>
//       </div>
//       <div className="input">
//         <div
//           className="drag-drop-area"
//           style={{
//             border: isDraggingOver ? "2px dashed #999" : "1px solid #ccc",
//             borderRadius: "4px",
//             backgroundColor: "#f7f7f7",
//             color: "#333",
//             fontSize: "14px",
//             marginTop: "10px",
//           }}
//         >
//           <p>Drag and drop files here</p>
//         </div>
//       </div>
//       <div className="pdf-button">
//         <button
//           onClick={handleMergeClick}
//           className="btn btn-primary mx-2 my-2"
//         >
//           Merge to PDF
//         </button>
//       </div>
//       <div>
//         {selectedFiles.map((file, index) => (
//           <div key={index}>{file.name}</div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PDFmaker;
