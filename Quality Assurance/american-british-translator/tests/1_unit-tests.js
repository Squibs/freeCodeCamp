const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {

  suite('American to British English', () => {
    
    test(`Translate Mangoes are my favorite fruit. to British English`, (done) => {
      assert.strictEqual(
        translator.americanToBritish('Mangoes are my favorite fruit.').text,
        'Mangoes are my favorite fruit.'
      );
      assert.strictEqual(
        translator.americanToBritish('Mangoes are my favorite fruit.').translation[0],
        'Mangoes are my favourite fruit.'
      );
      done();
    });

    test(`Translate I ate yogurt for breakfast. to British English`, (done) => {
      assert.strictEqual(
        translator.americanToBritish('I ate yogurt for breakfast.').text,
        'I ate yogurt for breakfast.'
      );
      assert.strictEqual(
        translator.americanToBritish('I ate yogurt for breakfast.').translation[0],
        'I ate yoghurt for breakfast.'
      );
      done(); 
    });
    
    test(`Translate We had a party at my friend's condo. to British English`, (done) => {
      assert.strictEqual(
        translator.americanToBritish(`We had a party at my friend's condo.`).text,
        `We had a party at my friend's condo.`
      );
      assert.strictEqual(
        translator.americanToBritish(`We had a party at my friend's condo.`).translation[0],
        `We had a party at my friend's flat.`
      );
      done(); 
    });
    
    test(`Translate Can you toss this in the trashcan for me? to British English`, (done) => {
      assert.strictEqual(
        translator.americanToBritish(`Can you toss this in the trashcan for me?`).text,
        `Can you toss this in the trashcan for me?`
      );
      assert.strictEqual(
        translator.americanToBritish(`Can you toss this in the trashcan for me?`).translation[0],
        `Can you toss this in the bin for me?`
      );
      done(); 
    });
    
    test(`Translate The parking lot was full. to British English`, (done) => {
      assert.strictEqual(
        translator.americanToBritish(`The parking lot was full.`).text,
        `The parking lot was full.`
      );
      assert.strictEqual(
        translator.americanToBritish(`The parking lot was full.`).translation[0],
        `The car park was full.`
      );
      done();   
    });
    
    test(`Translate Like a high tech Rube Goldberg machine. to British English`, (done) => {
      assert.strictEqual(
        translator.americanToBritish(`Like a high tech Rube Goldberg machine.`).text,
        `Like a high tech Rube Goldberg machine.`
      );
      assert.strictEqual(
        translator.americanToBritish(`Like a high tech Rube Goldberg machine.`).translation[0],
        `Like a high tech Heath Robinson device.`
      );
      done();    
    });
    
    test(`Translate To play hooky means to skip class or work. to British English`, (done) => {
      assert.strictEqual(
        translator.americanToBritish(`To play hooky means to skip class or work.`).text,
        `To play hooky means to skip class or work.`
      );
      assert.strictEqual(
        translator.americanToBritish(`To play hooky means to skip class or work.`).translation[0],
        `To bunk off means to skip class or work.`
      );
      done();  
    });
    
    test(`Translate No Mr. Bond, I expect you to die. to British English`, (done) => {
      assert.strictEqual(
        translator.americanToBritish(`No Mr. Bond, I expect you to die.`).text,
        `No Mr. Bond, I expect you to die.`
      );
      assert.strictEqual(
        translator.americanToBritish(`No Mr. Bond, I expect you to die.`).translation[0],
        `No Mr Bond, I expect you to die.`
      );
      done();   
    });
    
    test(`Translate Dr. Grosh will see you now. to British English`, (done) => {
      assert.strictEqual(
        translator.americanToBritish(`Dr. Grosh will see you now.`).text,
        `Dr. Grosh will see you now.`
      );
      assert.strictEqual(
        translator.americanToBritish(`Dr. Grosh will see you now.`).translation[0],
        `Dr Grosh will see you now.`
      );
      done();     
    });
    
    test(`Translate Lunch is at 12:15 today. to British English`, (done) => {
      assert.strictEqual(
        translator.americanToBritish(`Lunch is at 12:15 today.`).text,
        `Lunch is at 12:15 today.`
      );
      assert.strictEqual(
        translator.americanToBritish(`Lunch is at 12:15 today.`).translation[0],
        `Lunch is at 12.15 today.`
      );
      done();  
    });

  });


  suite('British to American English', () => {
    
    test(`Translate We watched the footie match for a while. to American English`, (done) => {
      assert.strictEqual(
        translator.britishToAmerican(`We watched the footie match for a while.`).text,
        `We watched the footie match for a while.`
      );
      assert.strictEqual(
        translator.britishToAmerican(`We watched the footie match for a while.`).translation[0],
        `We watched the soccer match for a while.`
      );
      done();  
    });
    
    test(`Translate Paracetamol takes up to an hour to work. to American English`, (done) => {
      assert.strictEqual(
        translator.britishToAmerican(`Paracetamol takes up to an hour to work.`).text,
        `Paracetamol takes up to an hour to work.`
      );
      assert.strictEqual(
        translator.britishToAmerican(`Paracetamol takes up to an hour to work.`).translation[0],
        `Tylenol takes up to an hour to work.`
      );
      done();  
    });
    
    test(`Translate First, caramelise the onions. to American English`, (done) => {
      assert.strictEqual(
        translator.britishToAmerican(`First, caramelise the onions.`).text,
        `First, caramelise the onions.`
      );
      assert.strictEqual(
        translator.britishToAmerican(`First, caramelise the onions.`).translation[0],
        `First, caramelize the onions.`
      );
      done(); 
    });
    
    test(`Translate I spent the bank holiday at the funfair. to American English`, (done) => {
      assert.strictEqual(
        translator.britishToAmerican(`I spent the bank holiday at the funfair.`).text,
        `I spent the bank holiday at the funfair.`
      );
      assert.strictEqual(
        translator.britishToAmerican(`I spent the bank holiday at the funfair.`).translation[0],
        `I spent the public holiday at the carnival.`
      );
      done(); 
    });
    
    test(`Translate I had a bicky then went to the chippy. to American English`, (done) => {
      assert.strictEqual(
        translator.britishToAmerican(`I had a bicky then went to the chippy.`).text,
        `I had a bicky then went to the chippy.`
      );
      assert.strictEqual(
        translator.britishToAmerican(`I had a bicky then went to the chippy.`).translation[0],
        `I had a cookie then went to the fish-and-chip shop.`
      );
      done(); 
    });
    
    test(`Translate I've just got bits and bobs in my bum bag. to American English`, (done) => {
      assert.strictEqual(
        translator.britishToAmerican(`I've just got bits and bobs in my bum bag.`).text,
        `I've just got bits and bobs in my bum bag.`
      );
      assert.strictEqual(
        translator.britishToAmerican(`I've just got bits and bobs in my bum bag.`).translation[0],
        `I've just got odds and ends in my fanny pack.`
      );
      done(); 
    });
    
    test(`Translate The car boot sale at Boxted Airfield was called off. to American English`, (done) => {
      assert.strictEqual(
        translator.britishToAmerican(`The car boot sale at Boxted Airfield was called off.`).text,
        `The car boot sale at Boxted Airfield was called off.`
      );
      assert.strictEqual(
        translator.britishToAmerican(`The car boot sale at Boxted Airfield was called off.`).translation[0],
        `The swap meet at Boxted Airfield was called off.`
      );
      done(); 
    });
    
    test(`Translate Have you met Mrs Kalyani? to American English`, (done) => {
      assert.strictEqual(
        translator.britishToAmerican(`Have you met Mrs Kalyani?`).text,
        `Have you met Mrs Kalyani?`
      );
      assert.strictEqual(
        translator.britishToAmerican(`Have you met Mrs Kalyani?`).translation[0],
        `Have you met Mrs. Kalyani?`
      );
      done(); 
    });
    
    test(`Translate Prof Joyner of King's College, London. to American English`, (done) => {
      assert.strictEqual(
        translator.britishToAmerican(`Prof Joyner of King's College, London.`).text,
        `Prof Joyner of King's College, London.`
      );
      assert.strictEqual(
        translator.britishToAmerican(`Prof Joyner of King's College, London.`).translation[0],
        `Prof. Joyner of King's College, London.`
      );
      done(); 
    });
    
    test(`Translate Tea time is usually around 4 or 4.30. to American English`, (done) => {
      assert.strictEqual(
        translator.britishToAmerican(`Tea time is usually around 4 or 4.30.`).text,
        `Tea time is usually around 4 or 4.30.`
      );
      assert.strictEqual(
        translator.britishToAmerican(`Tea time is usually around 4 or 4.30.`).translation[0],
        `Tea time is usually around 4 or 4:30.`
      );
      done(); 
    });

  });

  suite('Hightlighted translations', () => {
    
    test(`Highlight translation in Mangoes are my favorite fruit.`, (done) => {
      assert.strictEqual(
        translator.americanToBritish('Mangoes are my favorite fruit.').text,
        'Mangoes are my favorite fruit.'
      );
      assert.strictEqual(
        translator.americanToBritish('Mangoes are my favorite fruit.').translation[1],
        'Mangoes are my <span class="highlight">favourite</span> fruit.'
      );
      done();  
    });
    
    test(`Highlight translation in I ate yogurt for breakfast.`, (done) => {
      assert.strictEqual(
        translator.americanToBritish('I ate yogurt for breakfast.').text,
        'I ate yogurt for breakfast.'
      );
      assert.strictEqual(
        translator.americanToBritish('I ate yogurt for breakfast.').translation[1],
        'I ate <span class="highlight">yoghurt</span> for breakfast.'
      );
      done();  
    });
    
    test(`Highlight translation in We watched the footie match for a while.`, (done) => {
      assert.strictEqual(
        translator.britishToAmerican('We watched the footie match for a while.').text,
        'We watched the footie match for a while.'
      );
      assert.strictEqual(
        translator.britishToAmerican('We watched the footie match for a while.').translation[1],
        'We watched the <span class="highlight">soccer</span> match for a while.'
      );
      done();  
    });
    
    test(`Highlight translation in Paracetamol takes up to an hour to work.`, (done) => {
      assert.strictEqual(
        translator.britishToAmerican('Paracetamol takes up to an hour to work.').text,
        'Paracetamol takes up to an hour to work.'
      );
      assert.strictEqual(
        translator.britishToAmerican('Paracetamol takes up to an hour to work.').translation[1],
        '<span class="highlight">Tylenol</span> takes up to an hour to work.'
      );
      done();  
    });
    
  });
  
});
