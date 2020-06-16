module.exports = (sequelize, Sequelize) => {
    const CallRecord = sequelize.define('call_record', {
      id: { 
          primaryKey: true, 
          type: Sequelize.INTEGER,
          autoIncrement: true,
      },
      notes: {
          type: Sequelize.STRING,
          allowNull: true,    
      },
      scheduleTime: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
      },
      SMSLink: {
          type: Sequelize.STRING,
      },
      callTime: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
      },
      folderName: {
          type: Sequelize.STRING
      }
    });

    CallRecord.associate = function(models) {
        CallRecord.belongsTo(models.customer, {as: 'customer', foreignKey: "customerId"})
        CallRecord.belongsTo(models.user, {as: 'sales', foreignKey: "salesId"})
      };
    
    return CallRecord;
  };