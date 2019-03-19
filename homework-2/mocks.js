const faker = require('faker');

faker.locale = 'en';

const models = require('./models');

const classArray = ['Custom', 'Luxury', 'MPV', 'SUV', 'Sport'];
const sizeArray = [
  'Micro',
  'City',
  'Kei',
  'Subcompact',
  'Supermini',
  'Family',
  'Compact',
  'Mid-size',
  'Full-size'
];
const styleArray = [
  '2+2',
  'Baquet',
  'Barchetta',
  'Berlinetta',
  'Brougham',
  'Cabrio coach',
  'Cab over',
  'Cabriolet / Convertible',
  'Coupé',
  'Coupé de Ville',
  'Coupé utility',
  'Drophead coupe (Convertible)',
  'Fastback',
  'Hardtop',
  'Hatchback',
  'Landaulet',
  'Liftback',
  'Limousine',
  'Multi-stop truck',
  'Notchback',
  'Panel van',
  'Phaeton',
  'Pickup truck',
  'Quad coupé',
  'Retractable hardtop',
  'Roadster',
  'Runabout',
  'Saloon / Sedan',
  'Sedan delivery/Panel van',
  'Sedanca de Ville (Coupé de Ville)',
  'Shooting-brake',
  'Spider / Spyder (Roadster)',
  'Station wagon',
  'Targa top',
  'Torpedo',
  'Touring',
  'Town (Coupé de Ville)',
  'T-top',
  'Vis-à-vis'
];

module.exports = () => {
  models.vehicle
    .remove()
    .then(() => {
      Array.from({ length: 1 }).forEach(() => {
        models.vehicle
          .create({
            manufacturer: faker.lorem.word(),
            model: faker.lorem.word(),
            class: classArray[faker.random.number(4)],
            style: styleArray[faker.random.number(38)],
            size: sizeArray[faker.random.number(8)],
            year: faker.random.number({ min: 1960, max: 2019 }),
            cost: faker.commerce.price(1000, 100000),
            observations: faker.lorem.words(5),
            in_leasing: faker.random.boolean(),
            security_system: faker.random.boolean()
          })
          .then(console.log)
          .catch(console.log);
      });
    })
    .catch(console.log);
};
