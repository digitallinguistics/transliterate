require(`./credentials`);
const azure         = require(`azure-storage`);
const { version }   = require(`../package.json`);
const path          = require(`path`);
const { promisify } = require(`util`);

const storage    = azure.createBlobService();
const uploadFile = promisify(storage.createBlockBlobFromLocalFile).bind(storage);

void async function upload() {

  const options = { contentSettings: { contentType: `application/javascript` } };

  const srcFilePath    = path.join(__dirname, `../transliterate.js`);
  const bundleFilePath = path.join(__dirname, `../transliterate.bundle.js`);

  try {
    await uploadFile(`scripts`, `transliterate.js`, srcFilePath, options);
    await uploadFile(`scripts`, `transliterate-latest.js`, srcFilePath, options);
    await uploadFile(`scripts`, `transliterate-${version}.js`, srcFilePath, options);
    await uploadFile(`scripts`, `transliterate.bundle.js`, bundleFilePath, options);
    await uploadFile(`scripts`, `transliterate.bundle-latest.js`, bundleFilePath, options);
    await uploadFile(`scripts`, `transliterate.bundle-${version}.js`, bundleFilePath, options);
  } catch (e) {
    throw e;
  }


}();
