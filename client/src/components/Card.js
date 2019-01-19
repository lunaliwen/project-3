import React from "react";

const styles = {
  card: {
    marginTop: 90,
    background: "#ffffff",
    width: "50%",
    display: "inline-block",
    boxSizing:"border-box",
    verticalAlign: "top"
  },
  image: {
    width: 500,
    padding: "30px 20px"
  },
  content: {
    padding: 20
  },
  heading: {
    fontFamily: "Georgia",
    fontSize: 24,
    fontColor: "#A9A9A9"
  }
};

const Card = props => (
  <div style={styles.card}>
    <div style={styles.image}>
    <a href= {`/home/${props.id}`}>
      <img alt={props.title} src={props.image} />
      </a>
    </div>
    <div style={styles.heading}>
          <strong>&nbsp;&nbsp;&nbsp;&nbsp;{props.title}</strong>   

    </div>
  </div>
);

export default Card;