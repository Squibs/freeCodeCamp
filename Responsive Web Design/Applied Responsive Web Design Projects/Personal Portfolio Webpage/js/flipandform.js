// Flip Cards
function rotateCard(btn){
	var $card = $(btn).closest('.card-container');

	// console.log($card);

	if($card.hasClass('hover')){
		$card.removeClass('hover');
	} else {
		$card.addClass('hover');
	}
}

// Form Floating Label
$('input, textarea').on('focus blur', function (e) {
	$(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
}).trigger('blur');

var contactform = document.getElementById('form');
contactform.setAttribute('action', 'https://formspree.io/' + 'zachary.r.holman+myportfolio.formspree' + '@' + 'gmail' + '.' + 'com');

// Navbar background color based on section
var top1 = $('#home').offset().top - 56;
var top2 = $('#about').offset().top - 56;
var top3 = $('#projects').offset().top - 56;
var top4 = $('#contact').offset().top - 56;

$(document).scroll(function() {
	if ($(document).scrollTop() >= top1 && $(document).scrollTop() < top2) {
		$('#navbar').css('background-color', '#DAF1FF');
		$('#navbar').removeClass("navbar-inverse");
	} else if ($(document).scrollTop() >= top2 && $(document).scrollTop() < top3) {
		$('#navbar').css('background-color', '#165F88');
		$('#navbar').addClass("navbar-inverse");
	} else if ($(document).scrollTop() >= top3 && $(document).scrollTop() < top4) {
		$('#navbar').css('background-color', '#2581B2');
		$('#navbar').addClass("navbar-inverse");
	} else if ($(document).scrollTop() >= top4) {
		$('#navbar').css('background-color', '#3696C9');
		$('#navbar').addClass("navbar-inverse");
	}
});