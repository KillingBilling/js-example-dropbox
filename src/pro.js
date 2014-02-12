'use strict';

var BigNumber = require('bignumber.js');

var max = function(x, y) { return x.comparedTo(y) > 0 ? x : y };

var quotas = [100, 200, 500].map(function(x) { return BigNumber(1024).times(x) });

function quota(storageUsedMb$maxValue) {
  var y = BigNumber(storageUsedMb$maxValue);
  return quotas.reduce(function(z, x) { return z.gte(y) ? z : x })
}

module.exports = {

  cycles: {
    $subscription: {
      $begin: ['monthly'],
      storageUsedMb: {},
      usd: {}
    },
    monthly: {
      $duration: "1 month",
      storageUsedMb: {
        maxValue: {
          aggr: function(z, x) { return max(BigNumber(z), BigNumber(z).plus(x)) },
          init: function(z) { return 0 }
        }
      },
      usd: {
        $cost: function(storageUsedMb$maxValue) { return quota(storageUsedMb$maxValue).div(10240).minus(0.01) }
      }
    }
  },

  values: {
    storageQuotaMb: function(monthly$storageUsedMb$maxValue) { return quota(monthly$storageUsedMb$maxValue) }
  },

  notifications: {
    storage10pcntLeft: function(storageUsedMb, storageQuotaMb) {
      return BigNumber(storageUsedMb).gt(BigNumber(storageQuotaMb).times(0.9))
    },
    storageOverUsed: function(storageUsedMb, storageQuotaMb) { return BigNumber(storageUsedMb).gt(storageQuotaMb) }
  }

};
