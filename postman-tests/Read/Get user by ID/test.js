const res = pm.response.json();
const id = pm.globals.get('id');

pm.test('Status code is 200', () => {
    pm.response.to.have.status(200);
});

pm.test('User matches requested user', () => {
    const id = pm.request.url.query.get('id');
    pm.expect(res[1].id).to.eql(id);
});

pm.test('User has correct type of user ID', () => {
    pm.expect(res[1].id).to.be.a('string');
});

pm.test('Does not expose user password', () => {
    pm.expect(res[1]).to.not.have.property('password');
});

pm.test('User has all relevant fields', () => {
    pm.expect(res[1]).to.have.all.keys('id', 'firstName', 'lastName');
});

// cleanup
pm.globals.unset('id');

pm.sendRequest({
    url: `${pm.environment.get('url')}/delete?id=${id}`,
    method: 'delete'
});