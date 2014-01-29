'use strict';

var BigNumber = require('bignumber.js');

var upperLimitMb = BigNumber(1024).times(16);
var min = function(x, y) { return x.comparedTo(y) < 0 ? x : y; };

module.exports = {
  accounts: {
    storageMb: {
      allocation: function(invites) {
        return min(BigNumber(2048).plus(BigNumber(512).times(invites)), upperLimitMb);
      }
    },
    invites: {}
  },
  notifications: {
    storageUsedOverQuota: function(storageMb) { return BigNumber(storageMb).lt(0); }
  }
};
