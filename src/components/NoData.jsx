import React from 'react';

const NoData = ({kind}) => {
  const styles = {
    padding: "10px",
    margin: "10px 0",
    textAlign: "center",
    width: "100%",
    background: "#f5f5f5",
    borderRadius: "5px",
  };
  return (
    <div style={styles}>No {kind} to display...</div>
  )
}

export default NoData