const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    name: 'male-reference.jpg',
    url: 'https://dummyimage.com/800x600/2563eb/ffffff.jpg&text=Male+Body+Fat+Reference',
  },
  {
    name: 'female-reference.jpg',
    url: 'https://dummyimage.com/800x600/2563eb/ffffff.jpg&text=Female+Body+Fat+Reference',
  },
  {
    name: 'waist-measurement.jpg',
    url: 'https://dummyimage.com/800x600/22c55e/ffffff.jpg&text=Waist+Measurement',
  },
  {
    name: 'neck-measurement.jpg',
    url: 'https://dummyimage.com/800x600/22c55e/ffffff.jpg&text=Neck+Measurement',
  },
  {
    name: 'hip-measurement.jpg',
    url: 'https://dummyimage.com/800x600/22c55e/ffffff.jpg&text=Hip+Measurement',
  },
  {
    name: 'measurement-tips.jpg',
    url: 'https://dummyimage.com/800x600/eab308/ffffff.jpg&text=Measurement+Tips',
  },
];

async function downloadImage(url, filename) {
  const filepath = path.join(__dirname, '../public/images/body-fat', filename);
  
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${filename} from ${url}`);
    
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Successfully downloaded: ${filename}`);
        resolve();
      });

      file.on('error', (err) => {
        fs.unlink(filepath, () => {});
        console.error(`Error writing ${filename}:`, err.message);
        reject(err);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      console.error(`Error downloading ${filename}:`, err.message);
      reject(err);
    });
  });
}

async function main() {
  try {
    // 确保目录存在
    const dir = path.join(__dirname, '../public/images/body-fat');
    if (!fs.existsSync(dir)) {
      console.log('Creating directory:', dir);
      fs.mkdirSync(dir, { recursive: true });
    }

    // 下载所有图片
    console.log('Starting downloads...');
    for (const image of images) {
      try {
        await downloadImage(image.url, image.name);
      } catch (error) {
        console.error(`Failed to download ${image.name}:`, error.message);
      }
    }
    console.log('All downloads completed!');
  } catch (error) {
    console.error('Error in main process:', error);
    process.exit(1);
  }
}

main(); 