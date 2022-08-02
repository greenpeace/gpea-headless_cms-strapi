'use strict';

/**
 * issue service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::issue.issue');
