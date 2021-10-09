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
//basically resets all innerTexts to default
function resetNumberOfSelectedSeats() {
    const commonPassengerNameClass = document.getElementsByClassName('commonPassengerNameClass');
    const commonPhoneNumberClass = document.getElementsByClassName('commonPhoneNumberClass');
    const commonPassengerEmailClass = document.getElementsByClassName('commonPassengerEmailClass');
    for (let i = 0; i < commonPassengerNameClass.length; i += 1) {
        commonPassengerNameClass[i].innerText = 'Click a seat to know the passenger\'s details'; 
        commonPhoneNumberClass[i].innerText = '';
        commonPassengerEmailClass[i].innerText = '';
    }
}

function resetGreenSeats() { // clears all selected seats
    const greenSeats = document.querySelectorAll('.filter-green');
    greenSeats.forEach((seat) => {
        seat.classList.remove('filter-green');
    });
}

async function fetchBookedSeats(tripID, startingDate) {
    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: { tripID, starting_date: startingDate },
    };
    payload.body = JSON.stringify(payload.body);
    const seatingArrangement = await fetch('/api/admin/fetchseats', payload)
        .then((res) => res.json());
    if (seatingArrangement.seating_arrangement) {
        const seats = document.querySelector(`#seats-${tripID}`);
        seats.childNodes.forEach((column) => {
            column.childNodes.forEach((element) => {
                if (!seatingArrangement.seating_arrangement[element.innerText]) {
                    element.classList.add('seat-booked');
                }
            });
        });
    }
}

async function viewSeats(buttonID) {
    const viewLayoutButton = document.getElementById(`${buttonID}`); // this is the button that is clicked to view/hide seats

    const busID = buttonID.split('').slice(1).join('');
    const startingDate = new Date(document.querySelector(`#trip-${busID}`).children[1].children[0].children[1].textContent.split(' ').slice(9).join(' '));
    await fetchBookedSeats(busID, startingDate);

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

window.viewSeats = viewSeats;
