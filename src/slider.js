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
    const devl_id_datas = datas.developer.id;
    const devl_desc_datas = datas.developer.name;
    const repo_datas = datas.repository.repo;
    const repo_desc_datas = datas.repository.desc;
    const githubData = data.data;
    const excludeData = data.exclude_data;

    console.log(lang_datas)
    for (var i = 0; i < lang_datas.length; i++) {
      console.log(lang_datas[i])
      const targetGithubData = githubData.filter(obj => obj["name"]==lang_datas[i])
      console.log(targetGithubData)
      if (!targetGithubData.length || excludeData.includes(lang_datas[i])) {
        console.log(`we should exclude ${lang_datas[i]}`)
        lang_datas.splice(i, 1);
        devl_id_datas.splice(i,1);
        devl_desc_datas.splice(i,1);
        repo_datas.splice(i,1);
        repo_desc_datas.splice(i,1);
        i -= 1;
      } else {
        lang_datas[i] = [lang_datas[i], targetGithubData[0].src]
      }
    }
    console.log(datas)
    console.log(lang_datas, devl_desc_datas, devl_id_datas, repo_datas, repo_desc_datas)

    for (var k=0;k<lang_datas.length;k++) {
      lang_datas[k].push({id : datas.developer.id[k], name : devl_desc_datas[k]})
      lang_datas[k].push({desc : repo_desc_datas[k], repo : repo_datas[k]})
    }
    
    this.setState(lang_datas);
    this.props.compareReady(true)
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