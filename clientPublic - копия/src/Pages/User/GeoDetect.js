// App
import React from "react";
import { connect } from "react-redux";
import * as GeoActions from "../../redux/actions/geoarticle";
import { bindActionCreators } from "redux";
import Loading from "../../Elements/Loading";
import { CSSTransitionGroup } from "react-transition-group";
import Select from "../../Elements/Select";
import Button from "../../Elements/Button";
import { Map, Placemark } from "react-yandex-maps";
import { withRouter } from "react-router-dom";
import geolocation from "../../img/carGeo.svg";
import { toast } from "react-toastify";
import api from "../../config/api";
// Router

class GeoDetect extends React.Component {
  state = {
    articleId: false,
  };
  componentDidMount() {
    if (!this.props.articles.isGetted)
      this.props.GeoActions.geoArticlesGet(this.props.user.apiToken).then(
        () => {
          if (!!this.props.location.hash)
            this.setState({ articleId: this.props.location.hash.slice(1) });
          else if (!!this.props.articles.articles.length)
            this.setState({ articleId: this.props.articles.articles[0]._id });
        }
      );
    else {
      if (!!this.props.location.hash)
        this.setState({ articleId: this.props.location.hash.slice(1) });
      else if (!!this.props.articles.articles.length)
        this.setState({ articleId: this.props.articles.articles[0]._id });
    }
  }
  componentDidUpdate(b) {
    if (
      this.props.articles.articles.length > 0 &&
      b.articles.articles.length === 0
    )
      this.setState({ articleId: this.props.articles.articles[0]._id });
  }
  sendRequestLocation = () => {
    fetch(`${api.urlApi}/api/article/requestGeolocation`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.props.user.apiToken}`,
      },
      body: JSON.stringify({
        articleId: this.state.articleId,
      }),
    })
      .then((response) => response.json())
      .then(({ error }) => {
        if (!error) toast.success("Запрос местоположения отправлен");
        if (error) toast.error("Ошибка запроса");
      });
  };
  render() {
    let article = this.props.articles.articles.find(
      (item) => item._id === this.state.articleId
    );

    return (
      <div className="standart-page">
        <div className="container-fluid">
          <h2 className="title mb-0">Отслеживание</h2>
          <Loading isLoading={this.props.articles.isFetching}></Loading>
          <CSSTransitionGroup
            transitionName="height-animation-item"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={1}
            style={{
              display: "contents",
            }}
          >
            {!this.props.articles.isFetching && (
              <>
                <Select
                  options={this.props.articles.articles.map((item) => {
                    return {
                      value: item._id,
                      label:
                        (item.type === "order" ? "Заказ" : "Предложение") +
                        " №" +
                        item.articleId,
                    };
                  })}
                  onChange={(val) => {
                    this.setState({
                      articleId: val.value,
                    });
                  }}
                  value={
                    article && {
                      value: article._id,
                      label:
                        (article.type === "order" ? "Заказ" : "Предложение") +
                        " №" +
                        article.articleId,
                    }
                  }
                />
                {!article && !!this.props.articles.articles.length && (
                  <div className="text-center mt-4">
                    Отслеживание больше не доступно
                  </div>
                )}
                {!article && !this.props.articles.articles.length && (
                  <div className="text-center mt-4">
                    Заказов/предложений в пути пока нет
                  </div>
                )}
                {article &&
                  article.lastCarrierLocation &&
                  new Date(article.lastCarrierLocation.date).getTime() +
                    1000 * 60 * 60 * 3 <
                    new Date() && (
                    <div className="text-center mt-4">
                      Перевозчик давно не обновлял свое местоположение
                      <div>
                        <Button type="fill" onClick={this.sendRequestLocation}>
                          Запросить местоположение
                        </Button>
                      </div>
                    </div>
                  )}

                {article && (
                  <Map
                    instanceRef={(ref) => {
                      this.mapFrom = ref;
                    }}
                    defaultState={{
                      center:
                        article.lastCarrierLocation &&
                        article.lastCarrierLocation.coordinates.length
                          ? article.lastCarrierLocation.coordinates
                          : article.fromLocation.coordinates,
                      zoom: 15,
                    }}
                    style={{
                      marginTop: "21px",
                      height: "500px",
                      width: "100%",
                    }}
                    modules={[
                      "geoObject.addon.balloon",
                      "geoObject.addon.hint",
                    ]}
                  >
                    <Placemark
                      options={{
                        iconColor: "#F5D210",
                      }}
                      properties={{
                        hintContent: article.from.value,
                        iconCaption: "Начальная точка",
                        balloonContentHeader: "Начальная точка",
                        balloonContentBody: article.from.value,
                      }}
                      я
                      geometry={article.fromLocation.coordinates}
                    />
                    {article.lastCarrierLocation &&
                      article.lastCarrierLocation.coordinates.length && (
                        <Placemark
                          options={{
                            iconLayout: "default#image",
                            iconImageHref: geolocation,
                          }}
                          date
                          properties={{
                            iconCaption: "Расположение перевозчика",
                            hintContent:
                              new Date(
                                article.lastCarrierLocation.date
                              ).toDateR() +
                              " " +
                              new Date(article.lastCarrierLocation.date).toHM(),
                          }}
                          geometry={article.lastCarrierLocation.coordinates}
                        />
                      )}
                    <Placemark
                      options={{
                        iconColor: "#D36161",
                      }}
                      properties={{
                        iconCaption: "Конечная точка",
                        hintContent: article.to.value,
                        balloonContentHeader: "Конечная точка",
                        balloonContentBody: article.to.value,
                      }}
                      geometry={article.toLocation.coordinates}
                    />
                  </Map>
                )}
              </>
            )}
          </CSSTransitionGroup>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    articles: state.geoarticles,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    GeoActions: bindActionCreators(GeoActions, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(GeoDetect));
