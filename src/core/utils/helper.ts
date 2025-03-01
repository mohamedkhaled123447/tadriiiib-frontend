import { disInterval, MonthData, topicsDis, disWeek, month546, disMonth, day546, day546Data, week546 } from "../types/types"
import { Subject, Job, Topic } from "../interfaces"
export const distribute = (num: number, len: number) => {
  const result: number[] = new Array(len).fill(0);
  if (len * 2 > num) {
    for (let i = 0; i < len; i++) {
      if (num > 0) {
        result[i] = 2;
        num -= 2;
      }
    }
    return result
  }
  const div = Math.floor(num / (len * 2))
  let rem = num % (len * 2)
  for (let i = 0; i < len; i++) {
    if (rem > 0) {
      result[i] = div * 2 + 2
      rem -= 2
    } else {
      result[i] = div * 2
    }
  }
  return result

}
const create2DArray = (rows: number, cols: number, initialValue: number): number[][] => {
  const array: number[][] = [];
  for (let i = 0; i < rows; i++) {
    const row: number[] = [];
    for (let j = 0; j < cols; j++) {
      row[j] = initialValue;
    }
    array.push(row);
  }
  return array;
};
const create2DStringArray = (rows: number, cols: number, initialValue: string): string[][] => {
  const array: string[][] = [];
  for (let i = 0; i < rows; i++) {
    const row: string[] = [];
    for (let j = 0; j < cols; j++) {
      row[j] = initialValue;
    }
    array.push(row);
  }
  return array;
};


export const daysDistribution = (subjects: Subject[], week: any, weekData: any, type: string) => {
  let rows: number[] = []
  let cols: number[] = []


  week.days.forEach((day: any) => {
    if (type === 'day')
      cols.push(day.type.dayLearningHours)
    else
      cols.push(day.type.nightLearningHours)
  });
  let generalSubjectsTotal = 0
  let specificSubjectsTotal = 0
  weekData.forEach((value: number, index: number) => {
    if (subjects[index].type === 'specific') specificSubjectsTotal += value
    else generalSubjectsTotal += value
    rows.push(value)
  })
  let mat = create2DArray(rows.length, cols.length, 0)
  for (let step = 0; step < 10; step++) {
    for (let i = 0; i < cols.length; i++) {
      let cnt = 0, cnt1 = 0
      for (let j = 0; j < rows.length; j++) {
        if (subjects[j].type === 'specific' && Math.min(rows[j], cols[i]) >= 2 && cnt < 4) {
          mat[j][i] += 2
          rows[j] -= 2
          cols[i] -= 2
          cnt += 2
        }
        if (subjects[j].type === 'general' && Math.min(rows[j], cols[i]) >= 2 && cnt1 < 2) {
          mat[j][i] += 2
          rows[j] -= 2
          cols[i] -= 2
          cnt1 += 2
        }
      }
    }
  }
  let the545 = create2DStringArray(rows.length, cols.length, '')
  for (let i = 0; i < cols.length; i++) {
    let cnt = type === 'day' ? 1 : 4
    for (let j = 0; j < rows.length; j++) {
      if (mat[j][i] === 2) {
        the545[j][i] = `2/${cnt}`
        cnt++;
      } else if (mat[j][i] === 4) {
        the545[j][i] = `4/${cnt},${cnt + 1}`
        cnt += 2;

      } else if (mat[j][i] === 6) {
        the545[j][i] = `6/${cnt},${cnt + 1},${cnt + 2}`
        cnt += 3
      }
    }
  }
  // const distributionResult = matrixEvenDistribution(rows, cols);
  return { mat, cols, rows, the545 }
}
export const weeksDistribution = (jobs: Job[], subjects: Subject[], month: MonthData, monthData: number[], type: string) => {
  let rows: number[] = []
  let cols: number[] = []
  let weeksTotal: number[] = []
  month.weeks.forEach((week: any) => {
    if (type === 'day')
      cols.push(week.totalDayLearningHours)
    else
      cols.push(week.totalNightLearningHours)
  })

  monthData.forEach((value: any, index: number) => {
    rows.push(value)
  })
  weeksTotal = [...cols]
  const distributionResult = matrixEvenDistribution(rows, cols);
  const the547jobs: any = []
  jobs.forEach((job, index) => {
    const temp547 = distributionResult.mat.map(row => [...row])
    const temp: number[] = []
    month.weeks.forEach(week => temp.push(0))
    subjects.forEach((subject, subjectIndex) => {
      if (subject.type === 'specific' && !job.subjects.find((subjectId) => subjectId === subject.id)) {
        temp.forEach((value, index) => {
          temp[index] += temp547[subjectIndex][index]
          temp547[subjectIndex][index] = 0
        })
      }
    })
    the547jobs.push({ mat: temp547, totals: temp })
  })
  return { ...distributionResult, the547jobs, weeksTotal }
}
export const monthsDistribution = (jobs: Job[], months: MonthData[], subjects: Subject[], totalLearingHours: number, type: string) => {

  let rows: number[] = []
  let cols: number[] = []
  months.forEach((month: any) => {
    if (type === 'day')
      cols.push(month.totalDayLearningHours)
    else
      cols.push(month.totalNightLearningHours)
  })

  subjects.forEach((subject: any) => {
    rows.push(subject.totalHours)
  })
  let dif = totalLearingHours - rows.reduce((acc, value) => acc + value, 0)
  for (let i = 0; i < rows.length; i++) {
    if (rows[i] % 2 === 1 && dif > 0) {
      rows[i]++
      dif--
    }
  }
  for (let j = 0; j < 100; j++) {
    for (let i = 0; i < rows.length; i++) {
      if (dif > 0) {
        rows[i] += 2
        dif -= 2
      }
    }
  }

  const finalDistribution: disInterval = {
    cols: [],
    rows: [],
    mat: [][5],
    months: []
  }
  const intervalDistribution = matrixEvenDistribution(rows, cols)
  finalDistribution.cols = intervalDistribution.cols
  finalDistribution.rows = intervalDistribution.rows
  finalDistribution.mat = intervalDistribution.mat
  months.forEach((month: any, monthId: number) => {
    const monthDistribution = weeksDistribution(jobs, subjects, month, finalDistribution.mat.map((row) => row[monthId]), type)
    finalDistribution.months.push({ cols: monthDistribution.cols, rows: monthDistribution.rows, mat: monthDistribution.mat, weeks: [], the547jobs: monthDistribution.the547jobs })

  })
  months.forEach((month: any, monthId: number) => {
    month.weeks.forEach((week: any, weekId: number) => {
      const weekDistribution = daysDistribution(subjects, week, finalDistribution.months[monthId].mat.map((row) => row[weekId]), type)
      finalDistribution.months[monthId].weeks.push({ cols: weekDistribution.cols, rows: weekDistribution.rows, mat: weekDistribution.mat, the545: weekDistribution.the545, the546: create2DArray(subjects.length, 7, -1) })
    })
  })
  return finalDistribution
}
const matrixEvenDistribution = (rows: number[], cols: number[]) => {
  let mat = create2DArray(rows.length, cols.length, 0)
  for (let step = 0; step < 200; step++) {
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < cols.length; j++) {
        if (Math.min(rows[i], cols[j]) >= 2) {
          mat[i][j] += 2
          rows[i] -= 2
          cols[j] -= 2
        }
      }
    }
  }


  return { mat, cols, rows }
}


export const dayTopicsDistribution = (subjects: Subject[], dayDistribution: disInterval, topics: Topic[]) => {
  const result: topicsDis[] = []
  subjects.forEach((subject, index) => {
    const subjectTopics = topics.filter((topic) => topic.subject === subject.id && topic.day)
    let subjectTotal = dayDistribution.mat[index].reduce((acc, value) => acc + value, 0)

    let col: number[] = Array(subjectTopics.length).fill(0)
    let row: number[] = [...dayDistribution.mat[index]]
    const topicDistribution = create2DArray(col.length, row.length, 0)
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < subjectTopics.length; j++) {
        if (subjectTotal) {
          col[j] += 2
          subjectTotal -= 2;
        }
      }
    }
    for (let i = 0; i < col.length; i++) {
      for (let j = 0; j < row.length; j++) {
        const temp = Math.min(row[j], col[i])
        topicDistribution[i][j] = temp
        row[j] -= temp
        col[i] -= temp

      }
    }
    result.push({ subject: subject.id, mat: topicDistribution })
  })
  return result
}
export const nightTopicsDistribution = (subjects: Subject[], nightDistribution: disInterval, topics: Topic[]) => {
  const result: topicsDis[] = []
  subjects.forEach((subject, index) => {
    const subjectTopics = topics.filter((topic) => topic.subject === subject.id && topic.night)
    let subjectTotal = nightDistribution.mat[index].reduce((acc, value) => acc + value, 0)

    let col: number[] = Array(subjectTopics.length).fill(0)
    let row: number[] = [...nightDistribution.mat[index]]
    const topicDistribution = create2DArray(col.length, row.length, 0)
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < subjectTopics.length; j++) {
        if (subjectTotal) {
          col[j] += 2
          subjectTotal -= 2;
        }
      }
    }
    for (let i = 0; i < col.length; i++) {
      for (let j = 0; j < row.length; j++) {
        const temp = Math.min(row[j], col[i])
        topicDistribution[i][j] = temp
        row[j] -= temp
        col[i] -= temp

      }
    }
    result.push({ subject: subject.id, mat: topicDistribution })

  })
  return result
}

export const the546 = (subjects: Subject[], TopicsDistribution: topicsDis[], month547: disMonth, topics: Topic[], monthId: number, type: string, job: Job, jobId: number) => {
  if (!subjects.length || !job) return month547
  subjects.forEach((subject, subjectId) => {
    const subjectTopics = type === 'day' ? topics.filter((topic) => topic.subject === subject.id && topic.day)
      : topics.filter((topic) => topic.subject === subject.id && topic.night)
    const topicsDistribution = TopicsDistribution.find((item) => item.subject === subject.id)?.mat.map(row => [...row]) || [][5]
    month547.weeks.forEach((week) => {

      for (let i = 0; i < 7; i++) {
        let temp=[]
        for(let j=2;j<=week.mat[subjectId][i];j+=2) {
          const index = topicsDistribution?.findIndex(row => row[monthId] > 0)
          if (index !== -1) {
            week.the546[subjectId][i] = subjectTopics[index || 0]?.id
            temp.push(subjectTopics[index || 0]?.id)
            topicsDistribution[index][monthId] -= 2
          }
        }
      }
    })
  })
  subjects.forEach((subject, subjectId) => {
    if (subject.type === 'specific' && !job.subjects.find(id => id === subject.id)) {
      const subjectTopics = type === 'day' ? topics.filter((topic) => topic.job === job.id && topic.day)
        : topics.filter((topic) => topic.job === job.id && topic.night)
      const topicsDistribution = distribute(month547.the547jobs[jobId].totals.reduce((acc, value) => acc + value, 0), subjectTopics.length)
      month547.weeks.forEach((week) => {
        for (let i = 0; i < 7; i++) {
          if (week.mat[subjectId][i]) {
            const index = topicsDistribution?.findIndex(value => value > 0)
            if (index !== -1) {
              week.the546[subjectId][i] = subjectTopics[index || 0]?.id
              topicsDistribution[index] -= 2
            }
          }
        }
      })
    }
  })
  return month547
}
export const the548 = (subjects: Subject[], month547: disMonth, topics: Topic[], job: Job) => {
  const result: { subject: string, total: number, weeks: any }[] = []
  const temp = {
    subject: 'تد فني تخصصي', total: 0, weeks: [
      { weekTotal: 0, frequencyMap: new Map<string, number>() },
      { weekTotal: 0, frequencyMap: new Map<string, number>() },
      { weekTotal: 0, frequencyMap: new Map<string, number>() },
      { weekTotal: 0, frequencyMap: new Map<string, number>() },
      { weekTotal: 0, frequencyMap: new Map<string, number>() },
    ]
  }
  subjects.forEach((subject, subjectId) => {

    const weekResult: any[] = []
    let monthTotal = 0
    month547.weeks.forEach((week, weekId) => {
      const frequencyMap = new Map<string, number>();
      let weekTotal = 0
      for (let i = 0; i < 7; i++) {
        if (week.the546[subjectId][i] !== - 1) {
          const topic = topics.find(topic => topic.id === week.the546[subjectId][i])
          if (topic) {
            if (subject.type === 'specific' && !job?.subjects.find(value => value === subject.id)) {
              temp.weeks[weekId].frequencyMap.set(topic?.name, (temp.weeks[weekId].frequencyMap.get(topic?.name) || 0) + week.mat[subjectId][i]);
              temp.total += week.mat[subjectId][i]
              temp.weeks[weekId].weekTotal += week.mat[subjectId][i]
            } else {
              frequencyMap.set(topic?.name, (frequencyMap.get(topic?.name) || 0) + week.mat[subjectId][i]);
              weekTotal += week.mat[subjectId][i]
            }
          }
        }
      }
      weekResult.push({ weekTotal, frequencyMap })
      monthTotal += weekTotal
    })
    if ((subject.type === 'specific' && job?.subjects.find(value => value === subject.id)) || subject.type === 'general')
      result.push({ subject: subject.label, total: monthTotal, weeks: weekResult })
  })
  return [temp, ...result]
}
