async function logout() {
    window.document.cookie = 'auth-token=; path=/; SameSite=Strict';
    window.location.replace('/signin');
}

window.logout = logout;
