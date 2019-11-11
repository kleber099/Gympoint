module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('students', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      weight: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      height: {
        type: Sequelize.DOUBLE,
        allowNull: false
      }
    }),

  down: queryInterface => queryInterface.dropTable('students')
};
