console.log('Convert the characters &, <, >, ", and \' in a string to their corresponding HTML entities. \n');

const convertHTML = function (str) {
  console.log(`Passed string: ${str}`);

  const lookup = {
    34: '&quot;',
    38: '&amp;',
    39: '&apos;',
    60: '&lt;',
    62: '&gt;',
  };

  console.log(`String to return: ${str.replace(/[&<>"']/gi, match => lookup[match.charCodeAt(0)])}\n`);

  return str.replace(/[&<>"']/gi, match => lookup[match.charCodeAt(0)]);
};

/* eslint-disable no-irregular-whitespace */
convertHTML('Dolce & Gabbana'); // should return Dolce &​amp; Gabbana.
convertHTML('Hamburgers < Pizza < Tacos'); // should return Hamburgers &​lt; Pizza &​lt; Tacos.
convertHTML('Sixty > twelve'); // should return Sixty &​gt; twelve.
convertHTML('Stuff in "quotation marks"'); // should return Stuff in &​quot;quotation marks&​quot;.
convertHTML("Shindler's List"); // should return Shindler&​apos;s List.
convertHTML('<>'); // should return &​lt;&​gt;.
convertHTML('abc'); // should return abc.

/* CONDENSED VERSION - NO CONSOLE OUTPUTS

  const convertHTML = function (str) {
    const lookup = {34: '&quot;', 38: '&amp;', 39: '&apos;', 60: '&lt;', 62: '&gt;',};
    return str.replace(/[&<>"']/gi, match => lookup[match.charCodeAt(0)]);
  };

*/
