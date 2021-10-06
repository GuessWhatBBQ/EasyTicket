const errorParagraph = document.createElement('p');
function matchWeekDay(date,busDay){
    //getting the day of input date by admin
    const day = new Date(date).getDay(); //sunday is 0

    // busDay = busDay.toLowerCase();
    // switch(busDay){
    //     case sunday:
    //         busDay = 0;
    //     case monday:
    //         busDay = 1;
    //     case tuesday:
    //         busDay = 2; 
    //     case wednesday:
    //         busDay = 3;  
    //     case thursday:
    //         busDay = 4;
    //     case friday:
    //         busDay = 5;
    //     case saturday:
    //         busDay = 6;  
    // }
    
    if(day == busDay) return true;
    else return false;
}
function addDOM(ID,message) {
    if (document.getElementById('errorParaSet')){
        errorParagraph.style.display = 'block';
        return;
    }
    
    errorParagraph.setAttribute('id', 'errorParaSet');
    errorParagraph.innerText = message;
    errorParagraph.style.color = 'red';
    errorParagraph.style.textAlign = 'center';
    errorParagraph.style.fontSize = 'smaller';
    errorParagraph.style.fontWeight = '600';
;
    // the ID is required to set a location for the errorParagrapgh to pop up
    const node = document.getElementById(`${ID}`);
    node.parentNode.insertBefore(errorParagraph, node);
}

//this function is called only when the slider in adminBusCard.pug is clicked
let mdl;
function createModal(ID){
    //creating modals corresponding to busID 
    mdl = new bootstrap.Modal(document.getElementById(ID));
    mdl.show();
}

function cancelBus(busID) {
    document.getElementById(`cancelBusForm${busID}`).addEventListener('submit',e=>e.preventDefault(),false);
    const bus = document.getElementById(busID);    
    const modalID = `j-${busID}`;

    //date input by admin
    var date = document.getElementById(modalID).querySelector('input').value;
    if(date){
        //gives the starting weekday of the bus
        // var busDay = document.getElementById(busID).querySelectorAll('.card-text')[1];
        var busDay = 0;
        
        if(!matchWeekDay(date,busDay)){
            //when weekdays don't match show error
            addDOM(`errorPara-${busID}`,"Weekday of your input does not match Starting Weekday of selected Bus");
        }
        else{
            errorParagraph.style.display = 'none';
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
                    mdl.hide();
                    //function to delete bus from database
                }
                else{
                    //do nothing when swal cancel button is clicked
                } 
            });  
        }
    }
    else{
        //if date input field is empty do nothing       
    }
}

function turnSliderGreen(busID){
    const sliderID = (`i-${busID}`);    
    document.getElementById(sliderID).checked= false;
}