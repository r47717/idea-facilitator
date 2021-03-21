import { delay } from "./utils";

const activities = [
  {
    id: 1,
    name: "idea #1",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
    phase: 1,
  },
  {
    id: 2,
    name: "idea #2",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
    phase: 1,
    archived: true,
  },
  {
    id: 3,
    name: "idea #3",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
    phase: 1,
  },
  {
    id: 4,
    name: "idea #4",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
    phase: 2,
    pinned: true,
  },
  {
    id: 5,
    name: "idea #5",
    description:
      "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",
    phase: 3,
    pinned: true,
  },
  {
    id: 6,
    name: "idea #6",
    description: "Laboris non et fugiat anim laborum Lorem irure.",
    phase: 4,
    archived: true,
  },
];

let latestId = activities[activities.length - 1].id;

export async function getActivities() {
  await delay(300);
  return activities;
}

export async function getActivityById(id) {
  await delay(300);
  return activities.find((item) => item.id === id);
}

export async function addNewActivity(data) {
  if (!data) {
    console.error("empty data for a new activity");
    return;
  }

  await delay(500);
  activities.push({ ...data, id: ++latestId });
  console.log(data, activities);
}

export async function updateActivity(id, data) {
  await delay(500);
  const activity = await getActivityById(id);
  for (let prop in data) {
    if (prop !== "id") {
      activity[prop] = data[prop];
    }
  }
}

export async function removeActivity(id) {
  await delay(500);
  const index = activities.findIndex((item) => item.id === id);
  activities.splice(index, 1);
}

export async function archiveActivity(id) {
  await delay(500);
  const activity = await getActivityById(id);
  activity.archived = true;
}

export async function unArchiveActivity(id) {
  await delay(500);
  const activity = await getActivityById(id);
  activity.archived = false;
}

export async function getArchivedActivities() {
  await delay(300);
  return activities.filter((item) => !!item.archived);
}

export async function pinActivity(id) {
  await delay(500);
  const activity = await getActivityById(id);
  activity.pinned = true;
}

export async function unpinActivity(id) {
  await delay(500);
  const activity = await getActivityById(id);
  activity.pinned = false;
}

export async function getPinnedActivities() {
  await delay(300);
  return activities.filter((item) => !!item.pinned);
}
