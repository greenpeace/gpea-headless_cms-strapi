'use strict';

/**
 *  shopping-record controller
 */

// import got from 'got';
const got = require('got');
const FormData = require('form-data');

const { createCoreController } = require('@strapi/strapi').factories;

const uid = 'api::shopping-record.shopping-record';

module.exports = createCoreController(uid, ({ strapi }) => ({
  async createOrUpdate({email, ...args}) {

    const results = await strapi.entityService.findMany(uid, {
      filters: { email },
    });

    let mode = '';
    let data = null;

    args.campaignData3 = await getProductsName(args.campaignData4);

    if (results.length === 0) {

      let rndKey = '';
      let existSameKeyResults = [];

      do {
        rndKey = makeId(8);
        existSameKeyResults = await strapi.entityService.findMany(uid, {
          filters: { key: rndKey },
        });
      } while (existSameKeyResults.length > 0);

      data = {email, ...args, key: rndKey};
      mode = 'create';
      await strapi.entityService.create(uid, { data })
    }
    else {
      data = { ...results[0], ...args };
      mode = 'update';
      await strapi.entityService.update(uid, results[0].id, { data })
    }

    postWebsign(data);

    return { mode, data };
  },

  async findByKey(key) {
    const { results } = await strapi.service(uid).find({
      filters: { key: key }
    })

    return results?.[0] || null;
  },

  async updateCampaignData4ByKey(key, campaignData4) {
    const { results } = await strapi.service(uid).find({
      filters: { key: key }
    })

    const record = results?.[0];
    if (record) {

      const res = await strapi.service(uid).update(record.id, { data: {
        campaignData3: await getProductsName(campaignData4),
        campaignData4
      }})

      postWebsign(res);

      return res.campaignData4 == campaignData4;
    }

    return false;
  }

}));

function makeId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function getProductsName(productsString = '') {
  const productsId = productsString.split(',');
  if (productsId.length === 0) return '';

  const { results: products } = await strapi.service('api::product.product').find({ pagination: { limit: 100, start: 0 }});

  const mappedProducts = productsId.map( id => {
    const product = products.find(product => product.id == id);
    return product?.name;
  });

  return mappedProducts.filter(item => item).join(',');
}

async function postWebsign(data) {
  const formData = new FormData();

  data.id = undefined;
  data.createAt = undefined;
  data.updateAt = undefined;

  Object.keys(data).forEach(key => {
    if (data[key])
      formData.append(capitalizeFirstLetter(key), data[key]);
  });

  formData.append('CampaignId', process.env.CRM_CAMPAIGN_ID);
  formData.append('CampaignData5', data.key);

  const res = await got.post(process.env.CRM_ENDPOINT, {
    form: formData
  });

  console.log(formData, res.body)
}
