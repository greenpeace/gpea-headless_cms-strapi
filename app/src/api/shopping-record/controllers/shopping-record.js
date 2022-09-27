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
  async createOrUpdate({email, utmData, ...args}) {

    const results = await strapi.entityService.findMany(uid, {
      filters: { email },
    });

    let mode = '';
    let data = {
        campaignData1: null,
        ...(results[0] ?? {}),
        campaignData2: args.campaignData2 ?? null,
        campaignData3: null,
        campaignData4: args.campaignData4 ?? null,
    };

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

      data = { ...data, email, ...args, key: rndKey};
      mode = 'create';
      await strapi.entityService.create(uid, { data })
    }
    else {
      data = { ...data, ...args };
      mode = 'update';
      await strapi.entityService.update(uid, results[0].id, { data })
    }

    postWebsign(data, utmData);

    return { mode, data };
  },

  async findByKey(key) {
    const { results } = await strapi.service(uid).find({
      filters: { key: key }
    })

    return results?.[0] || null;
  },

  async updateCampaignData4ByKey(key, campaignData4, utmData) {
    const { results } = await strapi.service(uid).find({
      filters: { key: key }
    })

    const record = results?.[0];
    if (record) {

      const res = await strapi.service(uid).update(record.id, { data: {
        campaignData3: await getProductsName(campaignData4),
        campaignData4
      }})

      postWebsign(res, utmData);

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

async function postWebsign(data, utmData) {
  const formData = new FormData();

  let dataObj = {};

  data.id = undefined;
  data.createAt = undefined;
  data.updateAt = undefined;
  data.campaignId = process.env.CRM_CAMPAIGN_ID;
  data.campaignData5 = data.key
  data.optIn = true;
  data.birthdate = data.birthYear && `${data.birthYear}-01-01`;

  data.campaignData1__c = data.campaignData1;
  data.campaignData2__c = data.campaignData2;
  data.campaignData3__c = data.campaignData3;
  data.campaignData4__c = data.address;
  data.campaignData5__c = data.key;

  if (utmData) {
    data = { ...data, ...utmData };
  }

  Object.keys(data).forEach(key => {
    if (data[key]) {
      dataObj[capitalizeFirstLetter(key)] = data[key];
      formData.append(capitalizeFirstLetter(key), data[key]);
    }
  });

  console.log(process.env.CRM_ENDPOINT, dataObj)

  try {

    const res = await got.post(process.env.CRM_ENDPOINT, {
      form: dataObj
    });
    console.log(res.body);

  }
  catch (e) {
    console.error(e);
  }

}
