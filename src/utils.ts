/**
 * Break a large array into smaller chunks.
 * @param {array} array Array to break into smaller chunks
 * @param {number} chunkSize Size of each chunk
 * @returns {array} Array of smaller chunks
 */
export function breakIntoChunks<T>(array, chunkSize): T[] {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}

export function removeDuplicatesByProperty<T>(array: T[], property: string): T[] {
    const uniqueObjects = {};
    const result = [];

    for (let i = 0; i < array.length; i++){
        const item = array[i];
        const key = item[property];
        if (!uniqueObjects[key]) {
            uniqueObjects[key] = true;
            result.push(item);
        }
    }

    return result;
}