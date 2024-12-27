import React, { useState } from 'react';
import { sendMessage } from '@/app/api/sendMessage';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

function AddMessage() {
    const [message, setMessage] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false); 
    const maxLength = 150;

    const handleSendMessage = async () => {
        const trimmedMessage = message.trim(); 

        if (trimmedMessage === '') {
            toast.error("Повідомлення не може бути пустим");
            return;
        }

        if (trimmedMessage.length < 3) {
            toast.error("Повідомлення має містити принаймні 3 символи");
            return;
        }

        if (trimmedMessage.length > maxLength) {
            toast.error("Повідомлення не може містити більше 100 символів");
            return;
        }

        try {
            await sendMessage(trimmedMessage);
            setMessage('');
            toast.success("Повідомлення успішно надіслано"); 
            setIsOpen(false); 
        } catch (error) {
            console.error(error);
            toast.error("Помилка при надісленні повідомлення"); 
        }
    };

    return (
        <div className='fixed bottom-[5%] right-[5%]'>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setIsOpen(true)}>Надіслати повідомлення</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Надіслати повідомлення</DialogTitle>
                        <DialogDescription>
                            Тут ви можете надіслати повідомлення з пропозицією про додаток! Найбільш залайканий коментар вступає в розробку :3
                        </DialogDescription>
                    </DialogHeader>
                    <div className='flex flex-col gap-2 items-start'>
                        <Label htmlFor="message" className="text-right">
                            Ваше повідомлення
                        </Label>
                        <Textarea 
                            placeholder='Ваше повідомлення' 
                            id='message' 
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)}
                            maxLength={maxLength} 
                        />
                        <span className="text-right text-gray-500 text-[8px]">
                            {maxLength - message.length} символів залишилося
                        </span>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleSendMessage}>Надіслати</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <ToastContainer 
                position="top-right"
                autoClose={3000} 
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
            />
        </div>
    );
}

export default AddMessage;
