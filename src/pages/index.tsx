import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import FileInput from '../components/FileInput'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const fileRef = useRef<HTMLInputElement>(null)
  const workerRef = useRef<Worker>();
  const [messages, setMessages] = useState<String[]>([]);

  useEffect(() => {
    workerRef.current = new Worker(new URL('../workers/upload.worker.ts', import.meta.url));
    workerRef.current.addEventListener('message', (evt) => {
      console.log('Message from TS worker:', evt.data);
      setMessages(data => [...data, evt.data]);
    });
    workerRef.current.postMessage({ type: 'start' });
  }, []);

  const handleChange = () => {
    fileRef.current?.click();
  };

  return (
    <div className={styles.container}>
      <FileInput ref={fileRef}></FileInput>
      <button onClick={handleChange}>Upload</button>
      <pre>
        {messages.map((msg) => JSON.stringify(msg, null, 2)).join('\n\n')}
      </pre>
    </div>
  )
}

export default Home
