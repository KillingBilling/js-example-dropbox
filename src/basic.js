'use strict';

var BigNumber = require('bignumber.js');

var upperLimitMb = BigNumber(1024).times(16);
var min = function(x, y) { return x.comparedTo(y) < 0 ? x : y };
var quotaMb = function(invites) { return min(BigNumber(2048).plus(BigNumber(512).times(invites)), upperLimitMb) };

module.exports = {

  cycles: {
    $subscription: {
      storageUsedMb: {},
      invites: {}
    }
  },

  values: {
    storageQuotaMb: function(invites) { return quotaMb(invites) }
  },

  notifications: {
    storage10pcntLeft: function(storageUsedMb, storageQuotaMb) {
      return BigNumber(storageUsedMb).gt(BigNumber(storageQuotaMb).times(0.9))
    },
    storageOverUsed: function(storageUsedMb, storageQuotaMb) { return BigNumber(storageUsedMb).gt(storageQuotaMb) }
  }

};
