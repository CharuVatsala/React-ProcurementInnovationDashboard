import * as React from 'react';
import styles from './EditIdeaComponent.module.scss';
import { IEditIdeaComponentProps } from './IEditIdeaComponentProps';
import { escape } from '@microsoft/sp-lodash-subset';

//These are the components references
import InitialLoad from '../../../Public/TS/PreLoader';
import Header from '../../../Public/TS/Header';
import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import * as $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { sp } from "@pnp/sp/presets/all";
import "../../../Public/CSS/PILContent.css";
import { IItemAddResult } from "@pnp/sp/items";
import ReactTooltip from 'react-tooltip';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { _SiteUser } from '@pnp/sp/site-users/types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faArrowCircleLeft, faBan, faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons";
import NumericInput from 'react-numeric-input';
import { InputGroupCheckbox } from 'react-bootstrap/InputGroup';

function createMarkup(content) {
  return {
    __html: content
  };
}

//getting data
export interface IdeaStates {
  DocType: number;
  influencers: any[];
  AllFieldNames: any[];
  AllIdeaStatus: any[];
  AllPhases: any[];
  AllDocuments: any[];
  IdeaTitle: string;
  IdeaDescription: string;
  BusinessDrivers: string;
  QuantitativeValue: string;
  BrandValue: string;
  ConstituentValue: string;
  PrioritizationDescription: string;
  ImpactDescription: string;
  IdeatorUserEmailID: string;
  IdeatorUserName: string;
  phaseIdFromList: number;
  Impact: any[];
  Effort: any[];
  Pause: any[];
  Summary: string;
  MakeBuy: string;
  HLCostSummary: string;
  TechFeasibility: string;
  ProjectDuration: string;
  EstimatedCost: string;
  Approach: string;
  Wireframe: string;
  TechnicalSpecifications: string;
  Stakeholders: string;
  Test: string;
  Pros: string;
  Cons: string;
  Result: string;
  InfluencerNtw: string;
  CurrentUser: string;
  SPUser: any[];
  CurrentUserName: any[];
  CurrentUserEmailID: string;
  AllInfluencers: any[];
  AllAdmins: any[];
  toDelete: any[];
  IsPaused: boolean;
}
/* var CostResource = document.getElementById("cost-res") as HTMLFieldSetElement; */
let siteFullURL = window.location.href;
let sitePagesURL = siteFullURL.substring(0, siteFullURL.lastIndexOf('/'));
let siteRelURL = siteFullURL.substring(0, siteFullURL.toLowerCase().lastIndexOf('/sitepages/'));
let arrFieldNames: any[] = [];
let delFileName: any[] = [];
let delarrOptions: any[] = [];
let navUrl = "";

export default class EditIdeaComponent extends React.Component<IEditIdeaComponentProps, IdeaStates> {
  /*public IdeaID = this.getParameterByName("iid", siteFullURL);
  public strPhaseID = this.getParameterByName("pid", siteFullURL);
   public strBackPage = this.getParameterByName("p", siteFullURL);
      public IdeaID = localStorage.getItem('ideaId');
     public strPhaseID = localStorage.getItem('phaseId');
     public strBackPage = localStorage.getItem('backpage'); */
  public isAdmin = false;
  public createdby = false;
  public flgAccess = 0;
  public InfluencerStringArray: string[] = [];

  public constructor(props) {
    super(props);
    this.state = {
      DocType: 0,
      influencers: [],
      AllFieldNames: [],
      AllIdeaStatus: [],
      AllPhases: [],
      AllDocuments: [],
      IdeaTitle: "",
      IdeaDescription: "",
      BusinessDrivers: "",
      QuantitativeValue: "",
      BrandValue: "",
      ConstituentValue: "",
      PrioritizationDescription: "",
      ImpactDescription: "",
      IdeatorUserEmailID: "",
      IdeatorUserName: "",
      phaseIdFromList: 0,
      Impact: [],
      Effort: [],
      Pause: [],
      Summary: "",
      MakeBuy: "",
      HLCostSummary: "",
      TechFeasibility: "",
      ProjectDuration: "",
      EstimatedCost: "",
      Approach: "",
      Wireframe: "",
      TechnicalSpecifications: "",
      Stakeholders: "",
      Test: "",
      Pros: "",
      Cons: "",
      Result: "",
      CurrentUser: "",
      SPUser: [],
      CurrentUserName: [],
      InfluencerNtw: "",
      CurrentUserEmailID: "",
      AllInfluencers: [],
      AllAdmins: [],
      toDelete: [],
      IsPaused: false
    };
  }

  public render(): React.ReactElement<IEditIdeaComponentProps> {
    let IdeaID = this.getParameterByName("iid", siteFullURL);
    let strPhaseID = this.getParameterByName("pid", siteFullURL);

    $(document).ready(() => {
      //show phase wise modules in form
      {
        var information = document.getElementById("0") as HTMLFieldSetElement;
        var details = document.getElementById("1") as HTMLFieldSetElement;
        var ideate = document.getElementById("2") as HTMLFieldSetElement;
        var evaluate = document.getElementById("3") as HTMLFieldSetElement;
        var accelerate = document.getElementById("4") as HTMLFieldSetElement;
        var poc = document.getElementById("5") as HTMLFieldSetElement;
        var implement = document.getElementById("6") as HTMLFieldSetElement;
        let leftsection = document.getElementById("leftsection") as HTMLFieldSetElement;

        if (information != null && details != null && ideate != null) {
          information.style.display = "block";
          details.style.display = "block";
          ideate.style.display = "block";
        }
        if (+strPhaseID == this.state.phaseIdFromList) {
          this.state.AllIdeaStatus.map((status, key) => {
            if (strPhaseID == "1" && evaluate != null && accelerate != null && poc != null && implement != null) {
              evaluate.style.display = "none";
              accelerate.style.display = "none";
              poc.style.display = "none";
              implement.style.display = "none";
            }
            if (strPhaseID == "2" && evaluate != null && accelerate != null && poc != null && implement != null) {
              evaluate.style.display = "block";
              accelerate.style.display = "none";
              poc.style.display = "none";
              implement.style.display = "none";
            }
            if (strPhaseID == "3" && evaluate != null && accelerate != null && poc != null && implement != null) {
              evaluate.style.display = "block";
              accelerate.style.display = "block";
              poc.style.display = "none";
              implement.style.display = "none";
            }
            if (strPhaseID == "4" && evaluate != null && accelerate != null && poc != null && implement != null) {
              evaluate.style.display = "block";
              accelerate.style.display = "block";
              poc.style.display = "block";
              implement.style.display = "none";

            }
            if (strPhaseID == "5" && evaluate != null && accelerate != null && poc != null && implement != null) {
              evaluate.style.display = "block";
              accelerate.style.display = "block";
              poc.style.display = "block";
              implement.style.display = "block";

            }
          });
        }
        else {
          if (leftsection != null && details != null && ideate != null && evaluate != null && accelerate != null && poc != null && implement != null) {
            details.style.display = "none";
            ideate.style.display = "none";
            evaluate.style.display = "none";
            accelerate.style.display = "none";
            poc.style.display = "none";
            implement.style.display = "none";
            leftsection.style.display = "none";
            /* breadcrumb.style.display = "none"; */
          }
        }

        if (this.state.IdeatorUserEmailID.length != 0) {
          if (this.state.CurrentUserEmailID.toLowerCase() === this.state.IdeatorUserEmailID.toLowerCase()) {
            this.flgAccess = 1;
          }
        }
        if (this.InfluencerStringArray.length == 0) {
          if (this.state.AllInfluencers != undefined && this.state.AllInfluencers.length > 0) {
            this.state.AllInfluencers.map((influencer) => {
              this.InfluencerStringArray.push(influencer.EMail.toString());
              if (this.state.CurrentUserEmailID.toLowerCase() === influencer.EMail.toLowerCase()) {
                this.flgAccess = 1;
              }
            });
          }
        }

        if (this.state.AllAdmins != undefined && this.state.AllAdmins.length > 0) {
          this.state.AllAdmins.map((admin) => {
            if (this.state.CurrentUserEmailID.toLowerCase() === admin.Email.toLowerCase()) {
              this.flgAccess = 1;
            }
          });
        }

        if (arrFieldNames.length > 0) {
          for (let inpts = 4; inpts <= 6; inpts++) {
            let elementID = "chk" + arrFieldNames[inpts][3].toLowerCase().replace(" ", "");
            let textarea;
            if (document.getElementById(elementID) != null) {
              document.getElementById(elementID).addEventListener("click", () => {
                let checkboxcheck = document.getElementById(elementID) as HTMLInputElement;
                if (checkboxcheck.checked == true) {
                  let inputIDTxt = arrFieldNames[inpts][3].toLowerCase().replace(" ", "");
                  textarea = document.getElementById(inputIDTxt) as HTMLTextAreaElement;
                  textarea.style.display = "block";
                }
                else {
                  let inputIDTxt = arrFieldNames[inpts][3].toLowerCase().replace(" ", "");
                  textarea = document.getElementById(inputIDTxt) as HTMLTextAreaElement;
                  textarea.style.display = "none";
                  textarea.value = "";
                }
              });
            }

            //these block of "if" is for display check in the checkboxes and hide the 
            if (this.state.QuantitativeValue != "" && this.state.QuantitativeValue != null && elementID == 'chktxtquantitativevalue') {
              if (document.getElementById(elementID) != null) {
                let checkboxcheck = document.getElementById(elementID) as HTMLInputElement;
                checkboxcheck.checked = true;
                let textareahide = document.getElementById('txtquantitativevalue') as HTMLTextAreaElement;
                textareahide.style.display = "block";
              }
            }
            else if (this.state.BrandValue != "" && this.state.BrandValue != null && elementID == 'chktxtbrandvalue') {
              if (document.getElementById(elementID) != null) {
                let checkboxcheck = document.getElementById(elementID) as HTMLInputElement;
                checkboxcheck.checked = true;
                let textareahide = document.getElementById('txtbrandvalue') as HTMLTextAreaElement;
                textareahide.style.display = "block";
              }
            }
            else if (this.state.ConstituentValue != "" && this.state.ConstituentValue != null && elementID == 'chktxtconstituentvalue') {
              if (document.getElementById(elementID) != null) {
                let checkboxcheck = document.getElementById(elementID) as HTMLInputElement;
                checkboxcheck.checked = true;
                let textareahide = document.getElementById('txtconstituentvalue') as HTMLTextAreaElement;
                textareahide.style.display = "block";
              }
            }
          }
          //show-hide file upload option
          if (this.state.AllDocuments.length > 0) {
            var impAssessment = document.getElementById("impactAssessment") as HTMLFieldSetElement;
            var CostResource = document.getElementById("cost-res") as HTMLFieldSetElement;
            var riskassessment = document.getElementById("riskAssess") as HTMLFieldSetElement;
            var WireframAttachment = document.getElementById("attachWirefram") as HTMLFieldSetElement;
            var techSpecAttachment = document.getElementById("attachtechspec") as HTMLFieldSetElement;
            var StakeholderAttachment = document.getElementById("attachstakeholder") as HTMLFieldSetElement;
            var Pros = document.getElementById("pro") as HTMLFieldSetElement;
            var ProsAttach = document.getElementById("proAttach") as HTMLFieldSetElement;
            var Cons = document.getElementById("con") as HTMLFieldSetElement;
            var ConsAttach = document.getElementById("conAttach") as HTMLFieldSetElement;
            var Outcomes = document.getElementById("outcome") as HTMLFieldSetElement;
            var SolutionDesing = document.getElementById("soldesign") as HTMLFieldSetElement;
            var AttachImpWireframe = document.getElementById("impWireframe") as HTMLFieldSetElement;
            var PrototypeAttach = document.getElementById("prototype") as HTMLFieldSetElement;
            var POCResult = document.getElementById("pocResults") as HTMLFieldSetElement;
            var TechSpec = document.getElementById("attachtechspecImplement") as HTMLFieldSetElement;
            if (impAssessment != null && CostResource != null && riskassessment != null && WireframAttachment != null && techSpecAttachment != null && StakeholderAttachment != null && Pros != null && ProsAttach != null && Cons != null && ConsAttach != null && Outcomes != null && SolutionDesing != null && AttachImpWireframe != null && PrototypeAttach != null && POCResult != null && TechSpec != null) {
              impAssessment.style.display = "block";
              CostResource.style.display = "block";
              riskassessment.style.display = "block";
              WireframAttachment.style.display = " block";
              techSpecAttachment.style.display = " block";
              StakeholderAttachment.style.display = " block";
              Pros.style.display = " block";
              ProsAttach.style.display = "none";
              Cons.style.display = " block";
              ConsAttach.style.display = "none";
              Outcomes.style.display = "block";
              SolutionDesing.style.display = "block";
              AttachImpWireframe.style.display = "block";
              PrototypeAttach.style.display = " block";
              POCResult.style.display = " block";
              TechSpec.style.display = " block";
            }
            for (var f = 0; f < this.state.AllDocuments.length; f++) {
              if (this.state.AllDocuments[f].DocumentTypeId == "1") {
                impAssessment.style.display = "none";
              }
              if (this.state.AllDocuments[f].DocumentTypeId == "2" && CostResource != null) {
                CostResource.style.display = "none";
              }
              if (this.state.AllDocuments[f].DocumentTypeId == "3") {
                riskassessment.style.display = "none";
              }
              if (this.state.AllDocuments[f].DocumentTypeId == "4") {
                WireframAttachment.style.display = "none";
              }
              if (this.state.AllDocuments[f].DocumentTypeId == "5") {
                techSpecAttachment.style.display = "none";
              }
              if (this.state.AllDocuments[f].DocumentTypeId == "6") {
                StakeholderAttachment.style.display = "none";
              }
              if (this.state.AllDocuments[f].DocumentTypeId == "7") {
                Pros.style.display = "none";
                ProsAttach.style.display = "block";
              }
              if (this.state.AllDocuments[f].DocumentTypeId == "8") {
                Cons.style.display = "none";
                ConsAttach.style.display = "block";
              }
              if (this.state.AllDocuments[f].DocumentTypeId == "9") {
                Outcomes.style.display = "none";
              }
              if (this.state.AllDocuments[f].DocumentTypeId == "10") {
                SolutionDesing.style.display = "none";
              }
              if (this.state.AllDocuments[f].DocumentTypeId == "11") {
                AttachImpWireframe.style.display = "none";
              }
              if (this.state.AllDocuments[f].DocumentTypeId == "12") {
                PrototypeAttach.style.display = "none";
              }
              if (this.state.AllDocuments[f].DocumentTypeId == "13") {
                POCResult.style.display = "none";
              }
              if (this.state.AllDocuments[f].DocumentTypeId == "14") {
                TechSpec.style.display = "none";
              }
            }

          }
        }
      }

    });
    this.state.AllFieldNames.map((item, key) => {
      let fieldID = "txt" + item.Title.toLowerCase().replace(/ /g, "");
      //This is the main array for dislay controls
      arrFieldNames.push([item.ID, item.Title, item.FieldDescription, fieldID]);
    });

    //changes as per Shaky's mail to remove tool-tip
    if (arrFieldNames.length > 0) {
      return (
        <React.Fragment>
          <InitialLoad />
          <ReactTooltip place="right" />
          {this.flgAccess == 1 ?
            <Container id="editFrom" className={styles.editIdeaComponent + " nopadding"} fluid={true}>
              <Col xs={12} md={12} lg={12} id="firstsection" className={styles.introdiv + " firstSectionContents"}>
                <Row className={styles.positions}>
                  <Header />
                </Row>
                <Col xs={12} md={12} lg={12} id="IdeaSection" className={styles.ideasection}>
                  <Row className={styles.PageHeader}>
                    <Col xs={3} md={3} lg={3}>
                      <h2>Update Idea</h2></Col>
                    <Col xs={8} md={8} lg={8} className={styles.alignright + " " + styles.smmargin}>
                      <button type="button" className={styles.btnSubmit + " btn btn-primary"} onClick={this.UpdateIdea} data-toggle="modal" data-target="#myModal">Update</button>
                      <button type="button" className={styles.btnCancel + " btn btn-primary"} onClick={this.Cancel}>Cancel</button>
                    </Col>
                  </Row>
                  <Row id="leftsection">
                    <Col xs={3} md={3} lg={3}>
                      <fieldset className="infocontainer"><legend className="legend">PROGRESS</legend>
                        <Row>
                          {this.state.AllIdeaStatus.map((status) => {
                            if ((+strPhaseID + 1) == +status.PhaseId) {
                              return (<Col xs={12} md={12} lg={12}>
                                <Col xs={12} md={12} lg={12} className={styles.statuscurrent}>{status.Title}
                                  <span className={styles.statuscheck}>
                                    <FontAwesomeIcon icon={faSquare}></FontAwesomeIcon>
                                  </span>
                                </Col>
                              </Col>);
                            }
                            else if ((+strPhaseID + 1) > +status.PhaseId) {
                              return (<Col xs={12} md={12} lg={12}>
                                <Col xs={12} md={12} lg={12} className={styles.statusdone}>{status.Title}
                                  <span className={styles.statuscheck}>
                                    <FontAwesomeIcon icon={faCheckSquare}></FontAwesomeIcon>
                                  </span>
                                </Col>
                              </Col>);
                            }
                            else if ((+strPhaseID + 1) < +status.PhaseId) {
                              return (<Col xs={12} md={12} lg={12}>
                                <Col xs={12} md={12} lg={12} className={styles.statusnotdone}>{status.Title}
                                  <span className={styles.statuscheck}>
                                    <FontAwesomeIcon icon={faSquare}></FontAwesomeIcon>
                                  </span>
                                </Col>
                              </Col>);
                            }
                          })
                          }

                        </Row>
                      </fieldset>
                    </Col>
                    <Col xs={9} md={9} lg={9}>
                      <fieldset id="0" className="infocontainer"><legend className="legend">IDEATOR</legend>
                        <Row>
                          <Col xs={6} md={6} lg={6}>
                            <Col xs={12} md={12} lg={12}><label>Name</label></Col>
                            <Col xs={12} md={12} lg={12}><input value={this.state.IdeatorUserName} disabled={true} /></Col>
                          </Col>
                          <Col xs={6} md={6} lg={6}>
                            <Col xs={12} md={12} lg={12}><label>E-Mail</label></Col>
                            <Col xs={12} md={12} lg={12}><input value={this.state.IdeatorUserEmailID} disabled={true} /></Col>
                          </Col>
                        </Row>
                      </fieldset>
                      <fieldset id="1"><legend className="legend">OVERVIEW</legend>
                        <Row>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[0][1]}<label data-tip={arrFieldNames[0][2]}><img data-tip={arrFieldNames[0][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label></Col>
                            <Col xs={12} md={12} lg={12}><input id={arrFieldNames[0][3]} defaultValue={this.state.IdeaTitle} />
                            </Col>
                          </Col>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[1][1]}<label data-tip={arrFieldNames[1][2]}><img data-tip={arrFieldNames[1][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label></Col>
                            <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[1][3]} className={styles.textarea}>{this.state.IdeaDescription}</textarea></Col>
                          </Col>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[2][1]}<label data-tip={arrFieldNames[2][2]}><img data-tip={arrFieldNames[2][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label></Col>
                            <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[2][3]} className={styles.textarea}>{this.state.BusinessDrivers}</textarea></Col>
                          </Col>

                          {/*   <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                                  <Col xs={12} md={12} lg={12}><label data-tip={arrFieldNames[7][2]}>{arrFieldNames[7][1]}<img data-tip={arrFieldNames[7][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label></Col>
                                  <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[7][3]} className={styles.textarea}>{this.state.PrioritizationDescription}</textarea></Col>
                                </Col> */}

                        </Row>
                      </fieldset>
                      <fieldset id="2" className="infocontainer"><legend className="legend">PHASE - IDEATE</legend>
                        <Row>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[3][1]}<label data-tip={arrFieldNames[3][2]}><img data-tip={arrFieldNames[3][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label></Col>
                          </Col>
                          <Col xs={12} md={12} lg={12}>
                            <Col xs={12} md={12} lg={12}><input id={"chk" + arrFieldNames[4][3]} type='checkbox' value={arrFieldNames[4][1]} /* data-tip={arrFieldNames[4][2]}  */ />{arrFieldNames[4][1]}<label data-tip={arrFieldNames[4][2]}><img data-tip={arrFieldNames[4][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label></Col>
                            <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[4][3]} className={styles.hidden + " " + styles.textarea} >{this.state.QuantitativeValue}</textarea></Col>
                          </Col>
                          <Col xs={12} md={12} lg={12}>
                            <Col xs={12} md={12} lg={12}><input id={"chk" + arrFieldNames[5][3]} type='checkbox' value={arrFieldNames[5][1]} /* data-tip={arrFieldNames[5][2]}  */ />{arrFieldNames[5][1]}<label data-tip={arrFieldNames[5][2]}><img data-tip={arrFieldNames[5][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label></Col>
                            <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[5][3]} className={styles.hidden + " " + styles.textarea}>{this.state.BrandValue}</textarea></Col>
                          </Col>
                          <Col xs={12} md={12} lg={12}>
                            <Col xs={12} md={12} lg={12}><input id={"chk" + arrFieldNames[6][3]} type='checkbox' value={arrFieldNames[6][1]} />{arrFieldNames[6][1]}<label data-tip={arrFieldNames[6][2]}><img data-tip={arrFieldNames[6][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label></Col>
                            <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[6][3]} className={styles.hidden + " " + styles.textarea}>{this.state.ConstituentValue}</textarea></Col>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[9][1]}{/* <label data-tip={arrFieldNames[9][2]}><img data-tip={arrFieldNames[9][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[9][3]} className={styles.textarea}>{this.state.ImpactDescription}</textarea></Col>
                          </Col>
                        </Row>
                        <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                          <Row>
                            <Col xs={3} md={3} lg={3}>
                              <Col xs={12} md={12} lg={12} className={styles.nopadding}>{arrFieldNames[11][1]}
                                {/*  <label data-tip={arrFieldNames[11][2]}><img data-tip={arrFieldNames[11][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}
                              </Col>
                              <Col xs={12} md={12} lg={12} className={styles.nopadding}>
                                {<select id={arrFieldNames[11][3]}>
                                  <option defaultValue={this.state.Impact}>{this.state.Impact}</option>
                                  <option defaultValue={this.state.Impact}>1</option>
                                  <option defaultValue={this.state.Impact}>2</option>
                                  <option defaultValue={this.state.Impact}>3</option>
                                  <option defaultValue={this.state.Impact}>4</option>
                                  <option defaultValue={this.state.Impact}>5</option>
                                  <option defaultValue={this.state.Impact}>6</option>
                                  <option defaultValue={this.state.Impact}>7</option>
                                  <option defaultValue={this.state.Impact}>8</option>
                                  <option defaultValue={this.state.Impact}>9</option>
                                  <option defaultValue={this.state.Impact}>10</option>
                                </select>}
                              </Col>
                            </Col>
                            <Col xs={3} md={3} lg={3}>
                              <Col xs={12} md={12} lg={12} className={styles.nopadding}>{arrFieldNames[12][1]}
                                {/* <label data-tip={arrFieldNames[12][2]}><img data-tip={arrFieldNames[12][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}
                              </Col>
                              <Col xs={12} md={12} lg={12} className={styles.nopadding}>
                                {<select id={arrFieldNames[12][3]}>
                                  <option defaultValue={this.state.Effort}>{this.state.Effort}</option>
                                  <option defaultValue={this.state.Effort}>1</option>
                                  <option defaultValue={this.state.Effort}>2</option>
                                  <option defaultValue={this.state.Effort}>3</option>
                                  <option defaultValue={this.state.Effort}>4</option>
                                  <option defaultValue={this.state.Effort}>5</option>
                                  <option defaultValue={this.state.Effort}>6</option>
                                  <option defaultValue={this.state.Effort}>7</option>
                                  <option defaultValue={this.state.Effort}>8</option>
                                  <option defaultValue={this.state.Effort}>9</option>
                                  <option defaultValue={this.state.Effort}>10</option>
                                </select>}
                              </Col>
                            </Col>
                            <Col xs={3} md={3} lg={3}>
                              <Col xs={12} md={12} lg={12}>{arrFieldNames[10][1]}{/* <label data-tip={arrFieldNames[10][2]}><img data-tip={arrFieldNames[10][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                              <Col xs={12} md={12} lg={12}><select id={arrFieldNames[10][3]} >
                                {this.state.AllPhases.map((phase) => {
                                  if (phase.ID == this.state.phaseIdFromList) {
                                    return <option value={phase.ID} selected>{phase.Title}</option>;
                                  }
                                  {
                                    return <option value={phase.ID}>{phase.Title}</option>;
                                  }
                                })
                                }
                              </select></Col>
                            </Col>
                            <Col xs={3} md={3} lg={3}>
                              <Col xs={12} md={12} lg={12} className={styles.nopadding}>{arrFieldNames[43][1]}</Col>
                              <Col xs={12} md={12} lg={12} className={styles.nopadding}>
                                {<select id={arrFieldNames[43][3]}>
                                  <option defaultValue={this.state.Pause}>{this.state.Pause}</option>
                                  <option defaultValue={this.state.Pause}>Yes</option>
                                  <option defaultValue={this.state.Pause}>No</option>
                                </select>}
                              </Col>
                              {/* <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Pause" onClick={(e) => { this.IsPaused(e); }} />
                              </Form.Group> */}
                            </Col>
                          </Row>
                        </Col>
                        <Row className={styles.infy}>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[8][1]}{/* <label data-tip={arrFieldNames[8][2]}><img data-tip={arrFieldNames[8][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Col xs={10} md={10} lg={10}>
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
                                defaultSelectedUsers={this.InfluencerStringArray}
                              />
                            </Col>
                          </Col>
                        </Row>
                      </fieldset>
                      <fieldset id="3" className="infocontainer"><legend className="legend">PHASE - EVALUATE</legend>
                        <Row>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[13][1]}{/* <label data-tip={arrFieldNames[13][2]}><img data-tip={arrFieldNames[13][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[13][3]} className={styles.textarea}>{this.state.Summary}</textarea></Col>
                          </Col>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[14][1]}{/* <label data-tip={arrFieldNames[14][2]}><img data-tip={arrFieldNames[14][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[14][3]} className={styles.textarea}>{this.state.MakeBuy}</textarea></Col>
                          </Col>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[15][1]}{/* <label data-tip={arrFieldNames[15][2]}><img data-tip={arrFieldNames[15][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[15][3]} className={styles.textarea}>{this.state.HLCostSummary}</textarea></Col>
                          </Col>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[16][1]}{/* <label data-tip={arrFieldNames[16][2]}><img data-tip={arrFieldNames[16][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[16][3]} className={styles.textarea}>{this.state.TechFeasibility}</textarea></Col>
                          </Col>
                          <Col xs={6} md={6} lg={6} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12} >{arrFieldNames[17][1]}
                              {/* <label data-tip={arrFieldNames[17][2]}><img data-tip={arrFieldNames[17][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}
                            </Col>
                            <Col xs={12} md={12} lg={12}>
                              <input id={arrFieldNames[17][3]}
                                onKeyPress={this.onlyNumberKey.bind(this)}
                                defaultValue={this.state.ProjectDuration} />
                              {/* <input name="Project Duration"
                                      id={arrFieldNames[17][3]}
                                      type="number"
                                      step="0.01"
                                      value={this.state.ProjectDuration}
                                      onKeyPress={this.onKeyPress.bind(this)}></input> */}
                              {/*  <Form.Group>
                                      <Form.Control type="number" placeholder="Enter project duration" onChange={this.CapacityhandleChange} 
                                      defaultvalue={this.state.ProjectDuration} />
                                    </Form.Group> */}

                              {/*    <NumericInput
                                      defaultvalue={this.state.ProjectDuration}
                                      onChange={this.CapacityhandleChange} 
                                      step={0.01}
                                      minValue={0}
                                      maxValue={9999999999}
                                    /> */}
                            </Col>

                          </Col>
                          <Col xs={6} md={6} lg={6} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[18][1]}
                              {/*  <label data-tip={arrFieldNames[18][2]}><img data-tip={arrFieldNames[18][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}
                            </Col>
                            <Col xs={12} md={12} lg={12}>
                              <input id={arrFieldNames[18][3]}
                                onKeyPress={this.onlyNumberKey.bind(this)}
                                defaultValue={this.state.EstimatedCost} />
                              {/*   <input name="Estimated Cost"
                                      id={arrFieldNames[18][3]}
                                      type="number"
                                      step="0.01"
                                      value={this.state.EstimatedCost}
                                      onKeyPress={this.onKeyPress.bind(this)}></input> */}
                            </Col>
                          </Col>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[19][1]}{/* <label data-tip={arrFieldNames[19][2]}><img data-tip={arrFieldNames[19][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Col id="impactAssessment" xs={6} md={6} lg={6}><input type="file" name="file" id={arrFieldNames[19][3]} /></Col>
                            <Col id="impactAssessmentFile" xs={5} md={5} lg={5} className={styles.smmargin}>
                              {this.state.AllDocuments.map((Docs) => {
                                for (var j = 0; j < this.state.AllDocuments.length; j++) {
                                  if (Docs.DocumentTypeId == "1") {
                                    var DocName = Docs.FileLeafRef;
                                    let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                                    let docFormat = DocName.toString().substring(DocName.toString().lastIndexOf('.') + 1);
                                    let imageURL = "";
                                    if (docFormat.toLowerCase() == "ppt" || docFormat.toLowerCase() == "pptx") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/MicrosoftPowerPoint.png";
                                    }
                                    else if (docFormat.toLowerCase() == "pdf") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/pdf%20icon.png";
                                    }
                                    else if (docFormat.toLowerCase() == "doc" || docFormat.toLowerCase() == "docx") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/word%20icon.png";
                                    }
                                    else if (docFormat.toLowerCase() == "xls" || docFormat.toLowerCase() == "xlsx" || docFormat.toLowerCase() == "csv" || docFormat.toLowerCase() == "xlsm") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/Microsoftexcel.png";
                                    }
                                    else {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/file.png";
                                    }
                                    let DocsLinkHTML = "";
                                    var DOcUrl = "/sites/ProcurementInnovationLab/Ideas%20Documents/" + Docs.FileLeafRef;
                                    var FileType = Docs.DocumentTypeId;


                                    let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + Docs.FileRef;
                                    DocsLinkHTML += "<img class='docicon' src='" + imageURL + "'/>";
                                    /*  displayDocName = Docs.Title;
                                     displayDocName = displayDocName.substring(displayDocName.lastIndexof("did") + 3, displayDocName.length); */
                                    displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                                    let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                                    DocsLinkHTML += displayDocNameWithoutExt;
                                    DocsLinkHTML += "<span class='fright'>";
                                    DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='" + siteRelURL + "/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png'/></a>";

                                    DocsLinkHTML += "</span>";

                                    return <div className={styles.fileDisplay}><div className='fright'><a id={Docs.DocumentTypeId} onClick={(e) => { this.storeDeleteFiles(FileType, DOcUrl); }}><img className='trashicon' src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Common/trash.svg'} /></a></div><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                                  }
                                }
                              })}
                            </Col>

                          </Col>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[20][1]}{/* <label data-tip={arrFieldNames[20][2]}><img data-tip={arrFieldNames[20][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Col id="cost-res" xs={6} md={6} lg={6}><input type="file" name="file" id={arrFieldNames[20][3]} /></Col>
                            <Col id="cost-resFile" xs={5} md={5} lg={5} className={styles.smmargin}>
                              {this.state.AllDocuments.map((Docs) => {
                                for (var j = 0; j < this.state.AllDocuments.length; j++) {
                                  if (Docs.DocumentTypeId == "2") {
                                    var DocName = Docs.FileLeafRef;
                                    let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                                    let docFormat = DocName.toString().substring(DocName.toString().lastIndexOf('.') + 1);
                                    let imageURL = "";
                                    if (docFormat.toLowerCase() == "ppt" || docFormat.toLowerCase() == "pptx") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/MicrosoftPowerPoint.png";
                                    }
                                    else if (docFormat.toLowerCase() == "pdf") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/pdf%20icon.png";
                                    }
                                    else if (docFormat.toLowerCase() == "doc" || docFormat.toLowerCase() == "docx") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/word%20icon.png";
                                    }
                                    else if (docFormat.toLowerCase() == "xls" || docFormat.toLowerCase() == "xlsx" || docFormat.toLowerCase() == "csv" || docFormat.toLowerCase() == "xlsm") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/Microsoftexcel.png";
                                    }
                                    else {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/file.png";
                                    }
                                    let DocsLinkHTML = "";
                                    var DOcUrl = "/sites/ProcurementInnovationLab/Ideas%20Documents/" + Docs.FileLeafRef;
                                    var FileType = Docs.DocumentTypeId;


                                    let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + Docs.FileRef;
                                    DocsLinkHTML += "<img class='docicon' src='" + imageURL + "'/>";
                                    /*  displayDocName = Docs.Title;
                                     displayDocName = displayDocName.substring(displayDocName.lastIndexof("did") + 3, displayDocName.length); */
                                    displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                                    let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                                    DocsLinkHTML += displayDocNameWithoutExt;
                                    DocsLinkHTML += "<span class='fright'>";
                                    DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='" + siteRelURL + "/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png'/></a>";

                                    DocsLinkHTML += "</span>";

                                    return <div className={styles.fileDisplay}><div className='fright'><a id={Docs.DocumentTypeId} onClick={(e) => { this.storeDeleteFiles(FileType, DOcUrl); }}><img className='trashicon' src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Common/trash.svg'} /></a></div><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                                  }
                                }
                              })}
                            </Col>

                          </Col>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[21][1]}{/* <label data-tip={arrFieldNames[21][2]}><img data-tip={arrFieldNames[21][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Col id="riskAssess" xs={6} md={6} lg={6}><input type="file" name="file" id={arrFieldNames[21][3]} /></Col>
                            <Col id="riskAssessFile" xs={5} md={5} lg={5} className={styles.smmargin}>
                              {this.state.AllDocuments.map((Docs) => {
                                for (var j = 0; j < this.state.AllDocuments.length; j++) {
                                  if (Docs.DocumentTypeId == "3") {
                                    var DocName = Docs.FileLeafRef;
                                    let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                                    let docFormat = DocName.toString().substring(DocName.toString().lastIndexOf('.') + 1);
                                    let imageURL = "";
                                    if (docFormat.toLowerCase() == "ppt" || docFormat.toLowerCase() == "pptx") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/MicrosoftPowerPoint.png";
                                    }
                                    else if (docFormat.toLowerCase() == "pdf") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/pdf%20icon.png";
                                    }
                                    else if (docFormat.toLowerCase() == "doc" || docFormat.toLowerCase() == "docx") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/word%20icon.png";
                                    }
                                    else if (docFormat.toLowerCase() == "xls" || docFormat.toLowerCase() == "xlsx" || docFormat.toLowerCase() == "csv" || docFormat.toLowerCase() == "xlsm") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/Microsoftexcel.png";
                                    }
                                    else {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/file.png";
                                    }
                                    let DocsLinkHTML = "";
                                    var DOcUrl = "/sites/ProcurementInnovationLab/Ideas%20Documents/" + Docs.FileLeafRef;
                                    var FileType = Docs.DocumentTypeId;


                                    let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + Docs.FileRef;
                                    DocsLinkHTML += "<img class='docicon' src='" + imageURL + "'/>";
                                    /*  displayDocName = Docs.Title;
                                     displayDocName = displayDocName.substring(displayDocName.lastIndexof("did") + 3, displayDocName.length); */
                                    displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                                    let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                                    DocsLinkHTML += displayDocNameWithoutExt;
                                    DocsLinkHTML += "<span class='fright'>";
                                    DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='" + siteRelURL + "/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png'/></a>";

                                    DocsLinkHTML += "</span>";

                                    return <div className={styles.fileDisplay}><div className='fright'><a id={Docs.DocumentTypeId} onClick={(e) => { this.storeDeleteFiles(FileType, DOcUrl); }}><img className='trashicon' src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Common/trash.svg'} /></a></div><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                                  }
                                }
                              })}
                            </Col>
                          </Col>
                        </Row>
                      </fieldset>
                      <fieldset id="4" className="infocontainer"><legend className="legend">PHASE - ACCELERATE</legend>
                        <Row>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[22][1]}{/* <label data-tip={arrFieldNames[22][2]}><img data-tip={arrFieldNames[22][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[22][3]} className={styles.textarea}>{this.state.Approach}</textarea></Col>
                          </Col>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[23][1]}{/* <label data-tip={arrFieldNames[23][2]}><img data-tip={arrFieldNames[23][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[23][3]} className={styles.textarea}>{this.state.Wireframe}</textarea></Col>
                          </Col>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[24][1]}{/* <label data-tip={arrFieldNames[24][2]}><img data-tip={arrFieldNames[24][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Col id="attachWirefram" xs={6} md={6} lg={6}><input type="file" name="file" id={arrFieldNames[24][3]} /></Col>
                            <Col id="attachWireframFile" xs={5} md={5} lg={5} className={styles.smmargin}>
                              {this.state.AllDocuments.map((Docs) => {
                                for (var j = 0; j < this.state.AllDocuments.length; j++) {
                                  if (Docs.DocumentTypeId == "4") {
                                    var DocName = Docs.FileLeafRef;
                                    let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                                    let docFormat = DocName.toString().substring(DocName.toString().lastIndexOf('.') + 1);
                                    let imageURL = "";
                                    if (docFormat.toLowerCase() == "ppt" || docFormat.toLowerCase() == "pptx") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/MicrosoftPowerPoint.png";
                                    }
                                    else if (docFormat.toLowerCase() == "pdf") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/pdf%20icon.png";
                                    }
                                    else if (docFormat.toLowerCase() == "doc" || docFormat.toLowerCase() == "docx") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/word%20icon.png";
                                    }
                                    else if (docFormat.toLowerCase() == "xls" || docFormat.toLowerCase() == "xlsx" || docFormat.toLowerCase() == "csv" || docFormat.toLowerCase() == "xlsm") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/Microsoftexcel.png";
                                    }
                                    else {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/file.png";
                                    }
                                    let DocsLinkHTML = "";
                                    var DOcUrl = "/sites/ProcurementInnovationLab/Ideas%20Documents/" + Docs.FileLeafRef;
                                    var FileType = Docs.DocumentTypeId;


                                    let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + Docs.FileRef;
                                    DocsLinkHTML += "<img class='docicon' src='" + imageURL + "'/>";
                                    /*  displayDocName = Docs.Title;
                                     displayDocName = displayDocName.substring(displayDocName.lastIndexof("did") + 3, displayDocName.length); */
                                    displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                                    let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                                    DocsLinkHTML += displayDocNameWithoutExt;
                                    DocsLinkHTML += "<span class='fright'>";
                                    DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='" + siteRelURL + "/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png'/></a>";

                                    DocsLinkHTML += "</span>";

                                    return <div className={styles.fileDisplay}><div className='fright'><a id={Docs.DocumentTypeId} onClick={(e) => { this.storeDeleteFiles(FileType, DOcUrl); }}><img className='trashicon' src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Common/trash.svg'} /></a></div><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                                  }
                                }
                              })}
                            </Col>

                          </Col>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[25][1]}{/* <label data-tip={arrFieldNames[25][2]}><img data-tip={arrFieldNames[25][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[25][3]} className={styles.textarea}>{this.state.TechnicalSpecifications}</textarea></Col>
                          </Col>

                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[26][1]}{/* <label data-tip={arrFieldNames[26][2]}><img data-tip={arrFieldNames[26][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Col id="attachtechspec" xs={6} md={6} lg={6}><input type="file" name="file" id={arrFieldNames[26][3]} /></Col>
                            <Col id="attachtechspecFile" xs={5} md={5} lg={5} className={styles.smmargin}>
                              {this.state.AllDocuments.map((Docs) => {
                                for (var j = 0; j < this.state.AllDocuments.length; j++) {
                                  if (Docs.DocumentTypeId == "5") {
                                    var DocName = Docs.FileLeafRef;
                                    let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                                    let docFormat = DocName.toString().substring(DocName.toString().lastIndexOf('.') + 1);
                                    let imageURL = "";
                                    if (docFormat.toLowerCase() == "ppt" || docFormat.toLowerCase() == "pptx") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/MicrosoftPowerPoint.png";
                                    }
                                    else if (docFormat.toLowerCase() == "pdf") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/pdf%20icon.png";
                                    }
                                    else if (docFormat.toLowerCase() == "doc" || docFormat.toLowerCase() == "docx") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/word%20icon.png";
                                    }
                                    else if (docFormat.toLowerCase() == "xls" || docFormat.toLowerCase() == "xlsx" || docFormat.toLowerCase() == "csv" || docFormat.toLowerCase() == "xlsm") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/Microsoftexcel.png";
                                    }
                                    else {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/file.png";
                                    }
                                    let DocsLinkHTML = "";
                                    var DOcUrl = "/sites/ProcurementInnovationLab/Ideas%20Documents/" + Docs.FileLeafRef;
                                    var FileType = Docs.DocumentTypeId;


                                    let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + Docs.FileRef;
                                    DocsLinkHTML += "<img class='docicon' src='" + imageURL + "'/>";
                                    /*  displayDocName = Docs.Title;
                                     displayDocName = displayDocName.substring(displayDocName.lastIndexof("did") + 3, displayDocName.length); */
                                    displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                                    let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                                    DocsLinkHTML += displayDocNameWithoutExt;
                                    DocsLinkHTML += "<span class='fright'>";
                                    DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='" + siteRelURL + "/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png'/></a>";

                                    DocsLinkHTML += "</span>";

                                    return <div className={styles.fileDisplay}><div className='fright'><a id={Docs.DocumentTypeId} onClick={(e) => { this.storeDeleteFiles(FileType, DOcUrl); }}><img className='trashicon' src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Common/trash.svg'} /></a></div><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                                  }
                                }
                              })}
                            </Col>

                          </Col>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[27][1]}{/* <label data-tip={arrFieldNames[27][2]}><img data-tip={arrFieldNames[27][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[27][3]} className={styles.textarea}>{this.state.Stakeholders}</textarea></Col>
                          </Col>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[28][1]}{/* <label data-tip={arrFieldNames[28][2]}><img data-tip={arrFieldNames[28][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Col id="attachstakeholder" xs={6} md={6} lg={6}><input type="file" name="file" id={arrFieldNames[28][3]} /></Col>
                            <Col id="attachstakeholderFile" xs={5} md={5} lg={5} className={styles.smmargin}>
                              {this.state.AllDocuments.map((Docs) => {
                                for (var j = 0; j < this.state.AllDocuments.length; j++) {
                                  if (Docs.DocumentTypeId == "6") {
                                    var DocName = Docs.FileLeafRef;
                                    let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                                    let docFormat = DocName.toString().substring(DocName.toString().lastIndexOf('.') + 1);
                                    let imageURL = "";
                                    if (docFormat.toLowerCase() == "ppt" || docFormat.toLowerCase() == "pptx") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/MicrosoftPowerPoint.png";
                                    }
                                    else if (docFormat.toLowerCase() == "pdf") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/pdf%20icon.png";
                                    }
                                    else if (docFormat.toLowerCase() == "doc" || docFormat.toLowerCase() == "docx") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/word%20icon.png";
                                    }
                                    else if (docFormat.toLowerCase() == "xls" || docFormat.toLowerCase() == "xlsx" || docFormat.toLowerCase() == "csv" || docFormat.toLowerCase() == "xlsm") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/Microsoftexcel.png";
                                    }
                                    else {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/file.png";
                                    }
                                    let DocsLinkHTML = "";
                                    var DOcUrl = "/sites/ProcurementInnovationLab/Ideas%20Documents/" + Docs.FileLeafRef;
                                    var FileType = Docs.DocumentTypeId;


                                    let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + Docs.FileRef;
                                    DocsLinkHTML += "<img class='docicon' src='" + imageURL + "'/>";
                                    /*  displayDocName = Docs.Title;
                                     displayDocName = displayDocName.substring(displayDocName.lastIndexof("did") + 3, displayDocName.length); */
                                    displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                                    let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                                    DocsLinkHTML += displayDocNameWithoutExt;
                                    DocsLinkHTML += "<span class='fright'>";
                                    DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='" + siteRelURL + "/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png'/></a>";

                                    DocsLinkHTML += "</span>";

                                    return <div className={styles.fileDisplay}><div className='fright'><a id={Docs.DocumentTypeId} onClick={(e) => { this.storeDeleteFiles(FileType, DOcUrl); }}><img className='trashicon' src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Common/trash.svg'} /></a></div><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                                  }
                                }
                              })}
                            </Col>

                          </Col>
                        </Row>
                      </fieldset>
                      <fieldset id="5" className="infocontainer"><legend className="legend">PHASE - PROOF OF CONCEPT</legend>
                        <Row>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[29][1]}{/* <label data-tip={arrFieldNames[29][2]}><img data-tip={arrFieldNames[29][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[29][3]} className={styles.textarea}>{this.state.Test}</textarea></Col>
                          </Col>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[30][1]}{/* <label data-tip={arrFieldNames[30][2]}><img data-tip={arrFieldNames[30][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Row className={styles.outcomesection}>
                              <Col xs={5} md={5} lg={5}>{arrFieldNames[31][1]}{/* <label data-tip={arrFieldNames[31][2]}><img data-tip={arrFieldNames[31][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                              <Col xs={5} md={5} lg={5}>{arrFieldNames[33][1]}{/* <label data-tip={arrFieldNames[33][2]}><img data-tip={arrFieldNames[33][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            </Row>
                            <Row className={styles.outcomesection}>
                              <Col xs={5} md={5} lg={5}><textarea id={arrFieldNames[31][3]} className={styles.textarea}>{this.state.Pros}</textarea></Col>
                              <Col xs={5} md={5} lg={5}><textarea id={arrFieldNames[33][3]} className={styles.textarea}>{this.state.Cons}</textarea></Col>
                            </Row>
                            <Row className={styles.outcomesection}>
                              <Col id="pro" xs={5} md={5} lg={5}><input type="file" className={styles.fileBox} name="file" id={arrFieldNames[32][3]} /></Col>
                              <Col id="proAttach" xs={5} md={5} lg={5} className={styles.smmargin}>
                                {this.state.AllDocuments.map((Docs) => {
                                  for (var j = 0; j < this.state.AllDocuments.length; j++) {
                                    if (Docs.DocumentTypeId == "7") {
                                      var DocName = Docs.FileLeafRef;
                                      let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                                      let docFormat = DocName.toString().substring(DocName.toString().lastIndexOf('.') + 1);
                                      let imageURL = "";
                                      if (docFormat.toLowerCase() == "ppt" || docFormat.toLowerCase() == "pptx") {
                                        imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/MicrosoftPowerPoint.png";
                                      }
                                      else if (docFormat.toLowerCase() == "pdf") {
                                        imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/pdf%20icon.png";
                                      }
                                      else if (docFormat.toLowerCase() == "doc" || docFormat.toLowerCase() == "docx") {
                                        imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/word%20icon.png";
                                      }
                                      else if (docFormat.toLowerCase() == "xls" || docFormat.toLowerCase() == "xlsx" || docFormat.toLowerCase() == "csv" || docFormat.toLowerCase() == "xlsm") {
                                        imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/Microsoftexcel.png";
                                      }
                                      else {
                                        imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/file.png";
                                      }
                                      let DocsLinkHTML = "";
                                      var DOcUrl = "/sites/ProcurementInnovationLab/Ideas%20Documents/" + Docs.FileLeafRef;
                                      var FileType = Docs.DocumentTypeId;


                                      let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + Docs.FileRef;
                                      DocsLinkHTML += "<img class='docicon' src='" + imageURL + "'/>";
                                      /*  displayDocName = Docs.Title;
                                       displayDocName = displayDocName.substring(displayDocName.lastIndexof("did") + 3, displayDocName.length); */
                                      displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                                      let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                                      DocsLinkHTML += displayDocNameWithoutExt;
                                      DocsLinkHTML += "<span class='fright'>";
                                      DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='" + siteRelURL + "/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png'/></a>";

                                      DocsLinkHTML += "</span>";

                                      return <div className={styles.fileDisplay}><div className='fright'><a id={Docs.DocumentTypeId} onClick={(e) => { this.storeDeleteFiles(FileType, DOcUrl); }}><img className='trashicon' src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Common/trash.svg'} /></a></div><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                                    }
                                  }
                                })}
                              </Col>

                              <Col id="con" xs={6} md={6} lg={6}><input type="file" className={styles.fileBox} name="file" id={arrFieldNames[34][3]} /></Col>
                              <Col id="conAttach" xs={5} md={5} lg={5} className={styles.smmargin}>
                                {this.state.AllDocuments.map((Docs) => {
                                  for (var j = 0; j < this.state.AllDocuments.length; j++) {
                                    if (Docs.DocumentTypeId == "8") {
                                      var DocName = Docs.FileLeafRef;
                                      let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                                      let docFormat = DocName.toString().substring(DocName.toString().lastIndexOf('.') + 1);
                                      let imageURL = "";
                                      if (docFormat.toLowerCase() == "ppt" || docFormat.toLowerCase() == "pptx") {
                                        imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/MicrosoftPowerPoint.png";
                                      }
                                      else if (docFormat.toLowerCase() == "pdf") {
                                        imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/pdf%20icon.png";
                                      }
                                      else if (docFormat.toLowerCase() == "doc" || docFormat.toLowerCase() == "docx") {
                                        imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/word%20icon.png";
                                      }
                                      else if (docFormat.toLowerCase() == "xls" || docFormat.toLowerCase() == "xlsx" || docFormat.toLowerCase() == "csv" || docFormat.toLowerCase() == "xlsm") {
                                        imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/Microsoftexcel.png";
                                      }
                                      else {
                                        imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/file.png";
                                      }
                                      let DocsLinkHTML = "";
                                      var DOcUrl = "/sites/ProcurementInnovationLab/Ideas%20Documents/" + Docs.FileLeafRef;
                                      var FileType = Docs.DocumentTypeId;


                                      let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + Docs.FileRef;
                                      DocsLinkHTML += "<img class='docicon' src='" + imageURL + "'/>";
                                      /*  displayDocName = Docs.Title;
                                       displayDocName = displayDocName.substring(displayDocName.lastIndexof("did") + 3, displayDocName.length); */
                                      displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                                      let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                                      DocsLinkHTML += displayDocNameWithoutExt;
                                      DocsLinkHTML += "<span class='fright'>";
                                      DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='" + siteRelURL + "/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png'/></a>";

                                      DocsLinkHTML += "</span>";

                                      return <div className={styles.fileDisplay}><div className='fright'><a id={Docs.DocumentTypeId} onClick={(e) => { this.storeDeleteFiles(FileType, DOcUrl); }}><img className='trashicon' src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Common/trash.svg'} /></a></div><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                                    }
                                  }
                                })}
                              </Col>

                            </Row>

                          </Col>

                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[35][1]}{/* <label data-tip={arrFieldNames[35][2]}><img data-tip={arrFieldNames[35][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[35][3]} className={styles.textarea}>{this.state.Result}</textarea></Col>
                            <Col id="outcome" xs={6} md={6} lg={6}><input type="file" className={styles.fileBox} name="file" id={arrFieldNames[36][3]} /></Col>
                            <Col id="outcomeFile" xs={5} md={5} lg={5} className={styles.smmargin}>
                              {this.state.AllDocuments.map((Docs) => {
                                for (var j = 0; j < this.state.AllDocuments.length; j++) {
                                  if (Docs.DocumentTypeId == "9") {
                                    var DocName = Docs.FileLeafRef;
                                    let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                                    let docFormat = DocName.toString().substring(DocName.toString().lastIndexOf('.') + 1);
                                    let imageURL = "";
                                    if (docFormat.toLowerCase() == "ppt" || docFormat.toLowerCase() == "pptx") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/MicrosoftPowerPoint.png";
                                    }
                                    else if (docFormat.toLowerCase() == "pdf") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/pdf%20icon.png";
                                    }
                                    else if (docFormat.toLowerCase() == "doc" || docFormat.toLowerCase() == "docx") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/word%20icon.png";
                                    }
                                    else if (docFormat.toLowerCase() == "xls" || docFormat.toLowerCase() == "xlsx" || docFormat.toLowerCase() == "csv" || docFormat.toLowerCase() == "xlsm") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/Microsoftexcel.png";
                                    }
                                    else {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/file.png";
                                    }
                                    let DocsLinkHTML = "";
                                    var DOcUrl = "/sites/ProcurementInnovationLab/Ideas%20Documents/" + Docs.FileLeafRef;
                                    var FileType = Docs.DocumentTypeId;


                                    let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + Docs.FileRef;
                                    DocsLinkHTML += "<img class='docicon' src='" + imageURL + "'/>";
                                    /*  displayDocName = Docs.Title;
                                     displayDocName = displayDocName.substring(displayDocName.lastIndexof("did") + 3, displayDocName.length); */
                                    displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                                    let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                                    DocsLinkHTML += displayDocNameWithoutExt;
                                    DocsLinkHTML += "<span class='fright'>";
                                    DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='" + siteRelURL + "/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png'/></a>";

                                    DocsLinkHTML += "</span>";

                                    return <div className={styles.fileDisplay}><div className='fright'><a id={Docs.DocumentTypeId} onClick={(e) => { this.storeDeleteFiles(FileType, DOcUrl); }}><img className='trashicon' src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Common/trash.svg'} /></a></div><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                                  }
                                }
                              })}
                            </Col>

                          </Col>
                        </Row>
                      </fieldset>
                      <fieldset id="6" className="infocontainer"><legend className="legend">PHASE - IMPLEMENT</legend>
                        <Row>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[37][1]}{/* <label data-tip={arrFieldNames[37][2]}><img data-tip={arrFieldNames[37][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Col xs={12} md={12} lg={12}><textarea id={arrFieldNames[37][3]} className={styles.textarea}>{this.state.InfluencerNtw}</textarea></Col>
                          </Col>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[38][1]}{/* <label data-tip={arrFieldNames[38][2]}><img data-tip={arrFieldNames[38][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Col id="soldesign" xs={6} md={6} lg={6}><input type="file" name="file" id={arrFieldNames[38][3]} /></Col>
                            <Col id="soldesignFile" xs={5} md={5} lg={5} className={styles.smmargin}>
                              {this.state.AllDocuments.map((Docs) => {
                                for (var j = 0; j < this.state.AllDocuments.length; j++) {
                                  if (Docs.DocumentTypeId == "10") {
                                    var DocName = Docs.FileLeafRef;
                                    let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                                    let docFormat = DocName.toString().substring(DocName.toString().lastIndexOf('.') + 1);
                                    let imageURL = "";
                                    if (docFormat.toLowerCase() == "ppt" || docFormat.toLowerCase() == "pptx") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/MicrosoftPowerPoint.png";
                                    }
                                    else if (docFormat.toLowerCase() == "pdf") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/pdf%20icon.png";
                                    }
                                    else if (docFormat.toLowerCase() == "doc" || docFormat.toLowerCase() == "docx") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/word%20icon.png";
                                    }
                                    else if (docFormat.toLowerCase() == "xls" || docFormat.toLowerCase() == "xlsx" || docFormat.toLowerCase() == "csv" || docFormat.toLowerCase() == "xlsm") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/Microsoftexcel.png";
                                    }
                                    else {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/file.png";
                                    }
                                    let DocsLinkHTML = "";
                                    var DOcUrl = "/sites/ProcurementInnovationLab/Ideas%20Documents/" + Docs.FileLeafRef;
                                    var FileType = Docs.DocumentTypeId;


                                    let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + Docs.FileRef;
                                    DocsLinkHTML += "<img class='docicon' src='" + imageURL + "'/>";
                                    /*  displayDocName = Docs.Title;
                                     displayDocName = displayDocName.substring(displayDocName.lastIndexof("did") + 3, displayDocName.length); */
                                    displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                                    let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                                    DocsLinkHTML += displayDocNameWithoutExt;
                                    DocsLinkHTML += "<span class='fright'>";
                                    DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='" + siteRelURL + "/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png'/></a>";

                                    DocsLinkHTML += "</span>";

                                    return <div className={styles.fileDisplay}><div className='fright'><a id={Docs.DocumentTypeId} onClick={(e) => { this.storeDeleteFiles(FileType, DOcUrl); }}><img className='trashicon' src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Common/trash.svg'} /></a></div><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                                  }
                                }
                              })}
                            </Col>

                          </Col>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[39][1]}{/* <label data-tip={arrFieldNames[39][2]}><img data-tip={arrFieldNames[39][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Col id="impWireframe" xs={6} md={6} lg={6}><input type="file" name="file" id={arrFieldNames[39][3]} /></Col>
                            <Col id="impWireframeFile" xs={5} md={5} lg={5} className={styles.smmargin}>
                              {this.state.AllDocuments.map((Docs) => {
                                for (var j = 0; j < this.state.AllDocuments.length; j++) {
                                  if (Docs.DocumentTypeId == "11") {
                                    var DocName = Docs.FileLeafRef;
                                    let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                                    let docFormat = DocName.toString().substring(DocName.toString().lastIndexOf('.') + 1);
                                    let imageURL = "";
                                    if (docFormat.toLowerCase() == "ppt" || docFormat.toLowerCase() == "pptx") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/MicrosoftPowerPoint.png";
                                    }
                                    else if (docFormat.toLowerCase() == "pdf") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/pdf%20icon.png";
                                    }
                                    else if (docFormat.toLowerCase() == "doc" || docFormat.toLowerCase() == "docx") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/word%20icon.png";
                                    }
                                    else if (docFormat.toLowerCase() == "xls" || docFormat.toLowerCase() == "xlsx" || docFormat.toLowerCase() == "csv" || docFormat.toLowerCase() == "xlsm") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/Microsoftexcel.png";
                                    }
                                    else {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/file.png";
                                    }
                                    let DocsLinkHTML = "";
                                    var DOcUrl = "/sites/ProcurementInnovationLab/Ideas%20Documents/" + Docs.FileLeafRef;
                                    var FileType = Docs.DocumentTypeId;


                                    let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + Docs.FileRef;
                                    DocsLinkHTML += "<img class='docicon' src='" + imageURL + "'/>";
                                    /*  displayDocName = Docs.Title;
                                     displayDocName = displayDocName.substring(displayDocName.lastIndexof("did") + 3, displayDocName.length); */
                                    displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                                    let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                                    DocsLinkHTML += displayDocNameWithoutExt;
                                    DocsLinkHTML += "<span class='fright'>";
                                    DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='" + siteRelURL + "/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png'/></a>";

                                    DocsLinkHTML += "</span>";

                                    return <div className={styles.fileDisplay}><div className='fright'><a id={Docs.DocumentTypeId} onClick={(e) => { this.storeDeleteFiles(FileType, DOcUrl); }}><img className='trashicon' src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Common/trash.svg'} /></a></div><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                                  }
                                }
                              })}
                            </Col>

                          </Col>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[40][1]}{/* <label data-tip={arrFieldNames[40][2]}><img data-tip={arrFieldNames[40][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Col id="prototype" xs={6} md={6} lg={6}><input type="file" name="file" id={arrFieldNames[40][3]} /></Col>
                            <Col id="prototypeFile" xs={5} md={5} lg={5} className={styles.smmargin}>
                              {this.state.AllDocuments.map((Docs) => {
                                for (var j = 0; j < this.state.AllDocuments.length; j++) {
                                  if (Docs.DocumentTypeId == "12") {
                                    var DocName = Docs.FileLeafRef;
                                    let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                                    let docFormat = DocName.toString().substring(DocName.toString().lastIndexOf('.') + 1);
                                    let imageURL = "";
                                    if (docFormat.toLowerCase() == "ppt" || docFormat.toLowerCase() == "pptx") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/MicrosoftPowerPoint.png";
                                    }
                                    else if (docFormat.toLowerCase() == "pdf") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/pdf%20icon.png";
                                    }
                                    else if (docFormat.toLowerCase() == "doc" || docFormat.toLowerCase() == "docx") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/word%20icon.png";
                                    }
                                    else if (docFormat.toLowerCase() == "xls" || docFormat.toLowerCase() == "xlsx" || docFormat.toLowerCase() == "csv" || docFormat.toLowerCase() == "xlsm") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/Microsoftexcel.png";
                                    }
                                    else {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/file.png";
                                    }
                                    let DocsLinkHTML = "";
                                    var DOcUrl = "/sites/ProcurementInnovationLab/Ideas%20Documents/" + Docs.FileLeafRef;
                                    var FileType = Docs.DocumentTypeId;


                                    let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + Docs.FileRef;
                                    DocsLinkHTML += "<img class='docicon' src='" + imageURL + "'/>";
                                    /*  displayDocName = Docs.Title;
                                     displayDocName = displayDocName.substring(displayDocName.lastIndexof("did") + 3, displayDocName.length); */
                                    displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                                    let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                                    DocsLinkHTML += displayDocNameWithoutExt;
                                    DocsLinkHTML += "<span class='fright'>";
                                    DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='" + siteRelURL + "/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png'/></a>";

                                    DocsLinkHTML += "</span>";

                                    return <div className={styles.fileDisplay}><div className='fright'><a id={Docs.DocumentTypeId} onClick={(e) => { this.storeDeleteFiles(FileType, DOcUrl); }}><img className='trashicon' src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Common/trash.svg'} /></a></div><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                                  }
                                }
                              })}
                            </Col>

                          </Col>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[41][1]}{/* <label data-tip={arrFieldNames[41][2]}><img data-tip={arrFieldNames[41][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Col id="pocResults" xs={6} md={6} lg={6}><input type="file" name="file" id={arrFieldNames[41][3]} /></Col>
                            <Col id="pocResultsFile" xs={5} md={5} lg={5} className={styles.smmargin}>
                              {this.state.AllDocuments.map((Docs) => {
                                for (var j = 0; j < this.state.AllDocuments.length; j++) {
                                  if (Docs.DocumentTypeId == "13") {
                                    var DocName = Docs.FileLeafRef;
                                    let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                                    let docFormat = DocName.toString().substring(DocName.toString().lastIndexOf('.') + 1);
                                    let imageURL = "";
                                    if (docFormat.toLowerCase() == "ppt" || docFormat.toLowerCase() == "pptx") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/MicrosoftPowerPoint.png";
                                    }
                                    else if (docFormat.toLowerCase() == "pdf") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/pdf%20icon.png";
                                    }
                                    else if (docFormat.toLowerCase() == "doc" || docFormat.toLowerCase() == "docx") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/word%20icon.png";
                                    }
                                    else if (docFormat.toLowerCase() == "xls" || docFormat.toLowerCase() == "xlsx" || docFormat.toLowerCase() == "csv" || docFormat.toLowerCase() == "xlsm") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/Microsoftexcel.png";
                                    }
                                    else {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/file.png";
                                    }
                                    let DocsLinkHTML = "";
                                    var DOcUrl = "/sites/ProcurementInnovationLab/Ideas%20Documents/" + Docs.FileLeafRef;
                                    var FileType = Docs.DocumentTypeId;


                                    let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + Docs.FileRef;
                                    DocsLinkHTML += "<img class='docicon' src='" + imageURL + "'/>";
                                    /*  displayDocName = Docs.Title;
                                     displayDocName = displayDocName.substring(displayDocName.lastIndexof("did") + 3, displayDocName.length); */
                                    displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                                    let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                                    DocsLinkHTML += displayDocNameWithoutExt;
                                    DocsLinkHTML += "<span class='fright'>";
                                    DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='" + siteRelURL + "/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png'/></a>";

                                    DocsLinkHTML += "</span>";

                                    return <div className={styles.fileDisplay}><div className='fright'><a id={Docs.DocumentTypeId} onClick={(e) => { this.storeDeleteFiles(FileType, DOcUrl); }}><img className='trashicon' src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Common/trash.svg'} /></a></div><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                                  }
                                }
                              })}
                            </Col>

                          </Col>
                          <Col xs={12} md={12} lg={12} className={styles.smmargin}>
                            <Col xs={12} md={12} lg={12}>{arrFieldNames[42][1]}{/* <label data-tip={arrFieldNames[42][2]}><img data-tip={arrFieldNames[42][2]} src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/info-circle-solid.svg?csf=1'} className={styles.imgsvg} /></label> */}</Col>
                            <Col id="attachtechspecImplement" xs={6} md={6} lg={6}><input type="file" name="file" id={arrFieldNames[42][3]} /></Col>
                            <Col id="attachtechspecImplementFile" xs={5} md={5} lg={5} className={styles.smmargin}>
                              {this.state.AllDocuments.map((Docs) => {
                                for (var j = 0; j < this.state.AllDocuments.length; j++) {
                                  if (Docs.DocumentTypeId == "14") {
                                    var DocName = Docs.FileLeafRef;
                                    let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                                    let docFormat = DocName.toString().substring(DocName.toString().lastIndexOf('.') + 1);
                                    let imageURL = "";
                                    if (docFormat.toLowerCase() == "ppt" || docFormat.toLowerCase() == "pptx") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/MicrosoftPowerPoint.png";
                                    }
                                    else if (docFormat.toLowerCase() == "pdf") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/pdf%20icon.png";
                                    }
                                    else if (docFormat.toLowerCase() == "doc" || docFormat.toLowerCase() == "docx") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/word%20icon.png";
                                    }
                                    else if (docFormat.toLowerCase() == "xls" || docFormat.toLowerCase() == "xlsx" || docFormat.toLowerCase() == "csv" || docFormat.toLowerCase() == "xlsm") {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/Microsoftexcel.png";
                                    }
                                    else {
                                      imageURL = "/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/file.png";
                                    }
                                    let DocsLinkHTML = "";
                                    var DOcUrl = "/sites/ProcurementInnovationLab/Ideas%20Documents/" + Docs.FileLeafRef;
                                    var FileType = Docs.DocumentTypeId;


                                    let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + Docs.FileRef;
                                    DocsLinkHTML += "<img class='docicon' src='" + imageURL + "'/>";
                                    /*  displayDocName = Docs.Title;
                                     displayDocName = displayDocName.substring(displayDocName.lastIndexof("did") + 3, displayDocName.length); */
                                    displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                                    let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                                    DocsLinkHTML += displayDocNameWithoutExt;
                                    DocsLinkHTML += "<span class='fright'>";
                                    DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='" + siteRelURL + "/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png'/></a>";

                                    DocsLinkHTML += "</span>";

                                    return <div className={styles.fileDisplay}><div className='fright'><a id={Docs.DocumentTypeId} onClick={(e) => { this.storeDeleteFiles(FileType, DOcUrl); }}><img className='trashicon' src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Common/trash.svg'} /></a></div><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                                  }
                                }
                              })}
                            </Col>

                          </Col>
                        </Row>

                      </fieldset>
                      <Row className={styles.rightForm}>
                        <Col xs={11} md={11} lg={11} className={styles.alignright + " " + styles.smmargin}>
                          <button type="button" className={styles.btnSubmit + " btn btn-primary"} onClick={this.UpdateIdea} data-toggle="modal" data-target="#myModal">Update</button>
                          <button type="button" className={styles.btnCancel + " btn btn-primary"} onClick={this.Cancel}>Cancel</button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Col>
            </Container> : <Container id="editFrom" className={styles.editIdeaComponent + " nopadding"} fluid={true}>
              <Col xs={12} md={12} lg={12} id="firstsection" className={styles.introdiv + " firstSectionContents"}>
                <Row className={styles.positions}>
                  <Header />
                </Row>
                <Col xs={12} md={12} lg={12} className={styles.noaccess}><span className={styles.noaccicon}>
                  <FontAwesomeIcon icon={faBan}></FontAwesomeIcon>
                </span> Access Denied! You do not have access to edit this idea.
                </Col>
              </Col>
            </Container>}
          <div id="myModal" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Successful</h4>
                </div>
                <div className="modal-body">
                  <p>Your idea has been updated successfully!</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btnclose" data-dismiss="modal" onClick={this.Redirect}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment >
      );
    }
    else {
      return <React.Fragment>
        <Container className={styles.editIdeaComponent + " nopadding"} fluid={true}>

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

  public componentDidMount() {
    let IdeaID = this.getParameterByName("iid", siteFullURL);
    let strPhaseID = this.getParameterByName("pid", siteFullURL);
    sp.web.currentUser
      .get()
      .then((item: any) => {
        this.setState({
          CurrentUserEmailID: item.Email
        });
      })
      .catch((e) => {
        console.error(`Error while getting user info - ${e}`);
      });

    setTimeout(() => {
      $("#loadingStars").hide();
    }, 3000);


    /* this.getSPAdmin(); */
    //this section is for getting all the details for displaying
    if (IdeaID != null && IdeaID != "" && IdeaID != undefined) {
      sp.web.lists.getByTitle("Ideas").items.top(4999).getById(+IdeaID).select("*, Author/Title,Author/EMail,Influencers/Id,Influencers/Title,Influencers/EMail").expand("Author,Influencers").get().then((ideas: any) => {
        this.setState({
          IdeatorUserName: ideas.Author.Title,
          IdeatorUserEmailID: ideas.Author.EMail,
          IdeaTitle: ideas.IdeaTitle,
          IdeaDescription: ideas.IdeaDescription,
          BusinessDrivers: ideas.BusinessDrivers,
          QuantitativeValue: ideas.QuantitativeValue,
          BrandValue: ideas.BrandValue,
          ConstituentValue: ideas.ConstituentValue,
          PrioritizationDescription: ideas.PrioritizationDescription,
          ImpactDescription: ideas.ImpactDescription,
          phaseIdFromList: ideas.PhaseId,
          Impact: ideas.Impact,
          Effort: ideas.Effort,
          AllInfluencers: ideas.Influencers,
          Summary: ideas.Summary,
          MakeBuy: ideas.MakeVsBuy,
          HLCostSummary: ideas.HighLevelCostSummary,
          TechFeasibility: ideas.TechFeasibility,
          ProjectDuration: ideas.ProjectDuration,
          EstimatedCost: ideas.EstimatedCost,
          Approach: ideas.Approach,
          Wireframe: ideas.Wireframe,
          TechnicalSpecifications: ideas.TechnicalSpecifications,
          Stakeholders: ideas.Stakeholders,
          Test: ideas.Test,
          Pros: ideas.OutcomesPro,
          Cons: ideas.OutcomesCon,
          Result: ideas.Results,
          InfluencerNtw: ideas.InfluencerNetwork,
          Pause: ideas.Pause
        });
      }).catch(e => {
        console.error(`Error while getting Idea details from ideas list - ${e}`);
      }).then(() => {
        sp.web.siteGroups.getByName('InnovationTeamAdmin').users.get().then((users: any) => {
          this.setState({
            AllAdmins: users
          });
        });
      }).then(() => {
        sp.web.lists.getByTitle("Idea Submission Fields").items.get().then((fields: any) => {
          this.setState({
            AllFieldNames: fields
          });
        }).catch(e => {
          console.error(`Error while getting Idea fields - ${e}`);
        }).then(() => {
          sp.web.lists.getByTitle("Ideas Documents").items.select("*", "EncodedAbsUrl", "FileRef", "FileLeafRef", "DocumentType/ID", "Idea/ID").expand("DocumentType/ID", "Idea/ID").filter("Idea/ID eq " + IdeaID).get().then((documents: any) => {
            this.setState({ AllDocuments: documents, DocType: documents.DocumentTypeId });
          }).catch(err => {
            console.error("Error while getting documents - " + err);
          }).then(() => {
            sp.web.lists.getByTitle("Phase").items.get().then((phases: any) => {
              this.setState({
                AllPhases: phases
              });
            }).catch(e => {
              console.error(`Error while getting Phases - ${e}`);
            });
          });
        });
      });
    }
    sp.web.lists.getByTitle("Idea Status").items.get().then((status: any) => {
      this.setState({
        AllIdeaStatus: status
      });
    }).catch(e => {
      console.error(`Error while getting Idea fields - ${e}`);
    });


  }

  public getParameterByName(name: string, url: string) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  //Update user input in SP
  public UpdateIdea() {
    /* let setPhase = document.getElementById(arrFieldNames[10][3]) as HTMLSelectElement;
    let phaseId = setPhase.value;
    let ideaId = localStorage.getItem('ideaId'); */
    let siteFullUrl = window.location.href.toLowerCase();
    let ideaId = siteFullURL.substring(siteFullURL.indexOf("?iid=") + 5, siteFullURL.indexOf("&pid"));
    let phaseId = siteFullURL.substring(siteFullURL.indexOf("&pid=") + 5, siteFullURL.indexOf("&idp="));
    let strBackPage = siteFullURL.substring(siteFullURL.indexOf("&idp=") + 5);
    if (delarrOptions != null && delarrOptions != undefined) {
      for (var delFile = 0; delFile < delarrOptions.length; delFile++) {
        sp.web.getFileByServerRelativeUrl(delarrOptions[delFile]).delete().then((fileData: any) => {
          console.log(fileData);
        });
      }
    }
    const docLibUrl = "/sites/ProcurementInnovationLab/Ideas%20Documents";
    let ideaTitle = "";
    let ideaDescription = "";
    let businessDrivers = "";
    let QuantativeValue = "";
    let BrandValue = "";
    let ConstituentValue = "";
    let PriortisationDesc = "";
    let ImpactDesc = "";
    let phase = "";
    let impact = "";
    let pause = "";
    let effort = "";
    let summary = "";
    let makebuy = "";
    let hlcostsummary = "";
    let techfeasibility = "";
    let projectduration = "";
    let estimatedcost = "";
    let approach = "";
    let wireframe = "";
    let technicalspecification = "";
    let stakeholders = "";
    let test = "";
    let pros = "";
    let cons = "";
    let result = "";
    let influencernetwork = "";
    let inputElement;
    //submit phase controls
    if (document.getElementById(arrFieldNames[0][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[0][3]) as HTMLInputElement;
      ideaTitle = inputElement.value;
    }
    if (document.getElementById(arrFieldNames[1][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[1][3]) as HTMLTextAreaElement;
      ideaDescription = inputElement.value;
    }

    if (document.getElementById(arrFieldNames[2][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[2][3]) as HTMLTextAreaElement;
      businessDrivers = inputElement.value;
    }

    if (document.getElementById(arrFieldNames[4][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[4][3]) as HTMLTextAreaElement;
      QuantativeValue = inputElement.value;
    }

    if (document.getElementById(arrFieldNames[5][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[5][3]) as HTMLTextAreaElement;
      BrandValue = inputElement.value;
    }
    if (document.getElementById(arrFieldNames[6][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[6][3]) as HTMLTextAreaElement;
      ConstituentValue = inputElement.value;
    }
    if (document.getElementById(arrFieldNames[7][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[7][3]) as HTMLTextAreaElement;
      PriortisationDesc = inputElement.value;
    }

    if (document.getElementById(arrFieldNames[9][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[9][3]) as HTMLTextAreaElement;
      ImpactDesc = inputElement.value;
    }

    if (document.getElementById(arrFieldNames[10][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[10][3]) as HTMLSelectElement;
      phase = inputElement.value;
    }

    if (document.getElementById(arrFieldNames[11][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[11][3]) as HTMLSelectElement;
      impact = inputElement.value;
    }

    if (document.getElementById(arrFieldNames[12][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[12][3]) as HTMLSelectElement;
      effort = inputElement.value;
    }

    if (document.getElementById(arrFieldNames[43][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[43][3]) as HTMLSelectElement;
      pause = inputElement.value;
    }

    //This is for evaluate phase controls
    if (document.getElementById(arrFieldNames[13][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[13][3]) as HTMLTextAreaElement;
      summary = inputElement.value;
    }

    if (document.getElementById(arrFieldNames[14][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[14][3]) as HTMLTextAreaElement;
      makebuy = inputElement.value;
    }

    if (document.getElementById(arrFieldNames[15][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[15][3]) as HTMLTextAreaElement;
      hlcostsummary = inputElement.value;
    }

    if (document.getElementById(arrFieldNames[16][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[16][3]) as HTMLTextAreaElement;
      techfeasibility = inputElement.value;
    }

    if (document.getElementById(arrFieldNames[17][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[17][3]) as HTMLInputElement;
      projectduration = inputElement.value;
    }

    if (document.getElementById(arrFieldNames[18][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[18][3]) as HTMLInputElement;
      estimatedcost = inputElement.value;
    }
    //File upload for impact Assesment
    let impactFile = document.getElementById(arrFieldNames[19][3]) as HTMLInputElement;
    let fileimpact = impactFile.files[0];
    if (fileimpact != null) {
      let fileimpactName = ideaId + "id1did" + fileimpact.name;
      if (fileimpact.size <= 10485760) {
        //upload small file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.add(fileimpactName, fileimpact, true).then(a => {
          // use below to update the properties of document
          a.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 1 //taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
      else {
        //upload large file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.addChunked(fileimpactName, fileimpact, data => {
          console.log({ data: data, message: "progress" });
        }, true).then(a => {
          a.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 1 //taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
    }
    //File upload for Cost/Resource Model
    let CostFile = document.getElementById(arrFieldNames[20][3]) as HTMLInputElement;
    let fileCost = CostFile.files[0];
    if (fileCost != null) {
      let fileCostName = ideaId + "id2did" + fileCost.name;
      if (fileCost.size <= 10485760) {
        //upload small file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.add(fileCostName, fileCost, true).then(b => {
          // use below to update the properties of document
          b.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 2//taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
      else {
        //upload large file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.addChunked(fileCostName, fileCost, data => {
          console.log({ data: data, message: "progress" });
        }, true).then(b => {
          b.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 2 //taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
    }

    //File upload for Cost/Resource Model
    let RiskFile = document.getElementById(arrFieldNames[21][3]) as HTMLInputElement;
    let fileRisk = RiskFile.files[0];
    if (fileRisk != null) {
      let fileRiskName = ideaId + "id3did" + fileRisk.name;
      if (fileRisk.size <= 10485760) {
        //upload small file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.add(fileRiskName, fileRisk, true).then(c => {
          // use below to update the properties of document
          c.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 3//taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
      else {
        //upload large file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.addChunked(fileRiskName, fileRisk, data => {
          console.log({ data: data, message: "progress" });
        }, true).then(c => {
          c.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 3 //taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
    }

    //this for Accelerate phase
    if (document.getElementById(arrFieldNames[22][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[22][3]) as HTMLTextAreaElement;
      approach = inputElement.value;
    }
    if (document.getElementById(arrFieldNames[23][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[23][3]) as HTMLTextAreaElement;
      wireframe = inputElement.value;
    }


    //File upload for Attach Wireframe
    let AttachWireframe = document.getElementById(arrFieldNames[24][3]) as HTMLInputElement;
    let fileWireframe = AttachWireframe.files[0];
    if (fileWireframe != null) {
      let fileWireframeName = ideaId + "id4did" + fileWireframe.name;
      if (fileWireframe.size <= 10485760) {
        //upload small file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.add(fileWireframeName, fileWireframe, true).then(d => {
          // use below to update the properties of document
          d.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 4//taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
      else {
        //upload large file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.addChunked(fileWireframeName, fileWireframe, data => {
          console.log({ data: data, message: "progress" });
        }, true).then(d => {
          d.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 4 //taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
    }

    if (document.getElementById(arrFieldNames[25][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[25][3]) as HTMLTextAreaElement;
      technicalspecification = inputElement.value;
    }

    //File upload for Attach Technical Specification
    let AttachTechSpecification = document.getElementById(arrFieldNames[26][3]) as HTMLInputElement;
    let techSpecfile = AttachTechSpecification.files[0];
    if (techSpecfile != null) {
      let filetechSpecName = ideaId + "id5did" + techSpecfile.name;
      if (techSpecfile.size <= 10485760) {
        //upload small file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.add(filetechSpecName, techSpecfile, true).then(e => {
          // use below to update the properties of document
          e.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 5//taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
      else {
        //upload large file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.addChunked(filetechSpecName, techSpecfile, data => {
          console.log({ data: data, message: "progress" });
        }, true).then(e => {
          e.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 5 //taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
    }

    if (document.getElementById(arrFieldNames[27][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[27][3]) as HTMLTextAreaElement;
      stakeholders = inputElement.value;
    }

    //File upload for Attach Stakeholders
    let AttachStakeholders = document.getElementById(arrFieldNames[28][3]) as HTMLInputElement;
    let stakeholderfile = AttachStakeholders.files[0];
    if (stakeholderfile != null) {
      let filestakeholderName = ideaId + "id6did" + stakeholderfile.name;
      if (stakeholderfile.size <= 10485760) {
        //upload small file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.add(filestakeholderName, stakeholderfile, true).then(f => {
          // use below to update the properties of document
          f.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 6//taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
      else {
        //upload large file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.addChunked(filestakeholderName, stakeholderfile, data => {
          console.log({ data: data, message: "progress" });
        }, true).then(f => {
          f.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 6 //taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
    }

    //this is for POC phase
    if (document.getElementById(arrFieldNames[29][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[29][3]) as HTMLTextAreaElement;
      test = inputElement.value;
    }

    if (document.getElementById(arrFieldNames[31][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[31][3]) as HTMLTextAreaElement;
      pros = inputElement.value;
    }

    if (document.getElementById(arrFieldNames[33][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[33][3]) as HTMLTextAreaElement;
      cons = inputElement.value;
    }

    //File upload for Outcome Pros
    let OutcomePro = document.getElementById(arrFieldNames[32][3]) as HTMLInputElement;
    let Profile = OutcomePro.files[0];
    if (Profile != null) {
      let fileProfileName = ideaId + "id7did" + Profile.name;
      if (Profile.size <= 10485760) {
        //upload small file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.add(fileProfileName, Profile, true).then(g => {
          // use below to update the properties of document
          g.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 7//taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
      else {
        //upload large file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.addChunked(fileProfileName, Profile, data => {
          console.log({ data: data, message: "progress" });
        }, true).then(g => {
          g.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 7 //taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
    }

    //File upload for Outcome Cons
    let OutcomeCon = document.getElementById(arrFieldNames[34][3]) as HTMLInputElement;
    let Confile = OutcomeCon.files[0];
    if (Confile != null) {
      let fileConfileName = ideaId + "id8did" + Confile.name;
      if (Confile.size <= 10485760) {
        //upload small file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.add(fileConfileName, Confile, true).then(h => {
          // use below to update the properties of document
          h.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 8//taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
      else {
        //upload large file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.addChunked(fileConfileName, Confile, data => {
          console.log({ data: data, message: "progress" });
        }, true).then(h => {
          h.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 8 //taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
    }

    if (document.getElementById(arrFieldNames[35][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[35][3]) as HTMLSelectElement;
      result = inputElement.value;
    }

    //File upload for Attach Result
    let AttachResult = document.getElementById(arrFieldNames[36][3]) as HTMLInputElement;
    let resultfile = AttachResult.files[0];
    if (resultfile != null) {
      let fileresultName = ideaId + "id9did" + resultfile.name;
      if (resultfile.size <= 10485760) {
        //upload small file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.add(fileresultName, resultfile, true).then(i => {
          // use below to update the properties of document
          i.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 9//taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
      else {
        //upload large file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.addChunked(fileresultName, resultfile, data => {
          console.log({ data: data, message: "progress" });
        }, true).then(i => {
          i.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 9 //taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
    }

    //Implement Phase

    if (document.getElementById(arrFieldNames[37][3]) != null) {
      inputElement = document.getElementById(arrFieldNames[37][3]) as HTMLTextAreaElement;
      influencernetwork = inputElement.value;
    }

    //File upload for Attach Solution Design
    let AttachSolutionDesign = document.getElementById(arrFieldNames[38][3]) as HTMLInputElement;
    let solfile = AttachSolutionDesign.files[0];
    if (solfile != null) {
      let filesolName = ideaId + "id10did" + solfile.name;
      if (solfile.size <= 10485760) {
        //upload small file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.add(filesolName, solfile, true).then(j => {
          // use below to update the properties of document
          j.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 10//taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
      else {
        //upload large file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.addChunked(filesolName, solfile, data => {
          console.log({ data: data, message: "progress" });
        }, true).then(j => {
          j.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 10 //taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
    }
    //File upload for Implement Attach Wireframe
    let ImplementAttachWireframe = document.getElementById(arrFieldNames[39][3]) as HTMLInputElement;
    let ImpWireframefile = ImplementAttachWireframe.files[0];
    if (ImpWireframefile != null) {
      let fileImpWireframeName = ideaId + "id11did" + ImpWireframefile.name;
      if (ImpWireframefile.size <= 10485760) {
        //upload small file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.add(fileImpWireframeName, ImpWireframefile, true).then(o => {
          // use below to update the properties of document
          o.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 11//taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
      else {
        //upload large file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.addChunked(fileImpWireframeName, ImpWireframefile, data => {
          console.log({ data: data, message: "progress" });
        }, true).then(o => {
          o.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 11 //taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
    }

    //File upload for Attach Prototype
    let AttachPrototype = document.getElementById(arrFieldNames[40][3]) as HTMLInputElement;
    let Protypefile = AttachPrototype.files[0];
    if (Protypefile != null) {
      let fileprotypeName = ideaId + "id12did" + Protypefile.name;
      if (Protypefile.size <= 10485760) {
        //upload small file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.add(fileprotypeName, Protypefile, true).then(p => {
          // use below to update the properties of document
          p.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 12//taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
      else {
        //upload large file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.addChunked(fileprotypeName, Protypefile, data => {
          console.log({ data: data, message: "progress" });
        }, true).then(p => {
          p.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 12 //taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
    }

    //File upload for Attach POC Results
    let AttachPOCResult = document.getElementById(arrFieldNames[41][3]) as HTMLInputElement;
    let POCfile = AttachPOCResult.files[0];
    if (POCfile != null) {
      let filepocName = ideaId + "id13did" + POCfile.name;
      if (POCfile.size <= 10485760) {
        //upload small file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.add(filepocName, POCfile, true).then(q => {
          // use below to update the properties of document
          q.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 13//taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
      else {
        //upload large file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.addChunked(filepocName, POCfile, data => {
          console.log({ data: data, message: "progress" });
        }, true).then(q => {
          q.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 13 //taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
    }

    //File upload for Attach Tech Spec
    let AttachTechSpec = document.getElementById(arrFieldNames[42][3]) as HTMLInputElement;
    let techfile = AttachTechSpec.files[0];
    if (techfile != null) {
      let filetechName = ideaId + "id14did" + techfile.name;
      if (techfile.size <= 10485760) {
        //upload small file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.add(filetechName, techfile, true).then(r => {
          // use below to update the properties of document
          r.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 14//taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
      else {
        //upload large file in document library
        sp.web.getFolderByServerRelativeUrl(docLibUrl).files.addChunked(filetechName, techfile, data => {
          console.log({ data: data, message: "progress" });
        }, true).then(r => {
          r.file.getItem().then(item => {
            item.update({
              IdeaId: ideaId,
              DocumentTypeId: 14 //taken from list Document Type
            }).then(s => {
              //alert("File uploaded successfully" + s.data["odata.etag"]);
            });
          });
        });
      }
    }

    //for influencer: people picker
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
      }
      const IItemAddResults = sp.web.lists.getByTitle('Ideas').items.getById(+ideaId).update({
        "IdeaTitle": ideaTitle,
        "IdeaDescription": ideaDescription,
        "BusinessDrivers": businessDrivers,
        "QuantitativeValue": QuantativeValue,
        "BrandValue": BrandValue,
        "ConstituentValue": ConstituentValue,
        "PrioritizationDescription": PriortisationDesc,
        "ImpactDescription": ImpactDesc,
        "PhaseId": phase,
        "Impact": impact,
        "Effort": effort,
        "Pause": pause,
        "Summary": summary,
        "MakeVsBuy": makebuy,
        "HighLevelCostSummary": hlcostsummary,
        "TechFeasibility": techfeasibility,
        "ProjectDuration": projectduration,
        "EstimatedCost": estimatedcost,
        "Approach": approach,
        "Wireframe": wireframe,
        "TechnicalSpecifications": technicalspecification,
        "Stakeholders": stakeholders,
        "Test": test,
        "OutcomesPro": pros,
        "OutcomesCon": cons,
        "Results": result,
        "InfluencerNetwork": influencernetwork,
        "InfluencersId": {
          "results": [userID1, userID2, userID3]
        }
      }).then(
        results => {
          console.log(results);
        }).catch(
          Error => {
            console.log(Error);
          });
      localStorage.setItem('user', "");
      /*     if (phaseId != localStorage.getItem('phaseId')) {
            navUrl = siteRelURL + '/SitePages/IdeaDetails.aspx';
            localStorage.setItem('phaseId', phaseId);
          }
          else
            navUrl = siteRelURL + '/SitePages/IdeaDetails.aspx';
        } */
      if (phase != null) {
        if (strBackPage != null && strBackPage.lastIndexOf("mng") != -1) {
          navUrl = sitePagesURL + '/IdeaDetails.aspx?iid=' + ideaId + '&pid=' + phase + '&idp=mng';
        }
        else {
          navUrl = sitePagesURL + '/IdeaDetails.aspx?iid=' + ideaId + '&pid=' + phase;
        }
      }
      else {
        if (strBackPage != null && strBackPage.lastIndexOf("mng") != -1) {
          navUrl = sitePagesURL + '/IdeaDetails.aspx?iid=' + ideaId + '&pid=' + phaseId + '&idp=mng';
        }
        else {
          navUrl = sitePagesURL + '/IdeaDetails.aspx?iid=' + ideaId + '&pid=' + phaseId;
        }
      }
    }
    else {
      const IItemAddResults = sp.web.lists.getByTitle('Ideas').items.getById(+ideaId).update({
        "IdeaTitle": ideaTitle,
        "IdeaDescription": ideaDescription,
        "BusinessDrivers": businessDrivers,
        "QuantitativeValue": QuantativeValue,
        "BrandValue": BrandValue,
        "ConstituentValue": ConstituentValue,
        "PrioritizationDescription": PriortisationDesc,
        "ImpactDescription": ImpactDesc,
        "PhaseId": phase,
        "Impact": impact,
        "Effort": effort,
        "Pause": pause,
        "Summary": summary,
        "MakeVsBuy": makebuy,
        "HighLevelCostSummary": hlcostsummary,
        "TechFeasibility": techfeasibility,
        "ProjectDuration": projectduration,
        "EstimatedCost": estimatedcost,
        "Approach": approach,
        "Wireframe": wireframe,
        "TechnicalSpecifications": technicalspecification,
        "Stakeholders": stakeholders,
        "Test": test,
        "OutcomesPro": pros,
        "OutcomesCon": cons,
        "Results": result,
        "InfluencerNetwork": influencernetwork
      }).then(
        results => {
          console.log(results);
        }).catch(
          Error => {
            console.log(Error);
          });
      localStorage.setItem('user', "");
      if (phase != null) {
        if (strBackPage != null && strBackPage.lastIndexOf("mng") != -1) {
          navUrl = sitePagesURL + '/IdeaDetails.aspx?iid=' + ideaId + '&pid=' + phase + '&idp=mng';
        }
        else {
          navUrl = sitePagesURL + '/IdeaDetails.aspx?iid=' + ideaId + '&pid=' + phase;
        }
      }
      else {
        if (strBackPage != null && strBackPage.lastIndexOf("mng") != -1) {
          navUrl = sitePagesURL + '/IdeaDetails.aspx?iid=' + ideaId + '&pid=' + phaseId + '&idp=mng';
        }
        else {
          navUrl = sitePagesURL + '/IdeaDetails.aspx?iid=' + ideaId + '&pid=' + phaseId;
        }
      }
    }
    /*     window.open(siteRelURL + '/SitePages/IdeaDetails.aspx?iid=' + ideaId + '&pid=' + phaseIdFromList , "_self"); */
  }

  //Cancel button on form to redirect to Idea Details with phaseId
  public Cancel() {
    let strBackPage = siteFullURL.substring(siteFullURL.indexOf("&idp=") + 5);
    if (strBackPage != null && strBackPage.lastIndexOf("mng") != -1) {
      let ideaId = siteFullURL.substring(siteFullURL.indexOf("?iid=") + 5, siteFullURL.indexOf("&pid"));
      let phaseId = siteFullURL.substring(siteFullURL.indexOf("&pid=") + 5, siteFullURL.indexOf("&idp="));
      navUrl = sitePagesURL + '/IdeaDetails.aspx?iid=' + ideaId + '&pid=' + phaseId + '&idp=mng';
    }
    else {
      let ideaId = siteFullURL.substring(siteFullURL.indexOf("?iid=") + 5, siteFullURL.indexOf("&pid"));
      let phaseId = siteFullURL.substring(siteFullURL.indexOf("&pid=") + 5);
      navUrl = sitePagesURL + '/IdeaDetails.aspx?iid=' + ideaId + '&pid=' + phaseId;
    }
    /* let IdeaID = localStorage.getItem('ideaId');
    let strPhaseID = localStorage.getItem('phaseId'); */
    window.open(navUrl, "_self");
  }

  //Update button on form to redirect to Idea Details with updated phaseId
  public Redirect() {
    window.open(navUrl, "_self");
  }

  //validate for positive and max input number
  public onKeyPress(event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (/\+|-/.test(keyValue))
      event.preventDefault();
    event.target.value = Math.max(0, parseInt(event.target.value)).toString().slice(0, 10);
    /*    var num = Math.max(0, parseInt(event.target.value)).toString().slice(0, 10);
    
        this.setState({ ProjectDuration: parseInt(num) }); */
  }

  //store deleted files document id and idea id
  /*  public storeDeleteFiles(ide) : any{
     alert(ide);
   } */
  public storeDeleteFiles(doctype, url) {
    let isConfirm = false;
    if (confirm("Do you want to delete selected file?")) {
      isConfirm = true;
    } else {
      isConfirm = false;
    }
    var impAssessment = document.getElementById("impactAssessment") as HTMLFieldSetElement;
    var CostResource = document.getElementById("cost-res") as HTMLFieldSetElement;
    var riskassessment = document.getElementById("riskAssess") as HTMLFieldSetElement;
    var WireframAttachment = document.getElementById("attachWirefram") as HTMLFieldSetElement;
    var techSpecAttachment = document.getElementById("attachtechspec") as HTMLFieldSetElement;
    var StakeholderAttachment = document.getElementById("attachstakeholder") as HTMLFieldSetElement;
    var Pros = document.getElementById("pro") as HTMLFieldSetElement;
    var Cons = document.getElementById("con") as HTMLFieldSetElement;
    var Outcomes = document.getElementById("outcome") as HTMLFieldSetElement;
    var SolutionDesing = document.getElementById("soldesign") as HTMLFieldSetElement;
    var AttachImpWireframe = document.getElementById("impWireframe") as HTMLFieldSetElement;
    var PrototypeAttach = document.getElementById("prototype") as HTMLFieldSetElement;
    var POCResult = document.getElementById("pocResults") as HTMLFieldSetElement;
    var TechSpec = document.getElementById("attachtechspecImplement") as HTMLFieldSetElement;
    if (doctype == "1" && impAssessment != null && isConfirm == true) {
      let FileDisplay1 = document.getElementById("impactAssessmentFile") as HTMLDivElement;
      FileDisplay1.style.display = "none";
      impAssessment.style.display = "block";
      delarrOptions.push(url);
    }
    if (doctype == "2" && CostResource != null && isConfirm == true) {
      let FileDisplay2 = document.getElementById("cost-resFile") as HTMLDivElement;
      FileDisplay2.style.display = "none";
      CostResource.style.display = "block";
      delarrOptions.push(url);
    }
    if (doctype == "3" && CostResource != null && isConfirm == true) {
      let FileDisplay3 = document.getElementById("riskAssessFile") as HTMLFieldSetElement;
      FileDisplay3.style.display = "none";
      riskassessment.style.display = "block";
      delarrOptions.push(url);
    }
    if (doctype == "4" && WireframAttachment != null && isConfirm == true) {
      let FileDisplay4 = document.getElementById("attachWireframFile") as HTMLFieldSetElement;
      FileDisplay4.style.display = "none";
      WireframAttachment.style.display = "block";
      delarrOptions.push(url);
    }
    if (doctype == "5" && techSpecAttachment != null && isConfirm == true) {
      let FileDisplay5 = document.getElementById("attachtechspecFile") as HTMLFieldSetElement;
      FileDisplay5.style.display = "none";
      techSpecAttachment.style.display = "block";
      delarrOptions.push(url);
    }
    if (doctype == "6" && StakeholderAttachment != null && isConfirm == true) {
      let FileDisplay6 = document.getElementById("attachstakeholderFile") as HTMLFieldSetElement;
      FileDisplay6.style.display = "none";
      StakeholderAttachment.style.display = "block";
      delarrOptions.push(url);
    }
    if (doctype == "7" && Pros != null && isConfirm == true) {
      let FileDisplay7 = document.getElementById("proAttach") as HTMLFieldSetElement;
      FileDisplay7.style.display = "none";
      Pros.style.display = "block";
      delarrOptions.push(url);
    }
    if (doctype == "8" && Cons != null && isConfirm == true) {
      let FileDisplay8 = document.getElementById("conAttach") as HTMLFieldSetElement;
      FileDisplay8.style.display = "none";
      Cons.style.display = "block";
      delarrOptions.push(url);
    }
    if (doctype == "9" && Outcomes != null && isConfirm == true) {
      let FileDisplay9 = document.getElementById("outcomeFile") as HTMLFieldSetElement;
      FileDisplay9.style.display = "none";
      Outcomes.style.display = "block";
      delarrOptions.push(url);
    }
    if (doctype == "10" && SolutionDesing != null && isConfirm == true) {
      let FileDisplay10 = document.getElementById("soldesignFile") as HTMLFieldSetElement;
      FileDisplay10.style.display = "none";
      SolutionDesing.style.display = "block";
      delarrOptions.push(url);
    }
    if (doctype == "11" && AttachImpWireframe != null && isConfirm == true) {
      let FileDisplay11 = document.getElementById("impWireframeFile") as HTMLFieldSetElement;
      FileDisplay11.style.display = "none";
      AttachImpWireframe.style.display = "block";
      delarrOptions.push(url);
    }
    if (doctype == "12" && PrototypeAttach != null && isConfirm == true) {
      let FileDisplay12 = document.getElementById("prototypeFile") as HTMLFieldSetElement;
      FileDisplay12.style.display = "none";
      PrototypeAttach.style.display = "block";
      delarrOptions.push(url);
    }
    if (doctype == "13" && POCResult != null && isConfirm == true) {
      let FileDisplay13 = document.getElementById("pocResultsFile") as HTMLFieldSetElement;
      FileDisplay13.style.display = "none";
      POCResult.style.display = "block";
      delarrOptions.push(url);
    }
    if (doctype == "14" && TechSpec != null && isConfirm == true) {
      let FileDisplay14 = document.getElementById("attachtechspecImplementFile") as HTMLFieldSetElement;
      FileDisplay14.style.display = "none";
      TechSpec.style.display = "block";
      delarrOptions.push(url);
    }
    console.log(delarrOptions);
  }

  /*public getSPAdmin() {
    sp.web.currentUser.get().then((item: any) => {
      this.setState({
        CurrentUserName: item.Email,
        CurrentUser: item
      });
      if (this.state.CurrentUserName == this.state.IdeatorUserEmailID) {
        this.createdby = true;
      }
      else {
        this.createdby = false;
      }
    }).catch(e => {
      console.error(`Error while getting current user info - ${e}`);
    }).then(err => {
      sp.web.siteGroups.getByName('InnovationTeamAdmin').users.get().then((item: any) => {
        this.setState({
          SPUser: item
        });
        for (var p = 0; p < this.state.SPUser.length; p++) {
          if (this.state.CurrentUserName == this.state.SPUser[p].Email || this.state.CurrentUserName == this.state.IdeatorUserEmailID) {
            this.isAdmin = true;
          }
        }
      }).catch(error => {
        console.error("Error while getting Users in SP- " + error);
        this.isAdmin = false;
      }); .then(nav => {
        this.flgacess = true;
        for (var p = 0; p < this.state.SPUser.length; p++) {
          if (this.state.CurrentUserName == this.state.SPUser[p].Email || this.state.CurrentUserName == this.state.IdeatorUserEmailID) {
            this.isAdmin = true;
          }
          else {
            this.isAdmin = false;
          }
        }
      }); 
    });
  }*/
  public onlyNumberKey(evt) {

    // Only ASCII charactar in that range allowed 
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode;
    if ((ASCIICode < 48 || ASCIICode > 57) && ASCIICode != 46)
      evt.preventDefault();
  }

}