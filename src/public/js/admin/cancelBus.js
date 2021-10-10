/* global swal bootstrap */

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.date-picker').forEach((item) => {
        const id = item.id.split('-')[1];
        const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const weekday = document.getElementById(id)
            .childNodes[1]
            .childNodes[0]
            .childNodes[1]
            .childNodes[2]
            .innerText;
        const indexes = [];
        weekdays.forEach((day, index) => {
            if (day !== weekday) {
                indexes.push(index);
            }
        });
        const today = new Date();
        today.setDate(today.getDate() - 1);
        $(`#datepicker-${id}`).datepicker({
            disableDaysOfWeek: indexes,
            minDate: today,
        });
    });
}, false);

const errorParagraph = document.createElement('p');
function matchWeekDay(date, busDay) {
    // getting the day of input date by admin
    const day = new Date(date).getDay(); // sunday is 0

    busDay = busDay.toLowerCase();
    switch (busDay) {
    default:
        busDay = -1;
        break;
    case 'sunday':
        busDay = 0;
        break;
    case 'monday':
        busDay = 1;
        break;
    case 'tuesday':
        busDay = 2;
        break;
    case 'wednesday':
        busDay = 3;
        break;
    case 'thursday':
        busDay = 4;
        break;
    case 'friday':
        busDay = 5;
        break;
    case 'saturday':
        busDay = 6;
        break;
    }

    if (day === busDay) return true;
    return false;
}
function addDOM(ID, message) {
    if (document.getElementById(`errorPara-${ID}`)) {
        errorParagraph.style.display = 'block';
        return;
    }

    errorParagraph.setAttribute('id', `errorPara-${ID}`);
    errorParagraph.innerText = message;
    errorParagraph.style.color = 'red';
    errorParagraph.style.textAlign = 'center';
    errorParagraph.style.fontSize = 'smaller';
    errorParagraph.style.fontWeight = '600';

    // the ID is required to set a location for the errorParagrapgh to pop up
    const node = document.getElementById(`${ID}`);
    node.parentNode.insertBefore(errorParagraph, node);
}

// this function is called only when the slider in adminBusCard.pug is clicked
let mdl;
function createModal(ID) {
    // creating modals corresponding to busID
    mdl = new bootstrap.Modal(document.getElementById(ID));
    mdl.show();
}

function turnSliderGreen(busID) {
    const sliderID = (`i-${busID}`);
    document.getElementById(sliderID).checked = false;
}

function cancelBus(busID) {
    document.getElementById(`cancelBusForm${busID}`).addEventListener('submit', (e) => e.preventDefault(), false);
    const modalID = `j-${busID}`;

    // date input by admin
    let date = document.getElementById(modalID).querySelector('input').value;
    date = new Date(date);
    date.setDate(date.getDate() + 1);
    date = date.toISOString().substring(0, 10);
    if (date) {
        // gives the starting weekday of the bus
        const busDay = document.getElementById(busID).querySelectorAll('.card-text')[1].innerText;
        // var busDay = 0;

        if (!matchWeekDay(date, busDay)) {
            // when weekdays don't match show error
            addDOM(`errorPara-${busID}`, 'Weekday of your input does not match Starting Weekday of selected Bus');
        } else {
            errorParagraph.style.display = 'none';
            swal({
                text: 'Are you sure to remove this Bus?',
                buttons: {
                    cancel: {
                        text: 'Cancel',
                        value: null,
                        visible: true,
                        className: '',
                        closeModal: true,
                    },
                    confirm: {
                        text: 'Confirm',
                        value: true,
                        visible: true,
                        className: '',
                        closeModal: true,
                    },
                },
            })
                .then((swalResponse) => {
                    if (swalResponse) {
                        turnSliderGreen(`${busID}`);
                        mdl.hide();
                        // sending busData to backend
                        const BusData = {
                            busID,
                            cancelledTripDate: date,
                        };
                        fetch('/api/admin/canceltrip', {
                            method: 'POST', // or 'PUT'
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(BusData),
                        })
                            .then((response) => response.json());
                    } else {
                    // do nothing when swal cancel button is clicked
                    }
                });
        }
    } else {
        // if date input field is empty do nothing
    }
}

window.cancelBus = cancelBus;
window.createModal = createModal;
