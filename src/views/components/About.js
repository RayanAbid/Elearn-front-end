import React from 'react';
import "./about.css";

function About() {
    return (
        <>
            <div id="about">
                <div className="container" >
                    <div className="row align-items-center py-5">
                        <div className="col-md-5">
                            <div className="image-container">
                                <img src="https://images.pexels.com/photos/7034632/pexels-photo-7034632.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="image-fluid " />
                            </div>
                        </div>
                        <div className="col-md-5 mt-3">
                            <h2 className="font-weight-bold display-4 mb-5">Welcome Message</h2>
                            <p className="mb-4 lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus ac quam vulputate
                                congue vitae et neque. Pellentesque non justo velit. Donec quis tempus mi.</p>
                            <p className="mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at risus ac quam vulputate congue
                                vitae et neque. Pellentesque non justo velit. Donec quis tempus mi.</p>
                            <a href="" className="btns1">View More</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About
