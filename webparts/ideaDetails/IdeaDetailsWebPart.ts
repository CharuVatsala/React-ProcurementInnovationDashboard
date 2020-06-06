import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'IdeaDetailsWebPartStrings';
import IdeaDetails from './components/IdeaDetails';
import { IIdeaDetailsProps } from './components/IIdeaDetailsProps';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
export interface IIdeaDetailsWebPartProps {
  description: string;
}

export default class IdeaDetailsWebPart extends BaseClientSideWebPart<IIdeaDetailsWebPartProps> {
 /*  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  } */

  public onInit(): Promise<void> {
    debugger;
    return super.onInit().then(() => {
      sp.setup({ spfxContext: this.context });
    });
  }
  
  public render(): void {
    const element: React.ReactElement<IIdeaDetailsProps> = React.createElement(
      IdeaDetails,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
