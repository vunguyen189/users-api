const res = pm.response.json();
const id = pm.globals.get('id');
const firstName = pm.variables.get('firstName');

pm.test('Status code is 200', () => {
    pm.response.to.have.status(200);
});

pm.test('List of users is returned', () => {
    pm.expect(res).to.be.an('array');
});

pm.test('All users have firstname: ' + firstName, () => {
    res.forEach((val, i) => {
        if (i > 0) {
            pm.expect(val.firstName).to.eql(firstName);   
        }
    });
});

pm.test('User passwords are not exposed', () => {
    res.forEach((val, i) => {
        if (i > 0) {
            pm.expect(val).to.not.have.all.keys('password');   
        }
    });
});

pm.test('User has all relevant fields and correct types', () => {
    res.forEach((val, i) => {
        if (i > 0) {
            pm.expect(val.id).to.be.a('string');
            pm.expect(val.firstName).to.be.a('string');
            pm.expect(val.lastName).to.be.a('string');
        }
    });
});

// cleanup
pm.globals.unset('id');

pm.sendRequest({
    url: `${pm.environment.get('url')}/delete?id=${id}`,
    method: 'delete'
});