#!/usr/bin/env node

const fs = require('fs');

    const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

function generateWebComponentSnippets() {

const webComponentSnippets = {};
fs.readFile("./data.json", (err, data) => {
  if(err) console.log(err);
  // console.log(JSON.parse(data));
  const _seed = JSON.parse(data);
  Object.keys(_seed).forEach((k) => {
    const key = `fw-${k}`
    const { name, placeholders, prefix, attrs, children } = _seed[k];
    const props =  placeholders.map((p,idx) => {
      return `${p}="\${${idx+1}:${p}}"`
    })
    .join(' ')
    .trim();

    const defaultProps = attrs.map((a) => {
      const [key] = Object.keys(a);
      const value = a[key];
      return value ? `${key}="${value}"` : `${key}`;
    })
    .join(' ')
    .trim();

    let openTag = `<fw-${name}`;
    if (props) {
      openTag += ` ${props}`;
    }

    if(defaultProps) {
      openTag += ` ${defaultProps}`
    }

    openTag += '>';
    const closeTag = `</fw-${name}>`;
    const body = children ? `${openTag}\${0:content}${closeTag}` : `${openTag}${closeTag}` 

    webComponentSnippets[key] = {
        prefix: `fw-${prefix}`,
        body: [body],
        description: `Freshworks Crayons ${capitalize(name)} component`
      }
  });

  console.log(webComponentSnippets);

    fs.writeFile('./wc-snippets.json', JSON.stringify(webComponentSnippets, null, 2), (err) => {

      if(err) console.log(err);
      console.log('Web component snippets generated successfully.');
    });
});
}



function generateReactSnippets() {

const reactSnippets = {};
fs.readFile("./data.json", (err, data) => {
  if(err) console.log(err);
  // console.log(JSON.parse(data));
  const _seed = JSON.parse(data);
  Object.keys(_seed).forEach((k) => {
    const key = `fw-${k}`
    const { name, placeholders, prefix, attrs, children } = _seed[k];
    const props =  placeholders.map((p,idx) => {
      return `${p}="\${${idx+1}:${p}}"`
    })
    .join(' ')
    .trim();

    const defaultProps = attrs.map((a) => {
      const [key] = Object.keys(a);
      const value = a[key];
      return value ? `${key}="${value}"` : `${key}`;
    })
    .join(' ')
    .trim();

    let openTag = `<Fw${capitalize(name)}`;
    if (props) {
      openTag += ` ${props}`;
    }

    if(defaultProps) {
      openTag += ` ${defaultProps}`
    }

    openTag += '>';
    const closeTag = `</Fw${capitalize(name)}>`;
    const body = children ? `${openTag}\${0:content}${closeTag}` : `${openTag}${closeTag}` 


    reactSnippets[key] = {
        prefix: `fw-${prefix}`,
        body: [body],
        description: `Freshworks ${capitalize(name)} React component`
      }

      const ReactComponents = [
        'FwAccordion',
        'FwAccordionTitle',
        'FwAccordionBody',
        'FwAvatar',
        'FwButton',
        'FwCheckbox',
        'FwCountryPhone',
      ]

      ReactComponents.forEach((component) => {

    reactSnippets[component] = {
        prefix: `fw-${prefix}`,
        body: [body],
        description: `Freshworks ${capitalize(name)} React component`
      }
      });
  });

  console.log(reactSnippets);

    fs.writeFile('./react-snippets.json', JSON.stringify(reactSnippets, null, 2), (err) => {

      if(err) console.log(err);
      console.log('React snippets generated successfully.');
    });
});
}

// generateWebComponentSnippets();
generateReactSnippets();
