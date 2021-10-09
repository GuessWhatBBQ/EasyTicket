function cancelTicket(ID) {
    const tripID = document.getElementById(ID).childNodes[0].innerText;
    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tripID }),
    };
    fetch('/api/user/cancelbooking', payload)
        .then((result) => result.json());
}

window.cancelTicket = cancelTicket;
