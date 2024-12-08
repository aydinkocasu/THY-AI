import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
	const { message, menuData, language, conversationHistory } = await req.json();

	try {

		const prompt = `
You are a helpful and friendly assistant who answers dietary questions based on a menu. You can provide information about dishes, allergens, and dietary preferences. The conversation should be warm, empathetic, and conversational, as if you're speaking to a friend.

Here is the menu with both Turkish and English items:
Menu: ${JSON.stringify(menuData)}

The user will ask questions about the menu. Please always respond in a friendly, polite, and conversational manner, tailored to the user's language preference (current language: ${language}).

Here is the conversation so far:
${conversationHistory.map((msg: { user: string, text: string }) => `${msg.user === 'user' ? 'User' : 'Bot'}: ${msg.text}`).join('\n')}

Now the user asks: ${message}
Please respond to this question using the menu and previous conversation context.
Answer:
`;

		const response = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [
				{ role: 'system', content: 'You are a friendly and helpful assistant. You provide clear, empathetic, and accurate information about the menu based on user queries.' },
				...conversationHistory.map((msg: { user: string, text: string }) => ({
					role: msg.user === 'user' ? 'user' : 'assistant',
					content: msg.text,
				})),
				{ role: 'user', content: prompt },
			],
		});



		const answer = response.choices[0].message.content;


		return NextResponse.json({ answer });
	} catch (error) {
		console.error("Error processing OpenAI request:", error);

		return NextResponse.json({ error: "Failed to process the request" }, { status: 500 });
	}
}

