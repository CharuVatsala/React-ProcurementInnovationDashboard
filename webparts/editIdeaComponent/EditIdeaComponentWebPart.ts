import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'EditIdeaComponentWebPartStrings';
import EditIdeaComponent from './components/EditIdeaComponent';
import { IEditIdeaComponentProps } from './components/IEditIdeaComponentProps';
import { sp } from "@pnp/sp";
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IEditIdeaComponentWebPartProps {
  description: string;
  context: WebPartContext;
}

export default class EditIdeaComponentWebPart extends BaseClientSideWebPart<IEditIdeaComponentWebPartProps> {
  public onInit(): Promise<void> {
    return super.onInit().then(() => {
      sp.setup({ spfxContext: this.context });
    });
  }
  public render(): void {
    const element: React.ReactElement<IEditIdeaComponentProps> = React.createElement(
      EditIdeaComponent,
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
