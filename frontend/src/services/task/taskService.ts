import api from '../api';

export interface Task {
  id: string;
  workflowInstanceId: string;
  nodeDefinitionId: string;
  assigneeId: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED';
  dueDate?: string;
  outputData?: any;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  workflowInstance: {
    workflowDefinition: {
      name: string;
    };
  };
  nodeDefinition: {
    type: string;
    data: any;
  };
}

export const taskService = {
  async getMyTasks(): Promise<Task[]> {
    const response = await api.get('/tasks/me');
    return response.data;
  },

  async updateTaskStatus(id: string, status: Task['status']): Promise<Task> {
    const response = await api.patch(`/tasks/${id}`, { status });
    return response.data;
  },

  async completeTask(id: string, outputData?: any): Promise<Task> {
    const response = await api.post(`/tasks/${id}/complete`, { outputData });
    return response.data;
  },
};
