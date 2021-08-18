function resetViewSeats(buttonID){
    console.log("View Seats button is clicked from reset. ID of the button is");
    
    const viewLayoutButton = document.getElementById(`${buttonID}`); //this is the button that is clicked to view/hide seats
    
    if(viewLayoutButton.innerText === 'View Seats')
    {   
        //serial of function calls doesn't matter

        resetGreenSeats();
        resetNumberOfSelectedSeats();
    }
    
}

function resetNumberOfSelectedSeats(){          //sets default innerText of
    var commonNumberClass = document.getElementsByClassName("commonNumberClass");
    var commonFareClass = document.getElementsByClassName("commonFareClass");
        for(i=0; i<commonNumberClass.length; i++){
            commonNumberClass[i].innerText = "Number of seats Selected: 0"; //'number of seats selected' div
            commonFareClass[i].innerText = "Total Fare: 0";     //and 'total fare' div
        }
}

function resetGreenSeats(){             //clears all selected seats
    var greenSeats = document.querySelectorAll('.filter-green');
        for(var i = 0; i<greenSeats.length; i++){
            greenSeats[i].classList.remove("filter-green");
        }
}