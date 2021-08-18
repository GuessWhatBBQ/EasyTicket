function viewSeats(buttonID){
    
    const viewSeatsButton = document.getElementById(`${buttonID}`); //this is the button that is clicked to view/hide seats
    
    if(viewSeatsButton.innerText === 'View Seats')
    {   
        var toBeRemoved = document.getElementsByClassName("displayCard");   
        for(var i=0; i<toBeRemoved.length; i++){
            toBeRemoved[i].classList.remove("displayCard");     //removes the display of all other seat layouts
        }

        var bookTicketButtons = document.getElementsByClassName("bookTicket");  
        for (var i = 0; i<bookTicketButtons.length;i ++){
            bookTicketButtons[i].innerText = "View Seats";  //changes the innerText of all other .bookTicket buttons 
        }
        
        viewSeatsButton.innerText = "Hide Seats"    //changes the innerText of it's own 

        var commonNumberClass = document.getElementsByClassName("commonNumberClass");
        for(i=0; i<commonNumberClass.length; i++){
            commonNumberClass[i].innerText = "Number of seats Selected: 0";
        }
        
        var greenSeats = document.querySelectorAll('.filter-green');
        for(var i = 0; i<greenSeats.length; i++){
            greenSeats[i].classList.remove("filter-green");
        }
    }
    else{
        viewSeatsButton.innerText = "View Seats";
        
    }

    var card = document.getElementById(`layout-${buttonID}`);   //the default display is set to 'none'
    card.classList.toggle("displayCard");   //displayCard will have display:block
    
}
//to be hidden will have display:none;

function numberOfSelectedSeats(ID){
    var number = document.querySelectorAll('.filter-green').length;
    document.querySelector(`#numberof-selected-seats-${ID}`).innerText = `Number of seats Selected: ${number}`;
}
function changeSeatColor(element){
    element.classList.toggle('filter-green');
    var desiredClass = element.classList[0].toString(); //class of the img tag obtained from bus ID
    classArray = desiredClass.split("-");       //extracting the bus ID
    numberOfSelectedSeats(classArray[1]);   
}