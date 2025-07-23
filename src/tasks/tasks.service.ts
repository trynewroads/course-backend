import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiConfigService } from '../config/api-config.service';
import {
  CreateTaskDto,
  Task,
  UpdateTaskDto,
  UpdateTaskStatusDto,
} from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    private readonly apiConfig: ApiConfigService,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task | null> {
    return this.taskRepository.findOneBy({ id });
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;

    return this.taskRepository.save(task);
  }

  async update(id: number, update: UpdateTaskDto): Promise<Task | null> {
    await this.taskRepository.update(id, update);
    return this.taskRepository.findOneBy({ id });
  }

  async updateStatus(
    id: number,
    status: UpdateTaskStatusDto,
  ): Promise<Task | null> {
    await this.taskRepository.update(id, status);
    return this.taskRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
