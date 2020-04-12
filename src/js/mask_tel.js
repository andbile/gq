$(function(){
    // Инициализация маски ввода телефона
    $('input[name="tel"]').mask('+7 (999) 999-99-99');

    // очистка input (номера телефона) при нажатии на крестик
    $('[data-input-clean-tel]').on('click', function () {
        var $btn = $(this).find('input');
        $btn.val('');
    })
});