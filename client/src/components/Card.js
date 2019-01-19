import React from "react";

const styles = {
  card: {
    margin: 20,
    background: "#e8eaf6",
    width: 600
  },
  image: {
    Height: 250,
    Width: 250,
    padding: "0 20px"
  },
  content: {
    padding: 20
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
      <ul>
        <li>
          <strong>Title:</strong> {props.title}
        </li>
        <li>
          <strong>Description:</strong> {props.description}
        </li>
      </ul>
    </div>
  </div>
);

export default Card;
