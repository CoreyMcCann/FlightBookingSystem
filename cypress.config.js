const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',  // Add this line to set the base URL
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 10000,  // Increase timeout if needed
    viewportWidth: 1280,
    viewportHeight: 720
  },
});