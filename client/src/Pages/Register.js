// App
import React from 'react'
import Input from '../Elements/Input'
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  
class Register extends React.Component {
    state = {
        role: 0,
        selectedOption: null,
    }
    handleChange = selectedOption => {
        this.setState(
          { selectedOption },
          () => console.log(`Option selected:`, this.state.selectedOption)
        );
      };
    render() {
        return (
            <div className="register-page">
                <h1 className="register-title">Регистрация</h1>
                <div className="register-form col-12 col-sm-9 col-md-6 col-lg-4 col-xl-3 mx-auto">
                    <div className="row tabs ">
                        <div className={`tab col-6 ${!this.state.role?'active':''}`} onClick={()=>{this.setState({role:0})}}>Я Перевозчик</div>
                        <div className={`tab col-6 text-right ${this.state.role?'active':''}`} onClick={()=>{this.setState({role:1})}}>Я Владелец груза</div>
                    </div>
                    <div className="row my-3">
                        <div className="col-6">
                            Страна:
                            <span className="simple_select_city ml-3">Россия</span>    
                        </div>
                        <div className="col-6">
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={options}
                        />
                        </div>
                    </div>
                    <Input type="text" className="my-2" placeholder="+7 (_ _ _) _ _ _ - _ _ - _ _" />
                    <Input type="text" className="my-2" placeholder="Пароль" />
                </div>
            </div>
        )
    }
}

export default Register