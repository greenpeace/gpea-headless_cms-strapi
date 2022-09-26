// plugins.js
module.exports = () => {
  return {
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
              "heading3",
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
  };
};
