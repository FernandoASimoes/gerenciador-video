import { fastify } from 'fastify';
import { DatabasePostgres } from './database-postgres.js';

const app = fastify()

const database = new DatabasePostgres()

app.post('/videos', async (request, response) => {
   const { title, description, duration } = request.body;

   await database.create({
      title,
      description,
      duration
   })

   return response.status(201).send();
})

app.get('/videos', async (request, response) => {
   const { search } = request.query;

   console.log(search)
   const videos = await database.list(search);

   return videos;
})

app.put('/videos/:id', async (request, response) => {
   const videoId = request.params.id;
   const { title, description, duration } = request.body;

   await database.update(videoId, {
      title,
      description,
      duration
   })

   return response.status(204).send()
})

app.delete('/videos/:id', async (request, response) => {
   const videoId = request.params.id;

   await database.delete(videoId)

   return response.status(204).send()
})

app.listen({
   port: process.env.PORT ?? 3333
})