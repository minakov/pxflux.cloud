import { ChangeEvent, forwardRef, useEffect, useRef, useState } from "react";

const FileInput = forwardRef<HTMLInputElement>((props, ref) => {
    const workerRef = useRef<Worker>();

    useEffect(() => {
        workerRef.current = new Worker(new URL('../workers/upload.worker.ts', import.meta.url));
        workerRef.current.addEventListener('message', (evt) => {
            console.log('Message from worker:', evt.data);
        });
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        const files = event.target.files;
        workerRef.current?.postMessage({ type: 'files', files });
        console.log(files);
    };

    return <input type="file" ref={ref} style={{ display: 'none' }} onChange={handleChange} {...props} />
})

export default FileInput
