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
// LOGIN FORM VALIDATION
// ******************************************************
[document.getElementById('js-login-form'), document.getElementById('js-register-form')]
  .forEach(form => form && form.addEventListener('submit', handleAuthSubmit));


function handleAuthSubmit(e) {
  const formData = getFormValues(Array.from(e.target.childNodes));
  if (isPasswordValid(formData.password)) {
    if (formData.confirmedPassword && (formData.confirmedPassword !== formData.password)) {
      e.preventDefault();
      return renderAuthError('js-auth-error', 'Passwords did not match', this);
    } else {
      return;
    }
  } else {

    e.preventDefault();
    renderAuthError('js-auth-error', 'Password must include at least 1 number', this);
  }
}


function renderAuthError(id, message, context = document) {
  context.querySelector(`#${id}`).textContent = message;
}


function getFormValues(formChildren) {
  const formData = {};

  formChildren
    .filter(isInput)
    .forEach(element => {
      switch (element.name) {
        case 'username':
          formData.username = element.value;
          break;
        case 'password':
          formData.password = element.value;
          break;
        case 'confirmed-password':
          formData.confirmedPassword = element.value;
          break;
      }
    });

  return formData;
}


function isInput(element) {
  return element.nodeName === 'INPUT';
}


function isPasswordValid(password) {
  return /[0-9]/.test(password);
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
