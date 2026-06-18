import fs from "node:fs";
import path from "node:path";

const pathsToRemove = ["node_modules", "package-lock.json", ".vite", "dist"];

for (const item of pathsToRemove) {
  const fullPath = path.resolve(process.cwd(), item);

  if (fs.existsSync(fullPath)) {
    console.log(`Removing ${item}...`);
    fs.rmSync(fullPath, {
      recursive: true,
      force: true
    });
  }
}

console.log("Clean complete.");
console.log("Now run: npm install --no-audit --no-fund");