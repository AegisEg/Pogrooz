// App
import React from 'react'

class Input extends React.Component {
    render() {
        return (
            <div style={{display: 'contents', position: 'relative', paddingBottom: this.props.error ? '10px' : '0px'}}>
                <input 
                    type={this.props.type} 
                    value={this.props.value} 
                    name={this.props.name} 
                    style={this.props.style} 
                    className={`col input-${this.props.type} ${this.props.className} ${this.props.error ? 'input-error' : ''}`} 
                    placeholder={this.props.placeholder} 
                    onChange={this.props.onChange} 
                />
                {this.props.error && <span className="input-error-label">
                    {this.props.error.msg}    
                </span>}
            </div>
        )
    }
}

export default Input