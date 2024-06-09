import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generateOrderPDF = (order) => {
    try {
        const doc = new PDFDocument();
        const filePath = path.resolve(`C:/test/order-${order._id}.pdf`);

        doc.pipe(fs.createWriteStream(filePath));

        doc.fontSize(25).text('Order Summary', { align: 'center' });
        doc.moveDown();

        doc.fontSize(18).text(`Order ID: ${order._id}`);
        doc.fontSize(18).text(`User ID: ${order.userId}`);
        doc.fontSize(18).text(`Panier ID: ${order.panierId}`);
        doc.fontSize(18).text(`Order Total: $${order.orderTotal}`);
        doc.fontSize(18).text(`Status: ${order.status}`);
        doc.moveDown();

        doc.fontSize(18).text('Items:', { underline: true });
        order.items.forEach((item, index) => {
            doc.fontSize(16).text(`${index + 1}. ${item.productId} - Quantity: ${item.quantity}, Price: $${item.prix}`);
        });

        doc.end();

        return filePath;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
};