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


const createPdf = async (resumeJson, theme) => {
    const themePkg = getThemePkg(theme);

    const html = await renderHTML({
        resume: resumeJson,
        themePath: theme,
    });

    const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox']});

    const page = await browser.newPage();

    await page.emulateMediaType(
        (themePkg.pdfRenderOptions && themePkg.pdfRenderOptions.mediaType) ||
        'screen',
    );
    await page.goto(
        `data:text/html;base64,${btoa(unescape(encodeURIComponent(html)))}`,
        { waitUntil: 'networkidle0' },
    );
    if (themePkg.pdfViewport) {
        await page.setViewport(themePkg.pdfViewport);
    }
    const buffer = await page.pdf({
        format: 'Letter',
        printBackground: true,
        ...themePkg.pdfRenderOptions,
    });
    await browser.close();
    return buffer
};

module.exports = createPdf