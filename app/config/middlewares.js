module.exports = ({ env }) => [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "'unsafe-inline'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "res.cloudinary.com",
            "lh3.googleusercontent.com", // google avatars
            "platform-lookaside.fbsbx.com", // facebook avatars
            "dl.airtable.com", // strapi marketplace
            "greenpeace.org",
            "api.greenpeace.org.hk",
            "change.greenpeace.org.tw",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "res.cloudinary.com",
            "lh3.googleusercontent.com", // google avatars
            "platform-lookaside.fbsbx.com", // facebook avatars
            "dl.airtable.com", // strapi marketplace
            "greenpeace.org",
            "api.greenpeace.org.hk",
            "change.greenpeace.org.tw",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
