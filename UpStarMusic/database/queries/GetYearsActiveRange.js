const Artist = require('../models/artist');

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */
module.exports = () => {
  const minPromise = Artist.find({}).sort({ yearsActive: 1 }).limit(1).then((artists) => {
    return artists[0].yearsActive;
  });

  const maxPromise = Artist.find({}).sort({ yearsActive: -1 }).limit(1).then((artists) => {
    return artists[0].yearsActive;
  });

  return Promise.all([minPromise, maxPromise]).then((data) => {
    return { min: data[0], max: data[1] };
  });
};
