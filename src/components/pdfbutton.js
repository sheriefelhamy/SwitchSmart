function exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add text
    doc.text("Hello World!", 10, 10);
    doc.text("This is a simple PDF", 10, 20);
    
    // Save the PDF
    doc.save("document.pdf");
}
function exportMultiPagePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Page 1
    doc.text("Page 1 Content", 10, 10);
    
    // Add new page
    doc.addPage();
    
    // Page 2
    doc.text("Page 2 Content", 10, 10);
    
    doc.save("multi-page.pdf");
}
function exportStyledPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Set font size
    doc.setFontSize(20);
    doc.text("Title", 10, 10);
    
    // Set font size for body
    doc.setFontSize(12);
    doc.text("Body text", 10, 20);
    
    // Add colors (RGB)
    doc.setTextColor(255, 0, 0); // Red
    doc.text("Red text", 10, 30);
    
    // Add lines
    doc.line(10, 35, 200, 35);
    
    doc.save("styled.pdf");
}
function exportTablePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.text("My Table", 10, 10);
    
    // Simple table approach
    const data = [
        ["Name", "Age", "City"],
        ["John", "25", "NYC"],
        ["Jane", "30", "LA"]
    ];
    
    let y = 20;
    data.forEach(row => {
        doc.text(row.join("  |  "), 10, y);
        y += 10;
    });
    
    doc.save("table.pdf");
}