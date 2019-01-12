import React, { Component } from 'react'

export default class error extends Component {
    render() {
        return (
            <div>
                <h3>pas de correspondance <code>{window.location.pathname}</code></h3>

            </div>
        )
    }
}
