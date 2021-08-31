function viewAll(buttonID){
    console.log("viewALl button clicked. ID of the button is",buttonID);
    
    var cards = document.getElementsByClassName("toBeHidden");
    // for(let i in cards) {
    //     cards[i].classList.toggle("displayCard");
    // };

    for (let index = 0; index < cards.length; index++) {
        cards[index].classList.toggle("displayCard");
        
    }

    // const viewAllButton = document.querySelector(buttonID);
    const viewAllButton = document.getElementById(buttonID);

    if(viewAllButton.innerText === 'View All')
    {
        viewAllButton.innerText = "View Less"
    }
    else{
        viewAllButton.innerText = "View All"
    }
}
//to be hidden will have display:none;
//displayCard will have display:block;