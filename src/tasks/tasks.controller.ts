import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tareas' })
  @ApiResponse({ status: 200, description: 'Lista de tareas', type: [Task] })
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarea por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Tarea encontrada', type: Task })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  findOne(@Param('id') id: string): Task | undefined {
    return this.tasksService.findOne(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  @ApiBody({ type: Task })
  @ApiResponse({ status: 201, description: 'Tarea creada', type: Task })
  create(@Body() task: Omit<Task, 'id'>): Task {
    return this.tasksService.create(task);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una tarea por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: Task })
  @ApiResponse({ status: 200, description: 'Tarea actualizada', type: Task })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  update(
    @Param('id') id: string,
    @Body() update: Partial<Omit<Task, 'id'>>,
  ): Task | undefined {
    return this.tasksService.update(Number(id), update);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarea por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Tarea eliminada', type: Boolean })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  remove(@Param('id') id: string): boolean {
    return this.tasksService.remove(Number(id));
  }
}
