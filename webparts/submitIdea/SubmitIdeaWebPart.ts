import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SubmitIdeaWebPartStrings';
import SubmitIdea from './components/SubmitIdea';
import { ISubmitIdeaProps } from './components/ISubmitIdeaProps';
import { sp } from "@pnp/sp";
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface ISubmitIdeaWebPartProps {
  description: string;
  context: WebPartContext;
}

export default class SubmitIdeaWebPart extends BaseClientSideWebPart<ISubmitIdeaWebPartProps> {
  public onInit(): Promise<void> {
    return super.onInit().then(() => {
      sp.setup({ spfxContext: this.context });
    });
  }
  public render(): void {
    const element: React.ReactElement<ISubmitIdeaProps> = React.createElement(
      SubmitIdea,
      {
        description: this.properties.description,
        context: this.context
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
