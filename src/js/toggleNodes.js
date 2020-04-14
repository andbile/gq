(function () {
    // переключение узлов (показ/скрытие)

    // родительский узел
    var $parentNode = $('[data-toggle-nodes]');
    if($parentNode.length === 0) return;

    // атрибуты
    var attributeId = 'data-so-menu-target-id';
    var attributeCurrentNode = 'data-so-menu-show';

    // кнопки
    var $btns = $parentNode.find('[data-btn]');

    $btns.on('mouseover', function () {
        toggleNode($(event.target));
    });

    function toggleNode($btn) {

        if(!$btn.is('[' + attributeId + ']')) return;

        // id кнопки
        var id = $btn.attr('data-so-menu-target-id');

        // поиск узла с указанным ID
        var $requiredNode = $parentNode.find('[' + attributeCurrentNode + '="' + id + '"]');
        console.log($requiredNode);

        // поиск текущего активного узла и ссылки (li > a)
        var $currentNode = $parentNode.find('.si-services-offers-items--active');
        var $currentLink = $parentNode.find('.si-services-offers__btn--active');

        console.log($currentNode);

        console.log($currentLink);

        // прячем текущий показанный узел, отображаем окно
        showNode($currentLink, $currentNode, $requiredNode, $btn);

    }

    function showNode($currentLink, $currentNode, $requiredNode, $btn) {
        // прячем текущий узел
        $currentNode.removeClass('si-services-offers-items--active');
        $currentNode.removeClass('si-services-opacity');
        $currentLink.removeClass('si-services-offers__btn--active');

        // показываем новый
        $btn.addClass('si-services-offers__btn--active');
        $requiredNode.addClass('si-services-offers-items--active');
        setTimeout(function () {
            $requiredNode.addClass('si-services-opacity');
        }, 100);

    }

})();


