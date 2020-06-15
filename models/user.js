module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    id: { 
      allowNull: false,
      primaryKey: true, 
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    firstName: { 
      type: Sequelize.STRING, 
      notEmpty: true 
    },
    lastName: { 
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
      type: Sequelize.INTEGER
    },
    lastLogin: { 
      type: Sequelize.DATE 
    },
    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }
  });
  return User;
};
