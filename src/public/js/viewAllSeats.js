function viewSeats(buttonID){
    console.log("viewALl button clicked. ID of the button is",buttonID);
    
    var card = document.getElementById(`seat-${buttonID}`);
    console.log(card);

    card.classList.toggle("displayCard");
        
    

    // const viewAllButton = document.querySelector(buttonID);
    const viewSeatsButton = document.getElementById(`${buttonID}`);

    if(viewSeatsButton.innerText === 'View Seats')
    {
        viewSeatsButton.innerText = "Hide Seats"
    }
    else{
        viewSeatsButton.innerText = "View Seats"
    }
}
//to be hidden will have display:none;
//displayCard will have display:block;