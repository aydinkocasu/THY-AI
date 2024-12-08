import { useState } from 'react';
import { Box, Button, Input, VStack, Flex } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown'
import { menuProps } from '@/app/page';

interface ChatBoxProps {
	menuParsed: menuProps[]
	activeLang: string;
}

const ChatBox = ({ menuParsed, activeLang }: ChatBoxProps) => {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([
		{ user: "bot", text: "Hi! How can I help you with the menu today?" },
	]);

	const handleSendMessage = async () => {
		if (message.trim()) {
			setMessage('');
			const userMessage = { user: "user", text: message };
			setMessages((prevMessages) => [...prevMessages, userMessage]);

			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					message,
					menu: menuParsed,
					language: activeLang,
					conversationHistory: messages,
				}),
			});

			const data = await response.json();

			if (data.answer) {
				setMessages((prevMessages) => [
					...prevMessages,
					{ user: 'bot', text: data.answer },
				]);
			}

		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<Flex
			direction="column"
			justify="flex-end"
			height="100%"
			p={4}
			borderRadius="md"
			boxShadow="lg"
		>
			<VStack align="stretch">
				<Box p={4} borderRadius="md" overflowY="auto">
					<Flex direction="column" overflowY="auto" gap={2} p={4} maxHeight="calc(100vh - 200px)">
						{messages.map((msg, index) => (
							<Flex
								key={index}
								justify={msg.user === 'user' ? 'flex-end' : 'flex-start'}
								mb={2}
							>
								<Box
									p={3}
									borderRadius="lg"
									maxWidth="70%"
									bg={msg.user === 'user' ? 'red' : 'gray.200'}
									color={msg.user === 'user' ? 'white' : 'black'}
									boxShadow="sm"
								>
									<ReactMarkdown >{msg.text}</ReactMarkdown>
								</Box>
							</Flex>
						))}
					</Flex>
				</Box>

				<Box display="flex" alignItems="center" gap={2}>
					<Input
						px={2}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Type a message..."
						onKeyDown={handleKeyDown}
						size="md"
					/>
					<Button colorScheme="blue" px={4} onClick={handleSendMessage}>
						Send
					</Button>
				</Box>
			</VStack>
		</Flex>
	);
};

export default ChatBox;

