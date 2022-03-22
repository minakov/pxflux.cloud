import { ChangeEvent, forwardRef } from "react";

const FileInput = forwardRef<HTMLInputElement>((props, ref) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        const files = event.target.files;
        console.log(files);
    };

    return <input type="file" ref={ref} style={{ display: 'none' }} onChange={handleChange} {...props} />
})

export default FileInput
