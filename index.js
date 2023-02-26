const aboutButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const CloseButton = popup.querySelector('.popup__close');

function toggleOpenPopup() {
    popup.classList.toggle('popup_opened');
}

function handleAboutButtonClick() {
    toggleOpenPopup();
}

function handleCloseButtonClick() {
    toggleOpenPopup();
}

function handleOverlyClick(event) {
    console.log(event);
    if(event.target === event.currentTarget) {
    toggleOpenPopup();
}
}

aboutButton.addEventListener('click', handleAboutButtonClick);
CloseButton.addEventListener('click', handleCloseButtonClick);
popup.addEventListener('click', handleOverlyClick);


const formElement = popup.querySelector('.form');
const fieldNameInput = formElement.querySelector('.popup__field-name');
const fieldDescriptionInput = formElement.querySelector('.popup__field-description');


console.log(formElement);
console.log(fieldNameInput);
console.log(fieldDescriptionInput);

function handleFormSubmit (evt) {
    evt.preventDefault();
    
}


