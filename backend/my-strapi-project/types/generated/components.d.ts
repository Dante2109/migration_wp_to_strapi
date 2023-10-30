import type { Schema, Attribute } from '@strapi/strapi';

export interface AuthorAuthor extends Schema.Component {
  collectionName: 'components_author_authors';
  info: {
    displayName: 'author';
    description: '';
  };
  attributes: {
    avatar: Attribute.Component<'avatar.avatar'>;
    email: Attribute.String;
    name: Attribute.String;
    firstName: Attribute.String;
    lastName: Attribute.String;
  };
}

export interface AvatarAvatar extends Schema.Component {
  collectionName: 'components_avatar_avatars';
  info: {
    displayName: 'avatar';
  };
  attributes: {
    url: Attribute.Text;
  };
}

export interface FeaturedImageFeaturedImage extends Schema.Component {
  collectionName: 'components_featured_image_featured_images';
  info: {
    displayName: 'featuredImage';
  };
  attributes: {
    sourceUrl: Attribute.Text;
    altText: Attribute.String;
  };
}

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
      'author.author': AuthorAuthor;
      'avatar.avatar': AvatarAvatar;
      'featured-image.featured-image': FeaturedImageFeaturedImage;
      'opengraph-image.opengraph-image': OpengraphImageOpengraphImage;
      'seo.seo': SeoSeo;
    }
  }
}
