const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

const compiledFactory = require('../ethereum/build/LeagueFactory.json')
const compiledLeague = require('../ethereum/build/League.json')

let accounts
let factory
let leagueAddress
let league

beforeEach(async () => {
    accounts = await web3.eth.getAccounts()

    // this deploys a contract, hence deploy(). we do not provide an address
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    await factory.methods.createLeague('1', '12', '9', '2', '1').send({
        from: accounts[0],
        gas: '1000000'
    });

    [ leagueAddress ] = await factory.methods.getDeployedLeagues().call()
    // this accesses the ABI for this contract at an address that we specify
    // ABI is first arg, address is second
    league = await new web3.eth.Contract(
        JSON.parse(compiledLeague.interface),
        leagueAddress
    )


})

describe('Leagues', () => {
    it('deploys a factory and a league', () => {
        assert.ok(factory.options.address)
        assert.ok(league.options.address)
    })

    it('marks caller as the league commissioner', async () => {
        // because we marked commissioner as public, it has a method
        // we can call to get its value
        const commissioner = await league.methods.commissioner().call()
        assert.equal(accounts[0], commissioner)
    })

    it('allows people to enter the league', () => {
        
    })
})
