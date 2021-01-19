const menu = require('../modules/menu');
const Minicart = require('../modules/minicart');
const minicart = require('../modules/minicart')

const Default = {
  init: function() {
    Default.menuInit();
    Minicart.init({ minicartClass: '.center__cart', OutterBox: true})
  },

  menuInit: () => {
    const menuConfig = {
      tree: 3,
      mainClass: '.nav__list'
    };

    menu.init(menuConfig);
  },
};

module.exports = Default;
