import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private idCounter = 1;

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  create(task: Omit<Task, 'id'>): Task {
    const newTask: Task = {
      id: this.idCounter++,
      ...task,
      completed: false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: number, update: Partial<Omit<Task, 'id'>>): Task | undefined {
    const task = this.findOne(id);
    if (task) {
      Object.assign(task, update);
    }
    return task;
  }

  remove(id: number): boolean {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }
}
