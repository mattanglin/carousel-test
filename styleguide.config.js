/**
 * Styleguidist Configuration
 */
module.exports = {
  title: 'Carousel Skills Test for Instrument',

  // Allow styleguide to parse typescript props
  propsParser: require('react-docgen-typescript').withDefaultConfig({
    savePropValueAsString: true,
  }).parse,

  skipComponentsWithoutExample: true,

  //  Styleguide Content
  sections: [
    {
      name: 'Introduction',
      content: 'styleguide/Introduction.md',

    },
    {
      name: 'Components',
      components: 'src/components/**/[A-Z]*.tsx',
    }
  ],

  // Expand prop lists by default
  usageMode: 'expand',

  // Build directory
  styleguideDir: 'public/docs',

  // Version
  version: process.env.npm_package_version,
}
