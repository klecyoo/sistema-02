import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface DocumentoAttributes {
  id: number;
  nome: string;
  caminho: string;
  tipo: string;
  entidade: 'Convenio' | 'Licitacao' | 'Contrato' | 'Obra' | 'PrestacaoContas';
  entidadeId: number;
  uploadedBy: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DocumentoCreationAttributes extends Optional<DocumentoAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Documento extends Model<DocumentoAttributes, DocumentoCreationAttributes> implements DocumentoAttributes {
  public id!: number;
  public nome!: string;
  public caminho!: string;
  public tipo!: string;
  public entidade!: 'Convenio' | 'Licitacao' | 'Contrato' | 'Obra' | 'PrestacaoContas';
  public entidadeId!: number;
  public uploadedBy!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Documento.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    caminho: {
      type: DataTypes.STRING(350),
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    entidade: {
      type: DataTypes.ENUM('Convenio', 'Licitacao', 'Contrato', 'Obra', 'PrestacaoContas'),
      allowNull: false,
    },
    entidadeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    uploadedBy: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'documentos',
    modelName: 'Documento',
  }
);