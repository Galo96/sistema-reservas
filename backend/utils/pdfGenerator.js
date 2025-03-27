// /backend/utils/pdfGenerator.js
const PDFDocument = require('pdfkit');

exports.generateReservaPDF = (reserva) => {
  const doc = new PDFDocument();
  
  doc.fontSize(18).text('Formulario de Agendamiento', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12)
     .text(`Fecha de la visita: ${reserva.fechaVisita}`)
     .text(`Hora de la visita: ${reserva.horaVisita}`)
     .text(`Fecha de reserva: ${reserva.createdAt}`)
     .text(`Usuario: ${reserva.User.username}`)
     .text(`Proyecto: ${reserva.Proyecto.nombre}`)
     .text(`Actividad: ${reserva.actividad}`)
     .text(`Equipo: ${reserva.equipo}`);
  
  doc.end();
  return doc;
};
