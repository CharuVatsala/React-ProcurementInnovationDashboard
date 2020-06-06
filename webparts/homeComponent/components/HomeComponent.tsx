import * as React from 'react';
import styles from './HomeComponent.module.scss';
import { IHomeComponentProps } from './IHomeComponentProps';
import { escape } from '@microsoft/sp-lodash-subset';

//These are the components references
import InitialLoad from '../../../Public/TS/PreLoader';
import Header from '../../../Public/TS/Header';
import { Container, Col, Row, Button } from 'react-bootstrap';
import * as jQuery from 'jquery';
import SVGFile from '../../../Public/SVGFile/SVG';
require('jquery');
require('Particleground');
import 'react-app-polyfill/ie11';
import { sp } from "@pnp/sp/presets/all";

function createMarkup(content) {
  return {
    __html: content
  };
}

export interface HomeStates {
  HomeDescription: any[];
}

export default class HomeComponent extends React.Component<IHomeComponentProps, HomeStates> {

  public constructor(props) {
    super(props);
    this.state = {
      HomeDescription: []
    };
  }

  public render(): React.ReactElement<IHomeComponentProps> {


    return (
      <React.Fragment>
        <InitialLoad />
        <Container id="homecomponent" className={styles.homeComponent + " nopadding"} fluid={true}>
          <Col xs={12} md={12} lg={12} id="firstsection" className={styles.introdiv + " firstSectionContents"}>
            <Row className={styles.positions}>
              <Header />
            </Row>
            <Row>
              <Col xs={12} md={12} lg={12} className={styles.bgcolor}>


                {
                  this.state.HomeDescription.map((item, key) => {
                    return (
                      <Row className={styles.intropageHead}>
                        <h2><span dangerouslySetInnerHTML={{ __html: item.PageTitle }}></span></h2>
                        <Row>
                          <Col xs={11} md={11} lg={11} className={styles.nopadding} dangerouslySetInnerHTML={{ __html: item.Description }}></Col>
                          <Col xs={1} md={1} lg={1}></Col>
                        </Row>
                      </Row>
                    );
                  })}

                <Row className={styles.btnalign}>

                  <Col xs={11} md={11} lg={11} className={styles.tright}><Button className={styles.btnContactteam} onClick={this.btnClicked}>Submit your Idea</Button></Col>
                </Row>
                <Row className={styles.processHead}>
                  <Col xs={12} md={12} lg={12} className={styles.processMargin}>
                    <h2>THE PROCESS</h2></Col><Col xs={8} md={8} lg={8} className={styles.processText}>
                    <Col xs={7} md={7} lg={7} className={styles.svImgFooter}>Once submitted, ideas will follow this progression.
                    Explore active ideas in the different phases by clicking the arrows.
                  </Col>
                  </Col>
                </Row>
                <Row>
                  <Col xs={11} md={11} lg={11} className={styles.svgcontainer}>

                    <React.Fragment>
                      <SVGFile />
                    </React.Fragment>
                  </Col>
                </Row>

                {
                  this.state.HomeDescription.map((item, key) => {
                    return (
                      <Row>
                        <Col xs={5} md={5} lg={5}></Col>
                        <Col xs={5} md={5} lg={5} className={styles.footerText}>
                          <span>{item.Quote}</span>
                        </Col>
                        <Row>
                          <Col xs={12} md={12} lg={12} className={styles.footerName}>
                            <span>{item.Writer}</span>
                          </Col>
                        </Row>
                      </Row>);
                  })}

              </Col>
            </Row>
          </Col>
        </Container>
      </React.Fragment>
    );
  }

  public componentDidMount() {

    sp.web.lists.getByTitle("Descriptions").items.filter("Title eq 'Home'").get().then((item: any) => {
      this.setState({
        HomeDescription: item
      });
    }).catch(e => {
      console.error(`Error while getting Idea fields - ${e}`);
    }).then(() => {
      setTimeout(() => {
        $("#loadingStars").hide();
      }, 2000);
    });

    var versionofIE = this.detectIE();
    //Check if browser is IE or not, if browser is not IE then method will return false other wise version number
    if (versionofIE == false) {
      ($('#homecomponent') as any).particleground({
        dotColor: '#FFFFFF',
        lineColor: '#FFFFFF',
        parallax: false,
        density: 12000,
        lineWidth: 0.5,
        particleRadius: 3
      });
    }


  }


  public detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    /* var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }*/
    // other browser
    return false;
  }


  public btnClicked = () => {
    let siteFullURL = window.location.href;
    let sitePagesURL = siteFullURL.substring(0, siteFullURL.lastIndexOf('/'));
    window.open(sitePagesURL + '/SubmitIdea.aspx', "_self");
  }
}
