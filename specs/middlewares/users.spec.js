const expect = require('chai').expect;
const R = require('ramda');
const usersTable = require('../users_table');
const usersMiddleware = require('../../monads/middlewares/users.js');

describe('usersMiddlewar', function() {
  const db = {};

  // Tenemos una tabla de usuarios
  const table = usersTable(db);

  describe('usersTable prepare', function() {
    describe('adding two users', function() {
      beforeEach(function() {
        table.create({
          id: 1,
          name: 'Pepe'
        });

        table.create({
          id: 2,
          name: 'Juan'
        });
      });
      it('usersTable should contain two users', function() {
        expect(table.index()).to.eql([{
          id: 1,
          name: 'Pepe'
        }, {
          id: 2,
          name: 'Juan'
        }]);
      });
      it('usersTable should return each user by id', function() {
        expect(table.show(1)).to.eql({
          id: 1,
          name: 'Pepe'
        });
        expect(table.show(2)).to.eql({
          id: 2,
          name: 'Juan'
        });
      });

      describe('usersMiddleware', function() {
        describe('#index request', function() {
          it('should return the list of users', function() {
            const sdata = {
              request: {
                method: 'GET',
                url: '/users'
              }
            }
            const subject = usersMiddleware(sdata).run();

            expect(subject).to.eql([{
              id: 1,
              name: 'Pepe'
            }, {
              id: 2,
              name: 'Juan'
            }]);
          });
        });
      });
    });
  });
});
