$(document).ready(function () {

	//menu
	$('.header__burger').click(function (event) {
		$('.header__burger,.header__menu').toggleClass('active')
		$('body').toggleClass('lock')
	})

	$('.header__list a').click(function () {
		$('.header__burger,.header__menu').removeClass('active')
		$('body').removeClass('lock')
	})
	//menu

	// smooth scroll
	$(function () {
		$('a[href*=\\#]').click(function () {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
				&& location.hostname == this.hostname) {
				let $target = $(this.hash)
				$target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']')
				if ($target.length) {
					let targetOffset = $target.offset().top - $('.header').outerHeight(true)
					$('html,body').animate({scrollTop: targetOffset}, 1000)
					return false
				}
			}
		})
	})

	$(window).scroll(function () {
		if ($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn()
		} else {
			$('.pageup').fadeOut()
		}
	})

	$('a[href*=\\#up]').click(function () {
		const _href = $(this).attr('href')
		$('html, body').animate({scrollTop: 0})
		return false
	})
	// smooth scroll

	$('.review__slick').slick({
		infinite: true,
		slidesToShow: 1,
		dots: true,
		adaptiveHeight: true,
		prevArrow: `<button type="button" class="slick-prev">
									<img src="../images/dest/left-arrow.svg" alt="">
								</button>`,
		nextArrow: `<button type="button" class="slick-next">
									<img src="../images/dest/right-arrow.svg" alt="">
								</button>`,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					arrows: false,
				},
			},
		],
	})

	$('.work__slick').slick({
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		arrows: false,
		dots: true,
		adaptiveHeight: true,
	})

	$('.sale__slick').slick({
		centerMode: true,
		infinite: true,
		slidesToShow: 3,
		arrows: false,
		responsive: [
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	})

	//price section tabs
	$('ul.tabs__caption').each(function (i) {
		var storage = localStorage.getItem('tab' + i)
		if (storage) {
			$(this).find('li').removeClass('active').eq(storage).addClass('active')
				.closest('div.tabs').find('div.tabs__content').removeClass('active').eq(storage).addClass('active')
		}
	})

	$('ul.tabs__caption').on('click', 'li:not(.active)', function () {
		$(this)
			.addClass('active').siblings().removeClass('active')
			.closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active')
		var ulIndex = $('ul.tabs__caption').index($(this).parents('ul.tabs__caption'))
		localStorage.removeItem('tab' + ulIndex)
		localStorage.setItem('tab' + ulIndex, $(this).index())
	})
	//price section tabs

	//accordion
	const acc = document.getElementsByClassName('accordion')
	let i

	for (i = 0; i < acc.length; i++) {
		acc[i].addEventListener('click', function () {
			this.classList.toggle('active')
			const panel = this.nextElementSibling
			if (panel.style.maxHeight) {
				panel.style.maxHeight = null
			} else {
				panel.style.maxHeight = panel.scrollHeight + 'px'
			}
		})
	}
	//accordion

	//validate
	function validateForms(form) {
		$(form).validate({
			rules: {
				name: 'required',
				tel: 'required',
			},
			messages: {
				name: 'Введите имя',
				tel: 'Введите номер телефона',
			},
			submitHandler: function (form) {
				$.ajax({
					url: 'mailer/smart-tg.php',
					type: 'POST',
					data: $(form).serialize(),
					success: function () {
						$(form).find('input').val('')
						$(form).find('.form__thanks').fadeIn('slow').delay(3000).fadeOut('slow')
						$(form).trigger('reset')
					},
				})
			},
		})
	}

	validateForms('.banner__form')
	validateForms('.order__form')
	//validate

	// phone mask
	$('input[name=tel]').mask('+7 (999) 999-99-99')

	//map lazy load
	YaMapsShown = false

	$(window).scroll(function () {
		if (!YaMapsShown) {
			if ($(window).scrollTop() + $(window).height() > $(document).height() - 700) {
				showYaMaps()
				YaMapsShown = true
			}
		}
	})

	function showYaMaps() {
		let script = document.createElement('script')
		script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A12ca48068a17adc562824955254555ac63f8a2978d264c47b747ddb563542137&amp;width=100%25&amp;height=720&amp;lang=ru_RU&amp;scroll=false'
		document.getElementById('YaMaps').appendChild(script)
	}

})