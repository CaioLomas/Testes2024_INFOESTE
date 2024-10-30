const service = require('../../../src/services/user');
const {expect} = require('chai');
const sinon = require('sinon'); 
const model = require('../../../src/models/user');

//fullName: >= 3 char e < 40
//nickname: >= 3 char e < 8

describe('Service User - Teste da função create: ', function() {   
    
    it('Deve cadastrar um usuário com sucesso, quando passado input válido', async function() {
        const input = {
            fullName: 'Caio Lomas de Oliveira',
            nickname: 'Cainho'
        };
        const output = {
            id: 67,
            fullName: 'Caio Lomas de Oliveira',
            nickname: 'Cainho'
        };

        sinon.stub(model,'create').resolves(output)

        const result = await service.create(input);
        expect(result).to.be.deep.equal(output);

        sinon.restore();
    });

    it('Full name errado! Contem menos que 3 caracteres', async function() {
        const input = {
            fullName: 'Ca',
            nickname: 'Cainho'
        };

        try{
            await service.create(input);
        } catch(error){
            expect(error.message).to.be.equal('Full name errado! Deve conter entre 3 e 40 caracteres');
        }

    });

    it('Full name errado! Contem mais que 40 caracteres', async function() {
        const input = {
            fullName: 'Pedro de Alcântara João Carlos Leopoldo Salvador Bibiano Francisco Xavier de Paula Leocádio Miguel Gabriel Rafael Gonzaga',
            nickname: 'Pedrão'
        };

        try{
            await service.create(input);
        } catch(error){
            expect(error.message).to.be.equal('Full name errado! Deve conter entre 3 e 40 caracteres');
        }

    });

    it('Nickname errado! Contem mais de 8 caracteres', async function() {
        const input = {
            fullName: 'Caio Lomas de Oliveira',
            nickname: 'Cainho Games'
        };

        try{
            await service.create(input);
        } catch(error){
            expect(error.message).to.be.equal('Nickname errado! Deve conter entre 3 e 8 caracteres');
        }

    });

    it('Nickname errado! Contem menos de 3 caracteres', async function() {
        const input = {
            fullName: 'Caio Lomas de Oliveira',
            nickname: 'Ca'
        };

        try{
            await service.create(input);
        } catch(error){
            expect(error.message).to.be.equal('Nickname errado! Deve conter entre 3 e 8 caracteres');
        }

    });

});