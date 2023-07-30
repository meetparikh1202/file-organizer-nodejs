const fs = require("fs");

// Note: Change the below structure as per the need

const newFolder = "<Folder name>";
const existingFolderPath = "<Existing folder path>"; // eg., ../../Downloads

const newFolderPath = `${existingFolderPath}/${newFolder}`;

const documents = {
    ".csv": "Documents/CSV",
    ".xlsx": "Documents/EXCEL",
    ".pdf": "Documents/PDF",
    ".doc": "Documents/DOC",
    ".docx": "Documents/DOC",
    ".txt": "Documents/TEXT",
    ".zip": "Documents/ZIP",
};
const images = {
    ".jpg": "Images/JPG",
    ".png": "Images/PNG",
    ".svg": "Images/SVG",
    ".jpeg": "Images/JPEG",
    ".webp": "Images/WEBP",
    ".gif": "Images/GIF",
    ".avif": "Images/AVIF",
    ".heic": "Images/HEIC",
};
const videos = {
    ".mp4": "Videos/MP4",
    ".mp3": "Videos/MP3",
    ".mov": "Videos/MOV",
};
const audio = { ".m4a": "Audio/M4A" };

const directories = { ...documents, ...images, ...videos, ...audio };

const folderStructure = {
    Documents: ["CSV", "EXCEL", "PDF", "DOC", "TEXT", "ZIP"],
    Images: ["JPG", "PNG", "SVG", "WEBP", "JPEG", "GIF", "AVIF", "HEIC"],
    Videos: ["MP4", "MP3", "MOV"],
    Audio: ["M4A"],
};

/* Create the directory structure specified in the `folderStructure` object above. */
for (let folder in folderStructure) {
    for (let subFolder of folderStructure[folder]) {
        fs.mkdirSync(
            `${newFolderPath}/${folder}/${subFolder}`,
            { recursive: true }, // This will not throw error if directory already exists
        );
    }
}


/* 
Iterate over each file in the `existingFolder` directory. 
Extracts the file extension by splitting the file name using the dot (.) as a separator. 
Check if the `directories` object contains a key that matches the extracted file extension (in lowercase). 
If a match is found, use the `fs.rename` method to move the file to the corresponding directory
based on the file extension. 
*/    
fs.readdir(existingFolderPath, (err, files) => {
    if (err) console.log(err);
    files.forEach((file) => {
        const fileName = file;
        const fileSplit = fileName.split(".");
        const extension = "." + fileSplit[fileSplit.length - 1]; // file extension (.png | .mp4 | .pdf)
        const directoryInLowerCase = directories[extension.toLowerCase()];
        if (directoryInLowerCase) {
            fs.rename(
                `${existingFolderPath}/${file}`, // existing file path
                `${newFolderPath}/${directoryInLowerCase}/${file}`, // new file path
                err => {
                    if (err) throw err;
                    console.log("Successfully moved - " + file);
                }
            );
        }
    });
});