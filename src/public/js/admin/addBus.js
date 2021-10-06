document.querySelector('.addBusFrom').addEventListener('submit', (event) => {
    event.preventDefault();

    const inputs = document.querySelector('.addBusFrom').getElementsByTagName('input');
    const path = document.querySelector('.addBusFrom').getAttribute('action');

    const payload = createPayloadFromInput(inputs);

    // clears the previously inputted bus info
    Array.from(inputs).forEach((element) => {
        element.value = '';
    });

    fetch(path, payload)
        .then((response) => response.json());
}, false);
