'use strict';

/**
 * product-bundle service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::product-bundle.product-bundle');
