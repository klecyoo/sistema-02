import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface ObraAttributes {
  id: number;
  nome: string;
  status: 'nao_iniciada' | 'em_andamento' | 'concluida' | 'paralisada';
  percentualExecucao: number;
  dataInicio: Date;
  dataFim: Date | null;
  contratoId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ObraCreationAttributes extends Optional<ObraAttributes, 'id' | 'dataFim' | 'createdAt' | 'updatedAt'> {}

export class Obra extends Model<ObraAttributes, ObraCreationAttributes> implements ObraAttributes {
  public id!: number;
  public nome!: string;
  public status!: 'nao_iniciada' | 'em_andamento' | 'concluida' | 'paralisada';
  public percentualExecucao!: number;
  public dataInicio!: Date;
  public dataFim!: Date | null;
  public contratoId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Obra.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('nao_iniciada', 'em_andamento', 'concluida', 'paralisada'),
      allowNull: false,
      defaultValue: 'nao_iniciada',
    },
    percentualExecucao: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0,
    },
    dataInicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dataFim: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    contratoId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: 'contratos', key: 'id' },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'obras',
    modelName: 'Obra',
  }
);