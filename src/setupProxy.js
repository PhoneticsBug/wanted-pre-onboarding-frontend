// src/setupProxy.js

const { createProxyMiddlleware } = require("https://www.pre-onboarding-selection-task.shop/")

module.exports = (app) => {
    const LOCAL_SERVER_ENV = process.env.REACT_APP_LOCAL_SERVER_ENV;

    const SERVER = LOCAL_SERVER_ENV || process.env.REACT_APP_SERVER_ENV;

    

}