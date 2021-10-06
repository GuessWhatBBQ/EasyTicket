function hideOthers() { // hides the display of all other seat layouts
    const toBeRemoved = document.querySelectorAll('.displayCard');
    toBeRemoved.forEach((element) => {
        element.classList.remove('displayCard');
    });
}

function changeOthersInnerText() { // changes the innerText of all other 'Hide seats' buttons
    const viewOrhideButtons = document.querySelectorAll('.viewOrhide');
    viewOrhideButtons.forEach((button) => {
        button.innerText = 'View Seats';
    });
}

function resetNumberOfSelectedSeats() { // sets default innerText of
    const commonNumberClass = document.getElementsByClassName('commonNumberClass');
    const commonFareClass = document.getElementsByClassName('commonFareClass');
    for (let i = 0; i < commonNumberClass.length; i += 1) {
        commonNumberClass[i].innerText = 'Number of seats Selected: 0'; // 'number of seats selected' div
        commonFareClass[i].innerText = 'Total Fare: 0'; // and 'total fare' div
    }
}

function resetGreenSeats() { // clears all selected seats
    const greenSeats = document.querySelectorAll('.filter-green');
    greenSeats.forEach((seat) => {
        seat.classList.remove('filter-green');
    });
    // console.log('All greenSeats are reset');
}

async function viewSeats(buttonID) {
    const viewLayoutButton = document.getElementById(`${buttonID}`); // this is the button that is clicked to view/hide seats
    // const busID = buttonID.split('').slice(1).join('');

    if (viewLayoutButton.innerText === 'View Seats') {
        // serial of function calls doesn't matter
        hideOthers();
        changeOthersInnerText();

        viewLayoutButton.innerText = 'Hide Seats'; // changes the innerText of it's own

        resetNumberOfSelectedSeats();
        resetGreenSeats();
    } else {
        viewLayoutButton.innerText = 'View Seats';
    }

    const card = document.getElementById(`layout-${buttonID}`); // default display of bus layout is set to 'none'
    card.classList.toggle('displayCard'); // displayCard will have display:block
}
