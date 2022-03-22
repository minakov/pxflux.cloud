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

export default Home
