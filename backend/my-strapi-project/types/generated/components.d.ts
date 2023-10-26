import type { Schema, Attribute } from '@strapi/strapi';

export interface OpengraphImageOpengraphImage extends Schema.Component {
  collectionName: 'components_opengraph_image_opengraph_images';
  info: {
    displayName: 'opengraphImage';
  };
  attributes: {
    sourceUrl: Attribute.String;
  };
}

export interface SeoSeo extends Schema.Component {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'seo';
    icon: 'cup';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    metaDesc: Attribute.Text;
    canonical: Attribute.String;
    opengraphTitle: Attribute.Text;
    opengraphDescription: Attribute.Text;
    opengraphImage: Attribute.Component<'opengraph-image.opengraph-image'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'opengraph-image.opengraph-image': OpengraphImageOpengraphImage;
      'seo.seo': SeoSeo;
    }
  }
}
