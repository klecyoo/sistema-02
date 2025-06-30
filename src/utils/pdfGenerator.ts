import PDFDocument from 'pdfkit';
import { Response } from 'express';

interface RelatorioPrestacaoContasOptions {
  convenioNumero: string;
  prefeituraNome: string;
  periodo: string;
  valorTotal: string;
  documentos: { nome: string; tipo: string }[];
}

export function gerarRelatorioPrestacaoContasPDF(
  res: Response,
  options: RelatorioPrestacaoContasOptions
) {
  const doc = new PDFDocument({ margin: 40, size: 'A4' });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="relatorio_prestacao_contas.pdf"`);

  doc.pipe(res);

  doc.fontSize(18).text('Relatório de Prestação de Contas', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`Convênio: ${options.convenioNumero}`);
  doc.text(`Prefeitura: ${options.prefeituraNome}`);
  doc.text(`Período: ${options.periodo}`);
  doc.text(`Valor Total: R$ ${options.valorTotal}`);
  doc.moveDown();

  doc.fontSize(14).text('Documentos Anexados:', { underline: true });
  doc.moveDown(0.5);

  options.documentos.forEach((docItem, idx) => {
    doc.fontSize(12).text(`${idx + 1}. ${docItem.nome} (${docItem.tipo})`);
  });

  doc.end();
}