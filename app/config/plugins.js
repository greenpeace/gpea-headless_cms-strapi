// ./config/plugins.js
module.exports = ({ env }) => ({
  "content-versioning": {
    enabled: true,
  },
  ckeditor: {
    enabled: true,
    config: {
      plugin: {
        styles: `
        .ck-dropdown__panel {
          max-width: 440px !important;
        }`,
      },
      editor: {
        // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html
        toolbar: {
          items: [
            "undo",
            "redo",
            "|",
            "paragraph",
            "heading1",
            "heading2",
            "heading",
            "fontSize",
            "|",
            "bold",
            "italic",
            "link",
            "fontColor",
            "fontBackgroundColor",
            "underline",
            "blockQuote",
            "bulletedList",
            "numberedList",
            "alignment",
            "horizontalLine",
            "|",
            "StrapiMediaLib",
            "insertImage",
            "insertTable",
            "mediaEmbed",
            "htmlEmbed",
            "sourceEditing",
            "code",
            "codeBlock",
            "subscript",
            "superscript",
            "fullScreen",
          ],
        },
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-paragraph",
            },
            {
              model: "small",
              view: "small",
              title: "Small text",
              class: "ck-small",
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading3",
            },
          ],
        },
        htmlSupport: {
          allow: [
            {
              name: "img",
              attributes: {
                sizes: true,
                loading: true,
              },
            },
          ],
        },
      },
    },
  },
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});
