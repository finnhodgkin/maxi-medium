// ******************************************************
// LOGIN DIALOG TOGGLE
// ******************************************************
[ document.getElementById('js-login-link'),
  document.getElementById('js-new-story-link'),
  document.getElementById('js-dialog-close-btn') ]
    .forEach(element => element && element.addEventListener('click',
      (e) => toggleModalDisplay(e, document.getElementById('js-overlay'))));

function toggleModalDisplay(e, overlayDOM) {
  e.preventDefault();
  overlayDOM.classList.toggle('overlay-active');
}

// ******************************************************
// NAVBAR USER POPOVER
// ******************************************************
const userAvatarDOM = document.getElementById('js-user-avatar');

userAvatarDOM && userAvatarDOM.addEventListener('click',
    (e) => toggleUserPopover(e, document.getElementById('js-navbar-popover')));

function toggleUserPopover(e, navbarPopoverDOM) {
  e.preventDefault();
  navbarPopoverDOM.classList.toggle('navbar__user-popover--active');
}
