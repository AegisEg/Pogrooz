import React from "react";

class EditorText extends React.Component {
  componentDidMount() {
    tinymce.remove();
    tinymce.init({
      selector: "#editor",
      height:"800px",
      plugins:
        "advlist autolink lists code link image charmap print preview hr anchor pagebreak",
      toolbar: "undo redo | styleselect | bold italic | link image numlist bullist floating",
      setup: (ed) => {
        ed.on("change", (e) => {
          this.props.onChange(this.props.property.name, ed.getContent());
        });
      },
    });
  }
  render() {
    return (
      <>
        <textarea id="editor"  value={this.props.record.params.content} />
      </>
    );
  }
}

export default EditorText;
