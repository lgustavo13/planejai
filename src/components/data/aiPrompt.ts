import type { SimulationRecord } from '@/components/data/simulation'
import { parseCurrency } from '@/utils/currency'
import { calcMounthlySavings } from '@/utils/simulation'

const RESPONSE_SCHEMA = JSON.stringify(
  {
    feasibility: {
      status: 'viable | needs_adjustment | unfeasible',
      content:
        '<Análise objetiva sobre se a meta é atingivel no prazo com o valor disponível. Mencione os números relevantes.>',
    },
    Diagnosis: {
      content:
        '<Diagnóstico focado no comprometimento do orçamento: quanto % da renda está comprometida com gastos e dividas>',
    },
    suggestions: {
      items: [
        '<Sugestão prática e concreta para reduzir gastos ou reorganizar o orçamento>',
      ],
    },
    extraIncome: {
      items: [
        '<Ideia prática para gerar renda extra compatível com a realidade brasileira>',
      ],
    },
    investment: {
      items: [
        '<Sugestão de investimento acessivel para o perfil apresentado, com foco em atingir a meta>',
      ],
    },
    motivation: {
      content:
        '<Mensagem final motivacional e personalizada, citando a meta pelo nome.>',
    },
  },
  null,
  2,
)

export function buildAIPropmpt(simulation: SimulationRecord) {
  const { income, expenses, debits, goalName, goalAmount, goalDeadLine } =
    simulation

  const monthlySavings = calcMounthlySavings(simulation)
  const monthlySavingsNeeded =
    parseCurrency(goalAmount) / parseInt(goalDeadLine)

  return `Você é um educador financeiro especializado em finanças pessoais.
  Analise os dados abaico e gere um diagnóstico financeiro personalizado com linguagem clara, didática e encorajadora,
  voltado para pessoas sem conhecimentos financeiro. O diagnóstico será exibido diretamente ao usuário no app,
  fale sempre em segunda pessoa ("Você tem...", "Sua meta...").

  Dados da simulação:
  - Renda mensal bruta: R$ ${income}
  - Custos fixos essenciais: R$ ${expenses}
  - Dívidas e parcelas mensais: R$ ${debits}
  - Meta: ${goalName}
  - Custo da meta: R$ ${goalAmount}
  - Prazo desejado: ${goalDeadLine} meses
  - Economia mensal necessário para atingir a meta no prazo: ${monthlySavingsNeeded} reais
  - Saldo após reserva para a meta: ${monthlySavings - monthlySavingsNeeded} reias

  Retorne APENAS um JSON válido, sem texto adicional, sem blocos de código, neste formato exato:

  ${RESPONSE_SCHEMA}

  Regras:
  - Todos os textos em português do Brasil
  - Máximo de 4 itens por lista
  - Seja específico ao citar valores calculados
  - Não repita informações entre seções
  - Nunca use markdown dentro dos valores do JSON
  - Para o campo "feasibility.status", use os seguintes critérios:
    - "viable": saldo após reserva para a meta é maior ou igual a 0
    - "needs_adjustment": saldo negativo de até 20% do valor da economia mensal necessária
    - "unfeasible": saldo negativo superior a 20% do valor da economia mensa necessária
  `
}
