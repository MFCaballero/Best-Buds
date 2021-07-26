const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({height:'3-4',
                    weight:'1-2'
                  })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should throw an error if height is null', (done) => {
        Dog.create({name:'Caniche',
                    weight:'1-2'
                  })
          .then(() => done(new Error('It requires a valid height')))
          .catch(() => done());
      });
      it('should throw an error if weight is null', (done) => {
        Dog.create({name:'Buldog',
                    height:'1-2'
                  })
          .then(() => done(new Error('It requires a valid weight')))
          .catch(() => done());
      });
      it('should work when its a valid input', () => {
        Dog.create({ name: 'Pug', height: '1-2', weight: '3-4'});
      });
      it('error con inputs invalidos', function(done) {
        Dog.create({name:'Buldog',
                    height: false,
                    weight: "sfdsfsd"
                  })
            .then(() => done(new Error('It requires a valid input')))
            .catch(() => done());
      });
    });
    describe('Hooks', function () {
      it('setea id antes de validar ', function() {
        return Dog.create({name:'Salchicha',
        height: "1-2",
        weight: "3-4"
      })
          .then(dog => {
            expect(typeof dog.id).to.equal("string");
          })
      });
    });
  });
});
