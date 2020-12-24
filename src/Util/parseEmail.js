/**
 * @typedef {Object} StudentEmail
 * @property {number} year
 * @property {string} department
 * @property {number} roll
 */

/**
 * Sample Email : 12IT19@quest.edu.pk
 * Break up: [year][Department][Rollnumber]
 * @param {string} email
 * @return {Object|boolean}
 */
function parseEmail(email) {
  const parsedEmail = email.split('@');
  if (parsedEmail[1] !== 'quest.edu.pk') return false;
  if (parsedEmail[0].length !== 6) return false;

  /**
   * @type {StudentEmail}
   */
  const data = {};
  data.year = parsedEmail[0][0] + parsedEmail[0][1];
  data.department = parsedEmail[0][2] + parsedEmail[0][3];
  data.roll = parsedEmail[0][4] + parsedEmail[0][5];
  return data;
}

module.exports = parseEmail;
