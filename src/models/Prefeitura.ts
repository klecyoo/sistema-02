import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface PrefeituraAttributes {
  id: number;
  nome: string;
  cnpj: string;
  municipio: string;
  uf: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PrefeituraCreationAttributes extends Optional<PrefeituraAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Prefeitura extends Model<PrefeituraAttributes, PrefeituraCreationAttributes> implements PrefeituraAttributes {
  public id!: number;
  public nome!: string;
  public cnpj!: string;
  public municipio!: string;
  public uf!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Prefeitura.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    cnpj: {
      type: DataTypes.STRING(18),
      allowNull: false,
      unique: true,
    },
    municipio: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    uf: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'prefeituras',
    modelName: 'Prefeitura',
  }
);