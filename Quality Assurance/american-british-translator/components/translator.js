const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  validateInput(stringToTranslate, locale) {
    // if missing string to translate or locale
    if (stringToTranslate === undefined || !locale)
        return { error: 'Required field(s) missing' };

    // if non-matching locale
    if (locale !== 'american-to-british' && locale !== 'british-to-american')
      return { error: 'Invalid value for locale field' };

    // if empty string to translate
    if (stringToTranslate === '')
      return { error: 'No text to translate' };
  }
  

  americanToBritish(stringToTranslate) {
    let translatedString = stringToTranslate;
    let translatedStringWithHighlights = stringToTranslate;

    // translate titles
    for (const [americanTitle, britishTitle] of Object.entries(americanToBritishTitles)) {
      const americanTitleRegex = new RegExp(`(?<![\\w-])${americanTitle}(?![\\w-])`, 'gi');
      if (americanTitleRegex.test(translatedString)) {
        translatedString = translatedString.replaceAll(
          americanTitleRegex,
          `${britishTitle[0].toUpperCase()}${britishTitle.slice(1)}`
        );
        
        translatedStringWithHighlights = translatedStringWithHighlights.replaceAll(
          americanTitleRegex,
          `<span class="highlight">${britishTitle[0].toUpperCase()}${britishTitle.slice(1)}</span>`
        );
      }
    }

    // translate words
    for (const [americanWord, britishWord] of Object.entries(americanOnly)) {
      const americanWordRegex = new RegExp(`(?<![\\w-])${americanWord}(?![\\w-])`, 'gi');
      if (americanWordRegex.test(translatedString)) {
        translatedString = translatedString.replaceAll(
          americanWordRegex,
          `${britishWord}`
        );
        
        translatedStringWithHighlights = translatedStringWithHighlights.replaceAll(
          americanWordRegex,
          `<span class="highlight">${britishWord}</span>`
        );
      }
    }

    // translate spelling
    for (const [americanSpelling, britishSpelling] of Object.entries(americanToBritishSpelling)) {
      const americanSpellingRegex = new RegExp(`(?<![\\w-])${americanSpelling}(?![\\w-])`, 'gi');
      if (americanSpellingRegex.test(translatedString)) {
        translatedString = translatedString.replaceAll(
          americanSpellingRegex,
          `${britishSpelling}`
        );

        translatedStringWithHighlights = translatedStringWithHighlights.replaceAll(
          americanSpellingRegex,
          `<span class="highlight">${britishSpelling}</span>`
        );
      }
    }

    // translate time
    const timeRegex = /\d+:\d+/;
    translatedString = translatedString.split(' ').map((word) => {
      if (timeRegex.test(word)) return word.replace(':', '.');
      return word;
    })

    translatedStringWithHighlights = translatedStringWithHighlights.split(' ').map((word) => {
      if (timeRegex.test(word)) return `<span class="highlight">${word.replace(':', '.')}</span>`;
      return word;
    })

    translatedString = translatedString.join(' ');
    translatedStringWithHighlights = translatedStringWithHighlights.join(' ');

    // return translation
    return { text: stringToTranslate, translation: [translatedString, translatedStringWithHighlights] };
  }
  

  britishToAmerican(stringToTranslate) {
    let translatedString = stringToTranslate;
    let translatedStringWithHighlights = stringToTranslate;

    // translate titles
    for (const [americanTitle, britishTitle] of Object.entries(americanToBritishTitles)) {
      const britishTitleRegex = new RegExp(`(?<![\\w-])${britishTitle}(?![\\w-])`, 'gi');
      if (britishTitleRegex.test(translatedString)) {
        translatedString = translatedString.replaceAll(
          britishTitleRegex,
          `${americanTitle[0].toUpperCase()}${americanTitle.slice(1)}`
        );
        
        translatedStringWithHighlights = translatedStringWithHighlights.replaceAll(
          britishTitleRegex,
          `<span class="highlight">${americanTitle[0].toUpperCase()}${americanTitle.slice(1)}</span>`
        );
      }
    }

    // translate words
    for (const [britishWord, americanWord] of Object.entries(britishOnly)) {
      const britishWordRegex = new RegExp(`(?<![\\w-])${britishWord}(?![\\w-])`, 'gi');
      if (britishWordRegex.test(translatedString)) {
        translatedString = translatedString.replaceAll(
          britishWordRegex,
          `${americanWord}`
        );
        
        translatedStringWithHighlights = translatedStringWithHighlights.replaceAll(
          britishWordRegex,
          `<span class="highlight">${americanWord}</span>`
        );
      }
    }

    // translate spelling
    for (const [americanSpelling, britishSpelling] of Object.entries(americanToBritishSpelling)) {
      const britishSpellingRegex = new RegExp(`(?<![\\w-])${britishSpelling}(?![\\w-])`, 'gi');
      if (britishSpellingRegex.test(translatedString)) {
        translatedString = translatedString.replaceAll(
          britishSpellingRegex,
          `${americanSpelling}`
        );

        translatedStringWithHighlights = translatedStringWithHighlights.replaceAll(
          britishSpellingRegex,
          `<span class="highlight">${americanSpelling}</span>`
        );
      }
    }

    // translate time
    const timeRegex = /\d+\.\d+/;
    translatedString = translatedString.split(' ').map((word) => {
      if (timeRegex.test(word)) return word.replace('.', ':');
      return word;
    })

    translatedStringWithHighlights = translatedStringWithHighlights.split(' ').map((word) => {
      if (timeRegex.test(word)) return `<span class="highlight">${word.replace('.', ':')}</span>`;
      return word;
    })

    translatedString = translatedString.join(' ');
    translatedStringWithHighlights = translatedStringWithHighlights.join(' ');

    // return translation
    return { text: stringToTranslate, translation: [translatedString, translatedStringWithHighlights] };
  }
  
}

module.exports = Translator;