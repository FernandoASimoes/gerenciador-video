import { randomUUID } from 'node:crypto';
import { sql } from './db.js';

export class DatabasePostgres {
   #videos = new Map();

   async create(video) {
      const videoId = randomUUID()
      const { title, description, duration } = video;

      await sql`insert into videos (id, title, description, duration) values (${videoId}, ${title}, ${description}, ${duration})`
   }

   async list(search) {
      let videos

      if (search) {
         videos = await sql`select * from videos where title ilike ${'%' + search + '%'}`
      } else {
         videos = await sql`select * from videos`
      }

      return videos;
   }

   async update(videoId, video) {
      const { title, description, duration } = video;

      await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} where id = ${videoId}`
   }

   async delete(videoId) {
      await sql`delete from videos where id = ${videoId}`
   }
}