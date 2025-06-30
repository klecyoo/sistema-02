import { User } from './User';
import { Prefeitura } from './Prefeitura';
import { Convenio } from './Convenio';
import { Licitacao } from './Licitacao';
import { Contrato } from './Contrato';
import { Obra } from './Obra';
import { Documento } from './Documento';

// Usuário <-> Prefeitura
Prefeitura.hasMany(User, { foreignKey: 'prefeituraId', as: 'usuarios' });
User.belongsTo(Prefeitura, { foreignKey: 'prefeituraId', as: 'prefeitura' });

// Prefeitura <-> Convenio
Prefeitura.hasMany(Convenio, { foreignKey: 'prefeituraId', as: 'convenios' });
Convenio.belongsTo(Prefeitura, { foreignKey: 'prefeituraId', as: 'prefeitura' });

// Convenio <-> Licitacao
Convenio.hasMany(Licitacao, { foreignKey: 'convenioId', as: 'licitacoes' });
Licitacao.belongsTo(Convenio, { foreignKey: 'convenioId', as: 'convenio' });

// Licitacao <-> Contrato
Licitacao.hasMany(Contrato, { foreignKey: 'licitacaoId', as: 'contratos' });
Contrato.belongsTo(Licitacao, { foreignKey: 'licitacaoId', as: 'licitacao' });

// Contrato <-> Obra
Contrato.hasMany(Obra, { foreignKey: 'contratoId', as: 'obras' });
Obra.belongsTo(Contrato, { foreignKey: 'contratoId', as: 'contrato' });

// Documento <-> Usuário (quem fez upload)
User.hasMany(Documento, { foreignKey: 'uploadedBy', as: 'documentos' });
Documento.belongsTo(User, { foreignKey: 'uploadedBy', as: 'uploader' });

export {
  User,
  Prefeitura,
  Convenio,
  Licitacao,
  Contrato,
  Obra,
  Documento,
};