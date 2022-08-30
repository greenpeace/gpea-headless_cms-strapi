'use strict';

/**
 * product service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::product.product', ({ strapi }) => ({
  async find(...args) {

    const { results, pagination } = await super.find(...args);

    // // some custom logic
    // results.forEach(result => {
    //   result.counter = 1;
    // });

    return { results, pagination };
  },

}));
