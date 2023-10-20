'use strict';

/**
 * wordpress-strapi router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::wordpress-strapi.wordpress-strapi');
