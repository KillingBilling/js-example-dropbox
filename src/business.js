'use strict';

var BigNumber = require('bignumber.js');

var minPrice = BigNumber(15).times(5);
var max = function(x, y) { return x.comparedTo(y) > 0 ? x : y };

module.exports = {

  cycles: {
    $subscription: {
      $begin: ['monthly'],
      storageUsedMb: {},
      users: {}
    },
    monthly: {
      $duration: "1 month",
      usd: {
        $cost: function(users) { return max(BigNumber(users).times(15), minPrice) }
      }
    }
  },

  notifications: {
    usdBelow0: function(usd) { return BigNumber(usd).lt(0) }
  }

};
