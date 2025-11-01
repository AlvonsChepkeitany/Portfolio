import api from '../api';

export interface WorkflowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: any;
}

export interface WorkflowEdge {
  source: string;
  target: string;
}

export interface CreateWorkflowData {
  name: string;
  description?: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  version: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  nodes: any[];
  edges: any[];
  creator: {
    id: string;
    name: string;
    email: string;
  };
}

export const workflowService = {
  async createWorkflow(data: CreateWorkflowData): Promise<Workflow> {
    const response = await api.post('/workflows', data);
    return response.data;
  },

  async getWorkflows(): Promise<Workflow[]> {
    const response = await api.get('/workflows');
    return response.data;
  },

  async getWorkflowById(id: string): Promise<Workflow> {
    const response = await api.get(`/workflows/${id}`);
    return response.data;
  },

  async startWorkflow(id: string): Promise<any> {
    const response = await api.post(`/workflows/${id}/start`);
    return response.data;
  },
};
