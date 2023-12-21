"use client"
import React, { useEffect, useState } from "react";
import { DNA } from 'react-loader-spinner'
// import LoadingBar from 'react-top-loading-bar'

const DataLoader = () => {


    return (
        <div className="top-0 left-0 w-full h-full flex justify-center items-center">

            {/* <Dna
                visible={true}
                height="150"
                width="150"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperclassName="dna-wrapper" /> */}
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