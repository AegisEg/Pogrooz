// App
import React from 'react'

class Input extends React.Component {
    render() {
        return (
            <input type={this.props.type} value={this.props.value} name={this.props.name} className={`input-${this.props.type} ${this.props.className}`} placeholder={this.props.placeholder} onChange={this.props.onChange} />
        )
    }
}

export default Input