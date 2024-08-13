import { createUploadthing, type FileRouter } from "uploadthing/next";

 
const f = createUploadthing();
 
 

export const ourFileRouter = {
  media: f({
    pdf: { maxFileSize: "32MB", maxFileCount: 5 }, 
    image: { maxFileSize: "1GB", maxFileCount: 5 },
    video: { maxFileSize: "2GB", maxFileCount:  5},
    audio: { maxFileSize: "32MB", maxFileCount: 5 },
    text: {maxFileSize:"16MB",maxFileCount:5}
  })
    .onUploadComplete(async ({ metadata, file }) => {
  
      return "Uploaded";
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;