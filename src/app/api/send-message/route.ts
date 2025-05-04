import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import UserModel, { IMessage } from "@/model/user";
import rawHindiBadWords from "@/lib/hindiBadWords.json" assert { type: "json" };

// const filter = new Filter();
// filter.addWords(...rawHindiBadWords);

// const hindiRegexPatterns = rawHindiBadWords.map(pattern => new RegExp(pattern, "i"));

// function normalizeContent(str: string) {
//   return str
//     .toLowerCase()
//     .replace(/0/g, "o")
//     .replace(/1/g, "i")
//     .replace(/3/g, "e")
//     .replace(/4/g, "a")
//     .replace(/5/g, "s")
//     .replace(/7/g, "t")
//     .replace(/@/g, "a")
//     .replace(/[^a-zA-Z0-9\s\u0900-\u097F]/g, "")
//     .replace(/(.)\1+/g, "$1");
// }

// export async function POST(request: Request) {
//   try {
//     await dbConnect();
//     const { username, content } = await request.json();
//     const normalized = normalizeContent(content);

//     const user = await UserModel.findOne({ username });

//     if (!user) {
//       return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
//     }

//     if (!user.isAcceptingMessage) {
//       return NextResponse.json({ success: false, message: "User is not accepting messages at the moment" }, { status: 403 });
//     }

//     // ✅ Always run moderation — remove session/premium condition
//     const matchedProfanity = hindiRegexPatterns.some((regex) => regex.test(normalized));
//     if (filter.isProfane(content) || matchedProfanity) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "⚠️ Inappropriate content detected. Message not sent.",
//         },
//         { status: 403 }
//       );
//     }

//     const newMessage: IMessage = {
//       content,
//       createdAt: new Date(),
//     } as IMessage;

//     user.messages.push(newMessage);
//     await user.save();

//     return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 200 });
//   } catch (error) {
//     console.error("🔥 POST error:", error);
//     return NextResponse.json(
//       { success: false, message: `Server error: ${error instanceof Error ? error.message : "Unknown error"}` },
//       { status: 500 }
//     );
//   }
// }

// without adding any badword filter working fine 
// export async function POST(request: Request) {
//   await dbConnect();

//   const { username, content } = await request.json();

//   try {
//     const user = await UserModel.findOne({ username });

//     if (!user) {
//       return Response.json({ success: false, message: "User not found" }, { status: 404 });
//     }

//     if (!user.isAcceptingMessage) {
//       return Response.json({ success: false, message: "User is not accepting messages at the moment" }, { status: 403 });
//     }

//     // ✅ Define message object first
//     const newMessage: IMessage = {
//       content: content,
//       createdAt: new Date(),
//     } as IMessage;

//     user.messages.push(newMessage); // ✅ Now this works
//     await user.save();

//     return Response.json(
//       {
//         success: true,
//         message: "Message sent successfully",
//       },
//       { status: 200 }
//     );

//   } catch (error) {
//     console.log("Error adding messages", error);
//     return Response.json(
//       {
//         success: false,
//         message: "Internal server error",
//       },
//       { status: 500 }
//     );
//   }
// }


// trying to check new code if working working here or not 


// Import `leo-profanity` and methods you need
import leoProfanity from "leo-profanity";

// Add English and Hindi bad words to the profanity filter
leoProfanity.loadDictionary("en");


// Build your Hindi regex tests
const hindiPatterns = (rawHindiBadWords as string[])
  .map(pat => new RegExp(pat, "i"));


  // Normalize incoming Hindi (strip leet, collapse repeats, lower)
function normalizeHindi(str: string) {
  return str
    .toLowerCase()
    .replace(/0/g, "o")
    .replace(/1/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/5/g, "s")
    .replace(/7/g, "t")
    .replace(/@/g, "a")
    .replace(/[^a-z0-9\u0900-\u097F\s]/g, "")
    .replace(/(.)\1+/g, "$1")
    .trim();
}


function isHindiProfane(text: string) {
  const norm = normalizeHindi(text);
  return hindiPatterns.some(rx => rx.test(norm));
}

// Function to check if a content message contains profane words
export async function POST(request: Request) {
  await dbConnect();

  // Parse and validate request body
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON" }, { status: 400 });
  }
  const { username, content } = body;
  if (typeof username !== "string" || typeof content !== "string") {
    return NextResponse.json(
      { success: false, message: "`username` and `content` are required" },
      { status: 400 }
    );
  }

   // 1) English check
   const englishProfane = leoProfanity.check(content);

   // 2) Hindi regex check
   const hindiProfane = isHindiProfane(content);

  // Check for profanity in the message content
  if (englishProfane || hindiProfane) {
    return NextResponse.json(
      { success: false, message: "⚠️ Inappropriate content detected. Message not sent." },
      { status: 403 }
    );
  }

  // Find user in the database
  const user = await UserModel.findOne({ username });
  if (!user) {
    return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
  }
  if (!user.isAcceptingMessage) {
    return NextResponse.json(
      { success: false, message: "User is not accepting messages at the moment" },
      { status: 403 }
    );
  }

  // Append message and save
  const newMessage: IMessage = { content, createdAt: new Date() } as IMessage;
  user.messages.push(newMessage);
  await user.save();

  return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 200 });
}