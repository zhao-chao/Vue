import $ from 'jquery'

$(function () {
	$('ul li:nth-child(odd)').css('backgroundColor', 'red')
	$('ul li:nth-child(even)').css('backgroundColor', 'pink')
})
