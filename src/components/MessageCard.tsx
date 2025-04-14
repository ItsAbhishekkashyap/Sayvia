"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "./ui/button"
import { X, Heart, Reply, CalendarDays, Clock } from "lucide-react"
import { IMessage } from "@/model/user"
import { useToast } from "./ui/use-toast"
import axios from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type MessageCardProps = {
  message: IMessage;
  onMessageDelete: (messageId: string) => void;
}

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
  const { toast } = useToast()
  const [formattedDate, setFormattedDate] = useState("")
  const [isHovered, setIsHovered] = useState(false)

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
      toast({ title: response.data.message })
      onMessageDelete(message._id as string)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Something went wrong.",
        variant: "destructive"
      })
    }
  }

  useEffect(() => {
    if (message.createdAt) {
      const date = new Date(message.createdAt)
      setFormattedDate(date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }))
    }
  }, [message.createdAt])

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="relative overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-900 transition-all">
        {/* Gradient accent bar */}
        <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500" />

        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-300 font-medium">
                  {message.content.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium">Anonymous</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <CalendarDays className="h-3 w-3 mr-1" />
                  {formattedDate}
                </div>
              </div>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`rounded-full ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this message?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently remove the message from your inbox.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteConfirm}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <p className="text-gray-800 dark:text-gray-200 pl-12">
            {message.content}
          </p>
        </CardContent>

        <CardFooter className="flex justify-end space-x-2 pb-4 px-6">
          <Button variant="ghost" size="sm" className="gap-1">
            <Heart className="h-4 w-4" />
            <span>Like</span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default MessageCard

