import React from 'react';

const NoData = ({txt}) => {
  const styles = {
    padding: "10px",
    margin: "20px 0",
    textAlign: "center",
    width: "100%",
    borderRadius: "5px",
    fontSize: "16px",
  };
  return (
    <div style={styles}>{txt}</div>
  )
}

export default NoData