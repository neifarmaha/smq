import React, { useEffect, useState } from "react";
import * as pdfjs from "pdfjs-dist";

// Configuration du chemin du worker de pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Pdfminiature = () => {
  const [pdfUrls, setPdfUrls] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // Fetch PDF URLs from Strapi
    fetchPdfUrlsFromStrapi();
  }, []);

  const fetchPdfUrlsFromStrapi = async () => {
    try {
      // Fetch PDF files from Strapi
      const response = await fetch(
        " http://localhost:1337/admin/plugins/upload?sort=createdAt:DESC&page=1&pageSize=10"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch PDF files from Strapi");
      }
      const data = await response.json();
      // Extract PDF URLs from Strapi response
      const pdfUrls = data.map((file) => file.url);
      setPdfUrls(pdfUrls);
    } catch (error) {
      console.error("Error fetching PDF files from Strapi:", error);
    }
  };

  useEffect(() => {
    if (pdfUrls.length > 0) {
      extractImages();
    }
  }, [pdfUrls]);

  const extractImages = async () => {
    const urls = [];

    for (const pdfUrl of pdfUrls) {
      const pdf = await pdfjs.getDocument(pdfUrl).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 0.5 });
      const canvas = document.createElement("canvas");
      const canvasContext = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext, viewport }).promise;
      const dataUrl = canvas.toDataURL("image/jpeg");
      urls.push(dataUrl);
    }

    setImageUrls(urls);
  };

  return (
    <div>
      {imageUrls.map((imageUrl, index) => (
        <div key={index}>
          <img src={imageUrl} alt={`PDF Thumbnail ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default Pdfminiature;
