// App
import React from "react";

// Elements
import Button from "../../Elements/Button";
import { connect } from "react-redux";
import Loading from "../../Elements/Loading";
import { CSSTransitionGroup } from "react-transition-group";
import { Link } from "react-router-dom";
import api from "../../config/api";
import CarTemplate from "../../ArticlesElements/CarTemplate";

class OfferCreate extends React.Component {
  state = {
    carTemplates: [],
    isFetching: true,
  };
  componentDidMount() {
    this.getCarTemplates();
  }
  getCarTemplates = () => {
    this.setState({ isFetching: true }, () => {
      fetch(`${api.urlApi}/api/car/getCarTemplates`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.props.user.apiToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            if (data.carTemplates) {
              this.setState({
                carTemplates: data.carTemplates,
                isFetching: false,
              });
            }
          }
        });
    });
  };
  render() {
    return (
      <>
        <div className="myauto-page">
          <div className="container-fluid">
            <h2
              className="title"
              style={{
                padding: "0 28px 15px 28px",
                marginRight: "-28px",
                marginLeft: "-28px",
                borderBottom: "1px solid #DDDDDD",
              }}
            >
              Мои шаблоны авто
            </h2>

            <div>
              <Link to="/create-template-auto">
                <Button
                  paddingVertical="11px"
                  className="f-14"
                  paddingVertical="10px"
                  type="fill"
                >
                  Добавить шаблон авто
                </Button>
              </Link>
              <div className="carTemplates-block">
                <Loading isLoading={this.state.isFetching}></Loading>
                <CSSTransitionGroup
                  transitionName="height-animation-item"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={1}
                  style={{
                    display: "contents",
                  }}
                >
                  {this.state.carTemplates.map((item, index) => {
                    return (
                      <CarTemplate
                        reload={this.getCarTemplates}
                        user={this.props.user}
                        template={item}
                      />
                    );
                  })}
                  {!this.state.carTemplates.length && (
                    <div className="text-center">
                      Шаблоны авто еще не созданы
                    </div>
                  )}
                </CSSTransitionGroup>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(OfferCreate);
