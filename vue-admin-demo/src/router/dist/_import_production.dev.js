"use strict";

module.exports = function (file) {
  return require('@/components/' + file + '.vue')["default"];
};