document.addEventListener('DOMContentLoaded', () => {
    let addButtons = document.getElementsByClassName('card__add');

    Array.from(addButtons).forEach(function(element) {
        element.addEventListener('click', event => {
            let result = prompt('Please enter your message');
            let self = event.target;
            if (self.tagName === 'SPAN') self = self.parentNode;
            let newItem = document.createElement('div');
            newItem.className = 'card__item';
            newItem.innerHTML = `<button class="card__left card__arrow">&lt;</button><span>${result}</span><button class="card__right card__arrow">&gt;</button>`;
            self.before(newItem);
            listenOnArrow();
            event.stopPropagation();
        });
    });

    function moveLeft(event) {
        let selfArrow = event.target;
        let selfItem = selfArrow.parentNode;
        let parentCard = selfItem.parentNode;
        let leftCard = parentCard.previousElementSibling;
        let leftCardLast = leftCard.lastElementChild;
        parentCard.removeChild(selfItem);
        leftCardLast.before(selfItem);
        event.stopPropagation();
    }

    function moveRight(event) {
        let selfArrow = event.target;
        let selfItem = selfArrow.parentNode;
        let parentCard = selfItem.parentNode;
        let rightCard = parentCard.nextElementSibling;
        let rightCardLast = rightCard.lastElementChild;
        parentCard.removeChild(selfItem);
        rightCardLast.before(selfItem);
        event.stopPropagation();
    }

    function listenOnArrow() {
        let leftArrows = document.getElementsByClassName('card__left');
        let rightArrows = document.getElementsByClassName('card__right');
        Array.from(leftArrows).forEach(function(element) {
            element.removeEventListener('click', moveLeft);
            element.addEventListener('click', moveLeft);
        });

        Array.from(rightArrows).forEach(function(element) {
            element.removeEventListener('click', moveRight);
            element.addEventListener('click', moveRight);
        });
    }

    listenOnArrow();
});
