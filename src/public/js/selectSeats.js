function numberOfSelectedSeats(ID) {
    const number = document.querySelectorAll('.filter-green').length;
    document.querySelector(`#numberof-selected-seats-${ID}`).innerText = `Number of seats Selected: ${number}`;
    const fare = parseInt(document.getElementById(`trip-${ID}`).childNodes[3].childNodes[1].childNodes[2].childNodes[2].innerText);
    document.querySelector(`#total-fare-${ID}`).innerText = `Total Fare: ${fare * number}`;
}

function selectSeat(element) {
    element.classList.toggle('filter-green'); // why it appears green

    // class of the img tag obtained from bus ID
    const desiredClass = element.classList[0].toString();
    // extracting the bus ID
    const classArray = desiredClass.split('-');
    numberOfSelectedSeats(classArray[1]);
}

window.selectSeat = selectSeat;
