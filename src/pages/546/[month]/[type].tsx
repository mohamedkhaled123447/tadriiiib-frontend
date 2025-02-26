import React, { useMemo, useState } from "react";
import { useDistribution } from "@/context/UseDistribution";
import { useCalendar } from "@/context/UseCalendar";
import { the546, the548 } from "@/core/utils/helper";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Input,
  Stack,
  Button,
  Heading,
  Badge,
} from "@chakra-ui/react";
import Week546 from "@/components/547/Week546";
function The546() {
  const router = useRouter();
  const { month, type } = router.query;
  const { topics, months, jobs } = useCalendar();
  const [curJob, setCurJob] = useState<number>(0);
  const {
    daySubjects,
    dayTopicsDis,
    dayDistribution,
    nightSubjects,
    nightTopicsDis,
    nightDistribution,
  } = useDistribution();
  const the546DistributionDay = useMemo(() => {
    return the546(
      daySubjects,
      dayTopicsDis,
      dayDistribution.months[Number(month)],
      topics,
      Number(month),
      type as string,
      jobs[curJob],
      curJob
    );
  }, [daySubjects, dayTopicsDis, dayDistribution, topics, curJob]);
  const the546DistributionNight = useMemo(() => {
    return the546(
      nightSubjects,
      nightTopicsDis,
      nightDistribution.months[Number(month)],
      topics,
      Number(month),
      type as string,
      jobs[curJob],
      curJob
    );
  }, [nightSubjects, nightTopicsDis, nightDistribution, topics, curJob]);
  // const the548DistributionNight = useMemo(() => {
  //   return the548(
  //     daySubjects,
  //     dayTopicsDis,
  //     dayDistribution.months[Number(month)],
  //     topics,
  //     Number(month),
  //     type as string,
  //     jobs[curJob],
  //     curJob
  //   );
  // }, [nightSubjects, nightTopicsDis, nightDistribution, topics, curJob]);
  const the546Distribution =
    type === "day" ? the546DistributionDay : the546DistributionNight;
  return (
    <Stack spacing={"2"} align={"center"} justify={"center"} my="10">
      <Flex gap={"2"}>
        <Box fontSize="3xl" pb="2">
          {" "}
          546 عن شهر {months[Number(month)]?.monthName}{" "}
        </Box>
        <Box fontSize="3xl" pb="2">
          {" "}
          {type === "day" ? "(نهاري)" : "(ليلي)"}
        </Box>
      </Flex>
      <Flex gap={2}>
        {jobs.map((job, index) => (
          <Badge
            cursor="pointer"
            key={index}
            borderRadius="full"
            colorScheme={curJob === index ? "green" : "gray"}
            p={3}
            onClick={() => setCurJob(index)}
          >
            {job.name}
          </Badge>
        ))}
      </Flex>
      <Flex gap={4} w="95%">
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
            <Flex gap={7}>
              {the546Distribution?.weeks.map((week, weekId) => (
                <Week546
                  weekId={weekId + 1}
                  key={weekId}
                  week={week}
                  type={type as string}
                  topics={topics}
                  daySubjects={daySubjects}
                  nightSubjects={nightSubjects}
                />
              ))}
            </Flex>
          </Stack>
        </Flex>
      </Flex>
    </Stack>
  );
}

export default The546;
