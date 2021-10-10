function adminCancelTicket(ID) {
    // const tripID = document.getElementById(ID).childNodes[0].innerText;
    const email = document.getElementById(`passengerEmail-${ID}`).innerText.split(' ')[2];
    // console.log(email);
    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tripID: ID, email }),
    };
    fetch('/api/admin/cancelbooking', payload)
        .then((result) => result.json());
}

window.adminCancelTicket = adminCancelTicket;
