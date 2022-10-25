# jQuery Playground

<img src="/Images/screenshots/screenshot-jquery-playground.png" height="400" alt="Screenshot of jQuery Playground html and jQuery source code."/>

# [jQuery Playground](https://codepen.io/Sulph/pen/aWEyaK) (Click to view functional site on Code-Pen)

<em>Completed May 04, 2017</em>

A playground used in several freeCodeCamp challenges teaching about how to use various jQuery commands. While this is not very much of a project to show off, I believe it is a good thing to recognize a simple project that allows you to test the many functions of jQuery. View project-notes.txt for notes on various commands that can be used with this.

<img src="/Images/icons/icon-jquery.png" height="60" alt="jQuery Icon"/><img src="/Images/icons/icon-javascript.png" height="50" alt="JavaScript Icon"/>

---

## My notes for these lessons:

<b>jQuery playground</b>

1. [Basic Notes](#basic-notes)
2. [jQuery Functions](jquery-functions)
3. [More Notes](#more-notes)

### Basic Notes

- jQuery is the most popular JavaScript tool of all time.
- All jQuery is done outside of HTML; in the head, or a separate JavaScript file 
- Code put inside a document.ready function will run as soon as your browser has loaded your page.
	- Without the document ready function the code may run before your HTML is rendered which could cause bugs
- All jQuery functions start with $ (dollar sign operator, bling)
- `$("STRING")` is a selector; `.addClass("animated bounce");` is adding a css class to the selected
	- animated and bounce are both different classes in jQuery's library
		- an example line would read: `$("STRING").addClass("animated bounce");`
	- Some ways to target various HTML elements:
		- `$("button")` select by type
		- `$(".btn")` select by class
		- `$("#target1")` select by ID

### jQuery Functions

Several jQuery functions are (ways to manipulate html):
 - `.addClass()` Add a class to the target.
 - `.removeClass()` Remove a class from the target.
 - `.css()` Edit CSS of the target.
 	- For example `.css("background-color", "blue");` can be used to change the background-color to blue.
 - `.prop()` Edit the properties of the target.
 - `.html()` Add HTML tags and text within an element.
 - `.text()` Alters text only; won't evaluate HTML tags passed to it.
 - `.remove()` Removes an element.
 - `.appendTo()` Moves an element to another element.
 - `.clone()` Clones an element.
 - `.parent()` Access the parent of an element that is selected.
 	- For example `$("#target1").parent().css("background-color", "red");` can be used to change the background-color of the target1 id's parent's background-color to red.
 - `.children()` Access a child of an element that is selected.

### More Notes

Function chaining allows you to combine jQuery functions. For example:
- For example: `$("target5").clone().appendTo("#left-well");` Uses both the `.clone()` and `.appendTo()` methods.

jQuery can use CSS Selectors to target elements:
- `target:nth-child(n)`
	- `$(".target:nth-child(3)").addClass("animated bounce");` Targets the 3rd child of the target and adds the classes "animated" and "bounce".
- `.target:odd` Selects odd-numbered elements
	- jQuery is zero-indexed, meaning that, counter-intuitively, `:odd` selects the second, fourth and so on elements (index: 1, 3, 5...).
- `target:even` Selects even-numbered elements (index: 0, 2, 4...).
