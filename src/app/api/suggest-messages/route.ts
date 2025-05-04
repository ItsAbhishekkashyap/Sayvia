import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const prompt = `Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform. Avoid personal or sensitive topics. Example format:
What's a hobby you've recently started? || If you could have dinner with any historical figure, who would it be? || What's a simple thing that makes you happy?
Keep it curious, friendly, and inclusive.`

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates friendly anonymous message suggestions.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    // Create a ReadableStream from the OpenAI response
    const stream = new ReadableStream({
      async start(controller) {
        // Iterate through the chunks in the stream
        for await (const chunk of response) {
          const text = chunk.choices[0]?.delta?.content || ''  // Accessing the correct content
          if (text) {
            controller.enqueue(new TextEncoder().encode(text))  // Encoding each chunk of text
          }
        }
        controller.close()
      }
    })

    // Use native Response to return the stream as the response
    return new Response(stream)

  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error
      return NextResponse.json({ name, status, headers, message }, { status })
    } else {
      console.error('❌ Unexpected error:', error)
      return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 })
    }
  }
}



