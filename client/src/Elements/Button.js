// App
import React from 'react'

class Button extends React.Component {
    render() {
        return (
            <span className={`button-${this.props.type}`} style={this.props.paddingVertical ? {padding: `${this.props.paddingVertical} ${this.props.paddingHorizontal ? this.props.paddingHorizontal : '24px'}`, margin: this.props.margin ? this.props.margin : ''} : {}}>
                {this.props.children}
            </span>
        )
    }
}

export default Button