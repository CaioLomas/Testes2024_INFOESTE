const { expect } = require('chai');
const sinon = require('sinon');
const service = require("../../../src/services/user")
const controller = require('../../../src/controllers/user');

describe('Controller user - Teste da função create', function () {

    beforeEach(() => {

        req = {
            body: {
                fullName: 'Caio Lomas de Oliveira',
                nickname: 'Cainho'
            }
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        next = sinon.stub();}
        );

        afterEach(() => {
            sinon.restore();
        });

        it('Deve controlar um usuário com sucesso', async function () {

            const output = {fullName: 'Caio Lomas de Oliveira',nickname: 'Cainho'};
            sinon.stub(service,'create').resolves({fullName: 'Caio Lomas de Oliveira',nickname: 'Cainho'});

            await controller.create(req,res,next);

            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith(output)).to.be.true;

        });

        it('Deve chamar next com erro em caso de falha', async function() {
            const error = new Error('Erro ao cadastrar o usuário!');

            sinon.stub(service, 'create').rejects(error);
 
            await controller.create(req,res,next);
            expect(next.calledWith(error)).to.be.true;
        });

});

