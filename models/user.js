const ROLES = require('../utils/roles');

module.exports = (sequelize, Sequelize) => {
  var User = sequelize.define('user', {
    id: { 
      allowNull: false,
      primaryKey: true, 
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    firstname: { 
      type: Sequelize.STRING, 
      notEmpty: true 
    },
    lastname: { 
      type: Sequelize.STRING, 
      notEmpty: true 
    },
    email: { 
      type: Sequelize.STRING, 
      validate: { 
        isEmail: true 
      } 
    },
    password: { 
      type: Sequelize.STRING, 
      allowNull: false 
    },
    role: {
      type: Sequelize.INTEGER,
      defaultValue: ROLES.Debitur
    },
    last_login: { 
      type: Sequelize.DATE 
    },
    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }
  });

  return User;
};
