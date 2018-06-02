import React, { Component } from 'react'
import Layout from '../components/Layout'
import { Button, Card } from 'semantic-ui-react'
import factory from '../ethereum/factory'


class LeagueIndex extends Component{

    render() {
        return (
            <Layout>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.11.8/semantic.min.css"/>
                <h1>index</h1>

                <Button
                    content="Create Leauge"
                    icon="add circle"
                    primary
                />
            </Layout>
        )
    }
}

export default LeagueIndex
