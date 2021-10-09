async function getSeatInfo(ID) {
    const seatInfo = {
        tripID: `${ID}`,
        seatNumber: '',
    };
    seatInfo.seatNumber = document.getElementsByClassName('filter-green')[0].parentNode.innerText;
    const data = await fetch('/api/supervisor/fetchseats', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(seatInfo),
    })
        .then((response) => response.json());
    seatInfo.firstName = data.first_name;
    seatInfo.lastName = data.last_name;
    seatInfo.phoneNumber = data.phone_number;
    seatInfo.email = data.email;
    seatInfo.found = data.found;
    // const number = document.querySelectorAll('.filter-green').length;
    if (seatInfo.found) {
        document.querySelector(`#passengerName-${ID}`).innerText = `Name of passenger: ${`${seatInfo.firstName} ${seatInfo.lastName}`}`;
        document.querySelector(`#phoneNumber-${ID}`).innerText = `Phone Number: ${seatInfo.phoneNumber}`;
        document.querySelector(`#passengerEmail-${ID}`).innerText = `Email Address: ${seatInfo.email}`;
        document.querySelector(`#cancelBooking-${ID}`).style.display = 'block';
    }
    else {
        document.querySelector(`#passengerName-${ID}`).innerText = 'Click a seat to know the passenger\'s details';
        document.querySelector(`#phoneNumber-${ID}`).innerText = '';
        document.querySelector(`#passengerEmail-${ID}`).innerText = '';
        document.querySelector(`#cancelBooking-${ID}`).style.display = 'none';
    }
}

function selectSeat(element) {
    const number = document.querySelectorAll('.filter-green').length;
    // class of the img tag obtained from bus ID
    const imgID = element.classList[0].toString();
    // extracting the bus ID
    const busID = imgID.split('-')[1];

    if (number === 0) {
        element.classList.toggle('filter-green'); // why it appears green
        getSeatInfo(busID);
    } 
    else if(element.classList.contains('filter-green')){
        element.classList.toggle('filter-green');
        document.querySelector(`#passengerName-${busID}`).innerText = 'Click a seat to know the passenger\'s details';
        document.querySelector(`#phoneNumber-${busID}`).innerText = '';
        document.querySelector(`#passengerEmail-${busID}`).innerText = '';
        document.querySelector(`#cancelBooking-${busID}`).style.display = 'none';
    } 
    else {
        document.querySelector('.filter-green').classList.toggle('filter-green');
        element.classList.toggle('filter-green'); // why it appears green
        getSeatInfo(busID);
    }
}

window.selectSeat = selectSeat;
