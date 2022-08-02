'use strict';

/**
 * issue router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::issue.issue');
