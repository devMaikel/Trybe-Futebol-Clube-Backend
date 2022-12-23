import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
// import chaiHttp = require('chai-http');
import chaiHttp from 'chai-http';

import App from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { IUser } from '../interfaces';
import UsersModel from '../database/models/UsersModel';
import { tokenGenerator } from '../utils/jwtUtils';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const userToLogin = {
  "email": "admin@admin.com",
  "password": "secret_admin"
}

const userReturn = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

const token = tokenGenerator({
  id: userReturn.id, username: userReturn.username, role: userReturn.role });

describe('POST / Login', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(UsersModel, "findOne")
      .resolves({ ...userReturn } as UsersModel);
  });

  afterEach(()=>{
    (UsersModel.findOne as sinon.SinonStub).restore();
  })

  it('Verificando login com dados corretos', async () => {
    chaiHttpResponse = await chai
       .request(app).post('/login')
       .send({ ...userToLogin });
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.eql({ token }); // testando igualdade de objetos "to.eql"   
  });

});
