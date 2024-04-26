import React, { useState } from "react";
import * as pdfjs from "pdfjs-dist";

// Configuration du chemin du worker de pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Pdfminiature = ({ pdfUrl }) => {
  const [imageUrl, setImageUrl] = useState(null);

  // Fonction pour extraire et convertir la première page du PDF en image
  const extractImage = async () => {
    console.log(
      "---------------------------------------------------------------------------------------------"
    );
    console.log(pdfUrl);

    const pdf = await pdfjs.getDocument(pdfUrl).promise;
    console.log({ pdf });
    const page = await pdf.getPage(1);
    console.log({ page });
    const viewport = page.getViewport({ scale: 0.5 });
    const canvas = document.createElement("canvas");
    const canvasContext = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({ canvasContext, viewport }).promise;

    const dataUrl = canvas.toDataURL("image/jpeg");
    setImageUrl(dataUrl);
  };

  // Appel de la fonction d'extraction de l'image au chargement du composant
  useState(() => {
    extractImage();
  }, []);

  return <div>{imageUrl && <img src={imageUrl} alt="PDF Thumbnail" />}</div>;
};

export default Pdfminiature;
