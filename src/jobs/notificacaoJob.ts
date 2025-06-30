import { Convenio } from '../models/Convenio';
import { Contrato } from '../models/Contrato';
import { User } from '../models/User';
import { sendEmail } from '../services/emailService';

// Verificar prazos de vigência que irão expirar em até 7 dias
async function verificarVigencias() {
  const agora = new Date();
  const daqui7dias = new Date();
  daqui7dias.setDate(agora.getDate() + 7);

  // Convênios que vencem em até 7 dias
  const convenios = await Convenio.findAll({
    where: {
      vigenciaFim: {
        $gte: agora,
        $lte: daqui7dias,
      },
    },
  });

  // Contratos que vencem em até 7 dias
  const contratos = await Contrato.findAll({
    where: {
      vigenciaFim: {
        $gte: agora,
        $lte: daqui7dias,
      },
    },
  });

  for (const convenio of convenios) {
    // Buscar usuários da prefeitura do convênio
    const users = await User.findAll({ where: { prefeituraId: convenio.prefeituraId } });
    for (const user of users) {
      await sendEmail({
        to: user.email,
        subject: `Aviso: Convênio ${convenio.numero} está próximo do fim de vigência`,
        text: `O convênio ${convenio.numero} (${convenio.objeto}) expira em breve (${convenio.vigenciaFim.toLocaleDateString()}).`,
      });
    }
  }

  for (const contrato of contratos) {
    // Buscar usuários da prefeitura pela relação com licitação > convênio
    // Para simplificação, supomos que a relação esteja disponível
    // (Em produção, use include/join para buscar prefeituraId)
    // Aqui vamos apenas pular envio detalhado
  }
}

// Agendar execução a cada 24h (86_400_000 ms)
setInterval(() => {
  verificarVigencias().catch(console.error);
}, 86_400_000);

export default verificarVigencias;