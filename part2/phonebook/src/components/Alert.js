function Alert({ alert, ifError }) {
  let alertSuccessStyle = {
    borderRadius: "4px",
    border: "2px solid darkgreen",
    color: "green",
    padding: "5px",
    backgroundColor: "lightgrey"
  }

  let alertFailStyle = {
    borderRadius: "4px",
    border: "2px solid red",
    color: "red",
    padding: "5px",
    backgroundColor: "lightgrey"
  }

  if (alert === null) {
    return null;
  }

  return <div style={ifError ? alertFailStyle : alertSuccessStyle}>{alert}</div>;
}

export default Alert;