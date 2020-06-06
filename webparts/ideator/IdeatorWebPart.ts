import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'IdeatorWebPartStrings';
import Ideator from './components/Ideator';
import { IIdeatorProps } from './components/IIdeatorProps';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
export interface IIdeatorWebPartProps {
  description: string;
}

export default class IdeatorWebPart extends BaseClientSideWebPart<IIdeatorWebPartProps> {
    public onInit(): Promise<void> {
        return super.onInit().then(() => {
          sp.setup({ spfxContext: this.context });
        });
      } 
  public render(): void {
    const element: React.ReactElement<IIdeatorProps > = React.createElement(
      Ideator,
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
