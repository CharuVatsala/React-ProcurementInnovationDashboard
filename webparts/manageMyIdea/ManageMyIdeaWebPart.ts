import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ManageMyIdeaWebPartStrings';
import ManageMyIdea from './components/ManageMyIdea';
import { IManageMyIdeaProps } from './components/IManageMyIdeaProps';
import { sp } from "@pnp/sp";

export interface IManageMyIdeaWebPartProps {
  description: string;
}

export default class ManageMyIdeaWebPart extends BaseClientSideWebPart<IManageMyIdeaWebPartProps> {
  public onInit(): Promise<void> {
    return super.onInit().then(() => {
      sp.setup({ spfxContext: this.context });
    });
  }
  public render(): void {
    const element: React.ReactElement<IManageMyIdeaProps> = React.createElement(
      ManageMyIdea,
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
