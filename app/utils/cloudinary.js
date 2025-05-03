const cloudinaryConfig = {
  YOUR_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  YOUR_PRESET_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_KEY,
};

export const uploadImagesToCloudinary = async (images) => {
  const promises = Array.from(images).map(async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", cloudinaryConfig.YOUR_PRESET_KEY);
    data.append("folder", `portfolioImages`);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.YOUR_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    if (!res.ok) {
      throw new Error("Upload failed");
    }

    const uploadImage = await res.json();
    return {
      url: uploadImage.secure_url,
      public_id: uploadImage.public_id,
    };
  });

  return await Promise.all(promises);
};
