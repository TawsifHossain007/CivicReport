import React from "react";
import Lottie from "lottie-react";
import groovyWalkAnimation from "./groovyWalk.json";

const Loading = () => {
    return (
        <div className="flex items-center justify-center">
            <Lottie animationData={groovyWalkAnimation} loop={true} />; 
        </div>
    );
};

export default Loading;