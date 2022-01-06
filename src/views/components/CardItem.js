import React from "react";
import { Link } from "react-router-dom";

function CardItem(props) {
  return (
    <Link
      to={{
        pathname: props.path,
        search: `?${props.id}`,
      }}
      className="col-sm-6 col-md-3 col-lg-3 blackText"
    >
      <div className="card card_design">
        <div className="card-body">
          <img className="card-img-top" alt="img" src={props.imageUrl} />
          <h3 className="course-text">{props.courseName}</h3>
          <p className="card-text">{props.description.substring(0, 60)} ...</p>
        </div>
      </div>
    </Link>
  );
}

export default CardItem;
