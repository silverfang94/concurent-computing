const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    uid: {
      type: Number,
      required: true,
      unique: true
    },
    manufacturer: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    class: {
      type: String,
      enum: ['Custom', 'Luxury', 'MPV', 'SUV', 'Sport'],
      required: true,
      default: 'Custom'
    },
    style: {
      type: String,
      enum: [
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
      ],
      required: true
    },
    size: {
      type: String,
      enum: [
        'Micro',
        'City',
        'Kei',
        'Subcompact',
        'Supermini',
        'Family',
        'Compact',
        'Mid-size',
        'Full-size'
      ],
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    cost: {
      type: Number,
      required: true
    },
    observations: {
      type: String
    },
    in_leasing: {
      type: Boolean,
      default: false
    },
    security_system: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

schema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('vehicle', schema);
