import * as React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, Image, ButtonToolbar } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";

import "../CSS/Common.css";
import "../CSS/TopNavigation.css";
import "../CSS/preloader.css";
import "../CSS/PILContent.css";
import "bootstrap/dist/css/bootstrap.css";
import { Item } from '@pnp/sp/items';
import { sp } from "@pnp/sp/presets/all";
interface IState {
  view: string;
  DropDownItems: any[];
  showData: boolean;
  CurrentUserEmailID: string;
  AllAdmins: any[];
}


const LinkConfigs =
  [
    {
      title: 'Home',
      path: '/Home.aspx',
      eventKey: 'Home',
      tooltip: 'Home'
    },
    {
      title: 'Submit',
      path: '/SubmitIdea.aspx',
      eventKey: 'Submit',
      tooltip: 'Submit'
    },
    {
      title: 'Manage',
      path: '/Manage.aspx',
      eventKey: 'Manage',
      tooltip: 'Manage'
    },
    {
      title: 'Inspiration',
      path: '/Inspiration.aspx',
      eventKey: 'Inspiration',
      tooltip: 'Inspiration'
    },
    {
      title: 'About',
      path: '/About.aspx',
      eventKey: 'About',
      tooltip: 'About'
    }/* ,
    {
      title: 'Drawing Board',
      path: '/Drawing-Board.aspx',
      eventKey: 'Drawing Board',
      tooltip: 'Drawing Board'
    } */
  ];

class Header extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      view: 'Home',
      DropDownItems: [],
      showData: false,
      CurrentUserEmailID: "",
      AllAdmins: []
    };
  }
  public onChange(tab: string) {
    //console.log("N", tab);
    this.setState({ view: tab }, () => {
      //console.log("L", this.state.view);
    });
  }
  public render() {
    var siteFullURL = window.location.pathname;
    var sitePagesURL = siteFullURL.substring(0, siteFullURL.lastIndexOf('/'));
    var siteRelURL = siteFullURL.substring(0, siteFullURL.toLowerCase().lastIndexOf('/sitepages/'));
    var dboard = siteRelURL + "/SitePages/Drawing-Board.aspx";
    var dboardImg = siteRelURL + "/SiteAssets/ProcurementInnovationLab/Images/DrawingBoard.svg";
    var setting = siteRelURL + "/_layouts/15/viewlsts.aspx";
    var settingImg = siteRelURL + "/SiteAssets/ProcurementInnovationLab/Images/gear.png";
    const handleSelect = eventKey => this.onChange(eventKey);
    let flgAccess = 0;
    if (this.state.AllAdmins != undefined && this.state.AllAdmins.length > 0) {
      this.state.AllAdmins.map((admin) => {
        if (this.state.CurrentUserEmailID.toLowerCase() === admin.Email.toLowerCase()) {
          flgAccess = 1;
        }
      });
    }

    return (
      <BrowserRouter basename={sitePagesURL}>

        <Navbar className="navbar-cover navbar-background" expand="lg">
          <Navbar.Brand className="navbar-brand-style">
            <a href={siteRelURL + "/Sitepages/Home.aspx"}><Image
              className="image-cover"
              src={
                siteRelURL +
                '/SiteAssets/ProcurementInnovationLab/Images/ey_logo.png'
              }
            /></a>
            <span className="navbar-brand-head-style">Procurement Innovation Lab</span>
          </Navbar.Brand>
          <Navbar.Collapse className="navbar-collapse-cover" id="basic-navbar-nav">

            <Nav
              fill

              onSelect={handleSelect}
            >

              {LinkConfigs.map(link => (
                <OverlayTrigger
                  key='bottom'
                  placement='bottom'
                  trigger="hover"
                  overlay={
                    <Tooltip style={{ display: 'none' }} id={`tooltip-bottom`}>

                    </Tooltip>
                  }
                >
                  <Nav.Link activeClassName="link-style-active" className="link-style" eventKey={link.eventKey} as={NavLink} to={link.path} >{link.title}</Nav.Link>
                </OverlayTrigger>
              ))}
              {flgAccess == 1 ? <a id="drawingBoard" href={dboard} title="DrawingBoard"><img className="DboardImg" src={dboardImg} /></a> : ""}
              {flgAccess == 1 ? <a id="settings" href={setting} title="Site Content"><img className="DboardImg" src={settingImg} /></a> : ""}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

      </BrowserRouter>
    );
  }

  public componentDidMount() {
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

    sp.web.siteGroups.getByName('InnovationTeamAdmin').users.get().then((users: any) => {
      this.setState({
        AllAdmins: users
      });
    });
  }
}
export default Header;
