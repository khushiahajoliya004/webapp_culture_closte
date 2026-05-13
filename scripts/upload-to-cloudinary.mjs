import { createHash } from "crypto";
import { readFileSync, readdirSync } from "fs";
import { join, basename } from "path";

const CLOUD_NAME = "dw2a5mbwh";
const API_KEY = "347791281463524";
const API_SECRET = "cInRlQ3WO1vQFb567dk-icEtjHs";
const FOLDER = "culture-closet";
const IMAGES_DIR = "./public/images/figma";

function sign(params) {
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return createHash("sha256")
    .update(sorted + API_SECRET)
    .digest("hex");
}

async function uploadImage(filePath) {
  const fileName = basename(filePath, ".png");
  const timestamp = Math.floor(Date.now() / 1000);

  const sigParams = { folder: FOLDER, public_id: fileName, timestamp };
  const signature = sign(sigParams);

  const form = new FormData();
  const fileBytes = readFileSync(filePath);
  const blob = new Blob([fileBytes], { type: "image/png" });

  form.append("file", blob, basename(filePath));
  form.append("api_key", API_KEY);
  form.append("timestamp", String(timestamp));
  form.append("signature", signature);
  form.append("folder", FOLDER);
  form.append("public_id", fileName);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: form }
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return { name: fileName, url: data.secure_url };
}

async function main() {
  const files = readdirSync(IMAGES_DIR)
    .filter((f) => f.endsWith(".png"))
    .map((f) => join(IMAGES_DIR, f));

  console.log(`Uploading ${files.length} images to Cloudinary...`);
  const results = {};

  for (const file of files) {
    try {
      const { name, url } = await uploadImage(file);
      results[name] = url;
      console.log(`✅ ${name}: ${url}`);
    } catch (e) {
      console.error(`❌ ${basename(file)}: ${e.message}`);
    }
  }

  console.log("\n=== CLOUDINARY URLS ===");
  console.log(JSON.stringify(results, null, 2));
}

main();
