import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, InputGroup, FormControl, Form } from 'react-bootstrap';
import styles from './Ideator.module.scss';
import { IIdeatorProps } from './IIdeatorProps';
import { escape, truncate } from '@microsoft/sp-lodash-subset';
import * as jQuery from 'jquery';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from '../../../Public/TS/Header';
import { truncator, truncatorheader, formatDate, checklatest } from '../../../Public/JS/commonFunc';
import { faExclamation, faArrowCircleLeft, faTasks, faArrowCircleRight, faPause } from "@fortawesome/free-solid-svg-icons";
// Import css files for carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import 'slick-carousel';
import "../../../Public/CSS/PILContent.css";
import { Item } from '@pnp/sp/items';
import { _SiteUser } from '@pnp/sp/site-users/types';
import InitialLoad from '../../../Public/TS/PreLoader';

export interface IIdeatorStates {
  NavigatorID: number;
  AllTasks: any[];
  TasksCount: number;
  filteredTask: any[];
  bgImage: any[];
  filterObject: object;
  PhaseTitle: any[];
  PhaseCount: any[];
  CurrentUserID: number;
}
function createMarkup(content) {
  return {
    __html: content
  };
}
export default class Ideator extends React.Component<IIdeatorProps, IIdeatorStates> {
  public constructor(props) {
    super(props);
    this.state = {
      NavigatorID: 0,
      AllTasks: [],
      TasksCount: 0,
      filteredTask: [],
      bgImage: [],
      filterObject: {},
      PhaseTitle: [],
      PhaseCount: [],
      CurrentUserID: 0
    };
  }


  public carousalFilter = (e) => {
    let tempObject = this.state.filterObject;
    let filteredData;
    if (e.target.type == "search") {
      if (e.target.value == '') {
        delete tempObject[e.target.name];
      } else {
        tempObject[e.target.name] = e.target.value;
      }
    }
    else {
      if (e.target.value == ' ') {
        delete tempObject[e.target.name];
        this.strPhase = null;
      } else {
        tempObject[e.target.name] = e.target.value;
        this.strPhase = e.target.value;
        localStorage.setItem('phase', e.target.value);
      }
    }
    this.setState({
      filterObject: tempObject
    }, () => {
      //console.log(this.state.filterObject);
      filteredData = this.state.AllTasks.filter(item => this.filterData(item));
      this.setState({ filteredTask: filteredData });
    });
  }
  public filterData = (item) => {
    let myObject = this.state.filterObject;
    let filterKeys = Object.keys(this.state.filterObject);
    let found = false;
    let status = {};
    if (filterKeys.length > 0) {
      filterKeys.map((ele) => {
        if (ele == "Phase") {
          found = myObject[ele] != undefined ? myObject[ele] == item[ele].Title.toLowerCase() : true;
          if (found) {
            status[ele] = found;
          }
        }
        if (ele == "search") {
          found = item.IdeaTitle != null ? item.IdeaTitle.toLowerCase().indexOf(myObject[ele].toLowerCase()) !== -1 : false ||
            item.IdeaDescription != null ? item.IdeaDescription.toLowerCase().indexOf(myObject[ele].toLowerCase()) !== -1 : false;
          if (found) {
            status[ele] = found;
          }
        }
        else {
          found = myObject[ele] != undefined ? myObject[ele] == item[ele] : true;
          if (found) {
            status[ele] = found;
          }
        }
      });
      let keystatus = Object.keys(status);
      let itemfound = false;
      keystatus.map((items) => {
        if (status[items]) {
          itemfound = true;
        }
      });
      return itemfound;
    }
    else {
      return true;
    }
  }

  public filterSearch = (event) => {
    var updatedSearch = this.state.AllTasks;
    updatedSearch = updatedSearch.filter((item) => {
      return item.IdeaTitle.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 ||
        item.IdeaDescription.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1;
    });
    this.setState({ filteredTask: updatedSearch });
  }
  public url = window.location.href.toLowerCase();
  public strPhase = this.getParameterByName("p", this.url);


  public render(): React.ReactElement<IIdeatorProps> {

    let siteFullURL = window.location.pathname;
    let sitePagesURL = siteFullURL.substring(0, siteFullURL.lastIndexOf('/'));
    let siteRelURL = siteFullURL.substring(0, siteFullURL.toLowerCase().lastIndexOf('/sitepages/'));
    let siteHomeURL = sitePagesURL + "/Home.aspx";
    var settings = {
      initialSlide: 0,
      className: "center",
      centerMode: true,
      infinite: false,
      centerPadding: "0px",
      slidesToShow: 1,
      slidesToScroll: 1,
      slidesPerRow: 2,
      speed: 1000,
      dots: true,
      rows: 10000
    };
    let phases = "";
    let count = 0;
    let arrPhase = [];
    this.state.PhaseCount.map(
      (item, key) => { arrPhase.push([item.ID, item.Title]); }

    );

    if (this.strPhase != null) {
      phases = "PHASE: " + this.strPhase.toUpperCase();
      localStorage.setItem('phase', this.strPhase);
    }
    else {
      phases = "ALL IDEAS";
      localStorage.setItem('phase', "select phase");
    }

    $(document).ready(() => {
      if (localStorage.getItem('phase') != "" && localStorage.getItem('phase') != null) {
        console.log(localStorage.getItem('phase'));
        let phase = localStorage.getItem('phase');
        if (document.getElementById("ddlPhase") != null) {
          let setPhase = document.getElementById("ddlPhase") as HTMLSelectElement;
          if (phase == "submit") {
            setPhase.selectedIndex = 1;
          }
          else if (phase == "ideate") {
            setPhase.selectedIndex = 2;
          }
          else if (phase == "evaluate") {
            setPhase.selectedIndex = 3;
          }
          else if (phase == "accelerate") {
            setPhase.selectedIndex = 4;
          }
          else if (phase == "proof of concept") {
            setPhase.selectedIndex = 5;
          }
          else if (phase == "implement") {
            setPhase.selectedIndex = 6;
          }
          else {
            setPhase.selectedIndex = 0;
          }
        }


      }
    });

    return (
      <React.Fragment>
        <InitialLoad />
        <Container className={styles.ideator + " nopadding"} fluid={true}>
          <Col xs={12} md={12} lg={12} id="firstsection" className={styles.homediv}>
            <Row className={styles.positions}>
              <Header />
            </Row>
            <Row className={styles.mdmargintop}>
              <Col xs={12} md={12} lg={12} className={styles.bgcolor}>
                <Row className={styles.IdeaNav}>
                  {/* <Col xs={1} md={1} lg={1} className={styles.breadcrumb + " " + styles.smleftmargin}><a href={siteHomeURL} title="Home">
                    <FontAwesomeIcon icon={faArrowCircleLeft} className={styles.backicon} />  </a>Idea ({this.state.filteredTask.length})
                  </Col> */}
                  <Col xs={6} md={6} lg={6} className={styles.breadcrumb}>{phases}</Col>

                  <Col xs={2} md={2} lg={2} className={styles.dropBoxCrumb}>
                    <div id="DropdownField">
                      <Form.Group controlId="ddlPhase" >
                        <Form.Control as="select" name="Phase" placeholder="Select Phase" onChange={(e) => this.carousalFilter(e)}>
                          <option value=" ">Select Phase</option>
                          {this.state.PhaseCount.filter(phase => phase.Title.toLowerCase() != "drawing board").map((item, index) => {
                            return <option value={item.Title.toLowerCase()}>{item.Title}</option>;
                          })}
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </Col>
                  <Col xs={3} md={3} lg={3}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Control type="search" placeholder="Search..." name="search" onChange={(e) => this.carousalFilter(e)} />
                    </Form.Group>
                  </Col>
                </Row>

                <div>
                  <Slider {...settings}>
                    {this.state.filteredTask.length > 0 ? this.state.filteredTask.map(
                      (item, key) => {
                        let navDetailsURL = sitePagesURL + "/IdeaDetails.aspx?iid=" + item.ID + "&pid=" + item.PhaseId;
                        let bgimageURL = "";
                        if (item.BackgroundImageURL != null && item.BackgroundImageURL != "") {
                          bgimageURL = item.BackgroundImageURL.Url;
                        }
                        else {
                          if (count < 35 && count >= 0) {
                            count = count + 1;
                            bgimageURL = "https://sites.ey.com/sites/ProcurementInnovationLab/Idea%20Images/" + count + ".jpg";

                          }
                          else {
                            bgimageURL = "https://sites.ey.com/sites/ProcurementInnovationLab/Idea%20Images/" + count + ".jpg";
                            count = 0;
                          }

                        }
                        let latestdisplay = "hideicons";

                        if (checklatest(item.Created)) {
                          latestdisplay = "displayicons";
                        }
                        let pauseDisplay = "hidepause";
                        if (item.Pause == "Yes") {
                          pauseDisplay = "displaypause";
                        }
                        return (
                          <Col xs={12} md={12} lg={12} className={styles.slidercontainer}>
                            <Row className={styles.carddisplay}>
                              <Col xs={4} md={4} lg={4} className={styles.nopadding}>
                                <a href={navDetailsURL} ><img className={styles.sliderimage} title={item.IdeaTitle} src={bgimageURL} /></a>
                              </Col>
                              {<Col xs={8} md={8} lg={8} >
                                <div>
                                  <a href={navDetailsURL} className={styles.cardlink} title={item.IdeaTitle}><h3>{truncatorheader(item.IdeaTitle)}</h3></a>
                                  {/* <a className={styles.cardlink} onClick={(e) => { this.setIdeaPhasePage(item.ID, item.PhaseId, "ins"); }} title={item.IdeaTitle}><h3>{truncatorheader(item.IdeaTitle)}</h3></a> */}
                                </div>
                                <div className={styles.carddetails} dangerouslySetInnerHTML={createMarkup(truncator(item.IdeaDescription))} />
                                <Row><Col xs={7} md={7} lg={7}><div className={styles.phaseinfo}>{item.Phase.Title}</div></Col>
                                  <Col xs={2} md={2} lg={2} className={styles.nopadding}><Col xs={12} md={12} lg={12} className={pauseDisplay}><FontAwesomeIcon icon={faPause} className={styles.pauseicon} /> Paused</Col></Col>
                                  <Col xs={3} md={3} lg={3} className={latestdisplay}>New <FontAwesomeIcon icon={faExclamation} className={styles.newicon} /></Col>
                                </Row>

                                <div className={styles.creatorinfo}>Created by {item.Author.Title} on {formatDate(item.Created)}

                                </div>
                              </Col>}
                            </Row>
                          </Col>
                        );
                      }
                    ) : <Col xs={12} md={12} lg={12} className={styles.nulIdea}><span>No results</span></Col>
                    }
                  </Slider>
                </div>
                {/*     <div>

                  {window.location.href.indexOf("?p=") > -1 ? this.state.PhaseTitle.map(
                    (item, key) => {
                      let backUrl = "";
                      let forwardUrl = "";
                      if (arrPhase.length > 0) {
                        for (var i = 0; i < arrPhase.length; i++) {
                          if (item.Title.toLowerCase() == arrPhase[i][1].toLowerCase()) {
                            if (i != 0) {
                              backUrl = sitePagesURL + "/IdeaBank.aspx?p=" + arrPhase[i - 1][1];
                              backPhase = arrPhase[i - 1][1];
                            }

                            if (i != arrPhase.length - 1) {
                              forwardUrl = sitePagesURL + "/IdeaBank.aspx?p=" + arrPhase[i + 1][1];
                              frontPhase = arrPhase[i + 1][1];
                            }
                          }
                        }
                      } 
                      return (
                        <Row className={styles.phaseNavigator}>
                          <Col xs={6} md={6} lg={6} className={styles.backPhase}>
                            <a href={backUrl} title={backPhase}>
                              <FontAwesomeIcon icon={faArrowCircleLeft} className={styles.phaseIcon} /></a>Move to {backPhase}
                          </Col>
                          <Col xs={6} md={6} lg={6} className={styles.forwardPhase}>Move to {frontPhase}
                            <a href={forwardUrl} title={frontPhase}>
                              <FontAwesomeIcon icon={faArrowCircleRight} className={styles.phaseIcon} /></a>
                          </Col>
                        </Row>);
                    }
                  ) : <div></div>}
                </div> */}
              </Col>
            </Row>
          </Col>
        </Container>
      </React.Fragment>
    );
  }
  public getParameterByName(name: string, url: string) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

/*   public setIdeaPhasePage(ideaId, phaseId, backpage) {
    localStorage.setItem('ideaId', JSON.stringify(ideaId));
    localStorage.setItem('phaseId', JSON.stringify(phaseId));
    localStorage.setItem('backpage', JSON.stringify(backpage));
    let siteFullURL = window.location.href;
    let sitePagesURL = siteFullURL.substring(0, siteFullURL.lastIndexOf('/'));
    window.open(sitePagesURL + '/IdeaDetails.aspx', "_self");
  } */

  public componentDidMount() {
    setTimeout(() => {
      jQuery("#loadingStars").hide();
    }, 2000);



    sp.web.currentUser.get().then((item: any) => {
      this.setState({
        CurrentUserID: item.Id
      });
    }).catch(e => {
      console.error(`Error while getting user info - ${e}`);
    }).then(() => {
      this.getNavigatorIDbyName();
    });

  }

  public getNavigatorIDbyName() {
    if (this.strPhase != "" && this.strPhase != null && this.strPhase != undefined) {
      sp.web.lists.getByTitle("Ideas").items.top(4999).select("*, Phase/Title,Author/Title").expand("Phase, Author").filter("Phase/Title%20eq%20'" + this.strPhase + "'").orderBy("Created", false).get().then((item: any) => {
        this.setState({
          filteredTask: item
        });
      }).catch(err => {
        console.error("Error while getting Ideas - " + err);
      }).then(() => {
        sp.web.lists.getByTitle("Ideas").items.top(4999).select("*, Phase/Title, Author/Title").expand("Phase, Author").orderBy("Created", false).get().then((item: any) => {
          this.setState({ AllTasks: item }, () => {
          });
        }).catch(err => {
          console.error("Error while getting Ideas - " + err);
        });
      });
    }
    else {
      sp.web.lists.getByTitle("Ideas").items.top(4999).select("*, Phase/Title, Author/Title").expand("Phase, Author").orderBy("Created", false).get().then((item: any) => {
        this.setState({ AllTasks: item, TasksCount: item.length, filteredTask: item }, () => {
        });
      }).catch(err => {
        console.error("Error while getting Ideas - " + err);
      });
    }

    sp.web.lists.getByTitle("Phase").items.get().then((item: any) => {
      this.setState({ PhaseCount: item });
    }).catch(er => {
      console.error("Error while getting Ideas - " + er);
    });


  }
  // public setInitialValues = () => {
  //   debugger;
  //   let dropDown = [];
  //   if (this.state.AllTasks.length > 0) {
  //     this.state.AllTasks.map((item, index) => {
  //       if (dropDown.indexOf(item.Phase.Title) == -1) {
  //         dropDown.push(item.Phase.Title);
  //       }
  //     });
  //     this.setState({ PhaseCount: dropDown });
  //   }
  // }
}
