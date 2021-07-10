async function logout(button) {
    window.document.cookie = 'auth-token' + '=' + '' + '; path=/;' + 'SameSite=Strict';
    window.location.replace('/signin');
}
