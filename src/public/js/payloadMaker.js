function createPayloadFromInput(inputs, method = 'POST', contentType = 'application/json') {
    const payload = {
        method,
        headers: {
            'Content-Type': contentType,
        },
        body: {},
    };
    Array.from(inputs).forEach((input) => {
        payload.body = { ...payload.body, [input.name]: input.value };
    });
    payload.body = JSON.stringify(payload.body);
    return payload;
}

window.createPayloadFromInput = createPayloadFromInput;
