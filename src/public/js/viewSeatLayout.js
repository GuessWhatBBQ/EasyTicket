function viewSeats(buttonID){
    console.log("View Seats button is clicked. ID of the button is",buttonID);
    
    const viewLayoutButton = document.getElementById(`${buttonID}`); //this is the button that is clicked to view/hide seats
    
    if(viewLayoutButton.innerText === 'View Seats')
    {   
        //serial of function calls doesn't matter
        hideOthers();
        changeOthersInnerText();   
        
        viewLayoutButton.innerText = "Hide Seats"    //changes the innerText of it's own
    }
    else{
        viewLayoutButton.innerText = "View Seats";   
    }

    var card = document.getElementById(`layout-${buttonID}`);   //default display of bus layout is set to 'none'
    card.classList.toggle("displayCard");   //displayCard will have display:block
    
}

function hideOthers(){              //hides the display of all other seat layouts
    var toBeRemoved = document.getElementsByClassName("displayCard");   
    for(var i=0; i<toBeRemoved.length; i++){
        toBeRemoved[i].classList.remove("displayCard");     
    }
}

function changeOthersInnerText(){           //changes the innerText of all other 'Hide seats' buttons
    var viewOrhideButtons = document.getElementsByClassName("viewOrhide");  
        for (var i = 0; i<viewOrhideButtons.length;i ++){
            viewOrhideButtons[i].innerText = "View Seats";   
        }
}

function resetNumberOfSelectedSeats(){          //sets the default innerText of 'number of seats selected' div
    var commonNumberClass = document.getElementsByClassName("commonNumberClass");
        for(i=0; i<commonNumberClass.length; i++){
            commonNumberClass[i].innerText = "Number of seats Selected: 0";
        }
}

function resetGreenSeats(){             //clears all selected seats
    var greenSeats = document.querySelectorAll('.filter-green');
        for(var i = 0; i<greenSeats.length; i++){
            greenSeats[i].classList.remove("filter-green");
        }
}