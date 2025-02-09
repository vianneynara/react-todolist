import axios, {AxiosInstance, AxiosResponse} from 'axios';

export interface TaskInterface {
  title: string;
  deadline: Date;
  isCompleted: boolean;
}

class TodoApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:8081/api/v1'
    });
  }

  // Authentication endpoints

  /* Login API function to return the token of an account */
  async login(username: string, password: string): Promise<AxiosResponse> {
    return this.api.post('/request-token', {username, password})
      .catch(error => {
        if (axios.isAxiosError(error) && error.response) return error.response;
        throw error;
      });
  }

  /* Register API function to create new account return the token of an account */
  async register(username: string, password: string): Promise<AxiosResponse> {
    return this.api.post('/accounts', {username, password})
      .catch(error => {
        if (axios.isAxiosError(error) && error.response) return error.response;
        throw error;
      });
  }

// Task endpoints

  async getUserTasks(token: string, username: string): Promise<AxiosResponse> {
    return this.api.get(`/accounts/${username}/tasks`, {
      headers: {Authorization: `${token}`}
    })
      .catch(error => {
        if (axios.isAxiosError(error) && error.response) return error.response;
        throw error;
      });
  }

  async createTask(token: string, username: string, title: string, deadline: Date): Promise<AxiosResponse> {
    return this.api.post(`/accounts/${username}/tasks`,
      {title, deadline: this.dateToString(deadline)},
      {headers: {Authorization: `${token}`}}
    )
      .catch(error => {
        console.error(error);
        if (axios.isAxiosError(error) && error.response) return error.response;
        throw error;
      });
  }

  async toggleCompleteTask(token: string, username: string, taskId: number): Promise<AxiosResponse> {
    return this.api.patch(`/accounts/${username}/tasks/${taskId}/toggle-completion`,
      {},
      {headers: {Authorization: `${token}`}}
    )
      .catch(error => {
        console.error(error);
        if (axios.isAxiosError(error) && error.response) return error.response;
        throw error;
      });
  }

  async updateTask(token: string, username: string, taskId: number, task: TaskInterface): Promise<AxiosResponse> {
    return this.api.put(`/accounts/${username}/tasks/${taskId}`,
      {task},
      {headers: {Authorization: `${token}`}}
    )
      .catch(error => {
        if (axios.isAxiosError(error) && error.response) return error.response;
        throw error;
      });
  }

  async deleteTask(token: string, username: string, taskId: number): Promise<AxiosResponse> {
    return this.api.delete(`/accounts/${username}/tasks/${taskId}`, {
      headers: {Authorization: `${token}`}
    })
      .catch(error => {
        if (axios.isAxiosError(error) && error.response) return error.response;
        throw error;
      });
  }

  dateToString(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  }
}

export const todoApiService = new TodoApiService();