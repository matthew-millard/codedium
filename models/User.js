// Imports
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(loginPw) {
    // The checkPassword method allows you to check if the provided password matches the stored(hashed) password for a user
    return bcrypt.compareSync(loginPw, this.password); // returns either true or false depending if they match
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        // refers to the password property on the newUserData object
        newUserData.password = await bcrypt.hash(newUserData.password, 10); // 10 salt rounds for bcrypt
        return newUserData; // the return is important, as it allows the new (updated) data to be inserted into the database
      },
      beforeUpdate: async (updatedUserData) => {
        if (updatedUserData.changed('password')) {
          // Checks if the user is changing the password, if so, the new password will be hashed
          updatedUserData.password = await bcrypt.hash(
            updatedUserData.password,
            10
          );
        }
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

// Exports
module.exports = User;
