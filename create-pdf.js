const renderHTML = require('./render-html');
const path = require('path');
const puppeteer = require('puppeteer');
const btoa = require('btoa');

const getThemePkg = (theme) => {
  if (theme[0] === '.') {
    theme = path.join(process.cwd(), theme, 'index.js');
  } else {
    theme = path.join(process.cwd(), 'node_modules', theme, 'index.js');
  }
  try {
    const themePkg = require(theme);
    return themePkg;
  } catch (err) {
    // Theme not installed
    console.log(
      'You have to install this theme relative to the folder to use it e.g. `npm install ' +
        theme +
        '`',
    );
    process.exit();
  }
};


const createPdf = async (resumeJson) => {

    const html = await renderHTML({
        resume: resumeJson,
    });

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: {
        width: 1080,
        height: 1350,
        deviceScaleFactor: 1
      }
    });

    const page = await browser.newPage();

    await page.emulateMediaType(
        'screen',
    );


    await page.goto(
        `data:text/html;base64,${btoa(unescape(encodeURIComponent(html)))}`,
        { waitUntil: 'networkidle0' },
    );

    const pdfOptions = {
      format: 'Letter',
      printBackground: true,
      scale: 1,
      preferCSSPageSize: false,
      omitBackground: true,
  }

    const height_weight_ratio = await page.evaluate( () => window.innerHeight / window.innerWidth)
    const height = parseInt(pdfOptions.width) * height_weight_ratio
    pdfOptions.height = "" + height + "cm"
    pdfOptions.scale = 1/height_weight_ratio

    const buffer = await page.pdf(pdfOptions)
    await browser.close();
    return buffer
};

module.exports = createPdf