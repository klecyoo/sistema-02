import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface LicitacaoAttributes {
  id: number;
  modalidade: string;
  edital: string;
  processo: string;
  dataAbertura: Date;
  convenioId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LicitacaoCreationAttributes extends Optional<LicitacaoAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Licitacao extends Model<LicitacaoAttributes, LicitacaoCreationAttributes> implements LicitacaoAttributes {
  public id!: number;
  public modalidade!: string;
  public edital!: string;
  public processo!: string;
  public dataAbertura!: Date;
  public convenioId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Licitacao.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    modalidade: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    edital: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    processo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dataAbertura: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    convenioId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: 'convenios', key: 'id' },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'licitacoes',
    modelName: 'Licitacao',
  }
);