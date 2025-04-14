'use client'

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function MessagePage() {
  const { username } = useParams()
  const [message, setMessage] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

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
        const { done, value } = await reader!.read()
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

  const handleSendMessage = async () => {
    if (!message.trim()) return
    const res = await fetch("/api/send-message", {
      method: "POST",
      body: JSON.stringify({ username, content: message }),
    })

    const data = await res.json()
    if (res.ok) {
      toast({
        title: "Message Sent ✅",
        description: "Your anonymous message was delivered.",
      })
      setMessage("")
    } else {
      toast({
        title: "Failed",
        description: data.message || "Something went wrong",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-background text-foreground mt-10 p-4 space-y-6">
      <h1 className="text-3xl font-semibold text-center">Send an anonymous message to @{username}</h1>

      <Textarea
        rows={5}
        placeholder="Type your anonymous message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="flex justify-between gap-3">
        <Button onClick={fetchSuggestions} variant="outline">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Suggest Message"}
        </Button>
        <Button onClick={handleSendMessage} disabled={!message.trim()}>
          Send
        </Button>
      </div>

      {suggestions.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="font-semibold">Suggestions:</p>
          <div className="space-y-2">
            {suggestions.map((s, i) => (
              <div
                key={i}
                onClick={() => setMessage(s)}
                className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded cursor-pointer"
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
