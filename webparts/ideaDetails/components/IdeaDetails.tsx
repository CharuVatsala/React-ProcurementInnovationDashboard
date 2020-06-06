import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, InputGroup, FormControl, Form } from 'react-bootstrap';
import styles from './IdeaDetails.module.scss';
import { IIdeaDetailsProps } from './IIdeaDetailsProps';
import { escape, truncate } from '@microsoft/sp-lodash-subset';
import * as jQuery from 'jquery';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from '../../../Public/TS/Header';
import { faArrowAltCircleLeft, faArrowCircleLeft, faCheckSquare, faSquare, faEdit } from "@fortawesome/free-solid-svg-icons";
// Import css files for carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { sp } from "@pnp/sp/presets/all";
import 'slick-carousel';
import "../../../Public/CSS/PILContent.css";
import { Item } from '@pnp/sp/items';
import InitialLoad from '../../../Public/TS/PreLoader';
import { _SiteUser } from '@pnp/sp/site-users/types';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";

export interface IIdeasStates {
  AllDocuments: any[];
  CreatedByMail: string;
  CreatedBy: any[];
  CreatedByName: any[];
  ProjectDuration: number;
  EstimatedCost: number;
  IdeasTitle: string;
  IdeasDesc: string;
  IdeaBD: string;
  IdeaQV: string;
  IdeaBV: string;
  IdeaCV: string;
  IdeaPD: string;
  IdeaImpact: string;
  Impact: string;
  Effort: string;
  Summary: string;
  MakevsBuy: string;
  HlCostSummary: string;
  TechFeasibility: string;
  Approach: string;
  Wireframe: string;
  TechSpecifications: string;
  Stakeholders: string;
  TestCases: string;
  Pros: string;
  Cons: string;
  IdeaOutcome: string;
  InfluencerNetwork: string;
  phaseIdFromList: string;
  CurrentUser: any[];
  IdeaID: number;
  PhaseNavigator: string;
  AllIdeaStatus: any[];
  SPUser: any[];
  CurrentUserEmailID: string;
  AllFieldNames: any[];
  AllInfluencers: any[];
  AssessmentMatrix: string;
  AllAdmins: any[];
}

function createMarkup(content) {
  return {
    __html: content
  };
}

let arrFieldNames: any[] = [];

export default class IdeaDetails extends React.Component<IIdeaDetailsProps, IIdeasStates> {
  public constructor(props) {
    super(props);
    this.state = {
      AllDocuments: [],
      CreatedByMail: "",
      CreatedBy: [],
      CreatedByName: [],
      ProjectDuration: 0,
      EstimatedCost: 0,
      IdeasTitle: "",
      IdeasDesc: "",
      IdeaBD: "",
      IdeaQV: "",
      IdeaBV: "",
      IdeaCV: "",
      IdeaPD: "",
      IdeaImpact: "",
      Impact: "",
      Effort: "",
      Summary: "",
      MakevsBuy: "",
      HlCostSummary: "",
      TechFeasibility: "",
      Approach: "",
      Wireframe: "",
      TechSpecifications: "",
      Stakeholders: "",
      TestCases: "",
      Pros: "",
      Cons: "",
      IdeaOutcome: "",
      InfluencerNetwork: "",
      phaseIdFromList: "",
      CurrentUser: [],
      IdeaID: 0,
      PhaseNavigator: "",
      AllIdeaStatus: [],
      SPUser: [],
      CurrentUserEmailID: "",
      AllFieldNames: [],
      AllInfluencers: [],
      AssessmentMatrix: "",
      AllAdmins: []
    };
  }
  //public flgacess = false;
  public url = window.location.href.toLowerCase();
  /*  public IdeaID = this.getParameterByName("iid", this.url);
 
   public strPhaseID = this.getParameterByName("pid", this.url); */
  public strBackPage = this.getParameterByName("idp", this.url);
  /*  public IdeaID = localStorage.getItem('ideaId');
   public strPhaseID = localStorage.getItem('phaseId');
   public strBackPage = localStorage.getItem('backpage'); */

  public render(): React.ReactElement<IIdeaDetailsProps> {
    let IdeaID = this.getParameterByName("iid", this.url);

    let strPhaseID = this.getParameterByName("pid", this.url);
    /*  this.forceUpdate(); */
    $(document).ready(() => {
      //show phase wise modules in form
      {
        var details = document.getElementById("fieldsset1") as HTMLFieldSetElement;
        var ideate = document.getElementById("fieldsset2") as HTMLFieldSetElement;
        var evaluate = document.getElementById("fieldsset3") as HTMLFieldSetElement;
        var accelerate = document.getElementById("fieldsset4") as HTMLFieldSetElement;
        var poc = document.getElementById("fieldsset5") as HTMLFieldSetElement;
        var implement = document.getElementById("fieldsset6") as HTMLFieldSetElement;
        let leftsection = document.getElementById("leftsection") as HTMLFieldSetElement;
        let breadcrumb = document.getElementById("breadcrumb") as HTMLFieldSetElement;
        if (details != null && ideate != null) {
          details.style.display = "block";
        }
        if (strPhaseID == this.state.phaseIdFromList) {
          this.state.AllIdeaStatus.map((status, key) => {
            if (strPhaseID == "1" && evaluate != null && accelerate != null && poc != null && implement != null) {
              ideate.style.display = "none";
              evaluate.style.display = "none";
              accelerate.style.display = "none";
              poc.style.display = "none";
              implement.style.display = "none";
            }
            if (strPhaseID == "2" && evaluate != null && accelerate != null && poc != null && implement != null) {
              ideate.style.display = "block";
              evaluate.style.display = "none";
              accelerate.style.display = "none";
              poc.style.display = "none";
              implement.style.display = "none";
            }
            if (strPhaseID == "3" && evaluate != null && accelerate != null && poc != null && implement != null) {
              ideate.style.display = "block";
              evaluate.style.display = "block";
              accelerate.style.display = "none";
              poc.style.display = "none";
              implement.style.display = "none";
            }
            if (strPhaseID == "4" && evaluate != null && accelerate != null && poc != null && implement != null) {
              ideate.style.display = "block";
              evaluate.style.display = "block";
              accelerate.style.display = "block";
              poc.style.display = "none";
              implement.style.display = "none";

            }
            if (strPhaseID == "5" && evaluate != null && accelerate != null && poc != null && implement != null) {
              ideate.style.display = "block";
              evaluate.style.display = "block";
              accelerate.style.display = "block";
              poc.style.display = "block";
              implement.style.display = "none";

            }
            if (strPhaseID > "5" && evaluate != null && accelerate != null && poc != null && implement != null) {
              ideate.style.display = "block";
              evaluate.style.display = "block";
              accelerate.style.display = "block";
              poc.style.display = "block";
              implement.style.display = "block";

            }
          });


        }
        else {
          if (breadcrumb != null && leftsection != null && details != null && ideate != null && evaluate != null && accelerate != null && poc != null && implement != null) {
            details.style.display = "none";
            ideate.style.display = "none";
            evaluate.style.display = "none";
            accelerate.style.display = "none";
            poc.style.display = "none";
            implement.style.display = "none";
            leftsection.style.display = "none";
            breadcrumb.style.display = "none";
          }
        }

      }
    });

    let siteFullURL = window.location.pathname;
    let sitePagesURL = siteFullURL.substring(0, siteFullURL.lastIndexOf('/'));
    let backURL = "";
    let editURL = "";
    if (this.strBackPage != null && this.strBackPage.lastIndexOf("mng") != -1) {
      backURL = sitePagesURL + "/Manage.aspx";
      editURL = sitePagesURL + "/EditIdea.aspx?iid=" + this.state.IdeaID + "&pid=" + this.state.phaseIdFromList + "&idp=mng";

    }
    else {
      backURL = sitePagesURL + "/Inspiration.aspx";
      editURL = sitePagesURL + "/EditIdea.aspx?iid=" + this.state.IdeaID + "&pid=" + this.state.phaseIdFromList;
    }

    /* let editURL = sitePagesURL + "/EditIdea.aspx"; */
    let UserProfileImage = "https://sites.ey.com/_layouts/15/userphoto.aspx?size=L&username=" + this.state.CreatedByMail;
    /* let CreatedByMail = this.state.CreatedByMail; */
    this.state.AllFieldNames.map((item, key) => {
      //This is the main array for dislay controls
      arrFieldNames.push([item.ID, item.Title]);
    });
    let flgAccess = 0;
    if (this.state.CreatedByMail.length != 0) {
      if (this.state.CurrentUserEmailID.toLowerCase() === this.state.CreatedByMail.toLowerCase()) {
        flgAccess = 1;
      }
    }
    if (this.state.AllInfluencers != undefined && this.state.AllInfluencers.length > 0) {
      this.state.AllInfluencers.map((influencer) => {
        if (this.state.CurrentUserEmailID.toLowerCase() === influencer.EMail.toLowerCase()) {
          flgAccess = 1;
        }
      });
    }
    if (this.state.AllAdmins != undefined && this.state.AllAdmins.length > 0) {
      this.state.AllAdmins.map((admin) => {
        if (this.state.CurrentUserEmailID.toLowerCase() === admin.Email.toLowerCase()) {
          flgAccess = 1;
        }
      });
    }

    if (arrFieldNames.length > 0) {
      return (
        <React.Fragment >
          <InitialLoad />
          <Container className={styles.ideaDetails + " nopadding"} fluid={true}>
            <Col xs={12} md={12} lg={12} id="firstsection" className={styles.homediv}>
              <Row className={styles.positions}>
                <Header />
              </Row>

              <Row id="breadcrumb" className={styles.accebreadcrumb}>
                <Col xs={1} md={1} lg={1} className={styles.accecrumbtext}>
                  <a href={backURL} title="Back"><span><FontAwesomeIcon icon={faArrowCircleLeft} className={styles.backicon} /></span></a>
                </Col>
                <Col xs={9} md={9} lg={9} className={styles.accecrumbtext}>
                  {this.state.IdeasTitle}
                </Col>
                {/* Edit form enable button on current user permission */}
                <Col xs={1} md={1} lg={1} className={styles.EditRow}>
                  {flgAccess == 1 ? <a id="editicon" className={styles.editicon} href={editURL} title="Edit"><span><FontAwesomeIcon icon={faEdit} className={styles.editicon} /></span></a> : ""}
                </Col>
              </Row>
              <Row id="leftsection">
                <Col xs={3} md={3} lg={3} className={styles.ideasection + " " + styles.smmarginleft}>
                  <fieldset className="infocontainer"><legend className="legend">IDEATOR</legend>
                    <Row>
                      <Col xs={12} md={12} lg={12} className={styles.tcenter}>
                        <img className={styles.profileImage} src={UserProfileImage} />
                      </Col>
                    </Row>
                    <Row className={styles.profileText}>
                      <Col xs={12} md={12} lg={12} className={styles.tcenter}>
                        {this.state.CreatedByName}
                      </Col>
                    </Row>
                    <Row className={styles.profileText}>
                      <Col xs={12} md={12} lg={12} className={styles.tcenter}>
                        <a
                          href={
                            'https://people.ey.com/Person.aspx?user=' +
                            this.state.CreatedByMail
                          }
                          target="_blank"
                        >{this.state.CreatedByMail}</a>
                      </Col>
                    </Row>
                  </fieldset>
                  <fieldset className="infocontainer"><legend className="legend">PROGRESS</legend>
                    <Row>
                      {this.state.AllIdeaStatus.map((status, key) => {
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
                <Col xs={8} md={8} lg={8} className={styles.ideasection}>
                  <fieldset id="fieldsset1" className="infocontainer"><legend className="legend">OVERVIEW</legend>
                    <Row>
                      <Col xs={9} md={9} lg={9}>
                        <Row className={styles.acceheaderTitle}>
                          {this.state.IdeasTitle}
                        </Row>
                        <Row className={styles.accecontentDesc}
                          dangerouslySetInnerHTML={createMarkup(this.state.IdeasDesc)}>
                        </Row>
                        <Row className={styles.acceheader}>{arrFieldNames[2][1]}
                        </Row>
                        <Row className={styles.accecontent} dangerouslySetInnerHTML={createMarkup(this.state.IdeaBD)}>
                        </Row>
                      </Col>
                      <Col xs={2} md={2} lg={2} className={styles.projectDetails}>
                        <Row className={styles.projectDetailsHeader}>Project Duration: </Row>
                        {this.state.ProjectDuration != null ? <Row className={styles.projectDetailsTitle} dangerouslySetInnerHTML={createMarkup(this.state.ProjectDuration)}></Row> : <Row className={styles.projectDetailsTitle}>-</Row>}
                        <Row className={styles.projectDetailsHeader}>Estimated Cost: </Row>
                        {this.state.EstimatedCost != null ? <Row className={styles.projectDetailsTitle} dangerouslySetInnerHTML={createMarkup(this.state.EstimatedCost)}></Row> : <Row className={styles.projectDetailsTitle}>-</Row>}
                        <Row className={styles.projectDetailsHeader}>Phase: </Row>
                        <Row className={styles.projectDetailsTitle} dangerouslySetInnerHTML={createMarkup(this.state.PhaseNavigator)}></Row>
                        <Row className={styles.projectDetailsHeader}>Assessment:</Row>
                        <Row className={styles.projectDetailsTitle} dangerouslySetInnerHTML={createMarkup(this.state.AssessmentMatrix)}></Row>
                      </Col>
                    </Row>

                    {/*   <Row className={styles.acceheader}>{arrFieldNames[7][1]}
                    </Row>
                    <Row className={styles.accecontent} dangerouslySetInnerHTML={createMarkup(this.state.IdeaPD)}>
                    </Row> */}
                  </fieldset>
                  <fieldset id="fieldsset2" className="infocontainer"><legend className="legend">PHASE - IDEATE</legend>
                    <Row className={styles.acceheader}>{arrFieldNames[3][1]}: </Row>
                    <Row>
                      {this.state.IdeaQV != null ? <Col xs={4} md={4} lg={4}><Row className={styles.acceheader}>{arrFieldNames[4][1]}
                      </Row><Row className={styles.accecontent} dangerouslySetInnerHTML={createMarkup(this.state.IdeaQV)} ></Row></Col> : ""}
                      {this.state.IdeaBV != null ? <Col xs={4} md={4} lg={4}><Row className={styles.acceheader}>{arrFieldNames[5][1]}
                      </Row><Row className={styles.accecontent} dangerouslySetInnerHTML={createMarkup(this.state.IdeaBV)} ></Row></Col> : ""}
                      {this.state.IdeaCV != null ? <Col xs={4} md={4} lg={4}><Row className={styles.acceheader}>{arrFieldNames[6][1]}
                      </Row><Row className={styles.accecontent} dangerouslySetInnerHTML={createMarkup(this.state.IdeaCV)} ></Row></Col> : ""}
                    </Row>
                    <Row className={styles.acceheader}>{arrFieldNames[9][1]}
                    </Row>
                    <Row className={styles.accecontent} dangerouslySetInnerHTML={createMarkup(this.state.IdeaImpact)}>
                    </Row>
                    <Row>
                      <Col xs={2} md={2} lg={2} className={styles.acceheader}>{arrFieldNames[11][1]}
                      </Col>
                      <Col xs={4} md={4} lg={4} className={styles.impactcontent} dangerouslySetInnerHTML={createMarkup(this.state.Impact)}>
                      </Col>
                      <Col xs={2} md={2} lg={2} className={styles.acceheader}>{arrFieldNames[12][1]}
                      </Col>
                      <Col xs={3} md={3} lg={3} className={styles.accecontent} dangerouslySetInnerHTML={createMarkup(this.state.Effort)}>
                      </Col>
                    </Row>
                    <Row className={styles.acceheader}>{arrFieldNames[8][1]}
                    </Row>
                    <Row>
                      <Col xs={10} md={10} lg={10} className={styles.accecontent}>
                        {this.state.AllInfluencers != null ? this.state.AllInfluencers.map((user) => {
                          return <span>{user.Title} - {user.EMail} < br /></span>;
                        }) : "-"}
                      </Col>
                    </Row>
                  </fieldset>
                  <fieldset id="fieldsset3" className="infocontainer"><legend className="legend">PHASE - EVALUATE</legend>
                    <Row className={styles.acceheader}>{arrFieldNames[13][1]}
                    </Row>
                    <Row className={styles.accecontent} dangerouslySetInnerHTML={createMarkup(this.state.Summary)}>
                    </Row>
                    {/* <Row className={styles.acceheader}>{arrFieldNames[14][1]}
                    </Row>
                    <Row className={styles.accecontent} dangerouslySetInnerHTML={createMarkup(this.state.MakevsBuy)}>
                    </Row> */}
                    <Row>
                      <Col xs={4} md={4} lg={4} className={styles.acceheader}>{arrFieldNames[14][1]}</Col>
                      <Col xs={4} md={4} lg={4} className={styles.acceheader}>{arrFieldNames[15][1]}</Col>
                      <Col xs={4} md={4} lg={4} className={styles.acceheader}>{arrFieldNames[16][1]}</Col>
                    </Row>
                    <Row>
                      <Col xs={4} md={4} lg={4} className={styles.accecontent} dangerouslySetInnerHTML={createMarkup(this.state.MakevsBuy)}></Col>
                      <Col xs={4} md={4} lg={4} className={styles.accecontent} dangerouslySetInnerHTML={createMarkup(this.state.HlCostSummary)}></Col>
                      <Col xs={4} md={4} lg={4} className={styles.accecontent} dangerouslySetInnerHTML={createMarkup(this.state.TechFeasibility)}></Col>
                    </Row>
                    {/*  <Row className={styles.acceheader}>{arrFieldNames[16][1]}
                    </Row>
                    <Row className={styles.accecontent} dangerouslySetInnerHTML={createMarkup(this.state.TechFeasibility)}>
                    </Row> */}
                    <Row className={styles.acceheader}>Attachments:
                    </Row>
                    <Row>
                      <Col xs={6} md={6} lg={6}>
                        {this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "impact assessment").length == 0 ? <div className={styles.emptyholder}>{arrFieldNames[19][1]}: - No Attachment -</div> : this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "impact assessment").map((FilterdDocs) => {
                          let DocsLinkHTML = "";
                          let DocName;
                          DocsLinkHTML = arrFieldNames[19][1] + ": ";
                          DocName = FilterdDocs.FileLeafRef;
                          let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                          displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                          let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                          let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + FilterdDocs.FileRef;
                          //DocsLinkHTML += "<img class='docicon' src='" + imageURL + "' />";
                          DocsLinkHTML += displayDocNameWithoutExt;
                          DocsLinkHTML += "<span class='fright'>";
                          DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png' /></a>";
                          DocsLinkHTML += "</span>";
                          return <div className={styles.docholder}><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                        })}
                      </Col>
                      <Col xs={6} md={6} lg={6}>
                        {this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "cost/resource model").length == 0 ? <div className={styles.emptyholder}>{arrFieldNames[20][1]}: - No Attachment -</div> : this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "cost/resource model").map((FilterdDocs) => {
                          let DocsLinkHTML = "";
                          let DocName;
                          DocsLinkHTML = arrFieldNames[20][1] + ": ";
                          DocName = FilterdDocs.FileLeafRef;
                          let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                          displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                          let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                          let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + FilterdDocs.FileRef;
                          //DocsLinkHTML += "<img class='docicon' src='" + imageURL + "' />";
                          DocsLinkHTML += displayDocNameWithoutExt;
                          DocsLinkHTML += "<span class='fright'>";
                          DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png' /></a>";
                          DocsLinkHTML += "</span>";
                          return <div className={styles.docholder}><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                        })}
                      </Col>
                      <Col xs={6} md={6} lg={6}>
                        {this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "risk assessment").length == 0 ? <div className={styles.emptyholder}>{arrFieldNames[21][1]}: - No Attachment -</div> : this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "risk assessment").map((FilterdDocs) => {
                          let DocsLinkHTML = "";
                          let DocName;
                          DocsLinkHTML = arrFieldNames[21][1] + ": ";
                          DocName = FilterdDocs.FileLeafRef;
                          let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                          displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                          let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                          let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + FilterdDocs.FileRef;
                          //DocsLinkHTML += "<img class='docicon' src='" + imageURL + "' />";
                          DocsLinkHTML += displayDocNameWithoutExt;
                          DocsLinkHTML += "<span class='fright'>";
                          DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png' /></a>";
                          DocsLinkHTML += "</span>";
                          return <div className={styles.docholder}><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                        })}
                      </Col>
                    </Row>
                  </fieldset>
                  <fieldset id="fieldsset4" className="infocontainer"><legend className="legend">PHASE - ACCELERATE</legend>
                    <Row className={styles.acceheader}>{arrFieldNames[22][1]}
                    </Row>
                    <Row className={styles.accecontent} dangerouslySetInnerHTML={createMarkup(this.state.Approach)}>
                    </Row>
                    <Row className={styles.acceheader}>{arrFieldNames[23][1]}
                    </Row>
                    <Row className={styles.accecontent} dangerouslySetInnerHTML={createMarkup(this.state.Wireframe)}>
                    </Row>
                    <Row className={styles.acceheader}>{arrFieldNames[25][1]}
                    </Row>
                    <Row className={styles.accecontent} dangerouslySetInnerHTML={createMarkup(this.state.TechSpecifications)}>
                    </Row>
                    <Row className={styles.acceheader}>{arrFieldNames[27][1]}
                    </Row>
                    <Row className={styles.accecontent} dangerouslySetInnerHTML={createMarkup(this.state.Stakeholders)}>
                    </Row>
                    <Row className={styles.acceheader}>Attachments:
                </Row>
                    <Row>
                      <Col xs={6} md={6} lg={6}>
                        {this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "attach wireframe").length == 0 ? <div className={styles.emptyholder}>{arrFieldNames[23][1]}: - No Attachment -</div> : this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "attach wireframe").map((FilterdDocs) => {
                          let DocsLinkHTML = "";
                          let DocName;
                          DocsLinkHTML = arrFieldNames[23][1] + ": ";
                          DocName = FilterdDocs.FileLeafRef;
                          let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                          displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                          let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                          let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + FilterdDocs.FileRef;
                          //DocsLinkHTML += "<img class='docicon' src='" + imageURL + "' />";
                          DocsLinkHTML += displayDocNameWithoutExt;
                          DocsLinkHTML += "<span class='fright'>";
                          DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png' /></a>";
                          DocsLinkHTML += "</span>";
                          return <div className={styles.docholder}><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                        })}
                      </Col>
                      <Col xs={6} md={6} lg={6}>
                        {this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "attach technical specifications").length == 0 ? <div className={styles.emptyholder}>{arrFieldNames[25][1]}: - No Attachment -</div> : this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "attach technical specifications").map((FilterdDocs) => {
                          let DocsLinkHTML = "";
                          let DocName;
                          DocsLinkHTML = arrFieldNames[25][1] + ": ";
                          DocName = FilterdDocs.FileLeafRef;
                          let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                          displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                          let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                          let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + FilterdDocs.FileRef;
                          DocsLinkHTML += displayDocNameWithoutExt;
                          DocsLinkHTML += "<span class='fright'>";
                          DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png' /></a>";
                          DocsLinkHTML += "</span>";
                          return <div className={styles.docholder}><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                        })}
                      </Col>
                      <Col xs={6} md={6} lg={6}>
                        {this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "attach stakeholders").length == 0 ? <div className={styles.emptyholder}>{arrFieldNames[27][1]}: - No Attachment -</div> : this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "attach stakeholders").map((FilterdDocs) => {
                          let DocsLinkHTML = "";
                          let DocName;
                          DocsLinkHTML = arrFieldNames[27][1] + ": ";
                          DocName = FilterdDocs.FileLeafRef;
                          let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                          displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                          let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                          let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + FilterdDocs.FileRef;
                          //DocsLinkHTML += "<img class='docicon' src='" + imageURL + "' />";
                          DocsLinkHTML += displayDocNameWithoutExt;
                          DocsLinkHTML += "<span class='fright'>";
                          DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png' /></a>";
                          DocsLinkHTML += "</span>";
                          return <div className={styles.docholder}><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                        })}
                      </Col>
                    </Row>
                  </fieldset>
                  <fieldset id="fieldsset5" className="infocontainer"><legend className="legend">PHASE - PROOF OF CONCEPT</legend>
                    <Row className={styles.acceheader}>{arrFieldNames[29][1]}
                    </Row>
                    <Row className={styles.accecontent} dangerouslySetInnerHTML={createMarkup(this.state.TestCases)}>
                    </Row>
                    <Row className={styles.acceheader}>{arrFieldNames[30][1]}
                    </Row>
                    <Row>
                      <Col xs={6} md={6} lg={6}>
                        <Row className={styles.acceheader}>{arrFieldNames[31][1]}
                        </Row>
                        <Row className={styles.accecontent} dangerouslySetInnerHTML={createMarkup(this.state.Pros)}>
                        </Row>
                      </Col>
                      <Col xs={6} md={6} lg={6}>
                        <Row className={styles.acceheader}>{arrFieldNames[33][1]}
                        </Row>
                        <Row className={styles.accecontent} dangerouslySetInnerHTML={createMarkup(this.state.Cons)}>
                        </Row>
                      </Col>
                    </Row>
                    <Row className={styles.acceheader}>{arrFieldNames[35][1]}
                    </Row>
                    <Row className={styles.accecontent} dangerouslySetInnerHTML={createMarkup(this.state.IdeaOutcome)}>
                    </Row>
                    <Row className={styles.acceheader}>Attachments:
                </Row>
                    <Row>
                      <Col xs={6} md={6} lg={6}>
                        {this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "outcomes pros").length == 0 ? <div className={styles.emptyholder}>{arrFieldNames[32][1]}: - No Attachment -</div> : this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "outcomes pros").map((FilterdDocs) => {
                          let DocsLinkHTML = "";
                          let DocName;
                          DocsLinkHTML = arrFieldNames[32][1] + ": ";
                          DocName = FilterdDocs.FileLeafRef;
                          let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                          displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                          let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                          let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + FilterdDocs.FileRef;
                          //DocsLinkHTML += "<img class='docicon' src='" + imageURL + "' />";
                          DocsLinkHTML += displayDocNameWithoutExt;
                          DocsLinkHTML += "<span class='fright'>";
                          DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png' /></a>";
                          DocsLinkHTML += "</span>";
                          return <div className={styles.docholder}><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                        })}
                      </Col>
                      <Col xs={6} md={6} lg={6}>
                        {this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "outcomes cons").length == 0 ? <div className={styles.emptyholder}>{arrFieldNames[34][1]}: - No Attachment -</div> : this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "outcomes cons").map((FilterdDocs) => {
                          let DocsLinkHTML = "";
                          let DocName;
                          DocsLinkHTML = arrFieldNames[34][1] + ": ";
                          DocName = FilterdDocs.FileLeafRef;
                          let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                          displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                          let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                          let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + FilterdDocs.FileRef;
                          //DocsLinkHTML += "<img class='docicon' src='" + imageURL + "' />";
                          DocsLinkHTML += displayDocNameWithoutExt;
                          DocsLinkHTML += "<span class='fright'>";
                          DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png' /></a>";
                          DocsLinkHTML += "</span>";
                          return <div className={styles.docholder}><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                        })}
                      </Col>
                      <Col xs={6} md={6} lg={6}>
                        {this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "results").length == 0 ? <div className={styles.emptyholder}>{arrFieldNames[36][1]}: - No Attachment -</div> : this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "results").map((FilterdDocs) => {
                          let DocsLinkHTML = "";
                          let DocName;
                          DocsLinkHTML = arrFieldNames[36][1] + ": ";
                          DocName = FilterdDocs.FileLeafRef;
                          let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                          displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                          let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                          let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + FilterdDocs.FileRef;
                          //DocsLinkHTML += "<img class='docicon' src='" + imageURL + "' />";
                          DocsLinkHTML += displayDocNameWithoutExt;
                          DocsLinkHTML += "<span class='fright'>";
                          DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png' /></a>";
                          DocsLinkHTML += "</span>";
                          return <div className={styles.docholder}><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                        })}
                      </Col>
                    </Row>
                  </fieldset>

                  <fieldset id="fieldsset6" className="infocontainer"><legend className="legend">PHASE - IMPLEMENT</legend>
                    <Row className={styles.acceheader}>{arrFieldNames[37][1]}
                    </Row>
                    <Row className={styles.accecontent} dangerouslySetInnerHTML={createMarkup(this.state.InfluencerNetwork)}>
                    </Row>
                    <Row className={styles.acceheader}>Attachments:
                </Row>
                    <Row>
                      <Col xs={6} md={6} lg={6}>
                        {this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "attach solution design").length == 0 ? <div className={styles.emptyholder}>{arrFieldNames[38][1]}: - No Attachment -</div> : this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "attach solution design").map((FilterdDocs) => {
                          let DocsLinkHTML = "";
                          let DocName;
                          DocsLinkHTML = arrFieldNames[38][1] + ": ";
                          DocName = FilterdDocs.FileLeafRef;
                          let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                          displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                          let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                          let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + FilterdDocs.FileRef;
                          //DocsLinkHTML += "<img class='docicon' src='" + imageURL + "' />";
                          DocsLinkHTML += displayDocNameWithoutExt;
                          DocsLinkHTML += "<span class='fright'>";
                          DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png' /></a>";
                          DocsLinkHTML += "</span>";
                          return <div className={styles.docholder}><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                        })}
                      </Col>
                      <Col xs={6} md={6} lg={6}>
                        {this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "implement attach wireframe").length == 0 ? <div className={styles.emptyholder}>{arrFieldNames[39][1]}: - No Attachment -</div> : this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "implement attach wireframe").map((FilterdDocs) => {
                          let DocsLinkHTML = "";
                          let DocName;
                          DocsLinkHTML = arrFieldNames[39][1] + ": ";
                          DocName = FilterdDocs.FileLeafRef;
                          let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                          displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                          let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                          let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + FilterdDocs.FileRef;
                          //DocsLinkHTML += "<img class='docicon' src='" + imageURL + "' />";
                          DocsLinkHTML += displayDocNameWithoutExt;
                          DocsLinkHTML += "<span class='fright'>";
                          DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png' /></a>";
                          DocsLinkHTML += "</span>";
                          return <div className={styles.docholder}><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                        })}
                      </Col>
                      <Col xs={6} md={6} lg={6}>
                        {this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "attach prototype").length == 0 ? <div className={styles.emptyholder}>{arrFieldNames[40][1]}: - No Attachment -</div> : this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "attach prototype").map((FilterdDocs) => {
                          let DocsLinkHTML = "";
                          let DocName;
                          DocsLinkHTML = arrFieldNames[40][1] + ": ";
                          DocName = FilterdDocs.FileLeafRef;
                          let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                          displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                          let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                          let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + FilterdDocs.FileRef;
                          //DocsLinkHTML += "<img class='docicon' src='" + imageURL + "' />";
                          DocsLinkHTML += displayDocNameWithoutExt;
                          DocsLinkHTML += "<span class='fright'>";
                          DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png' /></a>";
                          DocsLinkHTML += "</span>";
                          return <div className={styles.docholder}><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                        })}
                      </Col>
                      <Col xs={6} md={6} lg={6}>
                        {this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "attach poc results").length == 0 ? <div className={styles.emptyholder}>{arrFieldNames[41][1]}: - No Attachment -</div> : this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "attach poc results").map((FilterdDocs) => {
                          let DocsLinkHTML = "";
                          let DocName;
                          DocsLinkHTML = arrFieldNames[41][1] + ": ";
                          DocName = FilterdDocs.FileLeafRef;
                          let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                          displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                          let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                          let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + FilterdDocs.FileRef;
                          //DocsLinkHTML += "<img class='docicon' src='" + imageURL + "' />";
                          DocsLinkHTML += displayDocNameWithoutExt;
                          DocsLinkHTML += "<span class='fright'>";
                          DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png' /></a>";
                          DocsLinkHTML += "</span>";
                          return <div className={styles.docholder}><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                        })}
                      </Col>
                      <Col xs={6} md={6} lg={6}>
                        {this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "attach technical spec").length == 0 ? <div className={styles.emptyholder}>{arrFieldNames[42][1]}: - No Attachment -</div> : this.state.AllDocuments.filter(Docs => Docs.DocumentType.Title.toLowerCase() == "attach technical spec").map((FilterdDocs) => {
                          let DocsLinkHTML = "";
                          let DocName;
                          DocsLinkHTML = arrFieldNames[42][1] + ": ";
                          DocName = FilterdDocs.FileLeafRef;
                          let displayDocName = DocName.toString().substring(DocName.toString().lastIndexOf('.'), DocName.length);
                          displayDocName = DocName.toString().substring((DocName.toString().indexOf('did') + 3), DocName.length);
                          let displayDocNameWithoutExt = displayDocName.substring(0, displayDocName.lastIndexOf('.'));
                          let downloadurl = "https://sites.ey.com/sites/ProcurementInnovationLab/_layouts/download.aspx?SourceUrl=https://sites.ey.com" + FilterdDocs.FileRef;
                          //DocsLinkHTML += "<img class='docicon' src='" + imageURL + "' />";
                          DocsLinkHTML += displayDocNameWithoutExt;
                          DocsLinkHTML += "<span class='fright'>";
                          DocsLinkHTML += "<a href='" + downloadurl + "'><img class='downloadicon' src='/sites/ProcurementInnovationLab/SiteAssets/ProcurementInnovationLab/Common/downloadicon.png' /></a>";
                          DocsLinkHTML += "</span>";
                          return <div className={styles.docholder}><span dangerouslySetInnerHTML={createMarkup(DocsLinkHTML)} /></div>;
                        })}
                      </Col>
                    </Row>
                  </fieldset>

                </Col>
              </Row>
            </Col>
          </Container >
        </React.Fragment >
      );
    }
    else {
      return <React.Fragment>
        <Container className={styles.ideaDetails + " nopadding"} fluid={true}>

        </Container>
      </React.Fragment>;
    }
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

  public componentDidMount() {
    let IdeaID = this.getParameterByName("iid", this.url);

    let strPhaseID = this.getParameterByName("pid", this.url);
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
    // sp.web.currentUser.get().then((user: any) => {
    //   this.setState({
    //     //CurrentUserEmail: user.Email,
    //     CurrentUser: user
    //   });
    //}).then(() => {
    setTimeout(() => {
      $("#loadingStars").hide();

    }, 2000);
    //});

    if (IdeaID != "" && IdeaID != null && IdeaID != undefined) {
      sp.web.lists.getByTitle("Ideas").items.getById(+IdeaID).select("*, Author/Id,Author/Title,Author/EMail,Influencers/Id,Influencers/Title,Influencers/EMail").expand("Author,Influencers").get().then((item: any) => {
        this.setState({
          CreatedByMail: item.Author.EMail,
          CreatedByName: item.Author.Title,
          CreatedBy: item,
          ProjectDuration: item.ProjectDuration,
          EstimatedCost: item.EstimatedCost,
          IdeasTitle: item.IdeaTitle,
          IdeasDesc: item.IdeaDescription,
          IdeaBD: item.BusinessDrivers,
          IdeaQV: item.QuantitativeValue,
          IdeaBV: item.BrandValue,
          IdeaCV: item.ConstituentValue,
          IdeaPD: item.PrioritizationDescription,
          IdeaImpact: item.ImpactDescription,
          phaseIdFromList: item.PhaseId,
          Impact: item.Impact,
          Effort: item.Effort,
          AllInfluencers: item.Influencers,
          Summary: item.Summary,
          MakevsBuy: item.MakeVsBuy,
          HlCostSummary: item.HighLevelCostSummary,
          TechFeasibility: item.TechFeasibility,
          Approach: item.Approach,
          Wireframe: item.Wireframe,
          TechSpecifications: item.TechnicalSpecifications,
          Stakeholders: item.Stakeholders,
          TestCases: item.Test,
          Pros: item.OutcomesPro,
          Cons: item.OutcomesCon,
          IdeaOutcome: item.Results,
          InfluencerNetwork: item.InfluencerNetwork,
          IdeaID: item.ID
        });
        let strImpact = "";
        let strEffort = "";
        if (this.state.Impact != null && this.state.Effort != null) {
          if (+this.state.Impact >= 5 && +this.state.Effort >= 5) {
            strImpact = "High";
            strEffort = "High";
          }
          else if (+this.state.Impact < 5 && +this.state.Effort >= 5) {
            strImpact = "Low";
            strEffort = "High";
          }
          else if (+this.state.Impact < 5 && +this.state.Effort < 5) {
            strImpact = "Low";
            strEffort = "Low";
          }
          else if (+this.state.Impact >= 5 && +this.state.Effort < 5) {
            strImpact = "High";
            strEffort = "Low";
          }
        }
        else {
          strImpact = "Zero";
          strEffort = "Zero";
        }

        sp.web.lists.getByTitle("Impact Effort Matrix").items.filter("Impact eq '" + strImpact + "' and Effort eq '" + strEffort + "'").top(1).get().then((matrix: any) => {
          this.setState({
            AssessmentMatrix: matrix[0].Title
          });
        }).catch(e => {
          console.error(`Error while getting Impact Effort Matrix - ${e}`);
        });

      }).catch(e => {
        console.error("Error while getting Tasks - " + e);
      }).then(() => {

        sp.web.lists.getByTitle("Idea Submission Fields").items.get().then((fields: any) => {
          this.setState({
            AllFieldNames: fields
          });
        }).catch(e => {
          console.error(`Error while getting Idea fields - ${e}`);
        });
      }).then(() => {

        sp.web.lists.getByTitle("Ideas Documents").items.select("*", "EncodedAbsUrl", "FileRef", "FileLeafRef", "DocumentType/ID", "DocumentType/Title", "Idea/ID").expand("DocumentType/ID", "Idea/ID").filter("Idea/ID eq " + this.state.IdeaID).get().then((documents: any) => {
          this.setState({ AllDocuments: documents });
        }).catch(err => {
          console.error("Error while getting documents - " + err);
        });
      }).then(n => {
        sp.web.lists.getByTitle("Phase").items.getById(+this.state.phaseIdFromList).get().then((item: any) => {
          this.setState({
            PhaseNavigator: item.Title
          });
        }).catch(er => {
          console.error("Error while getting Phases - " + er);
        }).then(() => {
          sp.web.lists.getByTitle("Idea Status").items.get().then((status: any) => {
            this.setState({
              AllIdeaStatus: status
            });
          }).catch(e => {
            console.error(`Error while getting Idea fields - ${e}`);
          }).then(() => {

            sp.web.siteGroups.getByName('InnovationTeamAdmin').users.get().then((users: any) => {
              this.setState({
                AllAdmins: users
              });

            });
          });
        });
      });
    }
  }
}
