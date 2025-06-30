import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface ConvenioAttributes {
  id: number;
  numero: string;
  objeto: string;
  concedente: string;
  convenente: string;
  vigenciaInicio: Date;
  vigenciaFim: Date;
  valorTotal: number;
  prefeituraId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ConvenioCreationAttributes extends Optional<ConvenioAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Convenio extends Model<ConvenioAttributes, ConvenioCreationAttributes> implements ConvenioAttributes {
  public id!: number;
  public numero!: string;
  public objeto!: string;
  public concedente!: string;
  public convenente!: string;
  public vigenciaInicio!: Date;
  public vigenciaFim!: Date;
  public valorTotal!: number;
  public prefeituraId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Convenio.init(
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
    objeto: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    concedente: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    convenente: {
      type: DataTypes.STRING(120),
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
    valorTotal: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    prefeituraId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: 'prefeituras', key: 'id' },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'convenios',
    modelName: 'Convenio',
  }
);