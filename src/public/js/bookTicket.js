/* global swal */

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function findSeatsSelected() {
    const greenSeats = document.querySelectorAll('.filter-green');
    const greenSeatsArray = [];

    greenSeats.forEach((seat) => {
        const parent = seat.parentNode;
        greenSeatsArray.push(parent.textContent.slice(0, 2));
    });
    // console.log(greenSeatsArray);
    return greenSeatsArray;
}

async function bookTicket(busID, startingDate) {
    const selectedSeats = findSeatsSelected();
    // console.log(selectedSeats);
    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: { seats: selectedSeats, bus_id: busID, starting_date: startingDate.toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }) },
    };
    payload.body = JSON.stringify(payload.body);
    const response = await fetch('/api/bookticket', payload).then((res) => res.json());
    if (response.status === 'ok') {
        swal('Your booking has been confirmed!', 'Redirecting ...', {
            icon: 'success',
            button: false,
        });
        await sleep(0);
        window.location.replace('/profile');
    } else {
        swal('Sorry your booking could not be processed', 'Click anywhere outside this message', {
            icon: 'error',
            button: false,
        });
        await sleep(0);
    }
}

function confirmBookingMessage(busID) {
    const selectedSeats = findSeatsSelected();
    if (selectedSeats.length === 0) {
        return;
    }
    const startingDate = document.querySelector(`#trip-${busID}`).children[1].children[0].children[1].textContent.split(' ').slice(9).join(' ');
    swal({
        text: 'Do you want to confirm your booking?',
        buttons: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                bookTicket(busID, new Date(startingDate));
            } else {
                // stays on the routes page
            }
        });
}

window.confirmBookingMessage = confirmBookingMessage;
