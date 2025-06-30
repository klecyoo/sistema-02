import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface ContratoAttributes {
  id: number;
  numero: string;
  contratado: string;
  valor: number;
  vigenciaInicio: Date;
  vigenciaFim: Date;
  licitacaoId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContratoCreationAttributes extends Optional<ContratoAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Contrato extends Model<ContratoAttributes, ContratoCreationAttributes> implements ContratoAttributes {
  public id!: number;
  public numero!: string;
  public contratado!: string;
  public valor!: number;
  public vigenciaInicio!: Date;
  public vigenciaFim!: Date;
  public licitacaoId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Contrato.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    numero: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    contratado: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    valor: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    vigenciaInicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    vigenciaFim: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    licitacaoId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: 'licitacoes', key: 'id' },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'contratos',
    modelName: 'Contrato',
  }
);