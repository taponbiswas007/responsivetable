$(document).ready(function() {
    function enableScrollEffect($element) {
        var $scrollGradientLeft = $element.siblings('.scroll-gradient.left');
        var $scrollGradientRight = $element.siblings('.scroll-gradient.right');

        function updateScrollEffect() {
            var scrollLeft = $element.scrollLeft();
            var maxScrollLeft = $element[0].scrollWidth - $element.outerWidth();

            if (scrollLeft === 0) {
                $scrollGradientLeft.css('opacity', 0);
            } else {
                $scrollGradientLeft.css('opacity', 1);
            }

            if (scrollLeft >= maxScrollLeft - 1) { // Use a small tolerance for Chrome
                $scrollGradientRight.css('opacity', 0);
            } else {
                $scrollGradientRight.css('opacity', 1);
            }
        }

        let isScrolling = false;
        let startX, scrollLeft;

        $element.on('mousedown touchstart', function(e) {
            // Allow default behavior for input fields and buttons
            if ($(e.target).is('input, textarea, select, button')) {
                return true;
            }

            isScrolling = true;
            startX = e.pageX || e.originalEvent.touches[0].pageX;
            scrollLeft = $element.scrollLeft();
            $element.addClass('scrolling'); // Optional: Add a class for visual feedback

            $(document).on('mousemove touchmove', function(e) {
                if (!isScrolling) return;
                const x = e.pageX || e.originalEvent.touches[0].pageX;
                const walk = (startX - x) * 2; // Adjust the scroll speed as needed
                $element.scrollLeft(scrollLeft + walk);
                updateScrollEffect();
            });

            $(document).on('mouseup touchend', function() {
                isScrolling = false;
                $(document).off('mousemove touchmove');
                $(document).off('mouseup touchend');
                $element.removeClass('scrolling'); // Optional: Remove the class for visual feedback
            });

            return false;
        });

        $element.on('scroll', function() {
            updateScrollEffect();
        });

        // Initial call to set the correct state
        updateScrollEffect();
    }

    // Apply the scroll effect to each .details-main-area
    $('.details-main-area').each(function() {
        enableScrollEffect($(this));
    });
});
