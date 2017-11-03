# Puggen

## Usage
```ecmascript 6
const generator = Generator({
  templatesDir: path.join(__dirname, 'templates'),
  outputDir: path.join(__dirname, 'static'),
  clean: true
});

generator((templates, generate) => {
  const link = generate({
    template: templates['index'],
    path: `index`,
    params: {
      title: 'Hello!'
    }
  });
});

```