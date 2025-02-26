import { Box, Button, Container, Heading, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
export default function LandingPage() {
  const router = useRouter();
  return (
    <Box bgGradient="linear(to-b, white, blue.100)" minH="100vh" py={10}>
      {/* Header */}
      <Box as="header" textAlign="center" py={4} bg="white" boxShadow="sm">
        <Heading size="md" color="blue.600">
          الفوج 706 حرب الكترونية
        </Heading>
      </Box>

      <Stack spacing={6} align='center'>
        <Heading size="2xl" color="blue.700">
          منظومة تخطيط تدريب القوات
        </Heading>
        <Button
          colorScheme="blue"
          size="lg"
          onClick={() => router.push("/home")}
        >
          الدخول
        </Button>
      </Stack>
    </Box>
  );
}
