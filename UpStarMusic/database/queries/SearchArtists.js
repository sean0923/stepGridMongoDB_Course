const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */

const buildQuery = (criteria) => {
  const { name, age, yearsActive } = criteria;

  const queryObj = {};

  if (name) {
    queryObj.name = {
      $regex: name,
      $options: 'i',
    };
  }

  if (age) {
    queryObj.age = {
      $gte: age.min,
      $lte: age.max,
    };
  }

  if (yearsActive) {
    queryObj.yearsActive = {
      $gte: yearsActive.min,
      $lte: yearsActive.max,
    };
  }

  return queryObj;
};

module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  return Artist.find(buildQuery(criteria))
    .sort({ [sortProperty]: 1 })
    .skip(offset)
    .limit(limit)
    .then((artists) => {
      return {
        all: artists,
        count: artists.length,
        offset,
        limit,
      };
    });

  // return Promise.all([query, Artist.count()]).then((data) => {
  //   return {
  //     all: data[0],
  //     count: data[0].length,
  //     offset,
  //     limit,
  //   };
  // });
};
