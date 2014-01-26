'use strict';

var BigNumber = require('bignumber.js');

var upperLimit = BigNumber(1024).times(16);

var min = function(x, y) { return x.comparedTo(y) < 0 ? x : y; };

module.exports = {
  accounts: {
    storageMb: {
      allowance: function(storageQuotaMb) { return storageQuotaMb; }
    },
    invites: {}
  },
  vars: {
    storageQuotaMb: function(invites) {
      return min(BigNumber(2048).plus(BigNumber(500).times(invites)), upperLimit);
    }
  },
  notifications: {
    storageOverQuota: function(storageUsedMb, storageQuotaMb) { return BigNumber(storageUsedMb).gt(storageQuotaMb); }
  }
};
