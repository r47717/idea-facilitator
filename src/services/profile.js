import { delay } from "./utils";

export async function getProfile() {
  await delay(300);
  return {
    name: "Jenny Doe",
    email: "email@mycompany.com",
    avatar:
      "https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/16:9/w_2560%2Cc_limit/best-face-oil.png",
  };
}
