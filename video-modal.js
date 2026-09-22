// Open portfolio videos in a pop-up player
(function () {
    var modal = document.getElementById('videoModal');
    var frame = modal.querySelector('.video-modal-frame');
    var title = modal.querySelector('.video-modal-title');
    var lastTrigger = null;

    function open(card) {
        lastTrigger = card;
        frame.innerHTML = '<iframe src="' + card.dataset.video + '" title="' + card.dataset.title +
            '" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
        title.textContent = card.dataset.title;
        modal.hidden = false;
        document.body.classList.add('modal-open-video');
        requestAnimationFrame(function () { modal.classList.add('is-open'); });
        modal.querySelector('.video-modal-close').focus();
    }

    function close() {
        modal.classList.remove('is-open');
        document.body.classList.remove('modal-open-video');
        setTimeout(function () {
            modal.hidden = true;
            frame.innerHTML = ''; // stops playback
        }, 250);
        if (lastTrigger) lastTrigger.focus();
    }

    document.querySelectorAll('.video-card').forEach(function (card) {
        card.addEventListener('click', function () { open(card); });
    });

    modal.querySelectorAll('[data-close]').forEach(function (el) {
        el.addEventListener('click', close);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modal.hidden) close();
    });
})();
