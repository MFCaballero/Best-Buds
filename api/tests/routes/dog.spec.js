/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const supertest = require('supertest-as-promised')(require('../../src/app.js'));
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  height: '0-1',
  weight: '1-4'
};

describe('Dogs Routes', function() {
  this.timeout(15000);
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('/dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
    it('GET /dogs responde con un array con los objetos agregados mas los devueltos por la api', function() {
      return supertest
        .get('/dogs')
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).to.have.length(173);
          expect(res.body[0].name).to.eql('Pug');
          expect(res.body[0].weight).to.eql('1-4');
          expect(res.body[1].name).to.eql("Affenpinscher");
        })
    });
    
  });
  describe('/dogs/:id', function() {
    it('GET /dogs/:id responde con un objeto con los datos de la raza correspondiente a ese id', function() {
      return supertest
        .get('/dogs/5')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).to.eql({
            id: 5,
            name: "Akbash Dog",
            height: "71 - 86",
            weight: "41 - 54",
            life_span: "10 - 12 years",
            image: "https://cdn2.thedogapi.com/images/26pHT3Qk7.jpg",
            temperaments: [
                {
                    temperament: "Loyal"
                },
                {
                    temperament: " Independent"
                },
                {
                    temperament: " Intelligent"
                },
                {
                    temperament: " Brave"
                }
            ]
        });
        });
    });
  });
});
