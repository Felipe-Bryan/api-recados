import { users } from '../database/usersDB';
import { Task } from '../models/task.model';

export class UserRepository {
  public getById(id: string) {
    return users.find((user) => user.id === id);
  }

  public getByEmail(email: string) {
    return users.find((user) => user.email === email);
  }

  public findIndex(id: string) {
    return users.findIndex((user) => user.id === id);
  }

  public addTask(index: number, task: Task) {
    return users[index].tasks.push(task);
  }

  public listTasks(index: number) {
    return users[index].tasks;
  }

  public findTaskIndex(userId: string, taskId: string) {
    const userIndex = users.findIndex((user) => user.id === userId);
    return users[userIndex].tasks.findIndex((task) => task.id === taskId);
  }

  public getTaskById(userId: string, taskId: string) {
    const userIndex = users.findIndex((user) => user.id === userId);
    return users[userIndex].tasks.find((task) => task.id === taskId);
  }

  public updateTask(userId: string, taskId: string, detail: string, description: string) {
    const userIndex = users.findIndex((user) => user.id === userId);
    const taskIndex = users[userIndex].tasks.findIndex((task) => task.id === taskId);

    users[userIndex].tasks[taskIndex].detail = detail;
    users[userIndex].tasks[taskIndex].description = description;

    return users[userIndex].tasks[taskIndex];
  }

  public deleteTask(userId: string, taskId: string) {
    const userIndex = users.findIndex((user) => user.id === userId);
    const taskIndex = users[userIndex].tasks.findIndex((task) => task.id === taskId);

    return users[userIndex].tasks.splice(taskIndex, 1);
  }
}
