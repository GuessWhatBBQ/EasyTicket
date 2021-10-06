document.querySelector('.addBusFrom').addEventListener('submit',function addBus(event){
    event.preventDefault();
 
    //getting info of new bus to be added
    let adminBusInput = document.querySelector('.addBusFrom').querySelectorAll("input");

    const busInfo = {pickup :"", destination :"", startingWeekday :"",startingTime :"", arrivalWeekday :"",arrivalTime :"",seatFare :"",supervisorID :""};   

    busInfo.pickup = adminBusInput[0].value;
    busInfo.destination = adminBusInput[1].value;
    busInfo.startingWeekday = adminBusInput[2].value;
    busInfo.startingTime = adminBusInput[3].value;
    busInfo.arrivalWeekday = adminBusInput[4].value;
    busInfo.arrivalTime = adminBusInput[5].value;
    busInfo.seatFare = adminBusInput[6].value;
    busInfo.supervisorID = adminBusInput[7].value;

    console.log(busInfo);

    //clears the previously inputted bus info
    adminBusInput.forEach(element => element.value = '');

    fetch('/api/admin/addbusroute', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(busInfo),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    
},false);