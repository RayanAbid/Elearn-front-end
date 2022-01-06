import React, { useEffect, useState } from "react";
import "./Cards.css";
import CardItem from "./CardItem";
import Loader from "react-loader-spinner";
import { URL } from "src/Utills";
import { connect } from "react-redux";
import { getAllCourses } from "src/redux/actions";

function Cards(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.courses == null) {
      props.getAllCourses().then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <div id="cards">
        <div className="cards" >
          <h1>Check out our courses!</h1>
          <div className="container-fluid">
            <div className="row mt-4">
              {!loading ? (
                props?.courses != null &&
                props?.courses.length > 0 &&
                props?.courses.map((item, index) => {
                  return (
                    <CardItem
                      imageUrl={item.imageUrl}
                      description={item.description}
                      courseName={item.courseName}
                      path="/detail"
                      key={index}
                      id={item.id}
                    />
                  );
                })
              ) : (
                <div style={{ margin: "0 auto" }}>
                  <Loader type="Rings" color="#00BFFF" height={100} width={100} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    courses: state.courses,
  };
};

export default connect(mapStateToProps, {
  getAllCourses,
})(Cards);
