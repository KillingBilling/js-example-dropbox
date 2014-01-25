'use strict';

var BigNumber = require('bignumber.js');

var upperLimit = BigNumber(1024).times(16);

var min = function(x, y) { return x.comparedTo(y) < 0 ? x : y; };

module.exports = {
  accounts: {
    storageQuotaMb: function(invites) {
      return min(BigNumber(2048).plus(BigNumber(500).times(invites)), upperLimit);
    },
    storageUsedMb: {
      valid: function(z, x) { return BigNumber(x).gte(0); }
    },
    invites: {
      valid: function(z, x) { var bx = BigNumber(x); return z == null ? bx.gte(0) : bx.gte(z); }
    }
  },
  notifications: {
    storageOverQuota: function(storageUsedMb, storageQuotaMb) { return BigNumber(storageUsedMb).gt(storageQuotaMb); }
  }
};
