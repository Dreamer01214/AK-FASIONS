// AK Fashions Order PDF Generator

window.generateOrderPDF = async function(order, returnBlob = false) {
    if (!window.jspdf || !window.jspdf.jsPDF) {
        console.error("jsPDF library not loaded.");
        alert("Unable to generate PDF. Required library is missing.");
        return null;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'pt', 'a4');

    // Page margin settings
    const margin = 40;
    const pageWidth = doc.internal.pageSize.width;

    // Helper: fetch image and convert to Base64
    const fetchImageBase64 = async (url) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/jpeg'));
            };
            img.onerror = () => {
                resolve(null);
            };
            img.src = url;
        });
    };

    // Pre-load all item images
    for (let item of order.items) {
        if (item.image) {
            // Adjust path if we are in admin folder
            const imgPath = window.location.pathname.includes('/admin/') ? '../' + item.image : item.image;
            item.base64Img = await fetchImageBase64(imgPath);
        }
    }

    // Header
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("AK FASHIONS", margin, 60);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("ORDER CONFIRMATION", margin, 78);

    doc.setDrawColor(200, 200, 200);
    doc.line(margin, 90, pageWidth - margin, 90);

    let startY = 110;

    // Order Information
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Order Information", margin, startY);
    doc.setFont("helvetica", "normal");
    
    // Parse order timestamp
    let orderDate = "N/A";
    let orderTime = "N/A";
    if (order.timestamp) {
        const dateObj = new Date(order.timestamp);
        orderDate = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        orderTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }

    doc.text(`Order ID: ${order.id}`, margin, startY + 15);
    doc.text(`Order Date: ${orderDate}`, margin, startY + 30);
    doc.text(`Order Time: ${orderTime}`, margin, startY + 45);
    const statusText = order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : "Confirmed";
    doc.text(`Status: ${statusText}`, margin, startY + 60);

    // Customer Details
    const custStartX = pageWidth / 2;
    doc.setFont("helvetica", "bold");
    doc.text("Customer Details", custStartX, startY);
    doc.setFont("helvetica", "normal");
    const cust = order.customer || {};
    doc.text(`Name: ${cust.name || 'N/A'}`, custStartX, startY + 15);
    doc.text(`Phone: ${cust.phone || 'N/A'}`, custStartX, startY + 30);

    // Build Address properly handling long text
    let addressStr = `Address: ${cust.address || ''}`;
    if (cust.district) addressStr += `, ${cust.district}`;
    if (cust.pincode) addressStr += ` - ${cust.pincode}`;
    
    const splitAddress = doc.splitTextToSize(addressStr, pageWidth / 2 - margin);
    doc.text(splitAddress, custStartX, startY + 45);

    startY = startY + 45 + (splitAddress.length * 12) + 15;

    // Table Data
    const tableHead = [['Image', 'Product', 'Size', 'Color', 'Qty', 'Unit Price', 'Total']];
    const tableBody = order.items.map(item => [
        '', // Image placeholder
        item.name || 'N/A',
        item.size || 'N/A',
        item.color || '-',
        item.qty ? item.qty.toString() : '0',
        `Rs. ${item.price || 0}`,
        `Rs. ${(item.qty || 0) * (item.price || 0)}`
    ]);

    doc.autoTable({
        startY: startY,
        head: tableHead,
        body: tableBody,
        theme: 'grid',
        headStyles: { fillColor: [40, 40, 40], textColor: [255, 255, 255], fontStyle: 'bold' },
        columnStyles: {
            0: { cellWidth: 50, minCellHeight: 50 }, // Image
            1: { cellWidth: 'auto' },
            2: { cellWidth: 40 },
            3: { cellWidth: 50 },
            4: { cellWidth: 40, halign: 'center' },
            5: { cellWidth: 70, halign: 'right' },
            6: { cellWidth: 70, halign: 'right' }
        },
        styles: { valign: 'middle' },
        didDrawCell: function(data) {
            if (data.column.index === 0 && data.section === 'body') {
                const item = order.items[data.row.index];
                if (item && item.base64Img) {
                    const dim = 40;
                    const x = data.cell.x + (data.cell.width - dim) / 2;
                    const y = data.cell.y + (data.cell.height - dim) / 2;
                    doc.addImage(item.base64Img, 'JPEG', x, y, dim, dim);
                } else {
                    const textStr = "No Image";
                    const textWidth = doc.getTextWidth(textStr);
                    const x = data.cell.x + (data.cell.width - textWidth) / 2;
                    const y = data.cell.y + data.cell.height / 2 + 3;
                    doc.setFontSize(8);
                    doc.setTextColor(150);
                    doc.text(textStr, x, y);
                    doc.setTextColor(0); // reset
                    doc.setFontSize(10);
                }
            }
        }
    });

    let finalY = doc.lastAutoTable.finalY + 30;

    // Price Summary
    const summaryX = pageWidth - margin - 150;
    
    // In the existing code, delivery charge is not explicitly maintained per order.
    // If it exists in future, we can add it here.
    let subtotal = order.total || 0;
    
    doc.setFont("helvetica", "normal");
    doc.text("Subtotal:", summaryX, finalY);
    doc.text(`Rs. ${subtotal.toLocaleString('en-IN')}`, pageWidth - margin, finalY, { align: 'right' });
    finalY += 15;

    doc.text("Delivery:", summaryX, finalY);
    doc.text("FREE", pageWidth - margin, finalY, { align: 'right' });
    finalY += 15;

    doc.line(summaryX, finalY, pageWidth - margin, finalY);
    finalY += 15;

    doc.setFont("helvetica", "bold");
    doc.text("GRAND TOTAL:", summaryX, finalY);
    doc.text(`Rs. ${subtotal.toLocaleString('en-IN')}`, pageWidth - margin, finalY, { align: 'right' });
    
    finalY += 40;

    // Payment Information
    doc.setFont("helvetica", "bold");
    doc.text("Payment Information", margin, finalY);
    doc.setFont("helvetica", "normal");
    // Default is Cash on Delivery / UPI via WhatsApp as per the existing text
    doc.text("Payment Method: WhatsApp Checkout (UPI/COD)", margin, finalY + 15);
    doc.text("Payment Status: Pending", margin, finalY + 30);

    // Footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for shopping with AK Fashions!", pageWidth / 2, pageHeight - 40, { align: 'center' });
    doc.text("For order-related queries, please contact AK Fashions Customer Support.", pageWidth / 2, pageHeight - 25, { align: 'center' });

    let customerName = (order.customer && order.customer.name) ? order.customer.name : 'Customer';
    let safeCustomerName = customerName.trim().replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
    if (!safeCustomerName) safeCustomerName = 'Customer';
    
    const filename = `AK_Fashions_Order_${safeCustomerName}_${order.id}.pdf`;

    if (returnBlob) {
        return {
            blob: doc.output('blob'),
            filename: filename
        };
    }
    
    doc.save(filename);
};
