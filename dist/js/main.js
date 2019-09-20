var order_user = {
	subscription: {
		name: '',
		price: '',
	},
	poochInfo: {
		name: '',
		size: '',
		boxType: 'false',
		extraToy: 'false'
	},
	userInfo: {
		name: '',
		email: '',
		street: '',
		city: '',
		state: '',
		zip: ''
	},
	totalPrice: function() {
		var total = Number(this['subscription']['price'].replace('$', ''));
		if (this['poochInfo']['extraToy'] === 'true') {
			total += 8;
		}
		return '$' + total;
	}
};


$(document).ready(function() {
	subscription_active();

	$('.shipping-details__input-name').inputmask({
		mask: "a{2,40}", 
		showMaskOnHover: false,
		showMaskOnFocus: false,
		oncomplete: function() {
		  order_user.userInfo.name = $('.shipping-details__input-name').val();
		  order_user_output()
		},
		onincomplete: function() {
		  order_user.userInfo.name = '';
		},
		definitions: {
      'a': {
        validator: "[A-Za-zА-Яа-я ]",
        casing: "lower"
      }
    }
	});

	$('.shipping-details__input-email').inputmask({ 
		alias: "email",
		showMaskOnHover: false,
		showMaskOnFocus: false,
		oncomplete: function() {
		  order_user.userInfo.email = $('.shipping-details__input-email').val();
		  order_user_output()
		},
		onincomplete: function() {
		  order_user.userInfo.email = '';
		},
	});
	$('.shipping-details__input-city').inputmask({
		mask: "a{2,40}", 
		showMaskOnHover: false,
		showMaskOnFocus: false,
		oncomplete: function() {
		  order_user.userInfo.city = $('.shipping-details__input-city').val();
		  order_user_output()
		},
		onincomplete: function() {
		  order_user.userInfo.city = '';
		},
		definitions: {
      'a': {
        validator: "[A-Za-zА-Яа-я .\-]",
        casing: "lower"
      }
    }
	});
	$('.shipping-details__input-zip').inputmask({
		mask: "9{2,10}", 
		showMaskOnHover: false,
		showMaskOnFocus: false,
		oncomplete: function() {
		  order_user.userInfo.zip = $('.shipping-details__input-zip').val();
		  order_user_output()
		},
		onincomplete: function() {
		  order_user.userInfo.zip = '';
		},
	});


	$('.next-page').on('click', function(e) {
		e.preventDefault();
		if ($(this).hasClass("next-page__disabled")) {
			return;
		}
		$(this).parents('.page').hide();
		$($(this).attr('href')).fadeIn();
		$(document).scrollTop(0);
	});

	$('.subscription-option').on('click', function(e) {
		e.preventDefault();
		$('.subscription-option_active').removeClass('subscription-option_active')
		$(this).addClass('subscription-option_active');
		subscription_active();
	});

	$('input').on('change', function(e) {
		if ($(this).hasClass('custom_validation')) {
			return;		
		};
		var name_input = $(this).attr('name');
		order_user[name_input.split('__')[0]][name_input.split('__')[1]] = $(this).val();
		order_user_output();
	});
	$('select').on('change', function(e) {
		var name_input = $(this).attr('name');
		order_user[name_input.split('__')[0]][name_input.split('__')[1]] = $(this).val();
		order_user_output();
	});

	document.querySelector('.check-out__checklist').addEventListener('click', function(event) {
		if (!event.target.classList.contains('checkline__delete')) {
			return;
		};
	})








	function subscription_active() {
		order_user.subscription.name = $('.subscription-option_active').find('.subscription-option__name').html();
		order_user.subscription.price = $('.subscription-option_active').find('.subscription-option__price').html().replace('*', '');
		order_user_output();
	};

	function order_user_output() {
		var html_code = shablon_checklist(order_user.subscription.name, order_user.subscription.price);
		if (order_user.poochInfo.extraToy === 'true') {
			html_code += shablon_checklist('Extra toy', '$8');
		};
		html_code += shablon_checklist('Shipping', 'FREE');

		$('.js__name-dog').html(order_user.poochInfo.name);
		$('.check-out__checklist').html(html_code);
		$('.checktext__name').html(order_user.userInfo.name);
		$('.checktext__address').html(order_user.userInfo.street);
		$('.checktext__address-over').html(order_user.userInfo.city + ' ' + order_user.userInfo.state + ' ' + order_user.userInfo.zip);
		$('.js__total-price').html(order_user.totalPrice());

		if (order_user.poochInfo.name === '' || 
			  order_user.poochInfo.size === '' || 
			  order_user.userInfo.name === '' || 
			  order_user.userInfo.email === '' || 
			  order_user.userInfo.street === '' || 
			  order_user.userInfo.city === '' || 
			  order_user.userInfo.state === '' || 
			  order_user.userInfo.zip === '') {
			$('.check-out__btn').addClass('next-page__disabled');
			return;
		}
		console.log(order_user);
		$('.check-out__btn').removeClass('next-page__disabled');
	};

	function shablon_checklist(name, price) {
		return '<li class="check-out__checkline checkline" data-name="' + name + '"><p class="checkline__name">' + name + '</p><p class="checkline__price">' + price + '</p></li>';
	};


	$.getScript("js/USA_states.js", function(){
		console.log("Загружено.");
		states_select_add($('.shipping-details__input-state'), states);
	});


	function states_select_add(elem, arr) {
		arr.forEach(function(item) {
			elem.append('<option name="' + item + '">' + item + '</option>');
		})
	}
});