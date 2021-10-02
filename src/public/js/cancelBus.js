function cancelBus(busID) {
    const bus = document.getElementById(busID);

    //date input by admin
    const modalID = `j-${busID}`;
    var date = document.getElementById(modalID).querySelector('input').value;
    // console.log(date);
    
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