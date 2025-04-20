'use client'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Loader2,Inbox, Sparkles, Send, MessageSquare } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { Footer } from "@/components/Footer"
import { AlertDialog, AlertDialogContent,AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import MoodDialog from "@/components/EmotionSelectorModel"

export default function MessagePage() {
  const { username } = useParams()
  const [message, setMessage] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const [moodModalOpen, setMoodModalOpen] = useState(false)
  const [selectedMood, setSelectedMood] = useState("")

  const [messages, setMessages] = useState<any[]>([])
  const [isLoadingMessages, setIsLoadingMessages] = useState(true)


  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoadingMessages(true)
      try {
        const res = await fetch("/api/get-messages")
        const data = await res.json()
        if (res.ok) {
          setMessages(data.messages)
        } else {
          toast({
            title: "Error",
            description: data.message || "Could not load messages",
            variant: "destructive",
          })
        }
      } catch (err) {
        toast({
          title: "Failed",
          description: "Something went wrong while fetching messages",
          variant: "destructive",
        })
      }
      setIsLoadingMessages(false)
    }

    fetchMessages()
  }, [])





  const fetchSuggestions = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/suggest-messages", {
        method: "POST",
      })

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      
      let result = ""

      while (true) {
        
          const {done, value} = await reader!.read()
          if (done) break
          result += decoder.decode(value)
        
      }

      const suggestions = result.split("||").map(q => q.trim()).filter(Boolean)
      setSuggestions(suggestions)
    } catch (err) {
      toast({
        title: "Failed",
        description: "Could not fetch suggestions",
        variant: "destructive"
      })
    }
    setLoading(false)
  }

  const handleSendClick = () => {
    if (!message.trim()) return
    setMoodModalOpen(true)
  }

  const handleMoodSubmit = async () => {
    setIsSending(true)
    try {
      const res = await fetch("/api/send-message", {
        method: "POST",
        body: JSON.stringify({ username, content: message, mood: selectedMood || null }),
      })

      const data = await res.json()
      if (res.ok) {
        toast({
          title: "Message Sent ✅",
          description: "Your anonymous message was delivered.",
        })
        setMessage("")
        setSelectedMood("")
        setMoodModalOpen(false)
        // it refresh the message
        setMessages((prev) => [{ content: message, mood: selectedMood }, ...prev])
      } else {
        toast({
          title: "Failed",
          description: data.message || "Something went wrong",
          variant: "destructive"
        })
      }
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto bg-background text-foreground mb-10 mt-28 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg"
    >
      <div className="text-center mb-8">
        <motion.h1 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          Send an anonymous message
        </motion.h1>
        <p className="mt-2 text-muted-foreground">
          to @<span className="font-semibold text-foreground">{username}</span>
        </p>
      </div>

      <motion.div 
        whileFocus={{ boxShadow: "0 0 0 2px rgba(139, 92, 246, 0.5)" }}
        className="relative"
      >
        <Textarea
          rows={5}
          placeholder="What's on your mind?..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="text-lg p-6 rounded-xl border-2 border-gray-300 dark:border-gray-700 focus:border-purple-500 focus:ring-0"
        />
        <div className="absolute bottom-3 right-3 text-sm text-muted-foreground">
          {message.length}/500
        </div>
      </motion.div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
        <Button 
          onClick={fetchSuggestions} 
          variant="outline" 
          className="gap-2 border-purple-500 text-purple-600 hover:bg-purple-500/10"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          Inspire Me
        </Button>
        
        <Button 
          onClick={handleSendClick} 
          disabled={!message.trim() || isSending}
          className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
          size="lg"
        >
          {isSending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          Send Anonymously
        </Button>
      </div>

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 space-y-2"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageSquare className="w-4 h-4" />
              <p className="font-medium">Need inspiration?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestions.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMessage(s)}
                  className="p-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-all border border-transparent hover:border-purple-300 dark:hover:border-purple-800"
                >
                  <p className="text-sm">&quot;{s}&quot;</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      
    </motion.div>

    {/* <AlertDialog open={moodModalOpen} onOpenChange={setMoodModalOpen}>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Select your mood</AlertDialogTitle>
        </AlertDialogHeader>
        <RadioGroup value={selectedMood} onValueChange={setSelectedMood} className="space-y-2">
        {["Happy", "Sad", "Angry", "Excited"].map((mood) => (
              <div key={mood} className="flex items-center space-x-2">
                <RadioGroupItem value={mood} id={mood.toLowerCase()} />
                <Label htmlFor={mood.toLowerCase()}>{mood}</Label>
              </div>
            ))}
        </RadioGroup>

        <div className="flex justify-end gap-4 pt-4">
          <Button variant="ghost" onClick={handleMoodSubmit}>Skip</Button>
          <Button onClick={handleMoodSubmit}>Submit</Button>
        </div>
      </AlertDialogContent>
    </AlertDialog> */}
    <MoodDialog/>

    <Footer />
    </>
  )
}

