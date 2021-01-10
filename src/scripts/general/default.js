const menu = require('../modules/menu');

const Default = {
  init: function() {
    Default.menuInit();
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
