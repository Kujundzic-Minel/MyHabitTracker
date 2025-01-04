import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/html-self-closing": [
      "off",
      {
        html: {
          void: "always",
          normal: "never",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
    "vue/first-attribute-linebreak": [
      "error",
      {
        singleline: "ignore",
        multiline: "below",
      },
    ],
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 3,
        multiline: 1,
      },
    ],
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "always",
      },
    ],
  },
});
