import React, { useState } from "react";
import { Document, Page } from "react-pdf";

const PdfThumbnail = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="pdf-thumbnails">
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className="pdf-document"
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={100}
            className="pdf-page"
          />
        ))}
      </Document>
    </div>
  );
};

export default PdfThumbnail;
