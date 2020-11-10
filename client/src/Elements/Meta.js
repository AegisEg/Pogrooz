// App
import React from "react";
import metaX from "../config/meta";
import { Helmet } from "react-helmet";
class orgSelect extends React.Component {
  render() {
    let meta = this.props.keyMeta
      ? metaX.find((item) => item.key === this.props.keyMeta)
      : metaX.find((item) => item.key === "main");
    console.log(meta);
    return (
      <Helmet>
        <title>{meta.title(this.props.options)}</title>
        <meta name="robots" content="index,follow"></meta>
        <meta name="title" content={meta.title(this.props.options)} />
        {meta.descriptions && (
          <meta
            name="description"
            content={meta.descriptions(this.props.options)}
          />
        )}
        <link
          rel="canonical"
          href={
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname
          }
        />
      </Helmet>
    );
  }
}

export default orgSelect;
