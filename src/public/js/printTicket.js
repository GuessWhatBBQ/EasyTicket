/* global html2pdf */

function printTicket(ID) {
    const tripID = document.getElementById(ID).childNodes[0].innerText;
    const seats = document.getElementById(ID).childNodes[3].innerText.split('\n')[2];
    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tripID, seats }),
    };
    fetch('/api/user/printticket', payload)
        .then((result) => result.text())
        .then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');           
            return doc;
        })
        .then((doc)=>{
            const ticketDiv = doc.querySelector('#ticketPDF');
            const opt = {
                margin: 0.1,
                filename: 'ticket.pdf',
                image: { type: 'png' },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'px', format: [720,1280], orientation: 'portrait', putOnlyUsedFonts: true },
            };
            html2pdf().set(opt).from(ticketDiv).save();            
        });
    
}

window.printTicket = printTicket;
