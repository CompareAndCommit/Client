import React, { Component } from "react";
import {useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { myToast } from "./component/swal-toast";

function SimpleSliderElement(props) {
  return (<div className="carousel-element"><img className="carousel-img" src={props.src} alt={props.name}/><div className="carousel-div">{props.name}</div></div>)
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "grey", borderRadius:"50%" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "grey", borderRadius:"50%" }}
      onClick={onClick}
    />
  );
}

export default class SimpleSlider extends Component {
  render() {

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      slidesToShow:3,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 550,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    const myName = this.props.myName;
    const friendName = this.props.friendName;
    
    async function getUnusedLangData() {
      axios.get(`/compare-languages?MyName=${myName}&OtherName=${friendName}`).then(

        (response) => {
          if (response.data.code === 400) {
            myToast("warning", "Cannot Get Data")
            setTimeout(()=>{
              this.props.setCommit(false)
              this.props.setCompare(true)
            })
          }
          else {

            const langList = response.data.no_commit_lang;

            const elementsData = [
              [langList[0], "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/768px-Python-logo-notext.svg.png"],
              [langList[1], "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/1024px-Ruby_logo.svg.png"],
              [langList[2], "https://assets.stickpng.com/images/5847f289cef1014c0b5e486b.png"],
              [langList[3], "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png"],
              [langList[4], "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png"]
            ]
          }
        },
        (error) => {console.log(error)}
      );
    }
    getUnusedLangData();

    const elements_data = [
      ["python", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/768px-Python-logo-notext.svg.png"],
      ["ruby", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/1024px-Ruby_logo.svg.png"],
      ["dart", "https://assets.stickpng.com/images/5847f289cef1014c0b5e486b.png"],
      ["c++", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png"],
      ["c++", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png"]
    ]

    const Elements = elements_data.map( (el) => SimpleSliderElement({name:el[0], src:el[1]}) )
    
    return (
      <div>
        <Slider {...settings}>
          {Elements}
        </Slider>
      </div>
    );

    return (
      <div>
        <Slider {...settings}>
          {Elements}
        </Slider>
      </div>
    );
  }
}