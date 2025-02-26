import React from "react";
import { Box, Flex, Input, Stack, Button, Heading } from "@chakra-ui/react";
import { WeekData, disWeek } from "@/core/types/types";
import { Subject } from "@/core/interfaces";
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
const numberToDay: Record<number, string> = {
  1: "السبت",
  2: "الاحد",
  3: "الاثنين",
  4: "الثلاثاء",
  5: "الاربعاء",
  6: "الخميس",
  7: "الجمعة",
};
function Week({
  weekData,
  week,
  type,
  doc,
  specificSubjects,
  generalSubjects,
  monthName,
  limit,
  weekId,
  monthId,
}: {
  weekId: number;
  monthId: number;
  weekData: disWeek;
  week: WeekData;
  type: string;
  doc: string;
  specificSubjects: Subject[];
  generalSubjects: Subject[];
  monthName: string;
  limit: number;
}) {
  const router = useRouter();
  const { monthsData, months } = useCalendar();
  const handlePrint = async () => {
    const res = await fetch(`${BASE_SERVER_URL}/api/545/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: weekData,
        subjects: [
          ...specificSubjects.map((subject) => subject.label),
          ...generalSubjects.map((subject) => subject.label),
        ],
        len: specificSubjects.length,
        week: numberToArabic[week.weekNumber],
        month: monthName,
        totalTrainingHours: week.days.map((day) => day.type.trainingHours),
        totalBoundEducationHours: week.days.map(
          (day) => day.type.boundEducationHours
        ),
        start: monthsData[0].startDate,
        end: monthsData[months.length - 1].endDate,
      }),
    });
    if (res.ok) {
      window.open(`${BASE_SERVER_URL}/media/new_545.docx`, "_blanck");
    }
  };
  return (
    <Stack spacing={"2"} align={"center"} justify={"center"}>
      <Stack textAlign="center" w="100%">
        <Box p="2" textAlign="center" bg="blackAlpha.200" borderRadius={"xl"}>
          {numberToArabic[week.weekNumber]}
        </Box>
      </Stack>
      <Flex gap={2}>
        <Stack>
          <Box
            p="2"
            textAlign="center"
            bg="blackAlpha.400"
            w="20"
            borderRadius={"xl"}
          >
            اسبوع
          </Box>
          {type === "day" && (
            <Box
              p="2"
              textAlign="center"
              bg="blackAlpha.400"
              w="20"
              borderRadius={"xl"}
            >
              {week.totalTrainingHours}
            </Box>
          )}
          <Box
            p="5"
            textAlign="center"
            bg="blackAlpha.400"
            w="20"
            borderRadius={"xl"}
          ></Box>
          {weekData.mat
            .filter((row, rowId) => rowId < limit)
            .map((row, rowId) => (
              <Box
                key={rowId}
                p="2"
                textAlign="center"
                bg="blackAlpha.400"
                w="20"
                borderRadius={"xl"}
              >
                {row.reduce((acc, value) => acc + value, 0)}
              </Box>
            ))}
          <Box
            p="5"
            textAlign="center"
            bg="blackAlpha.400"
            w="20"
            borderRadius={"xl"}
          >
            {""}
          </Box>
          {type === "day" && (
            <Box
              p="2"
              textAlign="center"
              bg="blackAlpha.400"
              w="20"
              borderRadius={"xl"}
            >
              {week.totalBoundEducationHours}
            </Box>
          )}
          {weekData.mat
            .filter((row, rowId) => rowId >= limit)
            .map((row, rowId) => (
              <Box
                key={rowId + limit}
                p="2"
                textAlign="center"
                bg="blackAlpha.400"
                w="20"
                borderRadius={"xl"}
              >
                {row.reduce((acc, value) => acc + value, 0)}
              </Box>
            ))}
          <Box
            p="2"
            textAlign="center"
            bg="blackAlpha.400"
            w="20"
            borderRadius={"xl"}
          >
            {type === "day"
              ? week.totalDayLearningHours +
                week.totalTrainingHours +
                week.totalBoundEducationHours
              : week.totalNightLearningHours}
          </Box>
        </Stack>
        {week.days.map((day, dayId) => (
          <Stack key={dayId}>
            <Box
              p="2"
              textAlign="center"
              bg="blackAlpha.400"
              w="20"
              borderRadius={"xl"}
            >
              {numberToDay[dayId + 1]}
            </Box>
            {type === "day" && (
              <Box
                p="2"
                textAlign="center"
                bg="blackAlpha.400"
                w="20"
                borderRadius={"xl"}
              >
                {week.days[dayId].type.trainingHours
                  ? week.days[dayId].type.trainingHours
                  : "-"}
              </Box>
            )}
            <Box
              p="5"
              textAlign="center"
              bg="blackAlpha.400"
              w="20"
              borderRadius={"xl"}
            ></Box>
            {weekData.mat
              .filter((row: any, rowId: number) => rowId < limit)
              .map((row: any, rowId: number) => (
                <Box
                  key={rowId}
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.200"
                  w="20"
                  borderRadius={"xl"}
                >
                  {doc === "545"
                    ? weekData.the545[rowId][dayId]
                      ? weekData.the545[rowId][dayId]
                      : "-"
                    : row[dayId] === 0
                    ? "-"
                    : row[dayId]}
                </Box>
              ))}
            <Box
              p="5"
              textAlign="center"
              bg="blackAlpha.400"
              w="20"
              borderRadius={"xl"}
            ></Box>
            {type === "day" && (
              <Box
                p="2"
                textAlign="center"
                bg="blackAlpha.200"
                w="20"
                borderRadius={"xl"}
              >
                {week.days[dayId].type.boundEducationHours
                  ? week.days[dayId].type.boundEducationHours
                  : "-"}
              </Box>
            )}
            {weekData.mat
              .filter((row: any, rowId: number) => rowId >= limit)
              .map((row: any, rowId: number) => (
                <Box
                  key={rowId + limit}
                  p="2"
                  textAlign="center"
                  bg="blackAlpha.200"
                  w="20"
                  borderRadius={"xl"}
                >
                  {doc === "545"
                    ? weekData.the545[rowId + limit][dayId]
                      ? weekData.the545[rowId + limit][dayId]
                      : "-"
                    : row[dayId] === 0
                    ? "-"
                    : row[dayId]}
                </Box>
              ))}
            <Box
              p="2"
              textAlign="center"
              bg="blackAlpha.400"
              w="20"
              borderRadius={"xl"}
            >
              {type === "day"
                ? weekData.mat.reduce(
                    (acc: number, row: any) => (acc += row[dayId]),
                    0
                  ) +
                  week.days[dayId].type.boundEducationHours +
                  week.days[dayId].type.trainingHours
                : weekData.mat.reduce(
                    (acc: number, row: any) => (acc += row[dayId]),
                    0
                  )}
            </Box>
          </Stack>
        ))}
      </Flex>
      {doc === "545" && (
        <>
          <Button onClick={handlePrint} colorScheme="blue" borderRadius="full">
            طباعة
          </Button>
        </>
      )}
    </Stack>
  );
}

export default Week;
