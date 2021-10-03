function cancelBus(busID) {
    const bus = document.getElementById(busID);
    const modalID = `j-${busID}`;

    //date input by admin
    var date = document.getElementById(modalID).querySelector('input').value;
    //getting the day of input date by admin
    const day = new Date(date).getDay(); //sunday is 0
    console.log(day);

    //gives the starting weekday of the bus
    var busDay = document.getElementById(busID).querySelectorAll('.card-text')[1];

    //admin is not allowed to choose a date which doesn't correspond to the starting weekday of that bus
    
    // switch(busDay){
    //     case Sunday:
    //         busDay = 0;
    //     case Monday:
    //         busDay = 1;
    //     case Tuesday:
    //         busDay = 2; 
    //     case Wednesday:
    //         busDay = 3;  
    //     case Thursday:
    //         busDay = 4;
    //     case Friday:
    //         busDay = 5;
    //     case Saturday:
    //         busDay = 6;  
    // }

    // let correctDate = new Promise((resolve,reject) => {
    //     if(busDay === day) resolve();
    //     else reject();
    // });
    // correctDate.then( ()=>{
    //     swal({
    //         text: 'Are you sure to remove this Bus?',
    //         buttons:{
    //             cancel: {
    //               text: "Cancel",
    //               value: null,
    //               visible: true,
    //               className: "",
    //               closeModal: true,
    //             },
    //             confirm: {
    //               text: "Confirm",
    //               value: true,
    //               visible: true,
    //               className: "",
    //               closeModal: true
    //             }
    //         }
    //     })
    //     .then((response) => {
    //         if (response){
    //             //to show that it works
    //             bus.style.backgroundColor = 'red';
    
    //             //function to delete bus from database
    //         }
    //         else{
    //             //does nothing
    //         } 
    //         turnSliderGreen(`${busID}`);       
    //     });
    // }).catch( ()=>{
    //     var errorDiv = document.createElement('div');
    //     errorDiv.innerText = "Selected day doesn't match with the starting weekday of the bus";
    //     errorDiv.style.color = 'red';
    //     errorDiv.style.fontSize = '20px';
    //     document.appendChild(errorDiv);
    // })



    swal({
        text: 'Are you sure to remove this Bus?',
        buttons:{
            cancel: {
              text: "Cancel",
              value: null,
              visible: true,
              className: "",
              closeModal: true,
            },
            confirm: {
              text: "Confirm",
              value: true,
              visible: true,
              className: "",
              closeModal: true
            }
        }
    })
    .then((response) => {
        if (response){
            //to show that it works
            bus.style.backgroundColor = 'red';

            //function to delete bus from database
        }
        else{
            //does nothing
        } 
        turnSliderGreen(`${busID}`);       
    });
}

function turnSliderGreen(busID){
    const sliderID = (`i-${busID}`);    
    document.getElementById(sliderID).checked= false;
}