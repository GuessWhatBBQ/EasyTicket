function addDOM(ID, message){
    if(document.getElementById('errorParaSet')){
        return
    }
    let errorParagraph = document.createElement('p');
    errorParagraph.setAttribute('id', 'errorParaSet');
    errorParagraph.innerText = message;
    errorParagraph.style.color = 'red';
    errorParagraph.style.textAlign = 'center';
    errorParagraph.style.fontSize = 'smaller';
    errorParagraph.style.fontWeight = '600';

    //the ID is required to set a location for the errorParagrapgh to pop up
    const node = document.getElementById(`${ID}`);
    node.parentNode.insertBefore(errorParagraph,node);
}

function checkValidUser(ID, status, message)
{
    if (status == true){
        console.log("HIHO");
        console.log(message);
        window.location.replace("/profile")
    }
    else{
        console.log(message);
        addDOM(ID, message)
    }
}

const form = document.getElementById("signup-form") || document.getElementById("signin-form") || document.getElementById("update-form")
form.addEventListener("submit", fetchJWT)

async function fetchJWT(event) {
    event.preventDefault()

    let inputs = form.getElementsByTagName("input")
    let path = form.getAttribute("action")

    payload = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: {}
    }
    for(var input of inputs) {
        payload.body[input.name] = input.value
    }
    payload.body = JSON.stringify(payload.body)

    response = await fetch(path, payload)
                .then((res) => {
                    return res.json()
                })

    let id = "errorPara"
    if(response.token) {
        localStorage.setItem('auth-token', response.token);
        window.document.cookie = "auth-token" + "=" + (response.token) + "; path=/;" + "SameSite=Strict";
        checkValidUser(id,true);
    }
    else if (response.status === "Password Verification Failed"){
        checkValidUser(id, false, "Credentials don't match.");
    }
    else if (response.status === "Update Failed"){
        checkValidUser(id, false, "Update Failed");
    }
}
