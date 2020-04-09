// App
import React from 'react'

class Button extends React.Component {
    render() {
        return (
            <span className={`button-${this.props.type}`} style={{
                padding: `${this.props.paddingVertical?this.props.paddingVertical:'10px'} ${this.props.paddingHorizontal ? this.props.paddingHorizontal : '15px'}`, 
                margin: this.props.margin ? this.props.margin : '',
                fontSize: this.props.fontSize ? this.props.fontSize : ''}}>
                <span style={{zIndex: 2}}>{this.props.children}</span>
            </span>
        )
    }
}

export default Button