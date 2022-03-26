interface StartPayload {
    bucketId: bucketId,
    fileName: fileName,
    contentType: contentType
}

export const start = (api: string, token: string, bucketId: string, fileName: string, contentType: string) => {
    const response = await fetch(`${api}/b2api/v2/b2_start_large_file`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        },
        body: JSON.stringify({
            bucketId,
            fileName,
            contentType
        })
    });
    if (!response.ok) {
        throw new Error(`${response.status}`);
    }
}

export const getUploadPartUrl = (api: string, token: string, fileId: string) => {
    const response = await fetch(`${api}/b2api/v2/b2_get_upload_part_url`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token
        },
        body: JSON.stringify({
            fileId
        })
    });
    if (!response.ok) {
        throw new Error(`${response.status}`);
    }
}

export const uploadPart = (url: string, token: string, index: number, checksum: string, length: number, body: Blob) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: token,
            'X-Bz-Part-Number': index,
            'X-Bz-Content-Sha1': checksum,
            'Content-Length': length
            },
        body: JSON.stringify({
            fileId
        })
    });
    if (!response.ok) {
        throw new Error(`${response.status}`);
    }
}
