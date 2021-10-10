function addDOM(ID, message) {
    // the ID is required to set a location for the errorParagrapgh to pop up
    const node = document.getElementById(`${ID}`);
    if (document.getElementById('errorParaSet')) {
        console.log('from checkpa');
        node.parentNode.removeChild(document.getElementById('errorParaSet'));
        // return;
    }
    const errorParagraph = document.createElement('p');
    errorParagraph.setAttribute('id', 'errorParaSet');
    errorParagraph.innerText = message;
    errorParagraph.style.color = 'red';
    errorParagraph.style.textAlign = 'center';
    errorParagraph.style.fontSize = 'smaller';
    errorParagraph.style.fontWeight = '600';

    node.parentNode.insertBefore(errorParagraph, node);
}

function checkValidUser(ID, status, message) {
    if (status === true) {
        window.location.replace('/profile');
    } else {
        addDOM(ID, message);
    }
}

const form = document.getElementById('signup-form') || document.getElementById('signin-form') || document.getElementById('update-form');


function checkPassword(ID){
    var pw1 = document.getElementById('password').value;
    var pw2 = document.getElementById('password2').value;
    if(pw1 === pw2) return true;
    else{
        addDOM(ID,"Passwords don't match");
        return false;
    }
}

async function fetchJWT(event) {
    event.preventDefault();

    const inputs = form.getElementsByTagName('input');
    const path = form.getAttribute('action');
    const id = 'errorPara';

    if(checkPassword(id) === false);
    else{
        const payload = createPayloadFromInput(inputs);

        const response = await fetch(path, payload)
            .then((res) => res.json());
    
        if (response.token) {
            localStorage.setItem('auth-token', response.token);
            window.document.cookie = `auth-token=${response.token}; path=/; + SameSite=Strict`;
            checkValidUser(id, true);
        } else {
            checkValidUser(id, false, response.statusMsg);
        }
    }   
}

form.addEventListener('submit', fetchJWT);
