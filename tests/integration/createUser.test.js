const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const { expect } = chai; 
const app = require('../../src/app');
const connection = require('../../src/databases/connection');

chai.use(chaiHttp);

describe('Teste de integração user - Teste do método POST na rota /user', function() {

    it('Deve cadastrar um usuário com sucesso, quando passado um body válido', async function() {
        const body = {fullName: 'Vinicius Vasconcelos', nickname: 'Vin Vaz'};
        const output = {id:67, ...body};

        sinon.stub(connection,'execute').resolves([{insertId: 67}]);
        const response = await chai.request(app).post('/user').send(body);

        expect(response.status).to.be.equal(201);
        expect(response.body).to.be.deep.equal(output);
   
    });

    it('Deve receber status 400 e uma mensagem de erro quando fullName não for enviado', async function() {
        
        const body = {nickname: 'Vin Vaz'};

        sinon.stub(connection,'execute').resolves([{insertId: 67}]);
        const response = await chai.request(app).post('/user').send(body);

        expect(response.status).to.be.equal(201);
        expect(response.body).to.be.deep.equal(output);
   
    });

    it('Deve cadastrar um usuário com sucesso, quando passado um body válido', async function() {
        const body = {fullName: 'Vinicius Vasconcelos', nickname: 'Vin Vaz'};
        const output = {id:67, ...body};

        sinon.stub(connection,'execute').resolves([{insertId: 67}]);
        const response = await chai.request(app).post('/user').send(body);

        expect(response.status).to.be.equal(201);
        expect(response.body).to.be.deep.equal(output);
   
    });


});
