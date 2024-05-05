module.exports = {
  // Indicates the root directory of your project
  rootDir: "../",

  // An array of file extensions Jest should look for
  moduleFileExtensions: ["js"],

  // An array of directory names to be searched recursively up from the rootDir
  testMatch: ["<rootDir>/**/*.test.js"],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // Transform files with specific transformers before running tests
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};
