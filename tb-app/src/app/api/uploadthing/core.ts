import { createUploadthing, type FileRouter } from "uploadthing/next";

 
const f = createUploadthing();
 
 

export const ourFileRouter = {
  media: f({ 
    image: { maxFileSize: "1GB" },
    video:{maxFileSize:"4GB"},
    audio:{maxFileSize:"512MB"}
})
    .onUploadComplete(async ({ metadata, file }) => {
  
      return "Uploaded";
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;