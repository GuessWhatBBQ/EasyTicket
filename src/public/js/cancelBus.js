function deleteTrips(buttonID) {
    const bus = document.getElementById(buttonID.split("-")[1]);
    // console.log(buttonID.split("-")[1]);
    console.log(bus);
    
    swal({
        text: 'Are you sure to remove this trip?',
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
            bus.style.display = 'none';
            //query to delete trip from database
        }
        else{
            document.getElementById(buttonID).checked= false;
        }        
    });
}