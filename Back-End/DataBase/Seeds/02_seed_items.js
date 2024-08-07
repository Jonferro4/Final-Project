exports.seed = async function(knex) {
   
    await knex('items').del();
    await knex.raw('ALTER SEQUENCE items_id_seq RESTART WITH 1');
  

    const users = await knex('users').select('id', 'username');
  
    
    const user1 = users.find(user => user.username === 'Walmart');
    const user2 = users.find(user => user.username === 'Target');
    const user3 = users.find(user => user.username === 'GameStop');
    const user4 = users.find(user => user.username === 'Amazon');
  
    await knex('items').insert([
      {
        user_id: user1.id,
        name: 'Laptop',
        description: 'High-performance laptop for development',
        quantity: 1
      },
      {
        user_id: user2.id,
        name: 'Smartphone',
        description: 'Latest model smartphone',
        quantity: 1
      },
      {
        user_id: user3.id,
        name: 'Headphones',
        description: 'Noise-cancelling headphones',
        quantity: 1
      },
      {
        user_id: user1.id,
        name: 'Mouse',
        description: 'Ergonomic wireless mouse',
        quantity: 2
      },
      {
        user_id: user1.id,
        name: 'Mou',
        description: 'Ergonomic wiuse',
        quantity: 2
      }
    ]);
  };