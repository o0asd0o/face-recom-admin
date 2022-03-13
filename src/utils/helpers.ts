export const validateFileSize = (file: File) => {
    if (file) {
        return file.size <= 1100000;
    } else {
        return true;
    }
};
