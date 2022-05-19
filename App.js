const fetch = require("axios");
const CryptoJS = require("crypto-js");
const WebSocket = require("ws");

/*

Input your API info below, or pass it as a param to CommasInit(false, config[object])
CommasInit(true) -- Uses global hardcoded config
CommasInit(false, {key: "", secret: ""}) -- Uses param passed to function

Example:
const Commas = CommasInit(true)
const addExchange = Commas.addExchange()

const Commas = CommasInit(false, {key: "XXX" : secret: "XXX"})
const addExchange = Commas.addExchange()

*/

var config = {
  key: "", // Api Key
  secret: "", // Secret
};

// =====================================================================================================================
// ACCOUNTS
function Accounts(user) {
  return {
    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {String} dataToSend.currency
     * @param {Number} dataToSend.amount
     * @param {Number} dataToSend.to_account_id
     * @param {Number} dataToSend.from_account_id
     * @example // Copy/Paste
     * {
     *  "currency": "",  // Currency code(example: USDT)
     *  "amount": 0,
     *  "to_account_id": 0,  // Recipient account ID (possible values in /transfer_data)
     *  "from_account_id": 0,  // Sender account ID (possible values in /transfer_data)
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Transfer coins between accounts (Permission: ACCOUNTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/accounts_api.md#transfer-coins-between-accounts-permission-accounts_write-security-signed
     */

    transferCoins: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/accounts/transfer`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.account_id
     * @param {String} dataToSend.currency
     * @param {Number} [dataToSend.page]
     * @param {Number} [dataToSend.per_page]
     * @example // Copy/Paste
     * {
     *  "account_id": 0,  // Sender or Recipient account ID (possible values in /transfer_data)
     *  "currency": "",  // Currency code(example: USDT)
     * //  "page": 1,  // Page Number
     * //  "per_page": 10,  // Elements per page
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Transfers history (Permission: ACCOUNTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/accounts_api.md#transfers-history-permission-accounts_read-security-signed
     */

    transferHistory: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/accounts/transfer_history`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Data for transfer between accounts (Permission: ACCOUNTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/accounts_api.md#data-for-transfer-between-accounts-permission-accounts_read-security-signed
     */

    dataForTransfer: async (opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/accounts/transfer_history`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: {},
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {String} dataToSend.type
     * @param {String} dataToSend.name
     * @param {String} [dataToSend.api_key]
     * @param {String} [dataToSend.secret]
     * @param {String} [dataToSend.customer_id]
     * @param {String} [dataToSend.passphrase]
     * @param {String} [dataToSend.how_connect]
     * @param {JSON} [dataToSend.keystore]
     * @param {String} [dataToSend.wallet_password]
     * @param {String} [dataToSend.mnemonic_phrase]
     * @example // Copy/Paste
     * {
     *  "type": "",  // check market_code in market_list method
     *  "name": "",  // Account name (any String)
     * //  "api_key": "",  // Requires unless type = binance_dex
     * //  "secret": "",  // Requires unless type = binance_dex
     * //  "customer_id": "",  // For Bitstamp
     * //  "passphrase": "",  // For Coinbase Pro (GDAX)
     * //  "how_connect": "",  // mnemonic_phrase, keystore
     * //  "keystore": {},  // keystore file content. Requires if type = binance_dex and how_connect = keystore
     * //  "wallet_password": "",  // Requires if type = binance_dex and how_connect = keystore
     * //  "mnemonic_phrase": "",  // Requires if type = binance_dex and how_connect = mnemonic_phrase
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Add exchange account (Permission: ACCOUNTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/accounts_api.md#add-exchange-account--permission-accounts_write-security-signed
     */

    addExchange: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/accounts/new`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.account_id
     * @param {String} [dataToSend.name]
     * @param {String} [dataToSend.api_key]
     * @param {String} [dataToSend.secret]
     * @param {String} [dataToSend.customer_id]
     * @param {String} [dataToSend.passphrase]
     * @example // Copy/Paste
     * {
     *  "account_id": 0,
     * //  "name": "",  // Account name (any String)
     * //  "api_key": "",
     * //  "secret": "",
     * //  "customer_id": "",  // For Bitstamp
     * //  "passphrase": "",  // For Coinbase Pro (GDAX)
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Edit exchange account (Permission: ACCOUNTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/accounts_api.md#edit-exchange-account
     */

    editExchange: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/accounts/update`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - User connected exchanges(and EthereumWallet) list (Permission: ACCOUNTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/accounts_api.md#user-connected-exchangesand-ethereumwallet-list-permission-accounts_read-security-signed
     */

    connectedExchanges: async (opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/accounts`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: {},
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.account_id
     * @example // Copy/Paste
     * {
     *  "account_id": 0,
     * }
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Active trade entities (Permission: ACCOUNTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/accounts_api.md#active-trade-entities-permission-accounts_read-security-signed
     */

    activeTradeEntities: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/accounts/${dataToSend.account_id}/active_trading_entities`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.account_id
     * @example // Copy/Paste
     * {
     *  "account_id": 0,
     * }
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Sell all to USD (Permission: ACCOUNTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/accounts_api.md#sell-all-to-usd--permission-accounts_write-security-signed
     */

    sellToUSD: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/accounts/${dataToSend.account_id}/sell_all_to_usd`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.account_id
     * @example // Copy/Paste
     * {
     *  "account_id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Sell all to BTC (Permission: ACCOUNTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/accounts_api.md#sell-all-to-btc--permission-accounts_write-security-signed
     */

    sellToBTC: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/accounts/${dataToSend.account_id}/sell_all_to_btc`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.account_id
     * @param {String} dataToSend.date_from
     * @param {String} [dataToSend.date_to]
     * @example // Copy/Paste
     * {
     *  "account_id": 0,
     *  "date_from": "",
     * //  "date_to": "",
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Balance history data (Permission: ACCOUNTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/accounts_api.md#balance-history-data-permission-accounts_read-security-signed
     */

    balanceChartData: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/accounts/${dataToSend.account_id}/balance_chart_data`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.account_id
     * @example // Copy/Paste
     * {
     *  "account_id": 0,
     * }
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Load balances for specified exchange (Permission: ACCOUNTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/accounts_api.md#load-balances-for-specified-exchange--permission-accounts_read-security-signed
     */

    loadExchangeBalance: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/accounts/${dataToSend.account_id}/load_balances`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.account_id
     * @param {String} dataToSend.name
     * @example // Copy/Paste
     * {
     *  "account_id": 0,
     *  "name": "",
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Rename exchange connection (Permission: ACCOUNTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/accounts_api.md#rename-exchange-connection--permission-accounts_write-security-signed
     */

    renameExchange: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/accounts/${dataToSend.account_id}/rename`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.account_id
     * @example // Copy/Paste
     * {
     *  "account_id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Information about all user balances on specified exchange in pretty for pie chart format (Permission: ACCOUNTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/accounts_api.md#information-about-all-user-balances-on-specified-exchange-in-pretty-for-pie-chart-format-permission-accounts_read-security-signed
     */

    pieChartData: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/accounts/${dataToSend.account_id}/pie_chart_data`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.account_id
     * @example // Copy/Paste
     * {
     *  "account_id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Information about all user balances on specified exchange (Permission: ACCOUNTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/accounts_api.md#information-about-all-user-balances-on-specified-exchange--permission-accounts_read-security-signed
     */

    exchangeBalanceOverview: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/accounts/${dataToSend.account_id}/account_table_data`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.account_id
     * @example // Copy/Paste
     * {
     *  "account_id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Remove exchange connection (Permission: ACCOUNTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/accounts_api.md#remove-exchange-connection--permission-accounts_write-security-signed
     */

    removeExchange: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/accounts/${dataToSend.account_id}/remove`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.account_id
     * @param {String} dataToSend.pair
     * @example // Copy/Paste
     * {
     *  "account_id": 0,
     *  "pair": "",
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Information about account leverage (Permission: ACCOUNTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/accounts_api.md#information-about-account-leverage-permission-accounts_read-security-signed
     */

    leverageData: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/accounts/${dataToSend.account_id}/leverage_data`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.account_id
     * @example // Copy/Paste
     * {
     *  "account_id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Single Account Info (Permission: ACCOUNTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/accounts_api.md#single-account-info-permission-accounts_read-security-signed
     */

    exchangeData: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/accounts/${dataToSend.account_id}`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    //  ----------------------------------------------------------------------------------------
    //  Not Signed

    /**
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Supported markets list (Permission: NONE, Security: NONE)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/accounts_api.md#supported-markets-list-permission-none-security-none
     */

    getMarkets: async (opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/accounts/market_list`;
        const endPoint = mp + ep;
        const signed = false;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          d: {},
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {String} [dataToSend.market_code]
     * @example // Copy/Paste
     * {
     * //  "market_code": "",  // market_code from account model
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - All market pairs (Permission: NONE, Security: NONE)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/accounts_api.md#all-market-pairs-permission-none-security-none
     */

    marketPairs: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/accounts/market_pairs`;
        const endPoint = mp + ep;
        const signed = false;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {String} dataToSend.market_code
     * @param {String} dataToSend.pair
     * @example // Copy/Paste
     * {
     *  "market_code": "",  // market_code from account model
     *  "pair": "",  // Pair
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Currency rates and limits (Permission: NONE, Security: NONE)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/accounts_api.md#currency-rates-and-limits-permission-none-security-none
     */

    currencyRates: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/accounts/currency_rates`;
        const endPoint = mp + ep;
        const signed = false;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },
  };
}
// =====================================================================================================================
// DCA BOTS
function DcaBots(user) {
  return {
    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} [dataToSend.account_id]
     * @param {String} [dataToSend.type]
     * @param {String} [dataToSend.strategy]
     * @example // Copy/Paste
     * {
     * //  "account_id": 0,  // id from GET /ver1/accounts
     * //  "type": "",  // simple, composite
     * //  "strategy": "",  // long, short
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Available strategy list for bot (Permission: BOTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/bots_api.md#available-strategy-list-for-bot-permission-bots_read-security-signed
     */

    strategyList: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/bots/strategy_list`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Black List for bot pairs (Permission: BOTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/bots_api.md#black-list-for-bot-pairs-permission-bots_read-security-signed
     */

    getBlackList: async (opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/bots/pairs_black_list`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Array<String>} dataToSend.pairs
     * @example // Copy/Paste
     * {
     *  "pairs": [""],  // array[String]
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Create or Update pairs BlackList for bots (Permission: BOTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/bots_api.md#create-or-update-pairs-blacklist-for-bots-permission-bots_write-security-signed
     */

    updateBlackList: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/bots/update_pairs_black_list`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {String} dataToSend.name
     * @param {Number} dataToSend.account_id
     * @param {Array<String>} dataToSend.pairs
     * @param {Number} dataToSend.base_order_volume
     * @param {Number} dataToSend.take_profit
     * @param {Number} dataToSend.safety_order_volume
     * @param {Number} dataToSend.martingale_volume_coefficient
     * @param {Number} dataToSend.martingale_step_coefficient
     * @param {Number} dataToSend.max_safety_orders
     * @param {Number} dataToSend.active_safety_orders_count
     * @param {Number} dataToSend.safety_order_step_percentage
     * @param {String} dataToSend.take_profit_type
     * @param {Array<JSON>} dataToSend.strategy_list
     * @param {Number} [dataToSend.max_active_deals]
     * @param {String} [dataToSend.base_order_volume_type]
     * @param {String} [dataToSend.safety_order_volume_type]
     * @param {Number} [dataToSend.stop_loss_percentage]
     * @param {Number} [dataToSend.cooldown]
     * @param {Boolean} [dataToSend.trailing_enabled]
     * @param {Number} [dataToSend.trailing_deviation]
     * @param {Number} [dataToSend.btc_price_limit]
     * @param {String} [dataToSend.strategy]
     * @param {String} [dataToSend.leverage_type]
     * @param {Number} [dataToSend.leverage_custom_value]
     * @param {Number} [dataToSend.min_price]
     * @param {Number} [dataToSend.max_price]
     * @param {Boolean} [dataToSend.stop_loss_timeout_enabled]
     * @param {Number} [dataToSend.stop_loss_timeout_in_seconds]
     * @param {Number} [dataToSend.min_volume_btc_24h]
     * @param {Boolean} [dataToSend.tsl_enabled]
     * @param {Number} [dataToSend.deal_start_delay_seconds]
     * @param {String} [dataToSend.profit_currency]
     * @param {String} [dataToSend.start_order_type]
     * @param {String} [dataToSend.stop_loss_type]
     * @param {Number} [dataToSend.disable_after_deals_count]
     * @param {Number} [dataToSend.allowed_deals_on_same_pair]
     * @example // Copy/Paste
     * {
     *  name: "",
     *  account_id: 0, //id from GET /ver1/accounts
     *  pairs: [""], // array[String] Pass single pair to create SingleBot or any other Number of pairs to create MultiBot"
     *  base_order_volume: 0, //Base order size
     *  take_profit: 0, //Target profit(percentage)
     *  safety_order_volume: 0, //Safety trade size
     *  martingale_volume_coefficient: 1,
     *  martingale_step_coefficient: 1,
     *  max_safety_orders: 0, // Max safety trades count
     *  active_safety_orders_count: 0, // Max active safety trades count
     *  safety_order_step_percentage: 0, // Price deviation to open safety trades(percentage)
     *  take_profit_type: "", // base, total (base) Percentage: base – from base order, total – from total volume
     *  strategy_list: [{}], // array[json] For manual signals: [{"strategy":"manual"}] or [] For non-stop(1 pair only): [{"strategy":"nonstop"}] QFL: {"options"=>{"type"=>"original"},
     *  "strategy"=>"qfl"}] TradingView: [{"options"=>{"time"=>"5m", "type"=>"buy_or_strong_buy"}, "strategy"=>"trading_view"}"
     *  // max_active_deals: 1,
     *  // base_order_volume_type: "", // quote_currency, base_currency, percent, xbt    base order volume currency
     *  // safety_order_volume_type: "", // quote_currency, base_currency, percent, xbt    safety order volume currency
     *  // stop_loss_percentage: 0,
     *  // cooldown: 0,
     *  // trailing_enabled: false, // Enable trailing take profit. Binance only.
     *  // trailing_deviation: 0, // required if trailing_enabled
     *  // btc_price_limit: 0,
     *  // strategy: "", // short, long (long)
     *  // leverage_type: "", // custom, cross, not_specified (not_specified)    Used for Bitmex bots only
     *  // leverage_custom_value: 0, // required if leverage_type is custom
     *  // min_price: 0, // minimum price to open deal
     *  // max_price: 0, // maximum price to open deal
     *  // stop_loss_timeout_enabled: false,
     *  // stop_loss_timeout_in_seconds: 0, // StopLoss timeout in seconds if StopLoss timeout enabled
     *  // min_volume_btc_24h: 0,
     *  // tsl_enabled: false, // Enable trailing stop loss. Bitmex only.
     *  // deal_start_delay_seconds: 0, // Deal start delay in seconds
     *  // profit_currency: "", // quote_currency, base_currency    Take profit currency
     *  // start_order_type: "", // limit, market
     *  // stop_loss_type: "", // stop_loss, stop_loss_and_disable_bot
     *  // disable_after_deals_count: 0, // Bot will be disabled after opening this Number of deals
     *  // allowed_deals_on_same_pair: 0, // Allow specific Number of deals on the same pair. Multibot only .
     * };
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Create bot (Permission: BOTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/bots_api.md#create-bot-permission-bots_write-security-signed
     */

    createBot: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/bots/create_bot`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} [dataToSend.account_id]
     * @param {Number} [dataToSend.limit]
     * @param {Number} [dataToSend.offset]
     * @param {String} [dataToSend.scope]
     * @param {String} [dataToSend.strategy]
     * @example // Copy/Paste
     * {
     * //  "account_id": 0,  // Account to show bots on. Return all if not specified. Gather this from GET /ver1/accounts"
     * //  "limit": 50,  // Limit records. Max: 100
     * //  "offset": 0,  // Offset records
     * //  "scope": "",  // enabled, disabled
     * //  "strategy": "",  // long, short
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - User bots (Permission: BOTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/bots_api.md#user-bots-permission-bots_read-security-signed
     */

    getBots: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/bots`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.account_id
     * @param {Number} dataToSend.bot_id
     * @example // Copy/Paste
     * {
     * //  "account_id": 0,  // Account to show on. Null - show for all. Gather this from GET /ver1/accounts
     * //  "bot_id": 0,  // Bots to show on. Null - show for all
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Get bot stats (Permission: BOTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/bots_api.md#get-bot-stats-permission-bots_read-security-signed
     */

    getBotStats: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/bots/stats`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {String} dataToSend.name
     * @param {Number} dataToSend.bot_id
     * @param {Array<String>} dataToSend.pairs
     * @param {Number} dataToSend.base_order_volume
     * @param {Number} dataToSend.take_profit
     * @param {Number} dataToSend.safety_order_volume
     * @param {Number} dataToSend.martingale_volume_coefficient
     * @param {Number} dataToSend.martingale_step_coefficient
     * @param {Number} dataToSend.max_safety_orders
     * @param {Number} dataToSend.active_safety_orders_count
     * @param {Number} dataToSend.safety_order_step_percentage
     * @param {String} dataToSend.take_profit_type
     * @param {Array<JSON>} dataToSend.strategy_list
     * @param {Number} [dataToSend.max_active_deals]
     * @param {String} [dataToSend.base_order_volume_type]
     * @param {String} [dataToSend.safety_order_volume_type]
     * @param {Number} [dataToSend.stop_loss_percentage]
     * @param {Number} [dataToSend.cooldown]
     * @param {Boolean} [dataToSend.trailing_enabled]
     * @param {Number} [dataToSend.trailing_deviation]
     * @param {Number} [dataToSend.btc_price_limit]
     * @param {String} [dataToSend.leverage_type]
     * @param {Number} [dataToSend.leverage_custom_value]
     * @param {Number} [dataToSend.min_price]
     * @param {Number} [dataToSend.max_price]
     * @param {Boolean} [dataToSend.stop_loss_timeout_enabled]
     * @param {Number} [dataToSend.stop_loss_timeout_in_seconds]
     * @param {Number} [dataToSend.min_volume_btc_24h]
     * @param {Boolean} [dataToSend.tsl_enabled]
     * @param {Number} [dataToSend.deal_start_delay_seconds]
     * @param {String} [dataToSend.profit_currency]
     * @param {String} [dataToSend.start_order_type]
     * @param {String} [dataToSend.stop_loss_type]
     * @param {Number} [dataToSend.disable_after_deals_count]
     * @param {Number} [dataToSend.allowed_deals_on_same_pair]
     * @example // Copy/Paste
     * {
     *   name: "",
     *   bot_id: 0, //id from GET /ver1/accounts
     *   pairs: [""], // array[String] Pass single pair to create SingleBot or any other Number of pairs to create MultiBot"
     *   base_order_volume: 0, //Base order size
     *   take_profit: 0, //Target profit(percentage)
     *   safety_order_volume: 0, //Safety trade size
     *   martingale_volume_coefficient: 1,
     *   martingale_step_coefficient: 1,
     *   max_safety_orders: 0, // Max safety trades count
     *   active_safety_orders_count: 0, // Max active safety trades count
     *   safety_order_step_percentage: 0, // Price deviation to open safety trades(percentage)
     *   take_profit_type: "", // base, total (base) Percentage: base – from base order, total – from total volume
     *   strategy_list: [{}], // array[json] For manual signals: [{"strategy":"manual"}] or [] For non-stop(1 pair only): [{"strategy":"nonstop"}] QFL: {"options"=>{"type"=>"original"},
     *   "strategy"=>"qfl"}] TradingView: [{"options"=>{"time"=>"5m", "type"=>"buy_or_strong_buy"}, "strategy"=>"trading_view"}"
     *   // max_active_deals: 1,
     *   // base_order_volume_type: "", // quote_currency, base_currency, percent, xbt    base order volume currency
     *   // safety_order_volume_type: "", // quote_currency, base_currency, percent, xbt    safety order volume currency
     *   // stop_loss_percentage: 0,
     *   // cooldown: 0,
     *   // trailing_enabled: false, // Enable trailing take profit. Binance only.
     *   // trailing_deviation: 0, // required if trailing_enabled
     *   // btc_price_limit: 0,
     *   // leverage_type: "", // custom, cross, not_specified (not_specified)    Used for Bitmex bots only
     *   // leverage_custom_value: 0, // required if leverage_type is custom
     *   // min_price: 0, // minimum price to open deal
     *   // max_price: 0, // maximum price to open deal
     *   // stop_loss_timeout_enabled: false,
     *   // stop_loss_timeout_in_seconds: 0, // StopLoss timeout in seconds if StopLoss timeout enabled
     *   // min_volume_btc_24h: 0,
     *   // tsl_enabled: false, // Enable trailing stop loss. Bitmex only.
     *   // deal_start_delay_seconds: 0, // Deal start delay in seconds
     *   // profit_currency: "", // quote_currency, base_currency    Take profit currency
     *   // start_order_type: "", // limit, market
     *   // stop_loss_type: "", // stop_loss, stop_loss_and_disable_bot
     *   // disable_after_deals_count: 0, // Bot will be disabled after opening this Number of deals
     *   // allowed_deals_on_same_pair: 0, // Allow specific Number of deals on the same pair. Multibot only .
     * };
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Edit bot (Permission: BOTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/bots_api.md#edit-bot-permission-bots_write-security-signed
     */

    editBot: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/bots/${dataToSend.bot_id}/update`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "PATCH";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.bot_id
     * @example // Copy/Paste
     * {
     *  "bot_id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Disable bot (Permission: BOTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/bots_api.md#disable-bot-permission-bots_write-security-signed
     */

    disableBot: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/bots/${dataToSend.bot_id}/disable`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.bot_id
     * @example // Copy/Paste
     * {
     *  "bot_id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Enable bot (Permission: BOTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/bots_api.md#enable-bot-permission-bots_write-security-signed
     */

    enableBot: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/bots/${dataToSend.bot_id}/enable`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.bot_id
     * @param {String} [dataToSend.pair]
     * @param {Boolean} [dataToSend.skip_signal_checks]
     * @param {Boolean} [dataToSend.skip_open_deals_checks]
     * @example // Copy/Paste
     * {
     *  "bot_id": 0,
     * //  "pair": "",  // Can be omitted for simple bot
     * //  "skip_signal_checks": false,  // If false or not specified then all parameters like signals or volume filters will be checked. If true - those checks will be skipped"
     * //  "skip_open_deals_checks": false,  // If true then you will be allowed to open more then one deal per pair in composite bot"
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Start new deal asap (Permission: BOTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/bots_api.md#start-new-deal-asap-permission-bots_write-security-signed
     */

    startDeal: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/bots/${dataToSend.bot_id}/start_new_deal`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.bot_id
     * @example // Copy/Paste
     * {
     *  "bot_id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Delete bot (Permission: BOTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/bots_api.md#delete-bot-permission-bots_write-security-signed
     */

    deleteBot: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/bots/${dataToSend.bot_id}/delete`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.bot_id
     * @example // Copy/Paste
     * {
     *  "bot_id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Panic sell all bot deals (Permission: BOTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/bots_api.md#panic-sell-all-bot-deals-permission-bots_write-security-signed
     */

    marketCloseDeals: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/bots/${dataToSend.bot_id}/panic_sell_all_deals`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.bot_id
     * @example // Copy/Paste
     * {
     *  "bot_id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Cancel all bot deals (Permission: BOTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/bots_api.md#cancel-all-bot-deals-permission-bots_write-security-signed
     */

    cancelDeals: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/bots/${dataToSend.bot_id}/cancel_all_deals`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.bot_id
     * @param {Boolean} [dataToSend.include_events]
     * @example // Copy/Paste
     * {
     *  "bot_id": 0,
     * //  "include_events": false,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Bot info (Permission: BOTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/bots_api.md#bot-info-permission-bots_read-security-signed
     */

    showBotInfo: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/bots/${dataToSend.bot_id}/show`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },
  };
}
// =====================================================================================================================
// DCA DEALS
function DcaDeals(user) {
  return {
    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} [dataToSend.bot_id]
     * @param {Number} [dataToSend.account_id]
     * @param {Boolean} [dataToSend.include_events]
     * @param {Number} [dataToSend.limit]
     * @param {Number} [dataToSend.offset]
     * @param {String} [dataToSend.scope]
     * @param {String} [dataToSend.order]
     * @example // Copy/Paste
     * {
     * //  "bot_id": 0,  // Bot show deals on. Return all if not specified
     * //  "account_id": 0,  // Account to show bots on. Return all if not specified. Gather this from GET /ver1/accounts"
     * //  "include_events": false,
     * //  "limit": 50,  // Limit records. Max: 1_000
     * //  "offset": 0,  // Offset records
     * //  "scope": "",  // active - active deals, finished - finished deals, completed - successfully completed, cancelled - cancelled deals, failed - failed deals, any other value or null (default) - all deals"
     * //  "order": "",  // created_at, closed_at (created_at )
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - User deals (Permission: BOTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/deals_api.md#user-deals-permission-bots_read-security-signed
     */

    deals: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/deals`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.deal_id
     * @example // Copy/Paste
     * {
     *  "deal_id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Panic sell deal (Permission: BOTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/deals_api.md#panic-sell-deal-permission-bots_write-security-signed
     */

    marketCloseDeal: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/deals/${dataToSend.deal_id}/panic_sell`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.deal_id
     * @example // Copy/Paste
     * {
     *  "deal_id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Cancel deal (Permission: BOTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/deals_api.md#cancel-deal-permission-bots_write-security-signed
     */

    cancelDeal: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/deals/${dataToSend.deal_id}/cancel`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.deal_id
     * @param {Number} [dataToSend.take_profit]
     * @param {String} [dataToSend.profit_currency]
     * @param {String} [dataToSend.take_profit_type]
     * @param {Boolean} [dataToSend.trailing_enabled]
     * @param {Number} [dataToSend.trailing_deviation]
     * @param {Number} [dataToSend.stop_loss_percentage]
     * @param {Number} [dataToSend.max_safety_orders]
     * @param {Number} [dataToSend.active_safety_orders_count]
     * @param {Boolean} [dataToSend.stop_loss_timeout_enabled]
     * @param {Number} [dataToSend.stop_loss_timeout_in_seconds]
     * @param {Boolean} [dataToSend.tsl_enabled]
     * @param {String} [dataToSend.stop_loss_type]
     * @example // Copy/Paste
     * {
     *  "deal_id": 0,
     * //  "take_profit": 0,  // New take profit value
     * //  "profit_currency": "",  // quote_currency, base_currency
     * //  "take_profit_type": "",  // base – from base order, total – from total volume
     * //  "trailing_enabled": false,
     * //  "trailing_deviation": 0,  // New trailing deviation value
     * //  "stop_loss_percentage": 0,  // New stop loss percentage value
     * //  "max_safety_orders": 0,  // New max safety orders value
     * //  "active_safety_orders_count": 0,  // New active safety orders count value
     * //  "stop_loss_timeout_enabled": false,
     * //  "stop_loss_timeout_in_seconds": 0,  // StopLoss timeout in seconds if StopLoss timeout enabled
     * //  "tsl_enabled": false,  // Trailing stop loss enabled
     * //  "stop_loss_type": "",  // stop_loss, stop_loss_and_disable_bot
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Update deal (Permission: BOTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/deals_api.md#update-deal-permission-bots_write-security-signed
     */

    updateDeal: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/deals/${dataToSend.deal_id}/update_deal`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "PATCH";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.deal_id
     * @example // Copy/Paste
     * {
     *  "deal_id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Info about specific deal (Permission: BOTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/deals_api.md#info-about-specific-deal-permission-bots_read-security-signed
     */

    showDeal: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/deals/${dataToSend.deal_id}/show`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {String} dataToSend.order_id
     * @param {Number} dataToSend.deal_id
     * @example // Copy/Paste
     * {
     *  "order_id": "",  // manual safety order id
     *  "deal_id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Cancel manual safety orders (Permission: BOTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/deals_api.md#cancel-manual-safety-orders-permission-bots_write-security-signed
     */

    cancelManualOrders: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/deals/${dataToSend.deal_id}/cancel_order`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.deal_id
     * @example // Copy/Paste
     * {
     *  "deal_id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Deal safety orders (Permission: BOTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/deals_api.md#deal-safety-orders-permission-bots_read-security-signed
     */

    showSafetyOrders: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/deals/${dataToSend.deal_id}/market_orders`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.quantity
     * @param {Boolean} dataToSend.is_market
     * @param {Number} dataToSend.rate
     * @param {Number} dataToSend.deal_id
     * @param {String} [dataToSend.response_type]
     * @example // Copy/Paste
     * {
     *  "quantity": 0,  // safety order quantity
     *  "is_market": false,  // true - use MARKET order, false - use LIMIT order
     *  "rate": 0,  // safety order rate. Required if LIMIT order used
     *  "deal_id": 0,
     * //  "response_type": "",  // empty, deal, market_order (empty)
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Adding manual safety order (Permission: BOTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/deals_api.md#adding-manual-safety-order-permission-bots_write-security-signed
     */

    addSafetyOrder: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/deals/${dataToSend.deal_id}/add_funds`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.deal_id
     * @example // Copy/Paste
     * {
     *  "deal_id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Info required to add funds correctly: available amounts, exchange limitations etc (Permission: BOTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/deals_api.md#info-required-to-add-funds-correctly-available-amounts-exchange-limitations-etc--permission-bots_read-security-signed
     */

    addFundsInfo: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/deals/${dataToSend.deal_id}/data_for_adding_funds`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.deal_id
     * @param {Boolean} [dataToSend.stop_bot]
     * @example // Copy/Paste
     * {
     *  "deal_id": 0,
     *  "stop_bot": false,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Info about specific deal (Permission: BOTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/deals_api.md#info-about-specific-deal-permission-bots_read-security-signed
     */

    convertToST: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/deals/${dataToSend.deal_id}/convert_to_smart_trade`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    createLadderTable: (data) => {
      let orders = [];
      data.max_safety_orders = data.max_safety_orders + 1;
      for (let index = 0; index < data.max_safety_orders; index++) {
        let order = {};
        if (index == 0) {
          order = {
            step: 0,
            devPerc: 0,
            orderPrice: Num(data.bought_average_price),
            quoteVol: Number(data.base_order_volume),
            baseVol: Number(data.base_order_volume),
            totalQuote: Number(data.base_order_volume),
            totalBase: Num(data.base_order_volume / data.bought_average_price),
            avgPrice: Num(data.bought_average_price),
          };
        } else {
          //  Step
          order.step = index;
          //  Deviation %
          let devCalc =
            Number(orders[index - 1].devPerc) +
            Number(data.safety_order_step_percentage) *
              Math.pow(Number(data.martingale_step_coefficient), index - 1);

          if (index == 1) {
            order.devPerc = Number(data.safety_order_step_percentage);
          } else {
            order.devPerc = devCalc;
          }
          //  Order Price
          let orderPrice = null;
          if (data.strategy == "long") {
            if (index == 1) {
              orderPrice = Num(
                ((100 - Number(data.safety_order_step_percentage)) *
                  Number(data.bought_average_price)) /
                  100
              );
            } else {
              orderPrice = Num(
                ((100 - devCalc) * Number(data.bought_average_price)) / 100
              );
            }
          } else {
            if (index == 1) {
              orderPrice = Num(
                ((100 + Number(data.safety_order_step_percentage)) *
                  Number(data.bought_average_price)) /
                  100
              );
            } else {
              orderPrice = Num(
                ((100 + devCalc) * Number(data.bought_average_price)) / 100
              );
            }
          }
          order.orderPrice = orderPrice;
          //  Quote Volume
          let quoteVolCalc = Num(
            Number(data.safety_order_volume) *
              Math.pow(Number(data.martingale_volume_coefficient), index - 1)
          );
          order.quoteVol =
            index == 1 ? Number(data.safety_order_volume) : quoteVolCalc;
          //  Base Volume
          let baseVolCalc = Num(quoteVolCalc / orderPrice);
          order.baseVol = baseVolCalc;
          //  Total Quote
          let totalQuoteCalc = quoteVolCalc + orders[index - 1].totalQuote;
          order.totalQuote = totalQuoteCalc;
          //  Total Base
          let totalBaseCalc = baseVolCalc + orders[index - 1].totalBase;
          order.totalBase = totalBaseCalc;
          //  Avg Price
          order.avgPrice = Num(totalQuoteCalc / totalBaseCalc);
        }

        orders.push(order);

        function Num(n) {
          return Number(Number(n).toFixed(8));
        }
      }

      return orders;
    },
  };
}
// =====================================================================================================================
// GRID BOTS
function GridBots(user) {
  return {
    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.account_id
     * @param {String} dataToSend.pair
     * @param {Number} dataToSend.total_quantity
     * @param {String} [dataToSend.leverage_type]
     * @param {Number} [dataToSend.leverage_custom_value]
     * @example // Copy/Paste
     * {
     *  "account_id": 0,  // id from GET /ver1/accounts
     *  "pair": "",
     *  "total_quantity": 0,
     * //  "leverage_type": "",  // custom, cross, not_specified (not_specified)    Leverage type for futures accounts
     * //  "leverage_custom_value": 0,  // Required if leverage_type = 'custom '
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Create AI Grid Bot (Permission: BOTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/grid_bots_api.md#create-ai-grid-bot-permission-bots_write-security-signed
     */

    createAiBot: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/grid_bots/ai`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.account_id
     * @param {String} dataToSend.pair
     * @param {Number} dataToSend.upper_price
     * @param {Number} dataToSend.lower_price
     * @param {Number} dataToSend.quantity_per_grid
     * @param {Number} dataToSend.grids_quantity
     * @param {String} [dataToSend.leverage_type]
     * @param {Number} [dataToSend.leverage_custom_value]
     * @param {Boolean} [dataToSend.is_enabled]
     * @example // Copy/Paste
     * {
     *  "account_id": 0,  // id from GET /ver1/accounts
     *  "pair": "",
     *  "upper_price": 0,
     *  "lower_price": 0,
     *  "quantity_per_grid": 0,
     *  "grids_quantity": 0,
     * //  "leverage_type": "",  // custom, cross, not_specified (not_specified)    Leverage type for futures accounts
     * //  "leverage_custom_value": 0,  // Required if leverage_type = 'custom'
     * //  "is_enabled": true,  // Turn on or off grid_bot after creation
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Create Grid Bot (Permission: BOTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/grid_bots_api.md#create-grid-bot-permission-bots_write-security-signed
     */

    createManualBot: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/grid_bots/manual`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {String} dataToSend.pair
     * @param {String} dataToSend.market_code
     * @example // Copy/Paste
     * {
     *  "pair": "",
     *  "market_code": "",  // Market code from /accounts/market_list
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Get AI settings (Permission: BOTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/grid_bots_api.md#get-ai-settings-permission-bots_read-security-signed
     */

    showAiBot: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/grid_bots/ai_settings`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Array<Number>} [dataToSend.account_ids]
     * @param {Array<String>} [dataToSend.account_types]
     * @param {String} [dataToSend.state]
     * @param {String} [dataToSend.sort_by]
     * @param {String} [dataToSend.sort_direction]
     * @param {Number} [dataToSend.limit]
     * @param {Number} [dataToSend.offset]
     * @example // Copy/Paste
     * {
     * //  "account_ids": [0],  // array[Number] Filter by account id
     * //  "account_types": [""],  // array[String] Filter by account type
     * //  "state": "",  // enabled, disabled    Filter by bot state
     * //  "sort_by": "",  // current_profit, bot_id, pair    Sort column
     * //  "sort_direction": "",  // desc, asc    Sort direction
     * //  "limit": 10,
     * //  "offset": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Grid bots list (Permission: BOTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/grid_bots_api.md#grid-bots-list-permission-bots_read-security-signed
     */

    showGridBots: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/grid_bots`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.id
     * @example // Copy/Paste
     * {
     *  "id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Grid Bot Market Orders (Permission: BOTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/grid_bots_api.md#grid-bot-market-orders-permission-bots_read-security-signed
     */

    showGridLines: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/grid_bots/${dataToSend.id}/market_orders`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.id
     * @example // Copy/Paste
     * {
     *  "id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Grid Bot Profits (Permission: BOTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/grid_bots_api.md#grid-bot-profits-permission-bots_read-security-signed
     */

    showBotProfits: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/grid_bots/${dataToSend.id}/profits`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.id
     * @param {String} dataToSend.pair
     * @param {Number} dataToSend.total_quantity
     * @param {String} [dataToSend.leverage_type]
     * @param {Number} [dataToSend.leverage_custom_value]
     * @example // Copy/Paste
     * {
     *  "id": 0,
     *  "pair": "",
     *  "total_quantity": 0,
     * //  "leverage_type": "not_specified",  // custom, cross, not_specified - Leverage type for futures accounts
     * //  "leverage_custom_value": 0,  // Required if leverage_type = 'custom'
     * }
     *
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Edit Grid Bot (AI) (Permission: BOTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/grid_bots_api.md#edit-grid-bot-ai-permission-bots_write-security-signed
     */

    editAiBot: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/grid_bots/${dataToSend.id}/ai`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "PATCH";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.id
     * @param {String} dataToSend.pair
     * @param {Number} dataToSend.upper_price
     * @param {Number} dataToSend.lower_price
     * @param {Number} dataToSend.quantity_per_grid
     * @param {Number} dataToSend.grids_quantity
     * @param {String} [dataToSend.leverage_type]
     * @param {Number} [dataToSend.leverage_custom_value]
     * @example // Copy/Paste
     * {
     *  "id": 0,
     *  "pair": "",
     *  "upper_price": 0,
     *  "lower_price": 0,
     *  "quantity_per_grid": 0,
     *  "grids_quantity": 0,
     * //  "leverage_type": "",  // custom, cross, not_specified (not_specified)    Leverage type for futures accounts
     * //  "leverage_custom_value": 0,  // Required if leverage_type = 'custom'
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Edit Grid Bot (Manual) (Permission: BOTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/grid_bots_api.md#edit-grid-bot-manual-permission-bots_write-security-signed
     */

    editManualBot: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/grid_bots/${dataToSend.id}/manual`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "PATCH";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.id
     * @example // Copy/Paste
     * {
     *  "id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Show Grid Bot (Permission: BOTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/grid_bots_api.md#show-grid-bot-permission-bots_read-security-signed
     */

    showBot: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/grid_bots/${dataToSend.id}`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.id
     * @example // Copy/Paste
     * {
     *  "id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Delete Grid Bot (Permission: BOTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/grid_bots_api.md#delete-grid-bot-permission-bots_write-security-signed
     */

    deleteBot: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/grid_bots/${dataToSend.id}`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "DELETE";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.id
     * @example // Copy/Paste
     * {
     *  "id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Disable Grid Bot (Permission: BOTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/grid_bots_api.md#disable-grid-bot-permission-bots_write-security-signed
     */

    disableBot: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/grid_bots/${dataToSend.id}/disable`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.id
     * @example // Copy/Paste
     * {
     *  "id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Enable Grid Bot (Permission: BOTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/grid_bots_api.md#enable-grid-bot-permission-bots_write-security-signed
     */

    enableBot: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/grid_bots/${dataToSend.id}/enable`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.id
     * @example // Copy/Paste
     * {
     *  "id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Get required balances to start bot(Permission: BOTS_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/grid_bots_api.md#get-required-balances-to-start-botpermission-bots_read-security-signed
     */

    getRequiredBalances: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/grid_bots/${dataToSend.id}/required_balances`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },
  };
}
// =====================================================================================================================
// MARKETPLACE
function MarketPlace() {
  return {
    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} [dataToSend.limit]
     * @param {Number} [dataToSend.offset]
     * @param {String} [dataToSend.scope]
     * @param {String} [dataToSend.order]
     * @param {String} [dataToSend.locale]
     * @example // Copy/Paste
     * {
     * //  "limit": 50,  // Limit records. Max: 1000
     * //  "offset": 0,  // Offset records
     * //  "scope": "all",  // all, paid, free  paid - show only paid signal providers. free - show only free signal providers"
     * //  "order": "newest",  // subscribers, name, newest
     * //  "locale": "",  // en, ru, zh, zh-CN, cn, es, pt, ko, fr, cs (en )
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - All marketplace items (Permission: NONE, Security: NONE)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/marketplace_api.md#all-marketplace-items-permission-none-security-none
     */

    items: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/marketplace/items`;
        const endPoint = mp + ep;
        const signed = false;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {Number} dataToSend.item_id
     * @param {Number} [dataToSend.limit]
     * @param {Number} [dataToSend.offset]
     * @param {String} [dataToSend.order]
     * @param {String} [dataToSend.order_direction]
     * @param {String} [dataToSend.locale]
     * @example // Copy/Paste
     * {
     *  "item_id": 0,
     * //  "limit": 50,  // Limit records. Max 1000
     * //  "offset": 0,  // Offset records
     * //  "order": "date",  // pair, exchange, signal_type, date
     * //  "order_direction": "desc",  // asc, desc
     * //  "locale": "en",  // en, ru, zh, zh-CN, cn, es, pt, ko, fr, cs
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Marketplace Item Signals (Permission: NONE, Security: NONE)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/marketplace_api.md#marketplace-item-signals-permission-none-security-none
     */

    itemSignals: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/marketplace/${dataToSend.item_id}/signals`;
        const endPoint = mp + ep;
        const signed = false;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },
  };
}
// =====================================================================================================================
// SMARTTRADESV2
function SmartTradesV2(user) {
  return {
    /**
     * @param {Object} dataToSend - Object with request parameters for Smart Trade v2
     * @param {Number} dataToSend.account_id
     * @param {String} dataToSend.pair
     * @param {Boolean} [dataToSend.instant]
     * @param {Boolean} [dataToSend.skip_enter_step]
     * @param {String} [dataToSend.note]
     * @param {Object} [dataToSend.leverage]
     * @param {Boolean} [dataToSend.leverage.enabled]
     * @param {String} [dataToSend.leverage.type]
     * @param {Number} [dataToSend.leverage.value]
     * @param {Object} dataToSend.position
     * @param {String} dataToSend.position.type
     * @param {Object} dataToSend.position.units
     * @param {Number} dataToSend.position.units.value
     * @param {Object} dataToSend.position.price
     * @param {Number} dataToSend.position.price.value
     * @param {String} dataToSend.position.order_type
     * @param {Object} dataToSend.position.conditional
     * @param {Object} dataToSend.position.conditional.price
     * @param {Number} dataToSend.position.conditional.price.value
     * @param {String} dataToSend.position.conditional.order_type
     * @param {Object} [dataToSend.position.conditional.trailing]
     * @param {Boolean} [dataToSend.position.conditional.trailing.enabled]
     * @param {Number} [dataToSend.position.conditional.trailing.percent]
     * @param {Object} dataToSend.take_profit
     * @param {Boolean} dataToSend.take_profit.enabled
     * @param {Array<Object>} dataToSend.take_profit.steps
     * @param {Object} dataToSend.take_profit.steps[]
     * @param {String} dataToSend.take_profit.steps[].order_type
     * @param {Object} dataToSend.take_profit.steps[].price
     * @param {Number} dataToSend.take_profit.steps[].price.value
     * @param {String} dataToSend.take_profit.steps[].price.type
     * @param {Number} [dataToSend.take_profit.steps[].price.percent]
     * @param {Number} dataToSend.take_profit.steps[].volume
     * @param {Object} dataToSend.take_profit.steps[].trailing
     * @param {Boolean} dataToSend.take_profit.steps[].trailing.enabled
     * @param {Number} [dataToSend.take_profit.steps[].trailing.percent]
     * @param {Object} dataToSend.stop_loss
     * @param {Boolean} dataToSend.stop_loss.enabled
     * @param {String} dataToSend.stop_loss.order_type
     * @param {Object} dataToSend.stop_loss.price
     * @param {Number} dataToSend.stop_loss.price.value
     * @param {Object} dataToSend.stop_loss.conditional
     * @param {Object} dataToSend.stop_loss.conditional.price
     * @param {Number} dataToSend.stop_loss.conditional.price.value
     * @param {String} dataToSend.stop_loss.conditional.price.type
     * @param {Number} [dataToSend.stop_loss.conditional.price.percent]
     * @param {Object} dataToSend.stop_loss.conditional.trailing
     * @param {Boolean} dataToSend.stop_loss.conditional.trailing.enabled
     * @param {Number} [dataToSend.stop_loss.conditional.trailing.percent]
     * @param {Object} [dataToSend.timeout]
     * @param {Boolean} [dataToSend.timeout.enabled]
     * @param {Number} [dataToSend.timeout.value]
     * @example // Copy/Paste
     * {
     *   account_id: 0, // required
     *   pair: "USDT_BTC", // required
     *   // instant: "true|false", // optional. true for Simple Buy and Simple Sell
     *   // skip_enter_step: "true|false", // optional. true only for Smart Sell
     *   // note: "",
     *   leverage: {
     *     // optional. uses only for contract exchanges
     *     enabled: "true|false", // required
     *     // type: "custom|cross|isolated|not_specified", // required only if enabled
     *     // value: 0, // value of custom leverage
     *   },
     *   position: {
     *     // required
     *     type: "buy|sell", // required
     *     units: {
     *       // required
     *       value: 0, // amount of units to buy
     *     },
     *     price: {
     *       // optional. uses for limit orders or price for Smart Sell
     *       value: 0, // required
     *     },
     *     order_type: "market|limit|conditional", // required
     *     conditional: {
     *       // required only if order type is conditional
     *       price: {
     *         // required
     *         value: 0, // conditional trigger price
     *         // type: "bid|ask|last", // optional. By default ask for long trades, bid for short trades
     *       },
     *       order_type: "market|limit", // required
     *       trailing: {
     *         // optional. Only for market orders
     *         enabled: "true|false", // required
     *         percent: 0, // required if enabled
     *       },
     *     },
     *   },
     *   take_profit: {
     *     // required only when instant is false
     *     enabled: "true|false", // required
     *     steps: [
     *       // required if enabled. Maximum steps is 8
     *       {
     *         order_type: "market|limit", // required
     *         price: {
     *           // required
     *           // value: 0, // required only if position has no trailing or position trailing is finished
     *           type: "bid|ask|last", // required
     *           // percent: 0, // required only if position has trailing and position trailing is not finished
     *         },
     *         volume: 100, // required. should be 100% in the sum of all steps
     *         trailing: {
     *           // optional. Only for market orders
     *           enabled: "true|false", // required
     *           percent: 0, // required if enabled
     *         },
     *       },
     *     ],
     *   },
     *   stop_loss: {
     *     // required only when instant is false
     *     enabled: "true|false", // required
     *     order_type: "market|limit", // required
     *     price: {
     *       // required only for limit order_type
     *       value: 0,
     *     },
     *     conditional: {
     *       // required
     *       price: {
     *         // required. SL trigger price
     *         // value: 0, // required only if position has no trailing or position trailing is finished
     *         type: "bid|ask|last", // required
     *         // percent: 0, // required only if position has trailing and position trailing is not finished
     *       },
     *       trailing: {
     *         // optional. Only for market orders
     *         enabled: "true|false", // required
     *         percent: 0, // required if enabled
     *       },
     *     },
     *     timeout: {
     *       //  optional.
     *       enabled: "true|false", // required
     *       value: 0, // required if enabled. value in seconds
     *     },
     *   },
     * };
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} - The response from 3Commas
     * @description - Create smart trade v2 (Permission: SMART_TRADE_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/smart_trades_v2_api.md#create-smart-trade-v2-permission-smart_trade_write-security-signed
     */
    create: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = "/v2/smart_trades";
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 2,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters for Smart Trade v2
     * @param {Number} [dataToSend.account_id]
     * @param {String} [dataToSend.pair]
     * @param {String} [dataToSend.type]
     * @param {Number} [dataToSend.page]
     * @param {Number} [dataToSend.per_page]
     * @param {String} [dataToSend.status]
     * @param {String} [dataToSend.order_by]
     * @param {String} [dataToSend.order_direction]
     * @example // Copy/Paste
     * {
     *  // "account_id": 0,
     *  // "pair": "",  //
     *  // "type": "",  // simple_buy, simple_sell, smart_sell, smart_trade, smart_cover
     *  // "page": 1,
     *  // "per_page": 100,
     *  // "status": "",  // all, active, finished, cancelled, failed
     *  // "order_by": "status",  // created_at, updated_at, closed_at, status
     *  // "order_direction": "desc",  // asc, desc
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Get smart trade v2 history (Permission: SMART_TRADE_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/smart_trades_v2_api.md#get-smart-trade-history-permission-smart_trade_read-security-signed
     */

    history: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = "/v2/smart_trades";
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters for Smart Trade v2
     * @param {Number} dataToSend.id
     * @example // Copy/Paste
     * {
     *  "id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Get smart trade v2 by id (Permission: SMART_TRADE_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/smart_trades_v2_api.md#get-smart-trade-v2-by-id-permission-smart_trade_read-security-signed
     */

    getByID: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/v2/smart_trades/${dataToSend.id}`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters for Smart Trade v2
     * @param {Number} dataToSend.id
     * @example // Copy/Paste
     * {
     *  "id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Cancel smart trade v2 (Permission: SMART_TRADE_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/smart_trades_v2_api.md#cancel-smart-trade-v2-permission-smart_trade_write-security-signed
     */

    cancel: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/v2/smart_trades/${dataToSend.id}`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "DELETE";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 2,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters for Smart Trade v2
     * @param {Number} dataToSend.id
     * @param {Boolean} [dataToSend.instant]
     * @param {Boolean} [dataToSend.skip_enter_step]
     * @param {Object} [dataToSend.leverage]
     * @param {Boolean} [dataToSend.leverage.enabled]
     * @param {String} [dataToSend.leverage.type]
     * @param {Number} [dataToSend.leverage.value]
     * @param {Object} dataToSend.position
     * @param {String} dataToSend.position.type
     * @param {Object} dataToSend.position.units
     * @param {Number} dataToSend.position.units.value
     * @param {Object} dataToSend.position.price
     * @param {Number} dataToSend.position.price.value
     * @param {String} dataToSend.position.order_type
     * @param {Object} dataToSend.position.conditional
     * @param {Object} dataToSend.position.conditional.price
     * @param {Number} dataToSend.position.conditional.price.value
     * @param {String} dataToSend.position.conditional.order_type
     * @param {Object} [dataToSend.position.conditional.trailing]
     * @param {Boolean} [dataToSend.position.conditional.trailing.enabled]
     * @param {Number} [dataToSend.position.conditional.trailing.percent]
     * @param {Object} dataToSend.take_profit
     * @param {Boolean} dataToSend.take_profit.enabled
     * @param {Array<Object>} dataToSend.take_profit.steps
     * @param {Object} dataToSend.take_profit.steps[]
     * @param {String} dataToSend.take_profit.steps[].order_type
     * @param {Object} dataToSend.take_profit.steps[].price
     * @param {Number} dataToSend.take_profit.steps[].price.value
     * @param {String} dataToSend.take_profit.steps[].price.type
     * @param {Number} [dataToSend.take_profit.steps[].price.percent]
     * @param {Number} dataToSend.take_profit.steps[].volume
     * @param {Object} dataToSend.take_profit.steps[].trailing
     * @param {Boolean} dataToSend.take_profit.steps[].trailing.enabled
     * @param {Number} [dataToSend.take_profit.steps[].trailing.percent]
     * @param {Object} dataToSend.stop_loss
     * @param {Boolean} dataToSend.stop_loss.enabled
     * @param {String} dataToSend.stop_loss.order_type
     * @param {Object} dataToSend.stop_loss.price
     * @param {Number} dataToSend.stop_loss.price.value
     * @param {Object} dataToSend.stop_loss.conditional
     * @param {Object} dataToSend.stop_loss.conditional.price
     * @param {Number} dataToSend.stop_loss.conditional.price.value
     * @param {String} dataToSend.stop_loss.conditional.price.type
     * @param {Number} [dataToSend.stop_loss.conditional.price.percent]
     * @param {Object} dataToSend.stop_loss.conditional.trailing
     * @param {Boolean} dataToSend.stop_loss.conditional.trailing.enabled
     * @param {Number} [dataToSend.stop_loss.conditional.trailing.percent]
     * @param {String} [dataToSend.note]
     * @example // Copy/Paste
     * {
     *   id: 0, // required
     *   leverage: {
     *     // optional. uses only for contract exchanges
     *     enabled: "true|false", // required
     *     // type: "custom|cross|isolated", // required only if enabled
     *     // value: 0, // value of custom leverage
     *   },
     *   position: {
     *     // required
     *     units: {
     *       // required
     *       value: 0, // amount of units to buy
     *     },
     *     price: {
     *       // optional. uses for limit orders or price for Smart Sell
     *       value: 0, // required
     *     },
     *     conditional: {
     *       // required only if order type is conditional
     *       price: {
     *         // required
     *         value: 0, // conditional trigger price
     *         // type: "bid|ask|last", // optional. By default ask for long trades, bid * for  short trades
     *       },
     *       order_type: "market|limit", // required
     *       trailing: {
     *         // optional. Only for market orders
     *         enabled: "true|false", // required
     *         percent: 0, // required if enabled
     *       },
     *     },
     *   },
     *   take_profit: {
     *     // required only when instant is false
     *     enabled: "true|false", // required
     *     steps: [
     *       // required if enabled. Maximum steps is 8
     *       {
     *         order_type: "market|limit", // required
     *         price: {
     *           // required
     *           // value: 0, // required only if position has no trailing or position  * trailing is finished
     *           type: "bid|ask|last", // required
     *           // percent: 0, // required only if position has trailing and position  * trailing is not finished
     *         },
     *         volume: 100, // required. should be 100% in the sum of all steps
     *         trailing: {
     *           // optional. Only for market orders
     *           enabled: "true|false", // required
     *           percent: 0, // required if enabled
     *         },
     *       },
     *     ],
     *   },
     *   stop_loss: {
     *     // required only when instant is false
     *     enabled: "true|false", // required
     *     order_type: "market|limit", // required
     *     price: {
     *       // required only for limit order_type
     *       // value: 0,
     *     },
     *     conditional: {
     *       // required
     *       price: {
     *         // required. SL trigger price
     *         // value: 0, // required only if position has no trailing or position  * trailing is finished
     *         type: "bid|ask|last", // required
     *         // percent: 0, // required only if position has trailing and position  * trailing is not finished
     *       },
     *       trailing: {
     *         // optional. Only for market orders
     *         enabled: "true|false", // required
     *         // percent: 0, // required if enabled
     *       },
     *     },
     *   },
     * };
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Update smart trade v2 (Permission: SMART_TRADE_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/smart_trades_v2_api.md#update-smart-trade-v2-permission-smart_trade_write-security-signed
     */

    update: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/v2/smart_trades/${dataToSend.id}`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "PATCH";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 2,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters for Smart Trade v2
     * @param {String} dataToSend.id
     * @param {Number} dataToSend.order_type
     * @param {Object} dataToSend.units
     * @param {Number} dataToSend.units.value
     * @param {Object} dataToSend.price
     * @param {Number} dataToSend.price.value
     * @example // Copy/Paste
     * {
     *  "id": 0,
     *  "order_type": "",  // market, limit
     *  "units": {
     *    value: 0 // Amount of units to buy
     * },
     *  "price": {
     *    value: 0,  // Price for limit order
     * },
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Average for smart trade v2 (Permission: SMART_TRADE_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/smart_trades_v2_api.md#average-for-smart-trade-v2-permission-smart_trade_write-security-signed
     */

    addBuyStep: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/v2/smart_trades/${dataToSend.id}/add_funds`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 2,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters for Smart Trade v2
     * @param {Number} dataToSend.id
     * @example // Copy/Paste
     * {
     *  "id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Close by market smart trade v2 (Permission: SMART_TRADE_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/smart_trades_v2_api.md#close-by-market-smart-trade-v2-permission-smart_trade_write-security-signed
     */

    close: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/v2/smart_trades/${dataToSend.id}/close_by_market`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 2,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters for Smart Trade v2
     * @param {Number} dataToSend.id
     * @example // Copy/Paste
     * {
     *  "id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Force start smart trade v2 (Permission: SMART_TRADE_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/smart_trades_v2_api.md#force-start-smart-trade-v2-permission-smart_trade_write-security-signed
     */

    forceStart: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/v2/smart_trades/${dataToSend.id}/force_start`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 2,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters for Smart Trade v2
     * @param {Number} dataToSend.id
     * @example // Copy/Paste
     * {
     *  "id": 0,
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @description - Process smart trade v2 (Permission: SMART_TRADE_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/smart_trades_v2_api.md#process-smart-trade-v2-permission-smart_trade_write-security-signed
     * @return {Object} Response from 3Commas
     */

    forceProcess: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/v2/smart_trades/${dataToSend.id}/force_process`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 2,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters for Smart Trade v2
     * @param {Object} dataToSend.id
     * @param {Object} dataToSend.note
     * @example // Copy/Paste
     * {
     *  id: 0,
     *  note: "",
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Set note to smart trade v2 (Permission: SMART_TRADE_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/smart_trades_v2_api.md#set-note-to-smart-trade-v2-permission-smart_trade_write-security-signed
     */

    setNote: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/v2/smart_trades/${dataToSend.id}/set_note`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 2,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters for Smart Trade v2
     * @param {Number} dataToSend.smart_trade_id
     * @example // Copy/Paste
     * {
     *  smart_trade_id: 0
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Get smart trade v2 trades (Permission: SMART_TRADE_READ, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/smart_trades_v2_api.md#get-smart-trade-v2-trades-permission-smart_trade_read-security-signed
     */

    getSteps: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/v2/smart_trades/${dataToSend.smart_trade_id}/trades`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "GET";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters for Smart Trade v2
     * @param {Number} dataToSend.smart_trade_id
     * @example // Copy/Paste
     * {
     *  smart_trade_id: 0
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Panic close trade by market (Permission: SMART_TRADE_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/smart_trades_v2_api.md#panic-close-trade-by-market-permission-smart_trade_write-security-signed
     */

    closeStepSell: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/v2/smart_trades/${dataToSend.smart_trade_id}/trades/${dataToSend.id}/close_by_market`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 2,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    /**
     * @param {Object} dataToSend - Object with request parameters for Smart Trade v2
     * @param {Number} dataToSend.smart_trade_id
     * @example // Copy/Paste
     * {
     *  smart_trade_id: 0
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Panic close trade by market (Permission: SMART_TRADE_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/smart_trades_v2_api.md#panic-close-trade-by-market-permission-smart_trade_write-security-signed
     */

    cancelBuyStep: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/v2/smart_trades/${dataToSend.smart_trade_id}/trades/${dataToSend.id}`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "DELETE";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 2,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },

    template: () => {
      return {
        account_id: null,
        pair: null,
        instant: null,
        skip_enter_step: null,
        leverage: {
          enabled: null,
          type: null,
          value: null,
        },
        position: {
          /*required*/ type: "buy|sell" /*required*/,
          units: {
            /*required*/ value: "0.1234" /*amount of units to buy*/,
          },
          price: {
            /*optional. uses for limit orders or price for Smart Sell*/
            value: "0.1234" /*required*/,
          },
          order_type: "market|limit|conditional" /*required*/,
          conditional: {
            /*required only if order type is conditional */
            price: {
              /*required*/ value: "0.1234" /*conditional trigger price*/,
              type: "bid|ask|last" /*optional. By default ask for long trades, bid for short trades */,
            },
            order_type: "market|limit" /*required*/,
            trailing: {
              /*optional. Only for market orders */
              enabled: "true|false" /*required*/,
              percent: "12.12" /*required if enabled*/,
            },
          },
        },
        take_profit: {
          /*required only when instant is false */
          enabled: "true|false" /*required*/,
          steps: [
            /*required if enabled. Maximum steps is 8 */
            {
              order_type: "market|limit" /*required*/,
              price: {
                /*required*/
                value:
                  "0.123" /*required only if position has no trailing or position trailing is finished */,
                type: "bid|ask|last" /*required*/,
                percent:
                  "10.5" /*required only if position has trailing and position trailing is not finished */,
              },
              volume:
                "25.0" /*required. should be 100% in the sum of all steps */,
              trailing: {
                /*optional. Only for market orders */
                enabled: "true|false" /*required*/,
                percent: "12.12" /*required if enabled*/,
              },
            },
            /* ... */
          ],
        },
        stop_loss: {
          /*required only when instant is false */
          enabled: "true|false" /*required*/,
          order_type: "market|limit" /*required*/,
          price: {
            /*required only for limit order_type */ value: "0.1234",
          },
          conditional: {
            /*required*/
            price: {
              /*required. SL trigger price */
              value:
                "0.1234" /*required only if position has no trailing or position trailing is finished */,
              type: "bid|ask|last" /*required*/,
              percent:
                "10.5" /*required only if position has trailing and position trailing is not finished */,
            },
            trailing: {
              /* optional. Only for market orders */
              enabled: "true|false" /*required*/,
              percent: "12.12" /*required if enabled*/,
            },
          },
          timeout: {
            /* optional. */ enabled: "true|false" /*required*/,
            value: "123" /*required if enabled. value in seconds*/,
          },
        },
      };
    },
  };
}
// =====================================================================================================================
// USERS
function Users(user) {
  return {
    /**
     * @param {Object} dataToSend - Object with request parameters
     * @param {String} dataToSend.mode
     * @example // Copy/Paste
     * {
     *  "mode": "",  // paper,real
     * }
     *
     * @param {Object} [opts] - Options for request
     * @param {Boolean} [opts.debug] - Verbose logging
     * @param {Boolean} [opts.mute] - mute HTTP request errors
     * @example // Copy/Paste
     * {
     *  "debug": false, // Verbose Request Logging
     *  "mute": false,  // Mute HTTPS Request Errors
     * }
     * @return {Object} Response from 3Commas
     * @description - Change User Mode(Paper or Real) (Permission: ACCOUNTS_WRITE, Security: SIGNED)
     * https://github.com/3commas-io/3commas-official-api-docs/blob/master/users_api.md#change-user-modepaper-or-real-permission-accounts_write-security-signed
     */

    changeMode: async (dataToSend = {}, opts = false) => {
      try {
        const mp = "/public/api";
        const ep = `/ver1/users/change_mode`;
        const endPoint = mp + ep;
        const signed = true;
        const method = "POST";
        const mute = opts.mute ? opts.mute : false;
        const debug = opts.debug ? opts.debug : false;

        const map = {
          debug: debug,
          e: endPoint,
          s: signed,
          m: method,
          u: user,
          d: dataToSend,
          mute: mute,
          v: 1,
        };

        return await Call(map);
      } catch (error) {
        throw error;
      }
    },
  };
}
// =====================================================================================================================
// WEBSOCKET
function Socket3C(user) {
  const baseUrl = "wss://ws.3commas.io/websocket";

  function connect(channel, url, ws) {
    try {
      const identifier = {
        connect: JSON.stringify({
          channel: channel,
          users: [
            {
              api_key: user.key,
              signature: signData(baseUrl + url, user.secret),
            },
          ],
        }),
      };

      const payload = JSON.stringify({
        identifier,
        command: "subscribe",
      });

      if (!ws) {
        ws = new WebSocket(baseUrl + url);
      } else {
        ws.send(payload);
      }

      return ws;
    } catch (error) {
      throw error;
    }
  }
  function listen(payload, channel, url, callback, ws) {
    ws.on("open", (d) => {
      console.log(d);
      ws.send(payload);
    });

    if (callback) {
      ws.on("message", (data) => {
        const msg = data.toString();
        callback(msg);
      });
    }

    ws.on("close", (code) => {
      if (code === 1006) {
        connect(channel, url, callback, ws);
      }
    });
  }

  return {
    smartTrades: (callback) => {
      let ws = connect("SmartTradesChannel", "/smart_trades", callback, ws);
      listen(payload, channel, url, callback, ws);
    },
    deals: (callback) => {
      let ws = connect("DealsChannel", "/deals", callback, ws);
      listen(payload, channel, url, callback, ws);
    },
    dc: () => {
      if (ws) {
        ws.close();
      }
    },
  };
}

// =====================================================================================================================
// UTILITY
function wrapData(map) {
  try {
    const baseUrl = "https://api.3commas.io";
    let params = {
      method: map.m,
      contentType: null,
      headers: {},
      data: null,
      url: null,
    };

    let dataToSend = map.d || {};
    let payload = null;
    let qs = null;

    if (map.v == 1) {
      params.contentType = "application/x-www-form-urlencoded";
      payload = dataToForm(dataToSend);
      qs = `${map.e}?${payload}`;
    } else {
      params.contentType = "application/json";
      payload = dataToSend;
      qs = `${map.e}?${JSON.stringify(payload)}`;
    }

    if (map.m == "GET") {
      params.url = baseUrl + qs;
    } else {
      params.url = baseUrl + map.e;
      params.data = payload;
    }

    if (map.s) {
      const key = map.u.key || null;
      const secret = map.u.secret || null;

      if (!key || !secret) {
        throw "API Key or Secret Missing";
      }

      params.headers = {
        APIKEY: key,
        Signature: signData(qs, secret),
      };
    }

    if (map.debug) {
      console.log(params);
    }
    return params;
  } catch (error) {
    throw error;
  }
}
function signData(end, secret) {
  try {
    let signature = CryptoJS.HmacSHA256(end, secret);
    signature = CryptoJS.enc.Hex.stringify(signature);
    return signature;
  } catch (error) {
    throw error;
  }
}
async function Call(map) {
  try {
    let params, response;
    const paginated = Object.keys(map.d).includes("per_page");
    if (!paginated) {
      params = wrapData(map);
      response = await fetch(params);
      return response.data;
    } else {
      if (map.d.per_page < 10) {
        console.log("Min per page for history is 10, using 10 instead.");
        map.d.per_page = 10;
      }
      if (map.d.per_page > 100) {
        console.log("Max per page for history is 100, using 100 instead.");
        map.d.per_page = 100;
      }
      let index = 1;
      let perPage = map.d.per_page;
      const dataContainer = [];
      while (true) {
        map.d.page = index;
        params = wrapData(map);
        response = await fetch(params);
        if (map.debug) {
          console.log(response);
        }
        dataContainer.push(response.data);
        if (response.data.length < perPage) {
          return dataContainer.flat();
        }
        await sleep(100);
        index += 1;
      }
    }
  } catch (error) {
    throw error.response.data;
  }
}
function dataToForm(dataToSend) {
  try {
    const formed = Object.keys(dataToSend).reduce(function (q, e, i) {
      q +=
        (e == "pairs"
          ? dataToSend[e].reduce(function (s, f, j) {
              s +=
                e +
                encodeURIComponent("[]") +
                "=" +
                f +
                (j != dataToSend[e].length - 1 ? "&" : "");
              return s;
            }, "")
          : e +
            "=" +
            (typeof dataToSend[e] == "object"
              ? encodeURIComponent(JSON.stringify(dataToSend[e]))
              : encodeURIComponent(dataToSend[e]))) +
        (i != Object.keys(dataToSend).length - 1 ? "&" : "");
      return q;
    }, "");
    return formed;
  } catch (error) {
    throw error;
  }
}
const sleep = async (t) => new Promise((s) => setTimeout(s, t));

// ---------------------
/**
 * @param {Object} user - Object that contains your key and secret
 * @param {String} user.key
 * @param {String} user.secret
 * @returns 3Commas methods and request results
 */
function CommasInit(self = false, user = { key: "", secret: "" }) {
  if (self) {
    user = config;
  } else {
    config = user;
  }

  const methods = {
    Accounts: Accounts(user),
    DcaBots: DcaBots(user),
    DcaDeals: DcaDeals(user),
    GridBots: GridBots(user),
    MarketPlace: MarketPlace(),
    SmartTradesV2: SmartTradesV2(user),
    Users: Users(user),
    Websocket: Socket3C(user),
  };

  return methods;
}

module.exports = {
  CommasInit,
};
