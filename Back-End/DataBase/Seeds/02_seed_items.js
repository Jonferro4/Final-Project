exports.seed = async function(knex) {
   
    await knex('items').del();
    await knex.raw('ALTER SEQUENCE items_id_seq RESTART WITH 1');
  

    const users = await knex('users').select('id', 'username');
  
    
    const user1 = users.find(user => user.username === 'Walmart');
    const user2 = users.find(user => user.username === 'Target');
    const user3 = users.find(user => user.username === 'Costco');
    const user4 = users.find(user => user.username === 'Amazon');
  
    await knex('items').insert([
      {
        user_id: user1.id,
        name: 'Laptop',
        description: 'Portable power',
        quantity: 1
      },
      {
        user_id: user1.id,
        name: 'Smartphone',
        description: 'same model as last years phone',
        quantity: 1
      },
      {
        user_id: user1.id,
        name: 'Headphones',
        description: 'Wireless headphones',
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
        name: 'Bicycle',
        description: 'Assembly required :)',
        quantity: 2
      },
      {
        user_id: user2.id,
        name: 'Laptop',
        description: 'Portable power',
        quantity: 1
      },
      {
        user_id: user2.id,
        name: 'Smartphone',
        description: 'same model as last years phone',
        quantity: 1
      },
      {
        user_id: user2.id,
        name: 'Headphones',
        description: 'Wireless headphones',
        quantity: 1
      },
      {
        user_id: user2.id,
        name: 'Mouse',
        description: 'Ergonomic wireless mouse',
        quantity: 2
      },
      {
        user_id: user2.id,
        name: 'Bicycle',
        description: 'Assembly required :)',
        quantity: 2
      },
      {
        user_id: user3.id,
        name: 'Laptop',
        description: 'Portable power',
        quantity: 10
      },
      {
        user_id: user3.id,
        name: 'Smartphone',
        description: 'same model as last years phone',
        quantity: 9
      },
      {
        user_id: user3.id,
        name: 'Headphones',
        description: 'Wireless headphones',
        quantity: 18
      },
      {
        user_id: user3.id,
        name: 'Mouse',
        description: 'Ergonomic wireless mouse',
        quantity: 5
      },
      {
        user_id: user3.id,
        name: 'Bicycle',
        description: 'Assembly required :)',
        quantity: 4
      },
      {
        user_id: user4.id,
        name: 'Laptop',
        description: 'Portable power',
        quantity: 12
      },
      {
        user_id: user4.id,
        name: 'Smartphone',
        description: 'same model as last years phone',
        quantity: 14
      },
      {
        user_id: user4.id,
        name: 'Headphones',
        description: 'Wireless headphones',
        quantity: 15
      },
      {
        user_id: user4.id,
        name: 'Mouse',
        description: 'Ergonomic wireless mouse',
        quantity: 21
      },
      {
        user_id: user4.id,
        name: 'Bicycle',
        description: 'Assembly required :)',
        quantity: 24
      }
    ]);
  };