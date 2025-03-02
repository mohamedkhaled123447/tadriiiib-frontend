import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Spinner,
  Stack,
  Text,
  Editable,
  EditableInput,
  EditablePreview,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BASE_SERVER_URL } from "@/core/utils/constants/urls";
import { useCalendar } from "@/context/UseCalendar";
type Interval = {
  id: number;
  name: string;
};

export default function IntervalsList() {
  const toast = useToast();
  const { topics } = useCalendar();
  const [intervals, setIntervals] = useState<Interval[]>([]);
  const [intervalName, setIntervalName] = useState<string>("أدخل اسم الفترة");
  const router = useRouter();
  const fetchIntervals = async () => {
    const res = await fetch(`${BASE_SERVER_URL}/api/interval/`);
    if (!res.ok) throw new Error("Failed to fetch intervals");
    const data: Interval[] = await res.json();
    setIntervals(data);
  };
  const addInterval = async () => {
    const res = await fetch(`${BASE_SERVER_URL}/api/interval/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: intervalName,
        topics: topics.map((topic) => topic.id),
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setIntervals((pre) => [...pre, { id: data.id, name: data.name }]);
      toast({
        title: "success",
        description: "تم إضافة الفترة بنجاح",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  const deleteInterval = async (id: number) => {
    const res = await fetch(`${BASE_SERVER_URL}/api/interval/${id}/`, {
      method: "DELETE",
    });
    if (res.ok) {
      setIntervals((pre) => pre.filter((interval) => interval.id !== id));
      toast({
        title: "success",
        description: "تم تعديل الفترة بنجاح",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    fetchIntervals();
  }, []);

  return (
    <Center py={10}>
      <Stack spacing={5} w={{ base: "90%", md: "60%" }}>
        <Heading size="xl" textAlign="center">
          الفترات التدريبية
        </Heading>
        {intervals.map((interval) => (
          <Flex
            key={interval.id}
            p={5}
            px={10}
            borderWidth="1px"
            align="center"
            justify="space-between"
            bg="white"
            boxShadow="lg"
            _hover={{
              bg: "blue.50",
              transform: "scale(1.02)",
              transition: "0.3s ease-in-out",
              boxShadow: "xl",
            }}
            transition="all 0.3s ease-in-out"
            borderRadius="2xl"
            gap={4}
          >
            <Text
              onClick={() => router.push(`/Calender/${interval.id}/`)}
              fontSize="lg"
              fontWeight="bold"
              color="blue.700"
              cursor="pointer"
            >
              {interval.name}
            </Text>
            <Button
              borderRadius="full"
              colorScheme="red"
              size="sm"
              onClick={() => deleteInterval(interval.id)}
            >
              حذف
            </Button>
          </Flex>
        ))}
        <Flex>
          <Editable
            w="100%"
            defaultValue={intervalName}
            onChange={(newValue) => setIntervalName(newValue)}
          >
            <EditablePreview borderRadius="full" px={5} />
            <EditableInput borderRadius="full" px={5} />
          </Editable>
          <Button
            borderRadius="full"
            colorScheme="blue"
            ms={3}
            onClick={addInterval}
          >
            إضافة فترة تدريبية
          </Button>
        </Flex>
      </Stack>
    </Center>
  );
}
