function numberOfSelectedSeats(ID) {
    const number = document.querySelectorAll('.filter-green').length;
    document.querySelector(`#numberof-selected-seats-${ID}`).innerText = `Number of seats Selected: ${number}`;
    document.querySelector(`#total-fare-${ID}`).innerText = `Total Fare: ${400 * number}`;
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
