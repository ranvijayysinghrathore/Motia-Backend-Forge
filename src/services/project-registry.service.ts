import { BackendMetadata } from '../types/forge'

export class ProjectRegistryService {
  /**
   * Formats raw backend data into structured metadata.
   */
  public createMetadata(
    id: string, 
    workflows: any[], 
    endpoints: string[], 
    endpointDetails: any[]
  ): BackendMetadata {
    return {
      id,
      workflows,
      endpoints,
      endpointDetails,
      createdAt: new Date().toISOString(),
      status: 'registered',
    }
  }

  /**
   * Formats the deployment payload for the frontend/client.
   */
  public getDeploymentResponse(metadata: BackendMetadata) {
    return {
      backendId: metadata.id,
      backendUrl: metadata.deployedUrl || 'pending',
      endpoints: metadata.endpoints,
    }
  }
}

export const projectRegistryService = new ProjectRegistryService()
