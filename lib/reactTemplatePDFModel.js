import React from "react";
import ResultTableModel from "../components/core/ResultTableModel";

export default class ReactTemplatePDFModel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      model: props.model
    };
  }

  render() {
    return <ResultTableModel id={this.state.id} model={this.state.model} />;
  }
}
