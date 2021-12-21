import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { myToast } from './swal-toast.js';
import data from '../data.json';

function SimpleSliderElement(props) {
  return (
    <div className='carousel-element' onClick={props.onModalOpen}>
      <img className='carousel-img' src={props.src} alt={props.name} />
      <div className='carousel-div'>{props.name}</div>
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'grey',
        borderRadius: '50%',
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'grey',
        borderRadius: '50%',
      }}
      onClick={onClick}
    />
  );
}

export default class SimpleSlider extends Component {
  state = {};

  async callAPI() {
    const { myName, friendName } = this.props;

    return fetch(
      `/api/compare-languages?MyName=${myName}&OtherName=${friendName}`
    )
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((err) => {
        console.log(err);
        myToast('warning', 'Cannot Get Data');
        setTimeout(() => {
          this.props.setCommit(false);
          this.props.setCompare(true);
        });
      });
  }

  async getUnusedLangData() {
    const remoteData = await this.callAPI();
    console.log(remoteData);
    const languageDataArray = remoteData.no_commit_lang;
    const userIdDataArray = remoteData.developer.id;
    const userDescriptionArray = remoteData.developer.name;
    const repositoryDataArray = remoteData.repository.repo;
    const repositoryDescriptionArray = remoteData.repository.desc;
    const githubDataArray = data.data;
    const githubExcludeDataArray = data.exclude_data;

    for (let i = 0; i < languageDataArray.length; i++) {
      const targetGithubDataJson = githubDataArray.filter(
        (obj) => obj['name'] === languageDataArray[i]
      );
      if (
        !targetGithubDataJson.length ||
        githubExcludeDataArray.includes(languageDataArray[i])
      ) {
        languageDataArray.splice(i, 1);
        userIdDataArray.splice(i, 1);
        userDescriptionArray.splice(i, 1);
        repositoryDataArray.splice(i, 1);
        repositoryDescriptionArray.splice(i, 1);
        i -= 1;
      } else {
        languageDataArray[i] = [
          languageDataArray[i],
          targetGithubDataJson[0].src,
        ];
      }
    }

    for (let k = 0; k < languageDataArray.length; k++) {
      languageDataArray[k].push({
        id: remoteData.developer.id[k],
        name: userDescriptionArray[k],
      });
      languageDataArray[k].push({
        desc: repositoryDescriptionArray[k],
        repo: repositoryDataArray[k],
      });
    }

    this.setState(languageDataArray);
    this.props.compareReady(true);
  }

  componentDidMount() {
    this.getUnusedLangData();
  }

  renderLanguages() {
    return Object.values(this.state).map((el) =>
      SimpleSliderElement({
        name: el[0],
        src: el[1],
        onModalOpen: () => {
          this.props.openModal(el[0], el[2], el[3]);
        },
      })
    );
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
      pauseOnHover: true,
    };

    const elements = this.state;

    return (
      <div>
        <Slider {...settings}>
          {elements ? this.renderLanguages() : 'loading'}
        </Slider>
      </div>
    );
  }
}
