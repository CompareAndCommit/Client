import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { myToast } from "./component/swal-toast";
import data from "./data.json";

function SimpleSliderElement(props) {
  return (
  <div className="carousel-element" onClick={props.onModalOpen}>
    <img className="carousel-img" src={props.src} alt={props.name}/>
    <div className="carousel-div">{props.name}</div>
  </div>)
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
    .then(json => {
      console.log(json)
      return json
    })
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
    const lang_datas = datas.no_commit_lang
    const githubData = data.data;
    const excludeData = data.exclude_data;

    for (var i = 0; i < lang_datas.length; i++) {

      if (excludeData.includes(lang_datas[i])) {
        lang_datas.splice(i, 1);
      }

      for (var j = 0; j < githubData.length; j++) {
        if (lang_datas[i] == githubData[j].name) {
          console.log('Lang >>', lang_datas[i]);
          //console.log('Color >>', githubData[j].color);
          console.log('URL >>', githubData[j].src);
          lang_datas[i] = [lang_datas[i], githubData[j].src]
          //lang_datas[i] = [lang_datas[i], githubData[j].color, githubData[j].src]
        }
      }
    }
    console.log(datas)
    console.log(lang_datas)

    for (var k=0;k<lang_datas.length;k++) {
      lang_datas[k].push({id : datas.developer.id[k], name : datas.developer.name[k]})
      lang_datas[k].push({desc : datas.repository.desc[k], repo : datas.repository.repo[k]})
    }
    
    this.setState(lang_datas);
    console.log(this.state)
  }

  componentDidMount() {
    this.getUnusedLangData()
  }

  renderLanguages() {
    return Object.values(this.state).map((el) => SimpleSliderElement(
      {
        name: el[0],
        src: el[1],
        onModalOpen: () => {
          this.props.openModal(el[0], el[2], el[3])
        }
      }
      )
    )
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