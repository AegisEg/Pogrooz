// App
import React from 'react'

class Input extends React.Component {
    render() {
        return (
            <input type={this.props.type} value={this.props.value} className={`input-${this.props.type}`} placeholder={this.props.placeholder} onChange={this.props.onChange} />
        )
    }
}

export default Input