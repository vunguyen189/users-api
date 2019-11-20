const response = pm.response;
const id = pm.globals.get('id');

pm.test('Status code is 200', () => {
    pm.response.to.have.status(200);
});

pm.test('Operation is successful', () => {
    const res = response.json();
    pm.expect(res.status).to.eql('success');
});

pm.test('User matches requested user', () => {
    const res = response.json();
    pm.globals.set("apiKey", res.id);
    pm.expect(res.id).to.eql(id);
});

pm.test('User can no longer be found', () => {
    pm.sendRequest({
        url: `${pm.environment.get('url')}/get?id=${id}`,
        header: 'x-mock-response-name:Get user by ID (no user found)',
        method: 'get'
    }, (err, res) => {
        res = res.json();
        pm.expect(res.status).to.eql('no user found');
    });
});

// cleanup
pm.globals.unset('id');