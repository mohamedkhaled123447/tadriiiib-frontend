import React from "react";
import {
  Flex,
  Input,
  Stack,
  Button,
  Heading,
  Divider,
  Center,
  Box,
} from "@chakra-ui/react";
import { WeekData, disWeek } from "@/core/types/types";
import { Subject, Topic } from "@/core/interfaces";
import { useCalendar } from "@/context/UseCalendar";
import { BASE_SERVER_URL } from "@/core/utils/constants/urls";
import { useRouter } from "next/router";
const numberToArabic: Record<number, string> = {
  1: "الأول",
  2: "الثاني",
  3: "الثالث",
  4: "الرابع",
  5: "الخامس",
  6: "السادس",
  7: "السابع",
};
const ToArabic: Record<number, string> = {
  1: "الأولي",
  2: "الثانية",
  3: "الثالثة",
  4: "الرابعة",
  5: "الخامسة",
  6: "السادسة",
  7: "السابعة",
};
const numberToDay: Record<number, string> = {
  1: "السبت",
  2: "الاحد",
  3: "الاثنين",
  4: "الثلاثاء",
  5: "الاربعاء",
  6: "الخميس",
  7: "الجمعة",
};
function Week548({
  week,
  weekId,
}: {
  weekId: number;
  week: Map<string, number>[];
}) {
  return (
    <Stack spacing={"2"} align={"center"}>
      <Stack textAlign="center" w="100%">
        <Center
          p="2"
          textAlign="center"
          bg="blackAlpha.200"
          borderRadius={"xl"}
        >
          الاسبوع {numberToArabic[weekId]}
        </Center>
      </Stack>
      <Stack spacing={5}>
        {week.map((frequencyMap, index) => (
          <Flex key={index} gap={2}>
            <Stack>
              <Center
                p="2"
                textAlign="center"
                bg="blackAlpha.400"
                w="60"
                borderRadius={"xl"}
                h='full'
              >
                {frequencyMap.values().reduce((acc, value) => acc + value, 0)}
              </Center>
            </Stack>
            <Stack>
              {Array.from(frequencyMap.keys()).map((key, index) => (
                <Flex key={index} gap={2}>
                  <Center
                    p="2"
                    textAlign="center"
                    bg="blackAlpha.400"
                    w="60"
                    borderRadius={"xl"}
                  >
                    {frequencyMap.get(key)}
                  </Center>
                  <Center
                    p="2"
                    textAlign="center"
                    bg="blackAlpha.400"
                    w="60"
                    borderRadius={"xl"}
                  >
                    {key}
                  </Center>
                </Flex>
              ))}
            </Stack>
          </Flex>
        ))}
      </Stack>
    </Stack>
  );
}

export default Week548;
