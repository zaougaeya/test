import PDFDocument from "pdfkit";
import fs from "fs";

export const generatePDF = (eventDetails, filePath) => {
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(25).text("Confirmation de Participation", { align: "center" });

  doc.moveDown();
  doc.fontSize(18).text(`Vous avez participé avec succès à l'événement suivant :`);
  doc.moveDown();
  doc.fontSize(15).text(`Nom de l'événement : ${eventDetails.eventname}`);
  doc.text(`Description : ${eventDetails.descevent}`);
  doc.text(`Date de début : ${eventDetails.datdebevent}`);
  doc.text(`Date de fin : ${eventDetails.datfinevent}`);
  doc.text(`Prix : ${eventDetails.prixevent} EUR`);

  doc.end();
};
