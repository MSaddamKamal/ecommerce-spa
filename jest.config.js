module.exports = {
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.jsx?$": "babel-jest",
    '^.+\\.[t|j]sx?$': 'babel-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.vue': '@vue/vue3-jest'
  },
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },

};