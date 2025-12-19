export interface BackendIntent {
  entities: string[];
  features: string[];
  templateType: string;
  originalDescription: string;
}

export interface BackendMetadata {
  id: string;
  workflows: any[];
  endpoints: string[];
  endpointDetails: {
    method: string;
    path: string;
    workflow: string;
    description: string;
  }[];
  createdAt: string;
  status: 'pending' | 'assembling' | 'assembled' | 'registered' | 'deployed';
  deployedUrl?: string;
  deployedAt?: string;
}

export interface DeploymentResult {
  backendId: string;
  backendUrl: string;
  endpoints: string[];
}
