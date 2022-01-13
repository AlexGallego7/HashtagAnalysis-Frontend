import { usePromiseTracker } from "react-promise-tracker";
import React from "react";

const LoaderIndicator = () => {
    const { promiseInProgress } = usePromiseTracker();

    return promiseInProgress &&
        <div
            style={{
                width: "100%",
                height: "2000",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
            <div className="spinner-border" role="status">
                <span className="sr-only">Analyzing... Please wait...</span>
            </div>
        </div>
};

export default LoaderIndicator