import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'HomeComponentWebPartStrings';
import HomeComponent from './components/HomeComponent';
import { IHomeComponentProps } from './components/IHomeComponentProps';

import { sp } from "@pnp/sp";

export interface IHomeComponentWebPartProps {
  description: string;
}

export default class HomeComponentWebPart extends BaseClientSideWebPart<IHomeComponentWebPartProps> {
  public onInit(): Promise<void> {
    return super.onInit().then(() => {
      sp.setup({ spfxContext: this.context });
    });
  }
  public render(): void {
    const element: React.ReactElement<IHomeComponentProps> = React.createElement(
      HomeComponent,
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
