// ONE-TIME HELPER (not part of the website). It downloads every product picture listed in
// src/data/products.json into public/products/, so the pictures still show when the image
// server (fakestoreapi.com) is down. Run it once from the project folder:
//     npm run download-images
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const products = JSON.parse(readFileSync("src/data/products.json", "utf-8"));

if (products.length === 0) {
  console.log("src/data/products.json is empty. Paste the API response into it first (see README.md).");
  process.exit(1);
}

mkdirSync("public/products", { recursive: true });

for (const product of products) {
  const fileName = product.image.split("/").pop(); // the file name at the end of the link
  const response = await fetch(product.image);

  if (!response.ok) {
    console.log("FAILED  ", product.image, "(status " + response.status + ")");
    continue;
  }

  writeFileSync("public/products/" + fileName, Buffer.from(await response.arrayBuffer()));
  console.log("saved   ", fileName);
}

console.log("Done. Pictures are in public/products/");
