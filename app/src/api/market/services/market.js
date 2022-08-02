'use strict';

/**
 * market service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::market.market');
