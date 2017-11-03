const pug = require('pug');
const path = require('path');
const glob = require('glob');
const fs = require('fs-extra');

module.exports = function PugGenerator(options) {
  if (options.clean) {
    fs.removeSync(options.outputDir);
  }

  const templates = compileTemplates(options.templatesDir);

  function generateFile({ template, path: _path, params }) {
    const output = template(params);
    const outputFilePath = path.join(options.outputDir, `${_path}.html`);

    fs.outputFileSync(outputFilePath, output);

    return _path;
  }

  function compileTemplates(src) {
    const compiled = {};

    glob.sync(`**/*.pug`, {
      cwd: src
    }).forEach((file) => {
      const key = file.split('.pug')[0];

      compiled[key] = pug.compileFile(path.join(src, file), {
        basedir: src
      });
    });

    return compiled;
  }

  return function(callback) {
    return callback(templates, generateFile);
  }
};