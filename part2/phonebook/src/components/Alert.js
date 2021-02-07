function Alert({ alert }) {
  let alertStyle = {
    borderRadius: "4px",
    border: "2px solid darkgreen",
    color: "green",
    padding: "5px",
    backgroundColor: "lightgrey"

  }
  if (alert === null) {
    return null;
  }

  return <div style={alertStyle}>{alert}</div>;
}

export default Alert;