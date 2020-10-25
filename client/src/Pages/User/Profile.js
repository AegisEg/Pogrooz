// App
import React from "react";
import ConfigSettings from "../../config/settings";
// Elements
import Button from "../../Elements/Button";
import InputPhone from "../../Elements/InputPhone";
import Input from "../../Elements/Input";
import { Link } from "react-router-dom";
import Fancybox from "../../Elements/Fancybox.js";
import { CSSTransitionGroup } from "react-transition-group";
import CheckBox from "../../Elements/CheckBox";
import Select from "../../Elements/Select";
import { toast } from "react-toastify";
import AdressSelect from "../../Elements/AdressSelect";
// Redux
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/user";
import { bindActionCreators } from "redux";
//IMGS
import { ReactComponent as Passport } from "../../img/passport.svg";
import { ReactComponent as RedClose } from "../../img/redClose.svg";
import { ReactComponent as GreyAngle } from "../../img/greyAngle.svg";
import upload from "../../img/upload.svg";
import { contractParams } from "../../config/baseInfo/carParams";
import countryList from "../../config/countryList";
class Profile extends React.Component {
  state = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    isVerified: false,
    contract: {},
    address: "",
    country: "",
    avatar: false,
    passportPhoto: false,
    lastPassword: "",
    newPassword: "",
    confirmPassword: "",
    dataFancybox: false,
  };
  componentDidUpdate(a) {
    let state = {};
    if (
      Object.entries(this.props.user.passportPhoto).length !==
      Object.entries(a.user.passportPhoto).length
    ) {
      state.passportPhoto = this.props.user.passportPhoto;
    }
    if (this.props.user.isPassportVerified !== a.user.isPassportVerified) {
      state.isPassportVerified = this.props.user.isPassportVerified;
    }
    if (!!Object.entries(state).length) this.setState(state);
  }
  componentDidMount() {
    let state = {
      firstName: this.props.user.name.first,
      middleName: this.props.user.name.middle,
      lastName: this.props.user.name.last,
      email: this.props.user.email,
      contract: this.props.user.contract || {},
      phone: this.props.user.phone,
      address: this.props.user.address,
      country: this.props.user.country,
    };
    if (this.props.user.avatar) state.avatar = this.props.user.avatar;
    if (this.props.user.passportPhoto)
      state.passportPhoto = this.props.user.passportPhoto;
    this.setState(state);
  }
  saveUser = () => {
    if (!this.state.email) {
      toast.error("Email не может быть пустым", {
        position: toast.POSITION.TOP_CENTER,
      });
      return 0;
    }
    if (!this.state.firstName) {
      toast.error("Имя не может быть пустым", {
        position: toast.POSITION.TOP_CENTER,
      });
      return 0;
    }
    if (!this.state.middleName) {
      toast.error("Отчество не может быть пустым", {
        position: toast.POSITION.TOP_CENTER,
      });
      return 0;
    }
    if (!this.state.lastName) {
      toast.error("Фамилия не может быть пустым", {
        position: toast.POSITION.TOP_CENTER,
      });
      return 0;
    }
    let userChanges = {
      name: {
        first: this.state.firstName,
        middle: this.state.middleName,
        last: this.state.lastName,
      },
      avatar: this.state.avatar,
      passportPhoto: this.state.passportPhoto,
      contract: this.state.contract,
      address: this.state.address,
      country: this.state.country,
      email: this.state.email,
    };
    this.props.userActions
      .userEdit(userChanges, this.props.user.apiToken)
      .then((responce) => {
        if (responce.error)
          responce.errors.map((item) => {
            if (item.param === "file")
              toast.error("Файл больше 10 мб!", {
                position: toast.POSITION.TOP_CENTER,
              });
            if (item.param === "email")
              toast.error("Пользователь с таким email уже существует", {
                position: toast.POSITION.TOP_CENTER,
              });
          });
        else
          toast.success("Данные успешно сохранены", {
            position: toast.POSITION.TOP_CENTER,
          });
      });
  };
  passChange = () => {
    if (
      !!this.state.lastPassword.length &&
      !!this.state.newPassword.length &&
      !!this.state.confirmPassword.length
    ) {
      if (this.state.newPassword.length >= 8) {
        if (this.state.newPassword === this.state.confirmPassword) {
          let passwords = {
            lastPassword: this.state.lastPassword,
            newPassword: this.state.newPassword,
            confirmPassword: this.state.confirmPassword,
          };
          this.props.userActions
            .passChange(passwords, this.props.user.apiToken)
            .then((responce) => {
              if (responce.error)
                responce.errors.map((item) => {
                  if (item.param === "password")
                    toast.error("Введен неверный текущий пароль", {
                      position: toast.POSITION.TOP_CENTER,
                    });
                  if (item.param === "confirmPassword")
                    toast.error("Подтверждение пароля не совпадает", {
                      position: toast.POSITION.TOP_CENTER,
                    });
                });
              else
                toast.success("Пароль изменён", {
                  position: toast.POSITION.TOP_CENTER,
                });
            });
        } else {
          toast.error("Подтверждение пароля не совпадает", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else
        toast.error("Пароль должен сожержать не менее 8 символов", {
          position: toast.POSITION.TOP_CENTER,
        });
    } else
      toast.error("Введите данные для изменения пароля", {
        position: toast.POSITION.TOP_CENTER,
      });
  };
  render() {
    if (this.props.step === 1)
      return (
        <div className="profile-page container-fluid">
          <h2 className="title">Личная информация</h2>
          <div>
            <Link className="href" to={`/user/${this.props.user._id}`}>
              Как вас видят пользователи
            </Link>
          </div>
          <div className="row profile-input-fixed">
            <div className="col-12 col-sm">
              <Input
                type="text"
                style={{
                  marginBottom: 12,
                }}
                placeholder="Имя *"
                value={this.state.firstName}
                onChange={(e) => {
                  this.setState({ firstName: e.target.value });
                }}
              />
            </div>
            <div className="col-12 col-sm">
              <Input
                type="text"
                style={{
                  marginBottom: 12,
                }}
                placeholder="Фамилия *"
                value={this.state.lastName}
                onChange={(e) => {
                  this.setState({ lastName: e.target.value });
                }}
              />
            </div>
            <div className="col-12 col-sm">
              <Input
                type="text"
                style={{
                  marginBottom: 12,
                }}
                placeholder="Отчество *"
                value={this.state.middleName}
                onChange={(e) => {
                  this.setState({ middleName: e.target.value });
                }}
              />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-6">
              <h4 className="subtitle pt-0">Контактные данные *</h4>
              <Input
                type="text"
                placeholder="Email *"
                style={{ marginBottom: 12, maxWidth: "265px" }}
                value={this.state.email}
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
              />
            </div>
            <div className="col-md-6">
              <h4 className="subtitle pt-0 ">Фотография</h4>
              <Button
                type="fill"
                paddingHorizontal="30px"
                paddingVertical="7px"
                className="mr-2 f-17"
                onClick={() => {
                  document.getElementById("photoAvatar").click();
                }}
              >
                Загрузить
              </Button>
              <input
                id="photoAvatar"
                onChange={(e) => {
                  let file = e.target.files[0];
                  if (file) {
                    if (file.size > 10485760)
                      toast.error("Файл больше 10 мб!", {
                        position: toast.POSITION.TOP_CENTER,
                      });
                    else
                      this.setState({
                        avatar: { file: file, path: URL.createObjectURL(file) },
                      });
                  }
                }}
                type="file"
                accept="image/jpeg,image/png"
                hidden
              />
              <img
                className="avatar-img"
                src={
                  this.state.avatar
                    ? this.state.avatar.path
                    : ConfigSettings.defaultAvatar
                }
                alt=""
              />
              <span
                className="d-block mt-2"
                style={{
                  maxWidth: "381px",
                  fontSize: "12px",
                  lineHeight: "14px",
                }}
              >
                На фото должны быть только Вы. Лицо не должны закрывать
                посторонние предметы или люди.
              </span>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 col-xl-6 adress-input">
              <h4 className="subtitle pt-0 ">Расположение *</h4>
              <div className="row mx-0 align-items-center">
                <span>Страна:</span>
                <div className="col" style={{ maxWidth: "320px" }}>
                  <Select
                    type="text"
                    options={countryList}
                    value={countryList.find(
                      (item) => item.value === this.state.country
                    )}
                    onChange={(val) => {
                      this.setState({ country: val.value });
                    }}
                    placeholder="Страна"
                  />
                </div>
              </div>
              <div className="row mx-0 align-items-center">
                <span>Адрес:</span>
                <div className="col" style={{ maxWidth: "320px" }}>
                  <AdressSelect
                    placeholder="Адрес"
                    filterFromBound="country"
                    filterToBound="city"
                    onChange={(val) => {
                      this.setState({ address: val.value });
                    }}
                    value={this.state.address}
                  />
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 ">
              <h4 className="subtitle pt-0">Заключение договора</h4>
              <div className="f-12 pb-2">Основная форма для аккаунта</div>
              {contractParams.map((item, index) => {
                return (
                  <div key={index} className="checkboxParam">
                    <CheckBox
                      id={`contractParams${item.id}`}
                      name={`contractParams`}
                      value={this.state.contract.id === item.id}
                      onChange={() => {
                        if (this.state.contract.id === item.id)
                          this.setState({ contract: {} });
                        else this.setState({ contract: { id: item.id } });
                      }}
                      text={item.name}
                    />

                    {item.additionFields &&
                      this.state.contract.id === item.id &&
                      item.additionFields.map((itemField, index) => {
                        return (
                          <itemField.field
                            key={index}
                            {...itemField.props}
                            value={
                              (this.state.contract.data &&
                                this.state.contract.data.value) ||
                              ""
                            }
                            onChange={(val) => {
                              this.setState({
                                contract: { ...this.state.contract, data: val },
                              });
                            }}
                          ></itemField.field>
                        );
                      })}
                  </div>
                );
              })}
            </div>
          </div>
          <hr />

          <div className="row mt-2">
            <h4 className=" col-12 subtitle pt-0 px-3">Паспорт</h4>
            <div className="col-12  mb-4">
              <input
                id="passportPhoto"
                onChange={(e) => {
                  let file = e.target.files[0];
                  if (file)
                    this.setState({
                      passportPhoto: {
                        path: URL.createObjectURL(file),
                        file: file,
                      },
                    });
                }}
                type="file"
                accept="image/jpeg,image/png"
                hidden
              />
              <div>
                <span
                  className="d-block d-md-inline-block mr-2 foto-lable-passport"
                  style={{
                    lineHeight: "16px",
                    marginBottom: "12px",
                  }}
                >
                  Фото с паспортом в руках
                </span>

                <div
                  className={`inputPhoto ${
                    !this.state.passportPhoto ? "unload" : ""
                  } mr-3`}
                  style={{
                    height: "70px",
                    width: "100px",
                    verticalAlign: "middle",
                  }}
                >
                  <div className="placeholder" onClick={() => {}}></div>
                  {!!Object.entries(this.state.passportPhoto).length && (
                    <img
                      src={this.state.passportPhoto.path}
                      className="avatarPhoto"
                      alt="avatarPhoto"
                    />
                  )}
                  {!Object.entries(this.state.passportPhoto).length && (
                    <div className="carPhoto" />
                  )}
                </div>
                <Button
                  type="fill"
                  className={`mr-4 f-17 ${
                    this.props.user.isPassportVerified ? "disable" : ""
                  }`}
                  paddingHorizontal="30px"
                  paddingVertical="7px"
                  margin="0 0 12px 0"
                  onClick={() => {
                    if (!this.props.user.isPassportVerified)
                      document.getElementById("passportPhoto").click();
                  }}
                >
                  <span className="d-none d-md-block">Загрузить</span>
                  <img
                    className="d-block d-md-none"
                    style={{
                      width: "18px",
                    }}
                    src={upload}
                    alt=""
                  />
                </Button>
                {!this.props.user.isPassportVerified &&
                  !!Object.entries(this.props.user.passportPhoto).length && (
                    <span className="f-12 passport-status">
                      <GreyAngle className="mr-2" />
                      Фото с паспортом на проверке
                    </span>
                  )}
                {!this.props.user.isPassportVerified &&
                  !Object.entries(this.props.user.passportPhoto).length && (
                    <span className="f-12 passport-status">
                      <RedClose className="mr-2" />
                      Фото с паспортом не загружено
                    </span>
                  )}
                {this.props.user.isPassportVerified && (
                  <span className="f-12 passport-status">
                    <Passport className="mr-2" />
                    Паспорт загружен
                  </span>
                )}
              </div>
              <div className="col-md-8 col-12 px-0 pt-2">
                <span className="d-block f-12">
                  Возьмите паспорт в руки разверните парспорт и разместите так,
                  чтобы он не закрывал Ваше лицо, но был четким и читабельным.
                  Ваше лицо на этой фотографии оператор будет сравнивать с лоцом
                  на аватаре.
                </span>
                <Link
                  to="/"
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({
                      dataFancybox: {
                        images: [{ path: ConfigSettings.defaultPassport }],
                        index: 0,
                      },
                    });
                  }}
                  className="href"
                >
                  <span
                    className="d-inline-block f-14 text-center"
                    style={{
                      lineHeight: "16px",
                      margin: 0,
                      marginTop: "5px",
                      marginRight: "10px",
                    }}
                  >
                    Открыть пример фото
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="d-flex mt-2">
            <Button
              type="fill"
              paddingVertical={"7px"}
              className="ml-auto f-14"
              paddingHorizontal={"26px"}
              onClick={this.saveUser}
            >
              Сохранить все
            </Button>
          </div>
          <CSSTransitionGroup
            transitionName="fancybox-animation"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {this.state.dataFancybox.images && (
              <Fancybox
                close={() => {
                  this.setState({
                    dataFancybox: { images: false, index: false },
                  });
                }}
                images={this.state.dataFancybox.images}
                index={this.state.dataFancybox.index}
              />
            )}
          </CSSTransitionGroup>
        </div>
      );
    if (this.props.step === 2)
      return (
        <div className="profile-page container-fluid">
          <h2 className="title">Безопасность</h2>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-6">
              <h4 className="subtitle pt-0">Изменение телефона *</h4>
              <InputPhone
                ref={(ref) => {
                  this.InputPhone = ref;
                }}
                value={this.state.phone}
                isVerified={this.state.isVerified}
                setVerified={(val) => {
                  if (val === "success") {
                    this.props.userActions
                      .userEdit(
                        { phone: this.state.phone },
                        this.props.user.apiToken
                      )
                      .then((responce) => {
                        if (!responce.error)
                          toast.success("Данные успешно сохранены", {
                            position: toast.POSITION.TOP_CENTER,
                          });
                      });
                    this.InputPhone.refresh();
                  } else this.setState({ isVerified: val });
                }}
                onChange={(phone) => {
                  this.setState({ phone });
                }}
                placeholder="+7 (_ _ _) _ _ _ - _ _ - _ _"
              />
            </div>
            <div className="col-12 col-sm-6 col-md-6">
              <h4 className="subtitle pt-0">Безопасность</h4>
              <div className="position-relative" style={{ maxWidth: "320px" }}>
                <Input
                  type="password"
                  placeholder="Старый пароль"
                  value={this.state.lastPassword}
                  style={{ paddingRight: 50, marginBottom: 10 }}
                  onChange={(e) => {
                    this.setState({ lastPassword: e.target.value });
                  }}
                />
              </div>
              <div className="position-relative" style={{ maxWidth: "320px" }}>
                <Input
                  type="password"
                  placeholder="Новый пароль"
                  value={this.state.newPassword}
                  style={{ paddingRight: 50, marginBottom: 10 }}
                  onChange={(e) => {
                    this.setState({ newPassword: e.target.value });
                  }}
                />
              </div>
              <div className="position-relative" style={{ maxWidth: "320px" }}>
                <Input
                  type="password"
                  placeholder="Подтверждение пароля"
                  value={this.state.confirmPassword}
                  style={{ paddingRight: 50, marginBottom: 10 }}
                  onChange={(e) => {
                    this.setState({ confirmPassword: e.target.value });
                  }}
                />
              </div>
              <Button type="empty bg-gray " onClick={this.passChange}>
                Сохранить пароль
              </Button>
            </div>
          </div>
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
