import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
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
  state = {}

  async callAPI() {
    const myName = this.props.myName;
    const friendName = this.props.friendName;
    return fetch(`/compare-languages?MyName=${myName}&OtherName=${friendName}`)
    .then(response => response.json())
    .then(json => json.no_commit_lang)
    .catch(err => {
      console.log(err)
      myToast("warning", "Cannot Get Data")
      setTimeout(()=>{
        this.props.setCommit(false)
        this.props.setCompare(true)
      })
    })
  }

  async getUnusedLangData(){
    const datas = await this.callAPI();
    this.setState(datas)
  }

  componentDidMount() {
    this.getUnusedLangData()
  }

  renderLanguages() {
    return Object.values(this.state).map((el) => SimpleSliderElement({name:el, src:"https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Sungkyunkwan_University_seal.svg/1200px-Sungkyunkwan_University_seal.svg.png"}))
  }

  render() {

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      slidesToShow: 2,
      slidesToScroll: 1,
      initialSlide: 0,
      autoplay: true,
      autoplaySpeed: 1500,
      pauseOnHover: true
    };

    const elements = this.state

    return (
      <div>
        <Slider {...settings}>
          {elements ? this.renderLanguages() : "loading"}
        </Slider>
      </div>
    );

  }
}