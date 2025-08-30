import express from "express";
const app = express();
import cors from "cors";
import { uploadVideoFile, createBucket, getFile, uploadImageFile } from "./store/store.js";
import multer, { memoryStorage } from "multer";

app.use(cors());

app.use(express.json());

const storage = memoryStorage();
const upload = multer({ storage });

app.post("/create-bucket", (req, res) => {
    const { bucketName } = req.body;
    createBucket(bucketName);
    res.status(200).json({ message: "Bucket created successfully" });
})

app.post("/upload", upload.single("file"), (req, res) => {
    const { file } = req;
    const { bucketName, key, filePath } = req.body;

    console.log("file", file);
    
    uploadVideoFile("my-bucket-name-1756492988136", "videos/my-video.mp4", "assets/vid1.mp4", {
        contentType: "video/mp4",
        acl: "public-read",
    });
    res.status(200).json({ message: "File uploaded successfully" });
})

app.post("/upload-image", (req, res) => {
    const { bucketName, key, filePath } = req.body;
    uploadImageFile("my-bucket-name-1756492988136", "images/my-image.jpg", "assets/img1.jpg", {
        contentType: "image/jpeg",
    });
    res.status(200).json({ message: "File uploaded successfully" });
})

app.post("/get-file", (req, res) => {
    const { bucketName, key } = req.body;
    getFile("my-bucket-name-1756492988136", "videos/my-video.mp4");
    res.status(200).json({ message: "File fetched successfully" });
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})