document.querySelector('.addBusFrom').addEventListener('submit',function addBus(event){
    event.preventDefault();
 
    //getting info of new bus to be added
    const busInfo = {pickup :"", destination :"", startingWeekday :"",startingTime :"", arrivalWeekday :"",arrivalTime :"",seatFare :"",supervisorID :""};
    
    let adminBusInput = document.querySelector('.addBusFrom').querySelectorAll("input");
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
    
},false);