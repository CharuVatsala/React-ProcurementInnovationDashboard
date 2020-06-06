import * as React from 'react';
import styles from './TeamDetails.module.scss';
import { ITeamDetailsProps } from './ITeamDetailsProps';
import { escape } from '@microsoft/sp-lodash-subset';

//These are the components references
import InitialLoad from '../../../Public/TS/PreLoader';
import Header from '../../../Public/TS/Header';
import { Container, Col, Row, Button } from 'react-bootstrap';
import * as jQuery from 'jquery';
require('jquery');
require('Particleground');
import 'react-app-polyfill/ie11';
import { sp } from '@pnp/sp/presets/all';

function createMarkup(content) {
  return {
    __html: content
  };
}

export interface HomeStates {
  TeamDetails: any[];
  Descriptions: any[];
}

export default class TeamDetails extends React.Component<
  ITeamDetailsProps,
  HomeStates
  > {
  public constructor(props) {
    super(props);
    this.state = {
      TeamDetails: [],
      Descriptions: []
    };
  }

  public render(): React.ReactElement<ITeamDetailsProps> {
    let siteFullURL = window.location.href;
    let siteRelURL = siteFullURL.substring(
      0,
      siteFullURL.toLowerCase().lastIndexOf('/sitepages/')
    );

    return (
      <React.Fragment>
        <InitialLoad />
        <Container
          id="homecomponent"
          className={styles.teamDetails + ' nopadding'}
          fluid={true}
        >
          <Col
            xs={12}
            md={12}
            lg={12}
            id="firstsection"
            className={styles.introdiv + ' firstSectionContents'}
          >
            <Row className={styles.positions}>
              <Header />
            </Row>
            <Row>
              <Col xs={12} md={12} lg={12} className={styles.bgcolor}>
                <Col xs={12} md={12} lg={12} className={styles.intropageHead}>
                  <Row>
                    <h2>
                      <span>
                        {this.state.Descriptions.filter(filtered => filtered.Title.toLowerCase() == "innovation team").map((item, key) => {
                          return item.PageTitle;
                        })
                        }
                      </span>
                    </h2>

                    {this.state.Descriptions.filter(filtered => filtered.Title.toLowerCase() == "innovation team").map((item, key) => {
                      return (
                        <Col xs={12} md={12} lg={12} className={styles.smpaddingHeader}
                          dangerouslySetInnerHTML={{
                            __html: item.Description
                          }}
                        ></Col>
                      );
                    }
                    )}
                  </Row>
                  <Row>
                    {/* <Col xs={7} md={7} lg={7}> */}
                    {this.state.TeamDetails.filter(filteredMembers => filteredMembers.InnovationTeam == true).map((item, key) => {
                      let userProfileUrl = "";
                      if (item.DisplayImage != null && item.DisplayImage != "") {
                        userProfileUrl = siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/DisplayImage/' + item.DisplayImage;
                      }
                      else {
                        userProfileUrl = 'https://sites.ey.com/_layouts/15/userphoto.aspx?size=L&username=' +
                          item.TeamMember.EMail;
                      }
                      const divStyle = {
                        backgroundImage: 'url(' + userProfileUrl + ')'
                      };
                      return (
                        <Col xs={2} md={2} lg={2}>
                          <a
                            href={
                              'https://people.ey.com/Person.aspx?user=' +
                              item.TeamMember.EMail
                            }
                            target="_blank"
                          >
                            <img
                              className={styles.profileimage}
                              src={userProfileUrl}
                              alt={item.TeamMember.Title}
                            />
                          </a>
                          <div className={styles.leadtitle}>
                            <a
                              href={
                                'https://people.ey.com/Person.aspx?user=' +
                                item.TeamMember.EMail
                              }
                              target="_blank"
                            >{item.TeamMember.Title}</a>
                          </div>
                          <div className={styles.leadDesign}>
                            {item.Title}
                          </div>
                        </Col>
                      );
                    })}
                    <Col xs={1} md={1} lg={1}></Col>
                    <Col xs={6} md={6} lg={6} className={styles.introHeaderQuote}>
                      {/*  <a href={siteRelURL + '/Shared%20Documents/Procurement%20Innovation%20Process.pdf'}><img
                        className={styles.innovationHeaderimg}
                        src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/InnovationHeaderTeams.PNG'} /></a>  */}
                      {this.state.Descriptions.map((items, key) => {
                        if (items.Title == 'Innovation Quote') {
                          return (
                            <Col
                              xs={12}
                              md={12}
                              lg={12}
                              dangerouslySetInnerHTML={createMarkup(
                                items.Description
                              )}
                            ></Col>
                          );
                        }
                      })}
                    </Col>
                  </Row>
                </Col>

                <Col xs={12} md={12} lg={12} className={styles.teamsdiv}>
                  <Row className={styles.margins}>
                    <Col xs={6} md={6} lg={6}>
                      <img
                        className={styles.setWin}
                        src={siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/ReadySetWin.png'} />
                    </Col>
                    <Col xs={6} md={6} lg={6}>
                      <Col xs={12} md={12} lg={12} className={styles.teamheaders + " " + styles.nopadding}>
                        <h2>
                          <span>Strategy</span>
                        </h2>
                      </Col>
                      <Row>
                        {this.state.Descriptions.map((items, key) => {
                          if (items.Title == 'Strategy') {
                            return (
                              <Col
                                xs={12}
                                md={12}
                                lg={12}
                                className={styles.smpadding}
                                dangerouslySetInnerHTML={createMarkup(
                                  items.Description
                                )}
                              ></Col>
                            );
                          }
                        })}

                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col xs={12} md={12} lg={12} className={styles.teamsdiv}>
                  <h2 className={styles.smmargintop}>
                    <span>
                      {this.state.Descriptions.filter(filtered => filtered.Title.toLowerCase() == "innovation network").map((item, key) => {
                        return item.PageTitle;
                      })
                      }
                    </span>
                  </h2>
                  <Row>
                    {this.state.Descriptions.map((items, key) => {
                      if (items.Title == 'Innovation Network') {
                        return (
                          <Col
                            xs={12}
                            md={12}
                            lg={12}
                            className={styles.smpadding}
                            dangerouslySetInnerHTML={createMarkup(
                              items.Description
                            )}
                          ></Col>
                        );
                      }
                    })}

                  </Row>
                  <Row className={styles.teamMargin}>
                    <Col
                      xs={3}
                      md={3}
                      lg={3}
                      className={styles.teamheaders}
                    >
                      {this.state.TeamDetails.filter(filteredMembers => filteredMembers.InnovationNetwork == true).map((item, key) => {
                        let userProfileUrl = "";
                        if (item.Leader == true) {
                          if (item.DisplayImage != null && item.DisplayImage != "") {
                            userProfileUrl = siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/DisplayImage/' + item.DisplayImage;
                          }
                          else {
                            userProfileUrl = 'https://sites.ey.com/_layouts/15/userphoto.aspx?size=L&username=' +
                              item.TeamMember.EMail;
                          }
                          const divStyle = {
                            backgroundImage: 'url(' + userProfileUrl + ')'
                          };
                          return (
                            <Row>
                              <Col xs={12} md={12} lg={12} className={styles.tcenter}>
                                <a
                                  href={
                                    'https://people.ey.com/Person.aspx?user=' +
                                    item.TeamMember.EMail
                                  }
                                  target="_blank"
                                >
                                  <img
                                    className={styles.profileleaderimage}
                                    src={userProfileUrl}
                                    alt={item.TeamMember.Title}
                                  />
                                </a>
                                <div className={styles.leadtitle}>
                                  <a
                                    href={
                                      'https://people.ey.com/Person.aspx?user=' +
                                      item.TeamMember.EMail
                                    }
                                    target="_blank"
                                  >{item.TeamMember.Title}</a>
                                </div>
                                <div className={styles.leadDesign}>
                                  {item.Title}
                                </div>
                              </Col>
                            </Row>
                          );
                        }
                      })}
                    </Col>
                    <Col
                      xs={9}
                      md={9}
                      lg={9}
                      className={styles.teamheaders}
                    >
                      <Row>
                        {this.state.TeamDetails.filter(filteredMembers => filteredMembers.InnovationNetwork == true).map((item, key) => {
                          let userProfileUrl = "";
                          if (item.Leader == false) {
                            if (item.DisplayImage != null && item.DisplayImage != "") {
                              userProfileUrl = siteRelURL + '/SiteAssets/ProcurementInnovationLab/Images/DisplayImage/' + item.DisplayImage;
                            }
                            else {
                              userProfileUrl = 'https://sites.ey.com/_layouts/15/userphoto.aspx?size=L&username=' +
                                item.TeamMember.EMail;
                            }
                            const divStyle = {
                              backgroundImage: 'url(' + userProfileUrl + ')'
                            };
                            return (
                              <Col xs={4} md={4} lg={4} className={styles.profilewrapper}>
                                <Col xs={5} md={5} lg={5}>
                                  <a
                                    href={
                                      'https://people.ey.com/Person.aspx?user=' +
                                      item.TeamMember.EMail
                                    }
                                    target="_blank"
                                  >
                                    <img
                                      className={styles.profilenetworkimage}
                                      src={userProfileUrl}
                                      alt={item.TeamMember.Title}
                                    />
                                  </a>
                                </Col>
                                <Col xs={7} md={7} lg={7}>
                                  <div className={styles.profiletitle}>
                                    <a
                                      href={
                                        'https://people.ey.com/Person.aspx?user=' +
                                        item.TeamMember.EMail
                                      }
                                      target="_blank"
                                    > {item.TeamMember.Title}</a>
                                  </div>
                                  <div className={styles.profiledesgn}>
                                    {item.Title}
                                  </div>
                                </Col>
                              </Col>
                            );
                          }
                        })}
                      </Row>
                    </Col>
                  </Row>


                  {/*   <Row className={styles.margins}>
                  {this.state.Descriptions.map((items, key) => {
                    if (items.Title == 'Innovation ContactUs') {
                      return (
                        <Col
                          xs={12}
                          md={12}
                          lg={12}
                          className={styles.smpadding}
                          dangerouslySetInnerHTML={createMarkup(
                            items.Description
                          )}
                        ></Col>
                      );
                    }
                  })}

                </Row> */}
                </Col>

              </Col>
            </Row>
          </Col>
        </Container>
      </React.Fragment >
    );
  }
  public componentDidMount() {
    sp.web.lists
      .getByTitle('Team Details')
      .items.select('*, TeamMember/Id,TeamMember/Title, TeamMember/EMail')
      .expand('TeamMember')
      .orderBy('OrderOfAppearance')
      .get()
      .then((item: any) => {
        this.setState({
          TeamDetails: item
        });
      })
      .catch((e) => {
        console.error(`Error while getting Team details - ${e}`);
      })
      .then(() => {
        setTimeout(() => {
          $('#loadingStars').hide();
        }, 2000);
      });
    sp.web.lists
      .getByTitle('Descriptions')
      .items.get()
      .then((item: any) => {
        this.setState({
          Descriptions: item
        });
      })
      .catch((e) => {
        console.error(`Error while getting Descriptions - ${e}`);
      });
  }
}
