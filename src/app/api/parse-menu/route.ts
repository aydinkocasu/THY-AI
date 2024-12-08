import { OpenAI } from "openai";
import { NextResponse } from "next/server";


const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
	console.log('REQ', process.env.OPENAI_API_KEY)
	try {
		const body = await req.json();
		const { rawText } = body;

		if (!rawText) {
			return NextResponse.json({ error: "Missing raw text" }, { status: 400 });
		}


		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "system",
					content: `
You are a service that processes raw menu text and formats Turkish and English menu items into valid JSON. 
Always respond with valid JSON, following these rules:
1. Do not include any extra text, explanations, or formatting outside of the JSON structure.
2. The output JSON should follow this structure:
   {
     "menu": [
       {
         "Turkish": "Turkish menu item",
         "English": "English menu item"
       },
       ...
     ]
   }
3. Ensure that every Turkish menu item is correctly paired with its English translation.
4. Do not include backticks, comments, or non-JSON syntax in the response.

Here is the raw menu text: {{menu_text}}
  `
				},
				{ role: "user", content: `Here is the raw menu text:\n\n${rawText}` },
			],
		});
		const completion = response.choices[0]?.message?.content;


		if (completion) {
			const sanitizedCompletion = completion.trim().replace(/^`+|`+$/g, ""); // Remove backticks
			const parsed = await JSON.parse(sanitizedCompletion)
			console.log("OpenAI Completion Response:", parsed);
			return NextResponse.json({ parsedMenu: parsed });
		}

	} catch (error) {
		console.error("Error with OpenAI API:", error);
		return NextResponse.json({ error: "Failed to process the request" }, { status: 500 });
	}
}

