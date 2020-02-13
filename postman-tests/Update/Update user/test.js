const res = pm.response.json();
const id = pm.request.url.query.get('id');
const firstName = pm.request.body.urlencoded.get('firstName');

pm.test('Status code is 200', () => {
    pm.response.to.have.status(200);
});

if (res.status === 'success') {
    pm.test('User matches requested user', () => {
        pm.expect(res.id).to.eql(id);
    });
    
    pm.test('User has correct type of user ID', () => {
        pm.expect(res.id).to.be.a('string');
    });
    
    pm.test('User has all relevant fields', () => {
        pm.expect(res).to.have.all.keys('status', 'id', 'firstName', 'lastName');
    });
    
    pm.test('Does not expose user password', () => {
        pm.expect(res).to.not.have.property('password');
    });
    
    pm.test('First name is updated to: ' + firstName, () => {
        pm.expect(res.firstName).to.eql(firstName);
    });
}

else if (res.status === 'no user found') {
    pm.test('Lookup was against correct user', () => {
        pm.expect(res.id).to.eql(id);
    });
}

else {
    pm.test(res.status).to.eql('invalid request');
}

// cleanup
pm.globals.unset('id');

pm.sendRequest({
    url: `${pm.environment.get('url')}/delete?id=${id}`,
    method: 'delete'
});