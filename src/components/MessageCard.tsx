"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import React, { useEffect, useState } from 'react'

import { Button } from "./ui/button"
import { X } from "lucide-react"
import { IMessage } from "@/model/user"
import { useToast } from "./ui/use-toast"
import axios from "axios"
import { ApiResponse } from "@/types/ApiResponse"

type MessageCardProps = {
  message: IMessage;
  onMessageDelete: (messageId: string) => void
}

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
  const { toast } = useToast()
  const [formattedDate, setFormattedDate] = useState("")

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`);
      toast({ title: response.data.message });
      onMessageDelete(message._id as string);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Something went wrong.",
        variant: "destructive"
      });
    }
  }

  // ✅ Hydration-safe formatted date
  useEffect(() => {
    if (message.createdAt) {
      const date = new Date(message.createdAt);
      const formatted = date.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setFormattedDate(formatted);
    }
  }, [message.createdAt]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Message</CardTitle>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" aria-label="Delete message"><X className="w-5 h-5" /></Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this message from your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <CardDescription>Message Description</CardDescription>
      </CardHeader>

      <CardContent>
        <p>{message.content}</p>
        <p className="text-xs text-muted-foreground">{formattedDate}</p>
      </CardContent>
    </Card>
  )
}

export default MessageCard

