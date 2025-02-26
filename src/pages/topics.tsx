import {
  Button,
  Box,
  Text,
  Stack,
  useDisclosure,
  Flex,
  Center,
  Checkbox,
  useToast,
  Heading,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import TopicModal from "@/core/modals/TopicModal";
import { useRouter } from "next/router";
import { BASE_SERVER_URL } from "@/core/utils/constants/urls";
import { useCalendar } from "@/context/UseCalendar";
import { Topic } from "@/core/interfaces";

export default function Home() {
  const router = useRouter();
  const toast = useToast();
  const { topics, setTopics, subjects } = useCalendar();
  const [tempTopics, setTempTopics] = useState<Topic[]>([...topics]);
  const [subject, setSubject] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const handleAdd = async (topic: Topic) => {
    const res = await fetch(`${BASE_SERVER_URL}/api/topic/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: topic.name,
        place: topic.place,
        training_tools: topic.training_tools,
        instructor: topic.instructor,
        day: topic.day,
        night: topic.night,
        level: topic.level,
        topic_class: topic.topic_class,
        subject: topic.subject,
        job: topic.job,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setTopics((pre: Topic[]) => [...pre, data]);
      toast({
        title: "success",
        description: "تم إضافة الدرس بنجاح",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  const handleEdit = async (editedtopic: Topic) => {
    const res = await fetch(`${BASE_SERVER_URL}/api/topic/${editedtopic.id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editedtopic.name,
        place: editedtopic.place,
        training_tools: editedtopic.training_tools,
        instructor: editedtopic.instructor,
        day: editedtopic.day,
        night: editedtopic.night,
        level: editedtopic.level,
        topic_class: editedtopic.topic_class,
        subject: editedtopic.subject,
        job: editedtopic.job,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setTopics((pre: Topic[]) =>
        pre.map((topic) => (topic.id === editedtopic.id ? data : topic))
      );
      toast({
        title: "success",
        description: "تم تعديل الدرس بنجاح",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  const handleDelete = async (id: number) => {
    const res = await fetch(`${BASE_SERVER_URL}/api/topic/${id}/`, {
      method: "DELETE",
    });
    if (res.ok) {
      setTopics((pre: Topic[]) => pre.filter((topic) => topic.id !== id));
      toast({
        title: "success",
        description: "تم حذف الدرس بنجاح",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  return (
    <Center py={10}>
      <Stack spacing={5} w="90%">
        <Heading as="address" size="xl" textAlign="center">
          الدروس
        </Heading>
        <Stack spacing={4} padding={4}>
          <Select
            borderRadius="2xl"
            placeholder="المادة"
            onChange={(e) => setSubject(Number(e.target.value))}
          >
            {subjects.map((subject, index) => (
              <option key={index} value={subject.id}>
                {" "}
                {subject.name}
              </option>
            ))}
          </Select>
          {topics
            .filter((topic) => topic.subject === subject)
            .map((topic, index) => (
              <Flex
                key={index}
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
                <Box w="48" fontWeight="bold">
                  {topic.name}
                </Box>
                <Box w="48" fontSize="xl">
                  مستوي {topic.topic_class}
                </Box>
                <Box w="48" fontSize="xl">
                  درجة الصعوبة {topic.level}
                </Box>
                <Box>
                  <Checkbox size="lg" isChecked={topic.day}>
                    نهاري
                  </Checkbox>
                </Box>
                <Box>
                  <Checkbox size="lg" isChecked={topic.night}>
                    ليلي
                  </Checkbox>
                </Box>
                <Box>
                  <Button
                    me={3}
                    size="sm"
                    colorScheme="green"
                    borderRadius="full"
                    onClick={() => {
                      setEditingTopic(topic);
                      onOpen();
                    }}
                  >
                    تعديل
                  </Button>
                  <Button
                    borderRadius="full"
                    onClick={() => handleDelete(topic.id)}
                    colorScheme="red"
                    size="sm"
                  >
                    حذف
                  </Button>
                  <Checkbox
                    fontWeight="bold"
                    ms={4}
                    size="lg"
                    isChecked={
                      tempTopics.find((tempTopic) => tempTopic.id === topic.id)
                        ? true
                        : false
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTempTopics((pre) => [...pre, topic]);
                      } else {
                        setTempTopics((pre) =>
                          pre.filter((tempTopic) => tempTopic.id !== topic.id)
                        );
                      }
                    }}
                  >
                    اختيار
                  </Checkbox>
                </Box>
              </Flex>
            ))}
        </Stack>

        <Stack spacing={2} align="center" justify="center">
          <Button
            w="fit-content"
            borderRadius="full"
            colorScheme="blue"
            onClick={() => {
              setEditingTopic(null);
              onOpen();
            }}
          >
            إضافة درس جديدة
          </Button>

          <Button
            w="fit-content"
            borderRadius="full"
            mt={3}
            colorScheme="blue"
            onClick={() => {
              setTopics(tempTopics);
              router.push("/jobs");
            }}
          >
            التالي
          </Button>
        </Stack>
      </Stack>

      <TopicModal
        isOpen={isOpen}
        onClose={onClose}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        topic={editingTopic}
      />
    </Center>
  );
}
