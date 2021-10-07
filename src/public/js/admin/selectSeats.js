function numberOfSelectedSeats(ID) {
    const number = document.querySelectorAll('.filter-green').length;
    document.querySelector(`#passengerName-${ID}`).innerText = `Name of passenger: ${number}`;
    document.querySelector(`#phoneNumber-${ID}`).innerText = `Phone Number ${400 * number}`;
}

function selectSeat(element) {
    const number = document.querySelectorAll('.filter-green').length;
    if(number == 0){
        element.classList.toggle('filter-green'); // why it appears green
        // class of the img tag obtained from bus ID
        const imgID = element.classList[0].toString();
        // extracting the bus ID
        const busID = imgID.split('-')[1];
        numberOfSelectedSeats(busID);
    }
    else{
        document.querySelector('.filter-green').classList.toggle('filter-green');
        element.classList.toggle('filter-green'); // why it appears green
    }
}

window.selectSeat = selectSeat;
