import { Box, Button, Container, Heading, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function LandingPage() {
  const router = useRouter();

  return (
    <Box bgGradient="linear(to-b, white, blue.100)" minH="100vh" py={10}>
      {/* Header */}
      <Box as="header" textAlign="center" py={4}  >
        <Heading size="lg" color="blue.600">
          الفوج 706 حرب الكترونية
        </Heading>
      </Box>

      {/* Main Content */}
      <VStack spacing={6} justify="center" h="80vh" textAlign="center">
        <Heading size="2xl" color="blue.700">
          منظومة تخطيط تدريب القوات
        </Heading>
        <Button colorScheme="blue" size="lg" onClick={() => router.push("/home")}>
          الدخول
        </Button>
      </VStack>
    </Box>
  );
}
