/* global swal */

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function findSeatsSelected(){
    var greenSeats = document.querySelectorAll('.filter-green');
    var greenSeatsArray = [];

    greenSeats.forEach(seat => {
        var parent = seat.parentNode;
        greenSeatsArray.push(parent.textContent.slice(0,2));
    });
    // console.log(greenSeatsArray);
    return greenSeatsArray;
}

async function bookTicket(busID) {
    const selectedSeats = findSeatsSelected();
    console.log(selectedSeats);
    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: { bus_id: busID },
    };
    payload.body = JSON.stringify(payload.body);
    const response = await fetch('/api/bookticket', payload).then((res) => res.json());
    if (response.status === 'ok') {
        swal('Your booking has been confirmed!', 'Redirecting ...', {
            icon: 'success',
            button: false,
        });
        await sleep(2000);
        window.location.replace('/profile');
    } else {
        swal('Sorry your booking could not be processed', 'Click anywhere outside this message', {
            icon: 'error',
            button: false,
        });
        await sleep(2000);
    }
}

function confirmBookingMessage(busID) {
    swal({
        text: 'Do you want to confirm your booking?',
        buttons: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                bookTicket(busID);
            } else {
                // stays on the routes page
            }
        });
}


window.confirmBookingMessage = confirmBookingMessage;
