const tasks = [
  {
    id: 1,
    activityId: 1,
    name: "task 1",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
    status: 1,
  },
  {
    id: 2,
    activityId: 1,
    name: "task 2",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
    status: 1,
  },
  {
    id: 3,
    activityId: 2,
    name: "task 3",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
    status: 1,
  },
  {
    id: 4,
    activityId: 3,
    name: "task 4",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
    status: 2,
  },
  {
    id: 5,
    activityId: 3,
    name: "task 5",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
    status: 1,
  },
  {
    id: 6,
    activityId: 4,
    name: "task 6",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
    status: 2,
  },
  {
    id: 7,
    activityId: 5,
    name: "task 7",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
    status: 3,
  },
];

export async function getTasksByActivity(activityId) {
  return tasks.filter((task) => task.activityId === activityId);
}
