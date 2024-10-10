'use client';

import React, { useEffect, useState } from 'react';
import { useCurrentUser } from '@/app/hooks/useCurrentUser';
import ProfileImageUploader from '../components/ProfileImageUploader';
import { getUserById } from '@/app/api/getUserById';
import { useParams } from 'next/navigation';
import { IUser } from '@/app/types/userType';
import Image from 'next/image';
import noImage from '@/app/assets/noImage.jpg';

type Props = {
  visible: boolean;
}

function ProfileLayout({ visible }: Props) {
  const { user } = useCurrentUser();
  const [another, setAnother] = useState<IUser | null>(null);
  const [userNotFound, setUserNotFound] = useState(false); 
  const router = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      if (router.userId) {
        try {
          const userData = await getUserById(String(router.userId));

          if (!userData) {
            setUserNotFound(true);
            return;
          }

          const anotherUser: IUser = {
            id: router.userId as string,
            username: userData.username || "Unknown",
            email: userData.email || "",
            role: userData.role || "user",
            messages: userData.messages || "",
            image: userData.image || "",
            level: userData.level || 0
          };

          setAnother(anotherUser);
          setUserNotFound(false); 
        } catch (e) {
          console.error(e);
          setUserNotFound(true); 
        }
      }
    };

    fetchUser();
  }, [router.userId]);

  if (userNotFound) {
    return (
      <div className="flex justify-center w-[90%] h-full">
        <div className="w-10/12 h-[80vh] bg-white rounded-[20px] shadow-2xl mt-8 flex items-center justify-center">
          <p className="text-xl font-semibold text-red-500">Користувача не знайдено</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-[90%] h-full">
      <div className="w-10/12 h-[40vh] sm:h-[80vh] bg-white rounded-[20px] shadow-2xl mt-8">
        <div className="bg-gradient-to-r from-[#b6d3f1] to-[#fdf7e1] h-[100px] w-full rounded-t-[20px]"></div>
        <div className="px-[30px] mt-[30px]">
          <div className="flex sm:justify-between justify-center sm:items-center sm:flex-row flex-col">
            <div className="flex gap-2 items-center">
              <Image
                src={
                  visible
                    ? user?.image || noImage
                    : another?.image || noImage
                }
                alt="userPhoto"
                width={80}
                height={80}
                className="w-12 h-12 sm:w-20 sm:h-20 rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-[18px] font-medium">{visible ? user?.username : another?.username}</p>
                <p className="text-[14px] text-gray-500">{visible ? user?.email : another?.email}</p>
              </div>
            </div>
            <div className={`${visible ? 'block' : 'hidden'} mt-5 sm:mt-0`}>
              {user?.id && <ProfileImageUploader userId={user.id} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileLayout;
