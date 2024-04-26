import React, { useEffect } from "react";
import pdfjs from "pdfjs-dist/build/pdf";

const PDFViewer = ({ pdfUrl }) => {
  useEffect(() => {
    const loadingTask = pdfjs.getDocument(pdfUrl);
    loadingTask.promise.then(
      (pdf) => {
        // Le document PDF a été chargé avec succès
        console.log("Nombre de pages du document PDF :", pdf.numPages);

        // Récupérer la première page du document
        pdf.getPage(1).then((page) => {
          const scale = 1.5;
          const viewport = page.getViewport({ scale });

          // Créer un élément canvas pour afficher la page
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          // Rendre la page PDF sur le canvas
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          const renderTask = page.render(renderContext);
          renderTask.promise.then(() => {
            console.log("Page 1 rendue avec succès sur le canvas");
            // Maintenant, vous pouvez utiliser le canvas pour afficher la page dans votre application
          });
        });
      },

      (error) => {
        // Une erreur s'est produite lors du chargement du document PDF
        console.error("Erreur lors du chargement du document PDF :", error);
      }
    );
  }, [pdfUrl]);

  return <div>{/* Placeholder pour afficher le document PDF */}</div>;
};

export default PDFViewer;
