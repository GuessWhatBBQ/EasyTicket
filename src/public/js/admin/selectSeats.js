function getSeatInfo(ID) {
    var seatInfo = {tripID:`${ID}`, seatNumber:"", firstName:"", lastName:"",phoneNumber:""};
    seatInfo.seatNumber = document.getElementsByClassName('filter-green')[0].parentNode.innerText;
    fetch('/api/supervisor/tripinfo', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(seatInfo),
        })
        .then(response => response.json())
        .then(data=>{
            seatInfo.firstName = data.first_name;
            seatInfo.lastName = data.last_name;
            seatInfo.phoneNumber = data.phone_number;
        })
    // const number = document.querySelectorAll('.filter-green').length;
    document.querySelector(`#passengerName-${ID}`).innerText = `Name of passenger: ${seatInfo.firstName}+' '+${seatInfo.lastName}`;
    document.querySelector(`#phoneNumber-${ID}`).innerText = `Phone Number ${seatInfo.phoneNumber}`;
}

function selectSeat(element) {
    const number = document.querySelectorAll('.filter-green').length;
    if (number == 0) {
        element.classList.toggle('filter-green'); // why it appears green
        // class of the img tag obtained from bus ID
        const imgID = element.classList[0].toString();
        // extracting the bus ID
        const busID = imgID.split('-')[1];
        getSeatInfo(busID);
    }
    else{
        document.querySelector('.filter-green').classList.toggle('filter-green');
        element.classList.toggle('filter-green'); // why it appears green
    }
}

window.selectSeat = selectSeat;
