import type { NextPage } from 'next'
import { useRef } from 'react'
import FileInput from '../components/FileInput'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const fileRef = useRef<HTMLInputElement>(null)

  const handleChange = () => {
    fileRef.current?.click();
  };

  return (
    <div className={styles.container}>
      <FileInput ref={fileRef}></FileInput>
      <button onClick={handleChange}>Upload</button>
    </div>
  )
}

export async function getStaticProps() {
  const auth =  Buffer.from(`${process.env.BACKBLAZE_KEY_ID}:${process.env.BACKBLAZE_APP_KEY}`).toString('base64')
  try {
    const response = await fetch('https://api.backblazeb2.com/b2api/v2/b2_authorize_account', {
      headers: {
        Authorization: `Basic ${auth}`
      }
    });
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error: any) {
    console.log(error.message);
  }
  return { props: {} }
}

export default Home
