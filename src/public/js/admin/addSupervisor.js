document.querySelector('.addSupervisorForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const inputs = document.querySelector('.addSupervisorForm').getElementsByTagName('input');
    const path = document.querySelector('.addSupervisorForm').getAttribute('action');

    const payload = createPayloadFromInput(inputs);

    // clears the previously inputted bus info
    Array.from(inputs).forEach((element) => {
        element.value = '';
    });

    fetch(path, payload)
        .then((response) => response.json());
}, false);
