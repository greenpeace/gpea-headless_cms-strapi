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
            "paragraph",
            "heading1",
            "heading2",
            "heading3",
            "heading",
            "|",
            "fontSize",
            "fontColor",
            "fontBackgroundColor",
            "highLight",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "subscript",
            "superscript",
            "removeFormat",
            "code",
            "link",
            "|",
            "insertImage",
            "strapiMediaLib",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "alignment",
            "indent",
            "outdent",
            "blockQuote",
            "horizontalLine",
            "|",
            "insertTable",
            "mediaEmbed",
            "htmlEmbed",
            "codeBlock",
            "|",
            "sourceEditing",
            "|",
            "fullScreen",
            "undo",
            "redo",
          ],
          shouldNotGroupWhenFull: true,
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
        htmlEmbed: {
          showPreviews: true,
          sanitizeHtml: (inputHtml) => {
            const outputHtml = sanitizeHtml(inputHtml);
            return {
              html: outputHtml,
              hasChanged: true,
            };
          },
        },
        htmlSupport: {
          allow: [
            {
              name: /.*/,
              attributes: true,
              classes: true,
              styles: true,
            },
          ],
        },
        image: {
          styles: ["alignLeft", "alignCenter", "alignRight"],
          resizeOptions: [
            {
              name: "resizeImage:original",
              value: null,
              icon: "original",
            },
            {
              name: "resizeImage:50",
              value: "50",
              icon: "medium",
            },
            {
              name: "resizeImage:75",
              value: "75",
              icon: "large",
            },
          ],
          toolbar: [
            "imageStyle:alignLeft",
            "imageStyle:alignCenter",
            "imageStyle:alignRight",
            "|",
            "imageTextAlternative",
            "|",
            "resizeImage:50",
            "resizeImage:75",
            "resizeImage:original",
            "|",
            "linkImage",
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
