function cancelBus(busID) {
    document.getElementById(`cancelBusForm${busID}`).addEventListener('submit',e=>e.preventDefault(),false);
    const bus = document.getElementById(busID);    
    const modalID = `j-${busID}`;

    //date input by admin
    var date = document.getElementById(modalID).querySelector('input').value;
    //if the date input field is not empty, then run below code after form submission
    if(date){
        //getting the day of input date by admin
        const day = new Date(date).getDay(); //sunday is 0
        console.log(day);

        //gives the starting weekday of the bus
        var busDay = document.getElementById(busID).querySelectorAll('.card-text')[1];
        
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
                turnSliderGreen(`${busID}`);
                //function to delete bus from database
            }
            else{
                //does nothing
            } 
        });  
    }
}



function turnSliderGreen(busID){
    const sliderID = (`i-${busID}`);    
    document.getElementById(sliderID).checked= false;
}
function turnSliderRed(busID){
    const sliderID = (`i-${busID}`);    
    document.getElementById(sliderID).checked= true;
}