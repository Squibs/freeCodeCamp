# Cat Photo App

<img src="/Images/screenshots/screenshot-cat-photo-app.png" height="400" alt="Screenshot of a cat photo app built with html"/>

[Cat Photo App](https://codepen.io/Sulph/pen/qmPGwq) (Responsive Design with Bootstrap) (Click to view functional site on Code-Pen)

<em>Completed May 03, 2017</em>

Simple starting project. Many things were changed throughout the creation of this; lines were deleted or replaced multiple times. Teachings of responsive design were made as well as the basic foundations of html, css, and bootstrap were taught in this lesson/project. This was made to fit the size of a fairly small screen-sized phone. Best viewed at lower resolutions; all content scales with size, using the portrait-based editor layout on codepen.io will allow the use of a slider to see how the content reacts when space is lowered.

<img src="/Images/icons/icon-html5.png" height="60" alt="HTML5 Icon"/><img src="/Images/icons/icon-css3.png" height="60" alt="CSS3 Icon"/><img src="/Images/icons/icon-bootstrap.png" height="60" alt="Bootstrap Icon"/>

---

## My notes for these Lessons:

<b>Responsive Design with Bootstrap</b>

Notes include generalized notes abut the project as well as notes about things I have learned. I feel as though these notes are quite a bit of a mess, but I tried to clean them up for this README.

1. [CSS & CSS Classes](#css--css-classes)
2. [BootStrap](#bootstrap)
3. [Font Awesome](#font-awesome)
4. [Hexadecimal Colors](#hexadecimal-colors)


### CSS & CSS Classes

- Classes start with '.' for example `.thick-green-border { }`.
	- Apply classes to pretty much any other declared element for example `<div class="thick-green-border">`.
- Use # to stylize IDs for example `#thick-green-border { }`.
- Styles are read from top to bottom; stylings declared after previous ones will take precedence.
	- `<div class="brown-font blue-font">` Whichever class was declared second will take precedence.
- In-line styles will take precednce over CSS classes and stylings at top

Summary of precedence:
Body Element < CSS Class < Order of CSS Classes < ID Stylings < In-line Styles < !important

- `!important` Will take precedence over everything
- Padding, margins, borders:
	- Padding is the space between an element and its border.
	- Margin is the space between a border and other elements or edges.
	- Border is the space between padding and margins.

### BootStrap

This project uses BootStrap to allow for screen scaling of various elements.
- Everything is scaling for small web phones at the moment.
- Bootstrap classes for example: `text-primary, text-center, text-danger`
	- Centering, colors
- Fluid container (overall containing div with class container-fluid).
- Bootstrap grid (rows with up to 12 columns) `".col-xs-*"`

### Font Awesome

This project uses Font Awesome icons to put icons within buttons.
- Can scale icons just like text.

### Hexadecimal Colors

Hexadecimal colors and RGB colors:
- Both can create the same amount of colors:
	- #000000
		- (0-9, A-F)
		- Follows RGB, two for each eg(00.00.00)
		- 0 is the lowest while F is the highest
	- RGB(0, 0, 0);
		- Numbers rather than hexadecimal; otherwise the same
