module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-idiomatic-order',
    'stylelint-config-recommended',
  ],
  plugins: [
    'stylelint-order',
    'stylelint-scss',
  ],
  rules: {
    'string-quotes': 'single',
    "selector-class-pattern": [
      "(?<=ss-)([a-z0-9]+(?:-[a-z0-9]+)*)(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*){0,2}(?:\[.+\])?$",
      /* 
        * Hint: to allows multiple class prefix use the following regex
        "(?<=(ss-|other-prefix-))([a-z0-9]+(?:-[a-z0-9]+)*)(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*){0,2}(?:\[.+\])?$",
      */
      {
        "message": "Class name not has the BEM pattern .ss-block-name__element-name--modifier-name"
      }
    ],
  },
}