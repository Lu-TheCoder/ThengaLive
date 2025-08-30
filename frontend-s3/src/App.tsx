import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useMutation from './hooks/useMutation'

// TODO: We will add more file types if needed
// for now, only mp4 is supported.
const validVideoFileTypes = ["video/mp4"];

const isVideoFile = (file: File) => {
  return validVideoFileTypes.includes(file.type);
}

// NOTE: I explicitly ignored png files,
// because I dont want alpha channel in thumbnails.
const validImageFileTypes = ["image/jpeg", "image/jpg"];

const isImageFile = (file: File) => {
  return validImageFileTypes.includes(file.type);
}

function App() {
  const { 
    mutate: uploadFile,
    loading: isUploading,
    error: uploadError,
  } = useMutation({ url: "/upload", method: "POST" });

  const [video, setVideo] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("video", video);
    console.log("image", image);

    const formData = new FormData();
    if (video) {
      formData.append("video", video);
    } else if (image) {
      formData.append("image", image);
    }

    await uploadFile(formData);
    console.log("formData", formData);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (isVideoFile(file)) {
        setVideo(file);
      } else if (isImageFile(file)) {
        setImage(file);
      } else {
        setError("Invalid file type. Only mp4 and jpeg are supported.");
      }
    }
  }

  return (
    <main>
      <h1>Upload Video</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" name="video" onChange={handleFileChange} />
        <button type="submit"> {isUploading ? "Uploading..." : "Upload"}</button>
      </form>
      {error && <p>{error}</p>}
      {uploadError && <p>{uploadError}</p>}
    </main>
  )
}

export default App
