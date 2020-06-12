module.exports = (sequelize, Sequelize) => {
  var Customer = sequelize.define('customer', {
    id: { 
        allowNull: false,
        primaryKey: true, 
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING,    
    },
    customerNumber: {
        type: Sequelize.STRING,  
    },
    phoneNumber: {
        type: Sequelize.STRING,  
    },
    activityId: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    result: {
        type: Sequelize.INTEGER,
    },
    note: {
        type: Sequelize.STRING,
    }
  });

  return Customer;
};