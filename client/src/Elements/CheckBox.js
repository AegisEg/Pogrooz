// App
import React from 'react'

class CheckBox extends React.Component {
    render() {
        return (
            <>
            <input type="checkbox" id={this.props.id} name={this.props.name} value={this.props.value} className={`input-${this.props.type}`} onChange={this.props.onChange} />
            <label for={this.props.id}></label>
            </>
        )
    }
}
                                 
export default CheckBox