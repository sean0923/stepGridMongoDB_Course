const Artist = require('../models/artist');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
  const minPromise = Artist.find({}).sort({ age: 1 }).limit(1).then((artists) => {
    return artists[0].age;
  });

  const maxPromise = Artist.find({}).sort({ age: -1 }).limit(1).then((artists) => {
    return artists[0].age;
  });

  return Promise.all([minPromise, maxPromise]).then((data) => {
    return { min: data[0], max: data[1] };
  });
};
