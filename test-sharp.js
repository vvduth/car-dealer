// test-sharp.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function runTest() {
  try {
    // Test edilecek resmin yolu (önce public klasörüne test.png adında bir resim atın)
    const imagePath = path.join(__dirname, 'public', 'test.jpg');

    console.log(`[1] Resim dosyası okunuyor: ${imagePath}`);
    if (!fs.existsSync(imagePath)) {
      console.error("\nHATA: Lütfen projenizin 'public' klasörüne 'test.png' adında basit bir PNG dosyası koyun ve tekrar deneyin.");
      return;
    }
    const imageBuffer = fs.readFileSync(imagePath);
    console.log('[2] Resim başarıyla bir buffer\'a okundu.');

    console.log('[3] sharp ile resim işlenmeye çalışılıyor...');
    // sharp'a sadece metadata'sını okutuyoruz. Bu, formatı tanıyıp tanımadığını anlamak için yeterli.
    const metadata = await sharp(imageBuffer).metadata();

    console.log('[4] sharp resmi başarıyla tanıdı ve işledi!');
    console.log('--- SONUÇ: BAŞARILI ---');
    console.log('Resim Bilgileri:', metadata);

  } catch (error) {
    console.error('--- SONUÇ: BAŞARISIZ ---');
    console.error('sharp testi sırasında kritik bir hata oluştu:', error);
  }
}

runTest();
