import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { Box, Text, Card, Flex } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { menuProps } from '@/app/page';

interface FileProps {
	callback: (text: menuProps[]) => void
}

const FileUploadComponent: React.FC<FileProps> = ({ callback }) => {
	const [loading, setLoading] = useState<string>('');

	const splitTextByLanguage = async (text: string) => {
		setLoading('Extracting Text...')
		try {
			const response = await fetch('/api/parse-menu', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ rawText: text }),
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}
			const data = await response.json();
			callback(data.parsedMenu.menu)
			setLoading('Done')
		} catch (err) {
			console.log(err)
			setLoading('Some Error happen')

		}
	};


	const processImage = async (imageUrl: string) => {
		setLoading('Processing Image ')
		try {
			//
			const { data: { text } } = await Tesseract.recognize(
				imageUrl, 'eng+tur',
				{
					logger: m => console.log(m)
				}
			);
			splitTextByLanguage(text)
		} catch (error) {
			console.error('OCR Processing Error:', error);
			alert('Failed to process image. Please try again.');
		}
	};

	// File upload handler
	const handleFileUpload = async (files: File) => {
		setLoading('Uploading File')
		const file = files
		if (!file) return;

		try {
			const imageUrls = [URL.createObjectURL(file)];

			await processImage(imageUrls[0]);
		} catch (error) {
			console.error('File Processing Error:', error);
			alert('Failed to process file. Please try again.');
		}
	};

	const onDrop = (acceptedFiles: File[]) => {
		handleFileUpload(acceptedFiles[0])
	};

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		multiple: true,
	});

	return (
		<Box
			{...getRootProps()}
			textAlign="center"
			bg="gray.50"
			_hover={{ bg: 'gray.100' }}
			mb={4}
		>
			<Card.Root>
				<Card.Body >
					<Flex align="center" direction="column" gap={1} p={5}>
						{loading ?
							<Text> {loading} </Text>
							:
							<>
								<input {...getInputProps()} />
								<Text fontSize="lg" color="gray.600">
									Drag & drop files here, or click to select files
								</Text>
								<Text fontSize="sm" color="gray.500" mt={2}>
									(Accepted file types: PNG, JPG, JPEG, PDF, DOCX)
								</Text>
							</>
						}
					</Flex>
				</Card.Body>
			</Card.Root>
		</Box>
	);
};

export default FileUploadComponent;
