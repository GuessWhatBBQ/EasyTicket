function printTicket(ID) {
    const tripID = document.getElementById(ID).childNodes[0].innerText;
    const seats = document.getElementById(ID).childNodes[3].innerText.split('\n')[2];
    console.log(tripID);
    console.log(seats);
    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tripID, seats }),
    };
    console.log(payload);
    fetch('/api/user/printticket', payload)
        .then((res) => console.log(res));
}
