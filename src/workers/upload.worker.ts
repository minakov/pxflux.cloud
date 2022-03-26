// Needed to declare this as a module. Also shows that imports function normally in workers.
import { shared } from './shared';
const ctx: Worker = self as unknown as Worker;

type WorkerPayload = FilesPayload;

interface FilesPayload {
  type: 'files'
  files: File[]
  recommendedPartSize: number
  authorizationToken: string
  bucketId: string
}

function files(files: File[]) {
  ctx.postMessage({
    type: 'files',
    data: files.map(file => file.name),
  });
}

ctx.addEventListener('message', ({ data }: MessageEvent<WorkerPayload>) => {
  console.log(data);
  switch (data?.type) {
    case 'files':
      files(Array.from(data?.files));
      return;
  }
});