import Loader from "react-loader-spinner";
import React from "react";
import styled from "styled-components"

const MyLoader = () =>{
    return (
        <LoaderContainer>
            <Loader
                type="ThreeDots"
                color="#2BA94B"
                secondaryColor="#25C73A"
                height={300}
                width={300}
            />
        </LoaderContainer>
    );
}

const LoaderContainer = styled.div`
    display:flex;
    justify-content:center;
    margin-top:20px;
    margin-bottom:20px;
`

export default MyLoader