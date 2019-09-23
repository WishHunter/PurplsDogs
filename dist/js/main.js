var order_user = {
	subscription: {
		name: '',
		price: '',
	},
	poochInfo: {
		name: 'dog',
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
		  $('.shipping-details__input-name').removeClass('input-alert');
		  order_user_output()
		},
		onincomplete: function() {
		  order_user.userInfo.name = '';
		},
		definitions: {
      'a': {
        validator: "[A-Za-zА-Яа-я ]",
      }
    }
	});

	$('.shipping-details__input-email').inputmask({ 
		alias: "email",
		showMaskOnHover: false,
		showMaskOnFocus: false,
		oncomplete: function() {
		  order_user.userInfo.email = $('.shipping-details__input-email').val();
		  $('.shipping-details__input-email').removeClass('input-alert');
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
		  $('.shipping-details__input-city').removeClass('input-alert');
		  order_user_output()
		},
		onincomplete: function() {
		  order_user.userInfo.city = '';
		},
		definitions: {
      'a': {
        validator: "[A-Za-zА-Яа-я .\-]",
      }
    }
	});
	// $('.shipping-details__input-state').inputmask({
	// 	mask: "a{2,40}", 
	// 	showMaskOnHover: false,
	// 	showMaskOnFocus: false,
	// 	oncomplete: function() {
	// 	  order_user.userInfo.state = $('.shipping-details__input-state').val();
	// 	  $('.shipping-details__input-state').removeClass('input-alert');
	// 	  order_user_output()
	// 	},
	// 	onincomplete: function() {
	// 	  order_user.userInfo.state = '';
	// 	},
	// 	definitions: {
 //      'a': {
 //        validator: "[A-Za-zА-Яа-я ]",
 //      }
 //    }
	// });
	$('.shipping-details__input-zip').inputmask({
		mask: "9{2,10}", 
		showMaskOnHover: false,
		showMaskOnFocus: false,
		oncomplete: function() {
		  order_user.userInfo.zip = $('.shipping-details__input-zip').val();
		  $('.shipping-details__input-zip').removeClass('input-alert');
		  order_user_output()
		},
		onincomplete: function() {
		  order_user.userInfo.zip = '';
		},
	});


	$('.check-out__btn').on('click', function(e) {
		e.preventDefault();
		var form = $(this).parents('form').attr('id');
		var action = $('#' + form).attr('action');
		var method = $('#' + form).attr('method');
		$('[name = subscription__name]').val(order_user.subscription.name);

		for (var key in order_user.poochInfo) {
			if (order_user.poochInfo[key] == '' || order_user.poochInfo[key] == 'dog') {
				$('[name = poochInfo__' + key + ']').addClass('input-alert');
				$('body,html').animate({scrollTop: ($('.input-alert').parent().offset().top - 150)}, 1500);
				return;
			};
		};
		for (var key in order_user.userInfo) {
			if (order_user.userInfo[key] == '') {
				$('[name = userInfo__' + key + ']').addClass('input-alert');
				$('body,html').animate({scrollTop: ($('.input-alert').parent().offset().top - 150)}, 1500);
				return;
			};
		}
		sendAjaxForm(form, action, method);
	});


	$('.next-page').on('click', function(e) {
		e.preventDefault();
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

	$('input, select').on('change', function(e) {
		if ($(this).hasClass('custom_validation')) {
			return;		
		};
		var name_input = $(this).attr('name');
		order_user[name_input.split('__')[0]][name_input.split('__')[1]] = $(this).val();
		$(this).removeClass('input-alert');
		order_user_output();
	});


	$('.dropdawn__input').on('focus', function() {
		$(this).next('.dropdawn__lists').slideDown();
	});
	$('.dropdawn__input').on('blur', function() {
		$(this).next('.dropdawn__lists').slideUp();
		var value = $(this).val();
		var input = $(this);
		for (state of states) {
			if (state.toLowerCase() === value.toLowerCase()) {
				var name_input = input.attr('name');
				order_user[name_input.split('__')[0]][name_input.split('__')[1]] = state;
				input.removeClass('input-alert');
				order_user_output();
				break;
			}
		};
	});

	$('.dropdawn__input').on('keyup', function() {
		var value = $(this).val();
		var new_states = states.filter(function(item, index, array) {
			if (item.toLowerCase().indexOf(value.toLowerCase()) === -1) {
				return false;
			}
			return true;
		})
		states_dropdawn_add($('.dropdawn__lists'), new_states);
	});


	document.addEventListener('click', function(event) {
		if (event.target.className === 'dropdawn__list') {
			var input = $(event.target).parents('.dropdawn').find('.dropdawn__input');
			input.off('focus');
			input.val($(event.target).html());
			setTimeout(function() {
				input.blur();
				input.on('focus', function() {
					$(this).next('.dropdawn__lists').slideDown();
				});
			});
		};		
	});
});

















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
};

function shablon_checklist(name, price) {
	return '<li class="check-out__checkline checkline" data-name="' + name + '"><p class="checkline__name">' + name + '</p><p class="checkline__price">' + price + '</p></li>';
};


$.getScript("js/USA_states.js", function(){
	states_dropdawn_add($('.dropdawn__lists'), states);
});


function states_dropdawn_add(elem, arr) {
	elem.html('');
	arr.forEach(function(item) {
		elem.append('<li class="dropdawn__list">' + item + '</li>');
	})
}

function sendAjaxForm(ajax_form, url, method) {
  $.ajax({
		url:     url, //url страницы (action_ajax_form.php)
		type:     method, //метод отправки
		dataType: "html", //формат данных
		data: $("#"+ajax_form).serialize(),  // Сеарилизуем объект
		success: function(response) { //Данные отправлены успешно
			console.log('Данные успешно отправленны');
			console.log(response);
			$('.page').hide();
			$('.success-page').fadeIn();
  	},
  	error: function(response) { // Данные не отправлены
			console.log('Ошибка. Данные не отправлены.');
  	}
 	});
}