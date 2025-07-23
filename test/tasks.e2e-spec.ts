import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

// Helper para crear tareas
async function crearTarea(
  app: INestApplication,
  cookie: string,
  title: string,
  description: string,
) {
  return request(app.getHttpServer())
    .post('/tasks')
    .set('Cookie', cookie)
    .send({ title, description });
}

describe('Tasks (e2e)', () => {
  let app: INestApplication;
  let cookie: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Login para obtener cookie
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'admin', password: '12345678' })
      .expect(201);
    cookie = loginRes.headers['set-cookie'][0];
  });

  afterAll(async () => {
    await app.close();
  });

  it('puede crear una tarea', async () => {
    const res = await crearTarea(app, cookie, 'Tarea test', 'Desc test');
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe('Tarea test');
  });

  it('puede listar tareas después de crear dos', async () => {
    // Crear dos tareas
    await crearTarea(app, cookie, 'Tarea 1', 'Desc 1');
    await crearTarea(app, cookie, 'Tarea 2', 'Desc 2');

    // Listar tareas
    const res = await request(app.getHttpServer())
      .get('/tasks')
      .set('Cookie', cookie)
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    // Debe haber al menos dos tareas con los títulos creados
    const titles = res.body.map((t: any) => t.title);
    expect(titles).toEqual(expect.arrayContaining(['Tarea 1', 'Tarea 2']));
  });

  it('puede editar una tarea existente', async () => {
    // Crear tarea
    const crearRes = await crearTarea(
      app,
      cookie,
      'Tarea a editar',
      'Desc original',
    );
    const tareaId = crearRes.body.id;
    // Editar tarea
    const updateRes = await request(app.getHttpServer())
      .put(`/tasks/${tareaId}`)
      .set('Cookie', cookie)
      .send({ title: 'Tarea editada', description: 'Desc editada' })
      .expect(200);
    expect(updateRes.body.id).toBe(tareaId);
    expect(updateRes.body.title).toBe('Tarea editada');
    expect(updateRes.body.description).toBe('Desc editada');
    // Obtener tarea y comprobar cambios
    const getRes = await request(app.getHttpServer())
      .get(`/tasks/${tareaId}`)
      .set('Cookie', cookie)
      .expect(200);
    expect(getRes.body.title).toBe('Tarea editada');
    expect(getRes.body.description).toBe('Desc editada');
  });

  it('puede borrar una tarea existente', async () => {
    // Crear tarea
    const crearRes = await crearTarea(
      app,
      cookie,
      'Tarea a borrar',
      'Desc borrar',
    );
    const tareaId = crearRes.body.id;
    // Borrar tarea
    await request(app.getHttpServer())
      .delete(`/tasks/${tareaId}`)
      .set('Cookie', cookie)
      .expect(200);
    // Listar tareas y comprobar que no está la tarea borrada
    const listRes = await request(app.getHttpServer())
      .get('/tasks')
      .set('Cookie', cookie)
      .expect(200);
    const ids = listRes.body.map((t: any) => t.id);
    expect(ids).not.toContain(tareaId);
  });
});
