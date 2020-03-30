import React, { Component } from 'react'

export default class Posts extends Component {

async componentDidMount() {
    const res = await fetch('https://nodes-testnet.wavesnodes.com/addresses/data/3N8RGScPyKYySaXd5Z3VcpnttH2uBeMpSy4')
    console.log(res)
}
    render() {
        return (
            <div>
                <h4>Posts</h4>
            </div>
        )
    }
}
