'use client';

import React, { useState } from 'react';
import { storage, db } from '@/app/firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore'; 
import { toast } from 'react-toastify';
import { Label } from '@/app/components/ui/label';
import { Input } from '@/app/components/ui/input';

interface ProfileImageUploaderProps {
  userId: string;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({ userId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsLoading(true);

    const storageRef = ref(storage, `users/${userId}/profilePicture`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      () => {
        toast.error('Не вдалося завантажити фото!');
        setIsLoading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('Фото завантажено за посиланням:', downloadURL);

          const userDocRef = doc(db, 'users', userId); 
          await updateDoc(userDocRef, {
            image: downloadURL,
          });

          toast.success('Фото успішно завантажено та оновлено!');
        } catch (error) {
          console.error('Помилка при оновленні фото користувача:', error);
          toast.error('Не вдалося оновити профіль!');
        } finally {
          setIsLoading(false);
        }
      }
    );
  };

  return (
    <div className="flex gap-[3px] flex-col justify-center">
      <Label htmlFor="picture">Змінити фото</Label>
      <Input id="picture" type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={!file || isLoading}
        className={`mt-2 py-1 px-4 rounded-md text-white ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'}`}
      >
        {isLoading ? 'Завантаження...' : 'Завантажити'}
      </button>
    </div>
  );
};

export default ProfileImageUploader;
