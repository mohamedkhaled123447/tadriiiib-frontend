import { Box, Flex, Input, Stack, Button, Heading } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDistribution } from "@/context/UseDistribution";
import { useCalendar } from "@/context/UseCalendar";
function TopicsDistribution() {
  const router = useRouter();
  const { type } = router.query;
  const {
    daySubjects,
    nightSubjects,
    dayDistribution,
    nightDistribution,
    months,
    dayTopicsDis,
    nightTopicsDis,
  } = useDistribution();
  const { topics } = useCalendar();
  const subjects = type === "day" ? daySubjects : nightSubjects;
  const distribution = type === "day" ? dayDistribution : nightDistribution;
  const TopicsDis = type === "day" ? dayTopicsDis : nightTopicsDis;
  return (
    <Stack spacing={"2"} align={"center"} justify={"center"} my="10">
      <Flex gap={"2"}>
        <Box fontSize="5xl" pb="2">
          {" "}
          المناهج الثابتة لتدريب القوات{" "}
        </Box>
        <Box fontSize="5xl" pb="2">
          {" "}
          {type === "day" ? "(نهاري)" : "(ليلي)"}
        </Box>
      </Flex>
      {subjects.map((subject, subjectId) => (
        <>
          <Heading textAlign="right" size="md">
            ({subjectId + 1}) {subject.label}:
          </Heading>
          <Flex gap={4} w="95%">
            <Stack>
              <Box
                p="2"
                textAlign="center"
                bg="blackAlpha.400"
                w="xl"
                borderRadius={"xl"}
              >
                الموضوع
              </Box>

              {type === "day"
                ? topics
                    .filter(
                      (topic) => topic.subject === subject.id && topic.day
                    )
                    .map((topic, index) => (
                      <Box
                        key={index}
                        p="2"
                        textAlign="center"
                        bg="blackAlpha.200"
                        w="xl"
                        borderRadius={"xl"}
                      >
                        {topic.name}
                      </Box>
                    ))
                : topics
                    .filter(
                      (topic) => topic.subject === subject.id && topic.night
                    )
                    .map((topic, index) => (
                      <Box
                        key={index}
                        p="2"
                        textAlign="center"
                        bg="blackAlpha.200"
                        w="xl"
                        borderRadius={"xl"}
                      >
                        {topic.name}
                      </Box>
                    ))}
              <Box
                p="2"
                textAlign="center"
                bg="blackAlpha.400"
                w="xl"
                borderRadius={"xl"}
              >
                الإجمالى
              </Box>
            </Stack>
            <Flex
              gap={4}
              overflowX={"scroll"}
              sx={{
                "::-webkit-scrollbar": {
                  cursor: "pointer",
                  width: "10px",
                  height: "10px",
                  padding: "10px",
                },
                "::-webkit-scrollbar-thumb": {
                  cursor: "pointer",
                  width: "10px",
                  height: "10px",
                  bg: "blackAlpha.300",
                  margin: "10px",
                  borderRadius: "xl",
                },
              }}
            >
              <Stack mb={5}>
                <Flex gap={4}>
                  <Box
                    p="2"
                    textAlign="center"
                    bg="blackAlpha.400"
                    w="36"
                    borderRadius={"xl"}
                  >
                    رقم الدرس
                  </Box>
                  <Box
                    p="2"
                    textAlign="center"
                    bg="blackAlpha.400"
                    w="36"
                    borderRadius={"xl"}
                  >
                    عدد الساعات
                  </Box>
                  {months.map((month, monthId) => (
                    <Box
                      key={monthId}
                      p="2"
                      textAlign="center"
                      bg="blackAlpha.400"
                      w="36"
                      borderRadius={"xl"}
                    >
                      {month.monthName}
                    </Box>
                  ))}
                </Flex>
                {TopicsDis[subjectId].mat.map((row, rowId) => (
                  <Flex gap={4} key={rowId}>
                    <Box
                      p="2"
                      textAlign="center"
                      bg="blackAlpha.200"
                      w="36"
                      borderRadius={"xl"}
                    >
                      {rowId + 1}
                    </Box>
                    <Box
                      p="2"
                      textAlign="center"
                      bg="blackAlpha.200"
                      w="36"
                      borderRadius={"xl"}
                    >
                      {row.reduce((acc, value) => acc + value, 0)}
                    </Box>
                    {row.map((cell, cellId) => (
                      <Box
                        key={cellId}
                        p="2"
                        textAlign="center"
                        bg="blackAlpha.200"
                        w="36"
                        borderRadius={"xl"}
                      >
                        {cell||'-'}
                      </Box>
                    ))}
                  </Flex>
                ))}
                <Flex gap={4}>
                  <Box
                    p="5"
                    textAlign="center"
                    bg="blackAlpha.400"
                    w="36"
                    borderRadius={"xl"}
                  ></Box>
                  <Box
                    p="5"
                    textAlign="center"
                    bg="blackAlpha.400"
                    w="36"
                    borderRadius={"xl"}
                  ></Box>
                  {distribution.mat[subjectId].map((cell, cellId) => (
                    <Box
                      key={cellId}
                      p="2"
                      textAlign="center"
                      bg="blackAlpha.400"
                      w="36"
                      borderRadius={"xl"}
                    >
                      {cell||'-'}
                    </Box>
                  ))}
                </Flex>
              </Stack>
            </Flex>
          </Flex>
        </>
      ))}
    </Stack>
  );
}

export default TopicsDistribution;
