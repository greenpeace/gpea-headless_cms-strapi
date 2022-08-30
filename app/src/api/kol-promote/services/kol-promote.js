'use strict';

/**
 * kol-promote service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::kol-promote.kol-promote');
