export interface IStepDTO {
  id: number;
  name: string;
  backend_name?: string;
}

export interface IStepItemDTO {
  step: IStepDTO;
  steps: IStepDTO[];
  currentStep: IStepDTO;
}

export interface IMultiStepDTO {
  currentStep: IStepDTO;
  steps: IStepDTO[];
}
