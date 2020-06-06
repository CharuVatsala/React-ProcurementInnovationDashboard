import * as React from 'react';
import styles from './SubmitIdea.module.scss';
import { ISubmitIdeaProps } from './ISubmitIdeaProps';
import { escape } from '@microsoft/sp-lodash-subset';

//These are the components references
import InitialLoad from '../../../Public/TS/PreLoader';
import Header from '../../../Public/TS/Header';
import { Container, Col, Row, Button } from 'react-bootstrap';
import * as $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { sp } from "@pnp/sp/presets/all";
import "../../../Public/CSS/PILContent.css";
import { IItemAddResult } from "@pnp/sp/items";
import ReactTooltip from 'react-tooltip';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { _SiteUser } from '@pnp/sp/site-users/types';

function createMarkup(content) {
  return {
    __html: content
  };
}

//getting data
export interface IdeaStates {
  influencers: any[];
  AllFieldNames: any[];
  IdeaTitle: string;
  IdeaDescription: string;
  BusinessDrivers: string;
  QuantitativeValue: string;
  BrandValue: string;
  ConstituentValue: string;
  PrioritizationDescription: string;
  ImpactDescription: string;
  CurrentUserEmailID: string;
  CurrentUserName: string;
}

let siteFullURL = window.location.href;
let siteRelURL = siteFullURL.substring(0, siteFullURL.toLowerCase().lastIndexOf('/sitepages/'));
let arrFieldNames: any[] = [];


export default class SubmitIdea extends React.Component<ISubmitIdeaProps, IdeaStates> {

  public constructor(props) {
    super(props);
    this.state = {
      influencers: [],
      AllFieldNames: [],
      IdeaTitle: "",
      IdeaDescription: "",
      BusinessDrivers: "",
      QuantitativeValue: "",
      BrandValue: "",
      ConstituentValue: "",
      PrioritizationDescription: "",
      ImpactDescription: "",
      CurrentUserEmailID: "",
      CurrentUserName: ""
    };
  }

  public render(): React.ReactElement<ISubmitIdeaProps> {
    this.state.AllFieldNames.map((item, key) => {
      let fieldID = "txt" + item.Title.toLowerCase().replace(" ", "");
      arrFieldNames.push([item.ID, item.Title, item.FieldDescription, fieldID]);
    });

    if (arrFieldNames.length > 0) {
      return (
        <React.Fragment >
          <InitialLoad />
          <ReactTooltip place="right" />
          <Container className={styles.SubmitIdea + " nopadding"} fluid={true}>
            <Col xs={12} md={12} lg={12} id="firstsection" className={styles.introdiv + " firstSectionContents"}>
              <Row className={styles.positions}>
                <Header />
              </Row>
              <Col xs={12} md={12} lg={12} id="IdeaSection" className={styles.ideasection}>
                <Row className={styles.PageHeader}>
                  <h2>Submit Idea</h2>
                </Row>
                <fieldset className="infocontainer"><legend className="legend">IDEATOR</legend>
                  <Row>
                    <Col xs={6} md={6} lg={6}>
                      <Col xs={12} md={12} lg={12}><label>Name</label></Col>
                      <Col xs={12} md={12} lg={12}><input value={this.state.CurrentUserName} disabled={true} /></Col>
                    </Col>
                    <Col xs={6} md={6} lg={6}>
                      <Col xs={12} md={12} lg={12}><label>E-Mail</label></Col>
                      <Col xs={12} md={12} lg={12}><input value={this.state.CurrentUserEmailID} disabled={true} /></Col>
                    </Col>
                  </Row>
                </fieldset>
                <fieldset><legend className="legend">OVERVIEW</legend>
                  <Row>
                    <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                      <Col xs={12} md={12} lg={12}>{arrFieldNames[0][1]}{/* <label data-tip={arrFieldNames[0][2]}><img data-tip={arrFieldNames[0][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                      <Col xs={12} md={12} lg={12}><input id={arrFieldNames[0][3]} placeholder={arrFieldNames[0][2]}/></Col>
                    </Col>
                    <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                      <Col xs={12} md={12} lg={12}>{arrFieldNames[1][1]}{/* <label data-tip={arrFieldNames[1][2]}><img data-tip={arrFieldNames[1][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                      <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[1][3]} className={styles.textarea} placeholder={arrFieldNames[1][2]}></textarea></Col>
                    </Col>
                    <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                      <Col xs={12} md={12} lg={12}>{arrFieldNames[2][1]}{/* <label data-tip={arrFieldNames[2][2]}><img data-tip={arrFieldNames[2][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                      <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[2][3]} className={styles.textarea} placeholder={arrFieldNames[2][2]}></textarea></Col>
                    </Col>
                  {/*   <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                      <Col xs={12} md={12} lg={12}><label data-tip={arrFieldNames[3][2]}>{arrFieldNames[3][1]}<img data-tip={arrFieldNames[3][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label></Col>
                    </Col>
                    <Col xs={12} md={12} lg={12}>
                      <Col xs={12} md={12} lg={12}><input id={"chk" + arrFieldNames[4][3]} type='checkbox' value={arrFieldNames[4][1]} data-tip={arrFieldNames[4][2]} onClick={() => this.hideDisplayTextarea(arrFieldNames[4][3])} /><label data-tip={arrFieldNames[4][2]}>{arrFieldNames[4][1]}<img data-tip={arrFieldNames[4][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label></Col>
                      <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[4][3]} className={styles.hidden + " " + styles.textarea} ></textarea></Col>
                    </Col>
                    <Col xs={12} md={12} lg={12}>
                      <Col xs={12} md={12} lg={12}><input id={"chk" + arrFieldNames[5][3]} type='checkbox' value={arrFieldNames[5][1]} data-tip={arrFieldNames[5][2]} onClick={() => this.hideDisplayTextarea(arrFieldNames[5][3])} /><label data-tip={arrFieldNames[5][2]}>{arrFieldNames[5][1]}<img data-tip={arrFieldNames[5][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label></Col>
                      <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[5][3]} className={styles.hidden + " " + styles.textarea}></textarea></Col>
                    </Col>
                    <Col xs={12} md={12} lg={12}>
                      <Col xs={12} md={12} lg={12}><input id={"chk" + arrFieldNames[6][3]} type='checkbox' value={arrFieldNames[6][1]} data-tip={arrFieldNames[6][2]} onClick={() => this.hideDisplayTextarea(arrFieldNames[6][3])} /><label data-tip={arrFieldNames[6][2]}>{arrFieldNames[6][1]}<img data-tip={arrFieldNames[6][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label></Col>
                      <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[6][3]} className={styles.hidden + " " + styles.textarea}></textarea></Col>
                    </Col> */}
                    {/* <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                      <Col xs={12} md={12} lg={12}><label data-tip={arrFieldNames[7][2]}>{arrFieldNames[7][1]}<img data-tip={arrFieldNames[7][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label></Col>
                      <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[7][3]} className={styles.textarea}></textarea></Col>
                    </Col> */}
                  {/*   <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                      <Col xs={12} md={12} lg={12}><label data-tip={arrFieldNames[7][2]}>{arrFieldNames[7][1]}<img data-tip={arrFieldNames[7][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label></Col>
                      <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[7][3]} className={styles.textarea}></textarea></Col>
                    </Col>
                    <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                      <Col xs={12} md={12} lg={12}><label data-tip={arrFieldNames[8][2]}>{arrFieldNames[8][1]}<img data-tip={arrFieldNames[8][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label></Col>
                      <Col xs={9} md={9} lg={9}>
                        <PeoplePicker
                          context={this.props.context}
                          titleText=""
                          personSelectionLimit={3}
                          groupName={""} // Leave this blank in case you want to filter from all users    
                          showtooltip={false}
                          isRequired={false}
                          disabled={false}
                          ensureUser={true}
                          selectedItems={this._getPeoplePickerItems.bind(this)}
                          showHiddenInUI={false}
                          principalTypes={[PrincipalType.User]}
                          resolveDelay={500}
                        />
                      </Col>
                    </Col> */}
                  </Row>
                </fieldset>
                <Row>
                  <Col xs={12} md={12} lg={12} className={styles.alignright}>
                    <fieldset >
                      <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                        <button type="button" className={styles.btnSubmit + " btn btn-primary"} onClick={this.submitIdea} data-toggle="modal" data-target="#myModal">Submit</button>
                        <button type="button" className={styles.btnCancel + " btn btn-primary"} onClick={this.Cancel}>Cancel</button>
                      </Col>
                    </fieldset>
                  </Col>
                </Row>
              </Col>
            </Col>
          </Container> 
          <div id="myModal" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Successful</h4>
                </div>
                <div className="modal-body">
                  <p>Thank you for submitting your idea in the Procurement Innovation Lab. We will get back to you shortly.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btnclose" data-dismiss="modal" onClick={this.Cancel} >Close</button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment >
      );
    }
    else {
      return <React.Fragment>
        <Container className={styles.SubmitIdea + " nopadding"} fluid={true}>

        </Container>
      </React.Fragment>;
    }

  }
  private _getPeoplePickerItems(items: any[]) {
    localStorage.setItem('user', JSON.stringify(items));
    this.setState({
      influencers: items
    });
  }
  public hideDisplayTextarea(elementID) {
    let checkboxcheck = document.getElementById("chk" + elementID) as HTMLInputElement;
    let textarea;
    if (checkboxcheck.checked == true) {
      textarea = document.getElementById(elementID) as HTMLTextAreaElement;
      textarea.style.display = "block";
    }
    else {
      textarea = document.getElementById(elementID) as HTMLTextAreaElement;
      textarea.style.display = "none";
      textarea.value = "";
    }
  }

  public componentDidMount() {
    setTimeout(() => {
      $("#loadingStars").hide();
    }, 2000);

    sp.web.lists.getByTitle("Idea Submission Fields").items.get().then((item: any) => {
      this.setState({
        AllFieldNames: item
      });
    }).catch(e => {
      console.error(`Error while getting Idea fields - ${e}`);
    });

    sp.web.currentUser.get().then((item: any) => {
      this.setState({
        CurrentUserEmailID: item.Email,
        CurrentUserName: item.Title
      });
    }).catch(e => {
      console.error(`Error while getting user info - ${e}`);
    });
  }

  public submitIdea() {

    let ideaTitle;
    let ideaDescription;
    let businessDrivers;
 /*    let QuantativeValue;
    let BrandValue;
    let ConstituentValue;
    let PriortisationDesc;
    let ImpactDesc; */
    if (document.getElementById(arrFieldNames[0][3]) != null)
      ideaTitle = document.getElementById(arrFieldNames[0][3]) as HTMLInputElement;
    if (document.getElementById(arrFieldNames[1][3]) != null)
      ideaDescription = document.getElementById(arrFieldNames[1][3]) as HTMLTextAreaElement;
    if (document.getElementById(arrFieldNames[2][3]) != null)
      businessDrivers = document.getElementById(arrFieldNames[2][3]) as HTMLTextAreaElement;
  /*   if (document.getElementById(arrFieldNames[4][3]) != null)
      QuantativeValue = document.getElementById(arrFieldNames[4][3]) as HTMLTextAreaElement;
    if (document.getElementById(arrFieldNames[5][3]) != null)
      BrandValue = document.getElementById(arrFieldNames[5][3]) as HTMLTextAreaElement;
    if (document.getElementById(arrFieldNames[6][3]) != null)
      ConstituentValue = document.getElementById(arrFieldNames[6][3]) as HTMLTextAreaElement;
    if (document.getElementById(arrFieldNames[7][3]) != null)
      PriortisationDesc = document.getElementById(arrFieldNames[7][3]) as HTMLTextAreaElement;

    let peoplepicarray: number[] = [];
    let userID1 = 0;
    let userID2 = 0;
    let userID3 = 0;
    if (localStorage.getItem('user') != "" && localStorage.getItem('user') != null) {
      var user = JSON.parse(localStorage.getItem('user'));
      if (user.length == 1) {
        userID1 = user[0]["id"] as number;
      }
      else if (user.length == 2) {
        userID1 = user[0]["id"] as number;
        userID2 = user[1]["id"] as number;

      }
      else if (user.length == 3) {
        userID1 = user[0]["id"] as number;
        userID2 = user[1]["id"] as number;
        userID3 = user[2]["id"] as number;
      } */
      
      const IItemAddResults = sp.web.lists.getByTitle("Ideas").items.add({
        "IdeaTitle": ideaTitle.value,
        "IdeaDescription": ideaDescription.value,
        "BusinessDrivers": businessDrivers.value,
      /*   "QuantitativeValue": QuantativeValue.value,
        "BrandValue": BrandValue.value,
        "ConstituentValue": ConstituentValue.value,
        "PrioritizationDescription": PriortisationDesc.value,
        "InfluencersId": {
          "results": [userID1, userID2, userID3]
        }, */
        "PhaseId": 1

      }).then(
        result => {
          console.log(result);
        }).catch(
          Error => {
            console.log(Error);
          });
    /*   localStorage.setItem('user', ""); */
    
  }
  /*   else {
      const IItemAddResults = sp.web.lists.getByTitle("Ideas").items.add({
        "IdeaTitle": ideaTitle.value,
        "IdeaDescription": ideaDescription.value,
        "BusinessDrivers": businessDrivers.value,
        "QuantitativeValue": QuantativeValue.value,
        "BrandValue": BrandValue.value,
        "ConstituentValue": ConstituentValue.value,
        "PrioritizationDescription": PriortisationDesc.value,
        "PhaseId": 1
      }).then(
        result => {
          console.log(result);
        }).catch(
          Error => {
            console.log(Error);
          });
      localStorage.setItem('user', "");
    }
  } */

  public Cancel() {
    window.open(siteRelURL + '/SitePages/Home.aspx', "_self");
  }
}