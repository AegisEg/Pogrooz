// App
import React from "react";

// Router
import FaqRow from "../../Partials/FaqRow";
// Elemnts
import Input from "../../Elements/Input";
import Meta from "../../Elements/Meta";

class FAQ extends React.Component {
  state = {
    q: "",
  };

  render() {
    return (
      <div className={`faq-page`}>
        <Meta keyMeta="faq" options={{}} />
        <div className="container-fluid">
          <h2 className="faq-title">Часто задаваемые вопросы</h2>
          <div className="row">
            <div className="col">
              <Input
                type="text"
                placeholder="Что ищем?"
                value={this.state.q}
                onChange={(e) => {
                  this.setState({ q: e.target.value });
                }}
              />
            </div>
          </div>
          <FaqRow q={this.state.q} type={this.props.type} />
        </div>
      </div>
    );
  }
}

export default FAQ;
