// src/app/page.tsx

'use client'

import { useState } from 'react';
import { Box, Text, Flex, Container, Heading, Button, Center } from '@chakra-ui/react';
import ChatBox from '../components/ChatBox';
import { motion } from 'framer-motion';
import MenuCard from '../components/MenuCard';
import './globals.css'
import FileUploadComponent from '../components/FileUpload';

export interface menuProps {
  Turkish: string,
  English: string
}

const MainPage = () => {
  const [menuParsed, setMenuParsed] = useState<menuProps[]>([])
  const [activeLang, setActiveLang] = useState<string>('tur')

  const handleLang = (lang: string) => {
    setActiveLang(lang)
  }

  const handleExtractedText = (menuValues: menuProps[]) => {
    setMenuParsed(menuValues)
  }

  return (
    <Container px={20} width="100%" maxW="100%" height="100vh">
      {menuParsed && menuParsed.length === 0 &&
        <Center h="100vh" width="100%">
          <Flex direction="column">
            <Text
              fontSize="4xl"
              data-state="open"
              _open={{
                animation: "fade-in 1000ms ease-out",
              }} fontWeight="bold">
              Welcome to the THY flight Menu App
            </Text>
            <Box
              data-state="open"
              _open={{
                animation: "fade-in 1000ms ease-out",
                animationDelay: "2s"
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <Text
                  p={5}
                  textAlign="center"
                  fontSize="xl"
                >
                  Please Upload your menu Image
                </Text>
                <FileUploadComponent callback={handleExtractedText} />
              </motion.div>
            </Box>
          </Flex>
        </Center>
      }


      {menuParsed && menuParsed.length > 0 &&
        <Center h="100vh" width="100%">
          <Flex gap={20} width="100%">
            <Box flex={1}>
              <ChatBox menuParsed={menuParsed} activeLang={activeLang} />
            </Box>
            <Flex flex={1} direction="column" gap="10px" px={12} >
              <Heading size="4xl">Menu</Heading>
              <Flex gap={1} width="100%">
                <Button onClick={() => { handleLang('tur') }} colorPalette="red" px={2} variant={activeLang === 'tur' ? 'solid' : 'outline'} >
                  Türkçe
                </Button>
                <Button onClick={() => { handleLang('eng') }} colorPalette="red" px={2} variant={activeLang === 'eng' ? 'solid' : 'outline'} >
                  English
                </Button>
              </Flex>
              <Flex flex={1} direction="column" gap="20px" px={2} overflowY="scroll" maxH="calc(100vh - 240px)">
                {menuParsed.map((item: menuProps, index: number) => <MenuCard key={index} menuItem={activeLang === 'tur' ? item.Turkish : item.English} />)}
              </Flex>
            </Flex>
          </Flex>
        </Center>
      }

    </Container>
  );
};

export default MainPage;

