const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1440,
  viewportHeight: 900,
  e2e: {
    setupNodeEvents(on, config) {

      // implement node event listeners here
    },
    //defaultCommandTimeout: 10000,
    experimentalStudio: true,
    baseUrl: 'http://localhost:3000'
  },
});
