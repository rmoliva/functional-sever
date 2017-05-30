const R = require('ramda');

const _getID = R.prop('id');
const _hasID = R.propEq('id')

const usersTable = function(db) {
  return {
    index: () => R.values(db),
    show: (id) => R.find(_hasID(id), R.values(db)),
    create: (user) => db[_getID(user)] = user,
    update: () => {},
    destroy: () => {},
  };
};

module.exports = usersTable;