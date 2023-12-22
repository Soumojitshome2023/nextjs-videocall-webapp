"use client"
import React from "react";
import { DNA } from 'react-loader-spinner'

const DataLoader = () => {

    return (
        <div className="top-0 left-0 w-full h-full flex justify-center items-center">

            <DNA
                visible={true}
                height="150"
                width="150"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </div>
    );
};

export default DataLoader;