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
    }
    else{
        viewSeatsButton.innerText = "View Seats";
    }

    var card = document.getElementById(`layout-${buttonID}`);   //the default display is set to 'none'
    card.classList.toggle("displayCard");   //displayCard will have display:block
    
}
//to be hidden will have display:none;

function numberOfSelectedSeats(){
    var number = document.querySelectorAll('.filter-green').length;
    document.querySelector('#numberof-selected-seats').innerText = `Number of seats Selected: ${number}`;
    console.log(number);
}
function changeSeatColor(element){
    element.classList.toggle('filter-green');
    numberOfSelectedSeats();
}