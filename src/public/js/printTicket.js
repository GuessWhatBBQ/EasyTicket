function printTicket(ID){
    const tripID = document.getElementById(ID).childNodes[0].innerText;
    const seats = document.getElementById(ID).childNodes[3].innerText.split('\n')[2];
    console.log(tripID);
    console.log(seats);
    fetch('/api/user/printticket')
    .then(res => console.log(res));
}