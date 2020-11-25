import $ from 'jquery'

$(function () {
	$('ul li:nth-child(odd)').css('backgroundColor', '#23a9f2')
	$('ul li:nth-child(even)').css('backgroundColor', 'pink')
})
