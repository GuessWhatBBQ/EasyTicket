function selectSeat(element){
    element.classList.toggle('filter-green');   //why it appears green
    
    var desiredClass = element.classList[0].toString(); //class of the img tag obtained from bus ID
    var classArray = desiredClass.split("-");       //extracting the bus ID
    numberOfSelectedSeats(classArray[1]);
}

function numberOfSelectedSeats(ID){
    var number = document.querySelectorAll('.filter-green').length;
    document.querySelector(`#numberof-selected-seats-${ID}`).innerText = `Number of seats Selected: ${number}`;
    document.querySelector(`#total-fare-${ID}`).innerText = `Total Fare: ${400*number}`;
}
