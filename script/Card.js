import { openPopup } from './utils.js';

export default class Card {
    constructor(name, link, selector, wrapper) {
        this._name = name;
        this._link = link;
        this._selector = selector;
        this._wrapper = document.querySelector(wrapper);
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._selector)
        .content
        .querySelector('.photo-card')
        .cloneNode(true);

        return cardElement;
    }

    _openModal(name, link) {
        const popupImage = document.querySelector('.popup.popup-image');
        const popupOpenImage = document.querySelector('.popup-image__image');
        const popupCaption = document.querySelector('.popup-image__caption');

        popupOpenImage.src = link;
        popupCaption.textContent = name;
        openPopup(popupImage);
    }

    generateCard() {
        const element = this._getTemplate();

        const image = element.querySelector('.photo-card__image');
        image.src = this._link;

        image.addEventListener('click', (event) => {
            this._openModal(this._name, this._link);
        });

        element.querySelector('.photo-card__title').textContent = this._name;

        const btnLike = element.querySelector('.photo-card__btn-like');

        // Меняем класс у лайка при нажатии
        btnLike.addEventListener('click', (event) => {
            event.target.classList.toggle('photo-card__btn-like_active');
        });

        const btnTrash = element.querySelector('.photo-card__btn-remove');

        // Удаляем айтем карточки из шаблона, при клике на btnTrash
        btnTrash.addEventListener('click', (event) => {
            this._wrapper.removeChild(element);
        });

        return element;
    }

    addToEnd(element) {
        this._wrapper.append(element);
    }

    addToStart(element) {
        this._wrapper.prepend(element);
    }
}
