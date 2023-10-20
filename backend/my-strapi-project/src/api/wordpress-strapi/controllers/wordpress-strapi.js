'use strict';

/**
 * wordpress-strapi controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wordpress-strapi.wordpress-strapi');
