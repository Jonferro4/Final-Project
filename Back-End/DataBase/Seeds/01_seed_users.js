const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  await knex('items').del();
  await knex('users').del();
  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
  
  const salt = await bcrypt.genSalt(10);
  const password1 = await bcrypt.hash('walmart', salt);
  const password2 = await bcrypt.hash('target', salt);
  const password3 = await bcrypt.hash('costco', salt);
  const password4 = await bcrypt.hash('amazon', salt);

  await knex('users').insert([
    {
      first_name: 'Doug',
      last_name: 'McMillon',
      username: 'Walmart',
      password: password1
    },
    {
      first_name: 'Brian',
      last_name: 'Cornell',
      username: 'Target',
      password: password2
    },
    {
      first_name: 'James',
      last_name: 'Sinegal',
      username: 'Costco',
      password: password3
    },
    {
      first_name: 'Jeff',
      last_name: 'Bezos',
      username: 'Amazon',
      password: password4
    }
  ]);
};