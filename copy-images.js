const fs = require("fs");
const path = require("path");

const sourceDir =
  "c:\\Users\\recep\\AppData\\Roaming\\Code\\User\\globalStorage\\github.copilot-chat\\copilot-cli-images";
const destDir = path.join(__dirname, "public", "dogs");

// Copy the images
const images = [
  { src: "1778521661215-ffkysrp5.png", dest: "chocolate_1.jpeg" },
  { src: "1778521661215-8ao9s9wr.png", dest: "chocolate_2.jpeg" },
];

images.forEach((img) => {
  const srcPath = path.join(sourceDir, img.src);
  const destPath = path.join(destDir, img.dest);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copiado: ${img.src} -> ${img.dest}`);
  } else {
    console.log(`Arquivo não encontrado: ${srcPath}`);
  }
});

console.log("Operação concluída!");
