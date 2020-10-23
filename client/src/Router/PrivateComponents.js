import React from "react";
// Pages
import Profile from "../Pages/User/Profile";
import MyArticles from "../Pages/User/MyArticles";
import TakingArticles from "../Pages/User/TakingArticles";
import CreateTemplateAuto from "../Pages/User/CreatePart/CreateTemplateAuto";
import MyTemplateAuto from "../Pages/User/MyTemplateCar";
import User from "../Pages/Public/User";
import ArticlePage from "../Pages/User/ArticlePage";
import Notifications from "../Pages/User/Notifications/Notifications";
import NotificationsSettings from "../Pages/User/Notifications/NotificationsSettings";
import NewOffer from "../Pages/User/NewOffer";
import NewOrder from "../Pages/User/NewOrder";
import Reviwes from "../Pages/User/Reviwes";
import Support from "../Pages/User/Support";
import TarifLk from "../Pages/User/TarifLk";
import AutoPay from "../Pages/User/AutoPay";
import Messages from "../Pages/User/Messages/Messages";
import Dialog from "../Pages/User/Messages/Dialog";
import DialogOrder from "../Pages/User/Messages/DialogOrder";
import GeoDetect from "../Pages/User/GeoDetect";
import Page from "../Pages/Page";
import Questions from "../Pages/Questions";
class PublicComponents extends React.Component {
  render() {
    if (this.props.name === "Profile") return <Profile {...this.props} />;
    if (this.props.name === "MyArticles") return <MyArticles {...this.props} />;
    if (this.props.name === "TakingArticles")
      return <TakingArticles {...this.props} />;
    if (this.props.name === "CreateTemplateAuto")
      return <CreateTemplateAuto {...this.props} />;
    if (this.props.name === "MyTemplateAuto")
      return <MyTemplateAuto {...this.props} />;
    if (this.props.name === "User") return <User {...this.props} />;
    if (this.props.name === "ArticlePage")
      return <ArticlePage {...this.props} />;
    if (this.props.name === "Notifications")
      return <Notifications {...this.props} />;
    if (this.props.name === "NotificationsSettings")
      return <NotificationsSettings {...this.props} />;
    if (this.props.name === "NewOffer") return <NewOffer {...this.props} />;
    if (this.props.name === "NewOrder") return <NewOrder {...this.props} />;
    if (this.props.name === "Reviwes") return <Reviwes {...this.props} />;
    if (this.props.name === "Support") return <Support {...this.props} />;
    if (this.props.name === "TarifLk") return <TarifLk {...this.props} />;
    if (this.props.name === "AutoPay") return <AutoPay {...this.props} />;
    if (this.props.name === "Messages") return <Messages {...this.props} />;
    if (this.props.name === "Dialog") return <Dialog {...this.props} />;
    if (this.props.name === "DialogOrder")
      return <DialogOrder {...this.props} />;
    if (this.props.name === "GeoDetect") return <GeoDetect {...this.props} />;
    if (this.props.name === "Page") return <Page {...this.props} />;
    if (this.props.name === "Questions") return <Questions {...this.props} />;
  }
}
export default PublicComponents;
