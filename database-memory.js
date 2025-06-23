import { randomUUID } from 'node:crypto';

export class DatabaseMemory {
   #videos = new Map();

   create(video) {
      const videoId = randomUUID();

      this.#videos.set(videoId, video)
   }

   list(search) {
      const videos = Array.from(this.#videos.entries())

      const videoRes = videos.map((items) => {
         const videoId = items[0];
         const video = items[1]

         return {
            videoId,
            ...video
         };
      })
         .filter((video) => {
            if (search) {
               return video.title.includes(search);
            }

            return true;
         })

      return videoRes;
   }

   update(id, video) {
      this.#videos.set(id, video)
   }

   delete(id) {
      this.#videos.delete(id)
   }
}