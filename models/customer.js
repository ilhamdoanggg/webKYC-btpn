module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define('customer', {
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
    },
    result: {
        type: Sequelize.INTEGER,
    },
    note: {
        type: Sequelize.STRING,
    }
  });

  Customer.associate = function(models) {
    Customer.belongsTo(models.user, {as: 'sales', foreignKey: 'salesId', })
  };
  
  return Customer;
};