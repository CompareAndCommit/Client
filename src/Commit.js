import React, { useEffect, useState } from "react";
import { VictoryPie } from "victory";
import SimpleSlider from "./component/slider";
import MyLoader from "./component/loader";
import "./Commit.css";
import "./Compare.css";
import axios from "axios";
import { myToast } from "./component/swal-toast";
import data from "./data.json";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

function Commit(props) {
  const [langDatas, onLangDataChange] = useState({
    colors: [],
    langs: [],
  });

  const [renderCompareReady, onRenderCompareReadyChange] = useState(false);

  const switchRenderReadyHandler = (data) => {
    onRenderCompareReadyChange(data);
  };

  const switchLangDataHandler = (data) => {
    onLangDataChange(data);
  };

  const langList = [];

  for (let i = 0; i < langDatas.langs.length; i++) {
    langList.push(
      <li key={i}>
        <div
          className="chart-lang-box"
          style={{ backgroundColor: langDatas.colors[i] }}
        ></div>
        <div className="chart-lang-str">{langDatas.langs[i].x}</div>
      </li>
    );
  }

  useEffect(() => {
    async function getTopFiveLangData() {
      const githubData = data.data;

      axios.get(`/top-five-languages?MyName=${props.myName}`).then(
        (response) => {
          if (response.data.code === 400) {
            myToast("warning", "Cannot Get Data");
            setTimeout(() => {
              props.setCommit(false);
              props.setCompare(true);
            });
          } else {
            const topFiveLang = response.data.top_five_langs;
            const langPercent = response.data.top_five_pct;
            const langColors = [];

            for (var i = 0; i < topFiveLang.length; i++) {
              for (var j = 0; j < githubData.length; j++) {
                if (topFiveLang[i] === githubData[j].name) {
                  langColors.push(githubData[j].color);
                }
              }
            }

            const langData = {
              colors: langColors,
              langs: [
                { x: topFiveLang[0], y: langPercent[0] },
                { x: topFiveLang[1], y: langPercent[1] },
                { x: topFiveLang[2], y: langPercent[2] },
                { x: topFiveLang[3], y: langPercent[3] },
                { x: topFiveLang[4], y: langPercent[4] },
              ],
            };

            const langList = [];

            for (let i = 0; i < langData.langs.length; i++) {
              langList.push(
                <li key={i}>
                  <div
                    className="chart-lang-box"
                    style={{ backgroundColor: langData.colors[i] }}
                  ></div>
                  <div className="chart-lang-str">{langData.langs[i].x}</div>
                </li>
              );
            }

            switchLangDataHandler(langData);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
    getTopFiveLangData();
  }, [props]);

  const handleModalVisibility = (t) => {
    setOpen(t);
  };

  const [modalContent, setModalContent] = useState({
    language: [],
    repositories: [],
    developers: [],
  });

  const [open, setOpen] = useState(false);

  const onChangeModalContent = (language, developers, repositories) => {
    setModalContent({
      language: language,
      repositories: repositories,
      developers: developers,
    });
    console.log(modalContent);
  };
  const onOpenModal = (language, developers, repositories) => {
    onChangeModalContent(language, developers, repositories);
    handleModalVisibility(true);
  };

  const onCloseModal = () => {
    handleModalVisibility(false);
  };

  return (
    <main>
      {/*<Slide direction="right" in={props.viewCommit}>*/}
      <Modal id="full_modal" open={open} onClose={onCloseModal} center>
        <h2 id="modal_language_title">{modalContent.language}</h2>
        <div className="subtitle">
          {" "}
          Click and take a look at developers and respositories!
        </div>
        <div className="modal_section_title">Visit Popular Developers</div>
        <div className="modal_profiles">
          {modalContent.developers.id ? (
            modalContent.developers.id.map((i) => {
              let img_url = `https://github.com/${i}.png`;
              let ghb_url = `https://github.com/${i}`;
              return (
                <a className="gh_profile_container_a" href={ghb_url}>
                  <img
                    className="gh_profile_img_rounded"
                    src={img_url}
                    alt="github_profile_img"
                  />
                  <h3 className="gh_profile_h3_username">{i}</h3>
                </a>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
        <div className="modal_section_title">Visit Popular Repositories</div>
        <table>
          <tbody>
            <tr>
              {modalContent.repositories.repo ? (
                modalContent.repositories.repo.map((i) => {
                  const repo_name = i.replace("https://github.com/", "");
                  return (
                    <td>
                      <a className="gh_repo_name_a" href={i}>
                        {repo_name}
                      </a>
                    </td>
                  );
                })
              ) : (
                <div></div>
              )}
            </tr>
            <tr>
              {modalContent.repositories.desc ? (
                modalContent.repositories.desc.map((i) => {
                  return <td className="gh_repo_desc">{i}</td>;
                })
              ) : (
                <div></div>
              )}
            </tr>
          </tbody>
        </table>
      </Modal>
      <div id="main-container2">
        <div className="header2">
          <div className="title title2">Commit</div>
        </div>
        <div className="subdiv2">
          <div className="title-commit-sub">{props.myName}'s Top 5 Commits</div>
          <div id="chart-container">
            <div id="chart-pie">
              <VictoryPie
                startAngle={-90}
                endAngle={270}
                colorScale={langDatas.colors}
                data={langDatas.langs}
                labels={({ l }) => ""}
              />
            </div>
            <div id="chart-pie-description">
              <ul>{langList}</ul>
            </div>
          </div>
        </div>
        <div className="subdiv2">
          <div className="title-commit-sub">
            Languages that {props.friendName} Commit More
          </div>
          {!renderCompareReady ? <MyLoader /> : null}
          <div className="carousel-container">
            <SimpleSlider
              myName={props.myName}
              friendName={props.friendName}
              openModal={onOpenModal}
              compareReady={switchRenderReadyHandler}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Commit;
