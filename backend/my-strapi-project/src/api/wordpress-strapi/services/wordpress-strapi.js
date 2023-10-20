'use strict';

/**
 * wordpress-strapi service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wordpress-strapi.wordpress-strapi');
