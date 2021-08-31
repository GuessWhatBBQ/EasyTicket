function selectSeat(element) {
    element.classList.toggle('filter-green'); // why it appears green

    const desiredClass = element.classList[0].toString(); // class of the img tag obtained from bus ID
    const classArray = desiredClass.split('-'); // extracting the bus ID
    numberOfSelectedSeats(classArray[1]);
}

function numberOfSelectedSeats(ID) {
    const number = document.querySelectorAll('.filter-green').length;
    document.querySelector(`#numberof-selected-seats-${ID}`).innerText = `Number of seats Selected: ${number}`;
    document.querySelector(`#total-fare-${ID}`).innerText = `Total Fare: ${400 * number}`;
}

window.selectSeat = selectSeat;
