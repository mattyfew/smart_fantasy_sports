import web3 from './web3'

import LeagueFactory from './build/LeagueFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(LeagueFactory),
    ''
    // NEED ADDRESS OF LEAGUE FACTORY
)

export default instance
