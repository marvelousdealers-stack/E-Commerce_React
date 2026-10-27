// ONE-TIME HELPER (not part of the website). Run it once, with internet, from the project folder:
//     npm run download-images
// It saves the pictures the site needs into the public/ folder, so the site never depends on
// outside links while it is running:
//   1. the site photos (from Unsplash) as .webp  ->  public/images/
//   2. the product pictures listed in src/data/products.json  ->  public/products/
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

// Downloads one link and saves it as a file. Prints saved / FAILED.
async function save(url, path) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log("FAILED  ", path, "(status " + response.status + ")");
      return;
    }
    writeFileSync(path, Buffer.from(await response.arrayBuffer()));
    console.log("saved   ", path);
  } catch (error) {
    console.log("FAILED  ", path, "(" + error.message + ")");
  }
}

// ---------- 1. SITE PHOTOS (free Unsplash photos, converted to webp by Unsplash: fm=webp) ----------
// name = file name in public/images/, id = the Unsplash photo id.
const photos = [
  { name: "shop-interior", id: "photo-1441986300917-64674bd600d8" },
  { name: "electronics", id: "photo-1498049794561-7780e7231661" },
  { name: "jewelry", id: "photo-1515562141207-7a88fb7ce338" },
  { name: "mens-clothing", id: "photo-1523381210434-271e8be1f52b" },
  { name: "womens-clothing", id: "photo-1441984904996-e0b6ba687e04" },
  { name: "clothes-rack", id: "photo-1490481651871-ab68de25d43d" },
  { name: "watch", id: "photo-1523275335684-37898b6baf30" },
];

mkdirSync("public/images", { recursive: true });
console.log("Site photos:");
for (const photo of photos) {
  await save(
    "https://images.unsplash.com/" + photo.id + "?fit=crop&w=1600&q=72&fm=webp",
    "public/images/" + photo.name + ".webp"
  );
}

// ---------- 2. PRODUCT PICTURES (from the saved API response) ----------
const products = JSON.parse(readFileSync("src/data/products.json", "utf-8"));

console.log("Product pictures:");
if (products.length === 0) {
  console.log("src/data/products.json is empty, so no product pictures were downloaded.");
  console.log("Paste the API response into it (see README.md) and run this command again.");
} else {
  mkdirSync("public/products", { recursive: true });
  for (const product of products) {
    const fileName = product.image.split("/").pop(); // the file name at the end of the link
    await save(product.image, "public/products/" + fileName);
  }
}

console.log("Done.");
