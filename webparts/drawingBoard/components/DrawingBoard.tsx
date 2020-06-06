import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, InputGroup, FormControl, Form } from 'react-bootstrap';
import styles from './DrawingBoard.module.scss';
import { IDrawingBoardProps } from './IDrawingBoardProps';
import { escape, truncate } from '@microsoft/sp-lodash-subset';
import * as jQuery from 'jquery';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from '../../../Public/TS/Header';
import { truncator, truncatorheader, formatDate, checklatest } from '../../../Public/JS/commonFunc';
import { faExclamation, faArrowCircleLeft, faTasks, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
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

export interface DrawingBoardStates {
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

export default class DrawingBoard extends React.Component<IDrawingBoardProps, DrawingBoardStates> {
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
      if (e.target.value == ' ') {
        delete tempObject[e.target.name];
      } else {
        tempObject[e.target.name] = e.target.value;
      }
    }
    this.setState({
      filterObject: tempObject
    }, () => {
      console.log(this.state.filterObject);
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

  public render(): React.ReactElement<IDrawingBoardProps> {
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
    let acceleratorURL = "";
    let innovationhubURL = "";
    let phases = "";
    let count = 0;
    let backPhase = "";
    let frontPhase = "";
    let arrPhase = [];
    this.state.PhaseCount.map(
      (item, key) => { arrPhase.push([item.ID, item.Title]); }

    );

    return (
      <React.Fragment>
        <InitialLoad />
        <Container className={styles.drawingBoard + " nopadding"} fluid={true}>
          <Col xs={12} md={12} lg={12} id="firstsection" className={styles.homediv}>
            <Row className={styles.positions}>
              <Header />
            </Row>
            <Row className={styles.mdmargintop}>
              <Col xs={12} md={12} lg={12} className={styles.bgcolor}>
                <Row className={styles.IdeaNav}>
                  {/*   <Col xs={1} md={1} lg={1} className={styles.breadcrumb + " " + styles.smleftmargin}><a href={siteHomeURL} title="Home">
                    <FontAwesomeIcon icon={faArrowCircleLeft} className={styles.backicon} />  </a>Idea ({this.state.filteredTask.length})
                  </Col> */}
                  <Col xs={5} md={5} lg={5} className={styles.breadcrumb}>Drawing Board</Col>
                  <Col xs={3} md={3} lg={3}></Col>
                  <Col xs={3} md={3} lg={3} className={styles.searchAlign}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Control type="search" placeholder="Search..." name="search" onChange={(e) => this.carousalFilter(e)} />
                    </Form.Group>
                  </Col>
                </Row>

                <div>
                  <Slider {...settings}>
                    {this.state.filteredTask.length > 0 ? this.state.filteredTask.map(
                      (item, key) => {
                        let navDetailsURL = sitePagesURL + "/IdeaDetails.aspx?iid=" + item.ID + "&pid=" + item.PhaseId + "&p=mng";
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

                        return (
                          <Col xs={12} md={12} lg={12} className={styles.slidercontainer}>
                            <Row className={styles.carddisplay}>
                              <Col xs={4} md={4} lg={4} className={styles.nopadding}>
                                <a href={navDetailsURL} ><img className={styles.sliderimage} title={item.IdeaTitle} src={bgimageURL} /></a>
                              </Col>
                              {<Col xs={8} md={8} lg={8} >
                                <a href={navDetailsURL} className={styles.cardlink} title={item.IdeaTitle}><h3>{truncatorheader(item.IdeaTitle)}</h3></a>
                                <div className={styles.carddetails} dangerouslySetInnerHTML={createMarkup(truncator(item.IdeaDescription))} />
                                <div className={styles.phaseinfo}>{item.Phase.Title}</div>
                                <div className={styles.creatorinfo}>Created by {item.Author.Title} on {formatDate(item.Created)}
                                  <span className={latestdisplay}>New <FontAwesomeIcon icon={faExclamation} className={styles.newicon} /></span>
                                </div>
                              </Col>}
                            </Row>
                          </Col>
                        );
                      }
                    ) : <Col xs={12} md={12} lg={12} className={styles.nulIdea}>No results</Col>
                    }
                  </Slider>
                </div>
                {/*                 <div>

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
      this.GetMyIdeas();
    });

  }


  public GetMyIdeas() {
    sp.web.lists.getByTitle("Ideas").items.top(4999).select("*, Phase/Title,Author/Title").expand("Phase, Author").filter("Phase/ID eq " + "8").orderBy("Created").get().then((item: any) => {
      this.setState({ AllTasks: item, TasksCount: item.length, filteredTask: item }, () => {
      });
    }).catch(err => {
      console.error("Error while getting Ideas - " + err);
    });
  }
}

