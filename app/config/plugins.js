module.exports = () => {
  return {
    ckeditor: {
      enabled: true,
      config: {
        plugin: {
          styles: `
        .ck-dropdown__panel {
          max-width: 480px;
        }`,
        },
        editor: {
          removePlugins: [""],
          // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html
          toolbar: {
            items: [
              "undo",
              "redo",
              "|",
              "heading",
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
              "strikethrough",
              "specialCharacters",
              "fullScreen",
            ],
          },
          // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html
          heading: {
            options: [
              {
                model: "paragraph",
                title: "Paragraph",
                class: "ck-heading_paragraph",
              },
              {
                model: "heading1",
                view: "h1",
                title: "Heading 1",
                class: "ck-heading_heading1",
              },
              {
                model: "heading2",
                view: "h2",
                title: "Heading 2",
                class: "ck-heading_heading2",
              },
              {
                model: "heading3",
                view: "h3",
                title: "Heading 3",
                class: "ck-heading_heading3",
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
  };
};
