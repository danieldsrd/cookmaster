const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
chai.use(chaiHttp);

const server = require('../api/app');
const { getConnection } = require('./connectionMock');
const { expect } = chai;

let connectionMock;

describe('POST /users', () => {

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
  });
  
  describe('Quando nao é passado usuário, senha e email', () => {
    let response;
    
    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({});        
    });

    it('retorna codigo de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });
  });

  describe('Quando nao é passado usuário', () => {
    let response;
    
    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          email: 'user-fake2@gmail.com',
          password: 'senha-fake2'
        });       
    });

    it('retorna codigo de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equals('Invalid entries. Try again.');
    });
  });
});