import express from "express";
const app = express();
import cors from "cors";
import { uploadFile, createBucket, getFile, getImageProductsPresignedUrls } from "./store/store.js";
import multer from "multer";

app.use(cors());

app.use(express.json());

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "video/mp4" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const storage = multer.memoryStorage();
const upload = multer({ storage, fileFilter: fileFilter });


app.post("/create-bucket", (req, res) => {
    const { bucketName } = req.body;
    createBucket(bucketName);
    res.status(200).json({ message: "Bucket created successfully" });
})

app.post("/upload", upload.single("video"), (req, res) => {
    const { file } = req;
    const { bucketName, key, filePath } = req.body;

    console.log("file from mutler", file);
    
    uploadFile(file, {
            contentType: file.mimetype,
            acl: "public-read",
    });
    
    res.status(200).json({ message: "File uploaded successfully" });
})

app.get("/get-files", async (req, res) => {
    const user_id = "";

    if (!user_id) {
        return res.status(400).json({ message: "User ID is required" });
    }

    const {error, presignedUrls} = await getImageProductsPresignedUrls(user_id);
    if (error) {
        return res.status(400).json({ message: error.message });
    }
  
    res.status(200).json(presignedUrls);
    
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