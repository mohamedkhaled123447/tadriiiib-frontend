import { useRouter } from "next/router";
import { Flex, Box, Center } from "@chakra-ui/react";
export default function Home() {
  const router = useRouter();
  return (
    <Center h="100vh">
      <Flex
        justify="center"
        align="center"
        gap={10}
        maxW="container.md"
      >

        <Box
          w={{ base: "24", md: "40" }}
          h={{ base: "24", md: "40" }}
          bg="gray.500"
          borderRadius="lg"
          boxShadow="md"
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.1)", bg: "gray.600", cursor: 'pointer' }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          fontSize="md"
          fontWeight="bold"
          color="white"
          p={2}
          onClick={() => router.push("/intervals")}
         
         
        >
          تخطيط تدريب القوات
        </Box>
        <Box
          w={{ base: "24", md: "40" }}
          h={{ base: "24", md: "40" }}
          bg="gray.500"
          borderRadius="lg"
          boxShadow="md"
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.1)", bg: "gray.600", cursor: 'pointer' }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          fontSize="md"
          fontWeight="bold"
          color="white"
          p={2}
        >
          تخطيط تريب ضباط الصف
        </Box>
        <Box
          w={{ base: "24", md: "40" }}
          h={{ base: "24", md: "40" }}
          bg="gray.500"
          borderRadius="lg"
          boxShadow="md"
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.1)", bg: "gray.600", cursor: 'pointer' }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          fontSize="md"
          fontWeight="bold"
          color="white"
          p={2}
        >
          تخطيط تدريب الضباط
        </Box>

        <Box
          w={{ base: "24", md: "40" }}
          h={{ base: "24", md: "40" }}
          bg="gray.500"
          borderRadius="lg"
          boxShadow="md"
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.1)", bg: "gray.600", cursor: 'pointer' }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="lg"
          fontWeight="bold"
          color="white"
          p={2}
        >
          إعدادات
        </Box>


      </Flex>
    </Center>

  )
}
