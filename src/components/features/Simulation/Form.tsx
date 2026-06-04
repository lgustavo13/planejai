import { simulationFormSteps } from '@/components/data/simulation'

import { FormStep } from './FormStep'
import { StepProgress } from './Progress'

export const SimulationForm = () => {
  const currentStep = simulationFormSteps[5]

  return (
    <>
      <StepProgress currentStep={3} totalSteps={6} />
      <FormStep key={currentStep.id} {...currentStep} />
    </>
  )
}
