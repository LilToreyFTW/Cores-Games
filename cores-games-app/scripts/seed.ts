import { ensureDemoUsers } from "@/lib/seed";

async function main() {
  await ensureDemoUsers();
  console.log("Seeded demo users for Cores Games!");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
