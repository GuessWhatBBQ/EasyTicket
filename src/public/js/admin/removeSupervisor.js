document.querySelector('.removeSupervisorForm').addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('waiting')

    const inputs = document.querySelector('.removeSupervisorForm').getElementsByTagName('input');
    const path = document.querySelector('.removeSupervisorForm').getAttribute('action');

    // const payload = createPayloadFromInput(inputs);

    // // clears the previously inputted bus info
    // Array.from(inputs).forEach((element) => {
    //     element.value = '';
    // });

    // fetch(path, payload)
    //     .then((response) => response.json());
}, false);