import type { SimulationFormData } from '@/components/data/simulation'

import { parseCurrency } from './currency'

export function calcMounthlySavings(data: SimulationFormData) {
  return (
    parseCurrency(data.income) -
    parseCurrency(data.expenses) -
    parseCurrency(data.debits)
  )
}
