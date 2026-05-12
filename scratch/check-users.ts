import { getPayload } from "payload";
import config from "../src/payload.config";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function checkUsers() {
  try {
    const payload = await getPayload({ config });
    const users = await payload.find({
      collection: "users",
    });
    console.log("Total users found:", users.totalDocs);
    if (users.totalDocs > 0) {
      console.log(
        "Users:",
        users.docs.map((u) => u.email)
      );
    } else {
      console.log('No users found. You should see the "Create First User" screen.');
    }
    process.exit(0);
  } catch (error) {
    console.error("Error checking users:", error);
    process.exit(1);
  }
}

checkUsers();
