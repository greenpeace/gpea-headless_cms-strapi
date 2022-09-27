'use strict';
var showdown = require('showdown');

function gql(chunks, ...variables) {
  return chunks.reduce(
    (accumulator, chunk, index) => `${accumulator}${chunk}${index in variables ? variables[index] : ''}`,
    ''
  )
}

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extension = ({ nexus }) => ({
      types: [
        nexus.extendType({

          type: "Product",
          definition: t => {
            t.string("contentHTML", {
              description: "content 的 HTML 版",
              resolve: (root, args, ctx) => {
                if (!root.content) return '';
                const converter = new showdown.Converter();
                return converter.makeHtml(root.content);
              },
            });
          },

        }),

      ],

      typeDefs: gql`

        extend type Query {
          shoppingRecordByKey(key: String!): ShortShoppingRecord
        }

        extend type Mutation {
          websign(
            email: String!
            firstName: String!
            lastName: String!
            birthYear: Int
            mobilePhone: String
            address: String!
            campaignData1: String
            campaignData2: String
            campaignData3: String
            campaignData4: String
            utmData: UtmData
          ): WebsignResponse

          sync(
            key: String!
            products: String
            utmData: UtmData
          ): String
        }

        input UtmData {
          utmCampaign: String
          utmContent: String
          utmMedium: String
          utmSource: String
          utmTerm: String
          completionURL: String
        }

        type WebsignResponse {
          message: String
          mode: String
          key: String
        }

        type ShortShoppingRecord {
          cartItems: [String]
          email: String!
          firstName: String!
          lastName: String!
          birthYear: Int
          mobilePhone: String
          address: String!
        }
      `,

      resolvers: {
        Query: {
          shoppingRecordByKey: {
            description: "查詢購物紀錄",
            async resolve(parent, args, ctx) {

              const record = await strapi.controller('api::shopping-record.shopping-record').findByKey(args.key);

              if (record) {
                return {
                  cartItems: (record.campaignData4 || '').split(','),
                  email: record.email,
                  firstName: record.firstName,
                  lastName: record.lastName,
                  birthYear: record.birthYear,
                  mobilePhone: record.mobilePhone,
                  address: record.address,
                }
              }

              return []
            }
          }
        },

        Mutation: {

          websign: {
            description: "websign",
            async resolve(parent, args, ctx) {
              const { mode, data } = await strapi.controller("api::shopping-record.shopping-record").createOrUpdate(args);
              return {
                message: 'ok',
                mode,
                key: data.key
              };
            },
          },

          sync: {
            description: "同步購物紀錄",
            async resolve(parent, args, ctx) {
              const result = await strapi.controller('api::shopping-record.shopping-record')
                .updateCampaignData4ByKey(args.key, args.products, args.utmData);

              return result ? 'ok' : 'fail';
            }
          }

        },

      },

      resolversConfig: {
        "Query.shoppingRecordByKey": {
          auth: false
        },
        "Mutation.websign": {
          auth: false,
        },
        "Mutation.sync": {
          auth: false,
        },
      },

    });

    strapi.plugin("graphql").service("extension").use(extension);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) { },
};
