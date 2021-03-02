export async function saveDataToJSON() {
  return {
    test: 123,
    test2: "1234567890",
  };
}

export async function restoreDataFromJSON(json) {
  console.log(json);
}
