// App
import React from 'react'

class Button extends React.Component {
    render() {
        return (
            <span className={`button-${this.props.type} ${this.props.className?this.props.className:""}`} style={{
                padding: `${this.props.paddingVertical?this.props.paddingVertical:'10px'} ${this.props.paddingHorizontal ? this.props.paddingHorizontal : '15px'}`, 
                margin: this.props.margin ? this.props.margin : '',
                fontSize: this.props.fontSize ? this.props.fontSize : '',
                lineHeight: this.props.lineHeight ? this.props.lineHeight : '',
                width: this.props.width ? this.props.width : '',
                textAlign: 'center'}}
                onClick={() => {if(this.props.onClick){this.props.onClick()}}}
            >
                <span style={{zIndex: 2, textAlign: 'center', width: '100%'}}>{this.props.children}</span>
            </span>
        )
    }
}

export default Button