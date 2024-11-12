// jest.config.js
module.exports = {
    testEnvironment: 'node',
    // Optional but recommended settings
    verbose: true,
    testTimeout: 10000,
    // Ignore certain directories
    testPathIgnorePatterns: ['/node_modules/'],
    // Run setup files after environment is setup
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],

    testMatch: [
        "**/tests/**/*.test.js",
        "**/*.test.js"
      ],
      collectCoverageFrom: [
        "**/**.js",
        "!**/**.config.js",
        "!**/node_modules/**",
        "!**/vendor/**",
        "!**/__tests__/**",
        "!**/coverage/**",
        "!**/dist/**",
        "!**/models/**",
        "!**/data/**",
        "!**/seeds/**"
      ]
  };

// Ignore jsdom warnings
process.env.SUPPRESS_JEST_WARNINGS = 'true';
