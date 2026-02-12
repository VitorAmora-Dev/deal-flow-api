const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Cliente = sequelize.define(
  'Cliente',
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['lead', 'proposta', 'fechado']],
      },
    },
    valorPotencial: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    comissao: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'clientes',
    timestamps: true,
  }
);

module.exports = Cliente;

