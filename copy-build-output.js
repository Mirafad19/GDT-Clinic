import fs from "fs";
import path from "path";

// Recursively copy directory
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  let entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  if (fs.existsSync("dist/client")) {
    copyDir("dist/client", "dist");
    console.log("Successfully copied dist/client to dist for static hosting compatibility!");
  } else {
    console.log("No dist/client found, skipping copy step.");
  }
} catch (err) {
  console.error("Error copying build output:", err);
}
