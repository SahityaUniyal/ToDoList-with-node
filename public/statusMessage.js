const statusMessage = document.querySelector('.status-message');
// Error Message
function errorMessage(msg) {
    statusMessage.innerHTML = msg;
    statusMessage.classList.remove('hidden');
    statusMessage.classList.add('failure');
    setTimeout(() => {
        statusMessage.classList.add('hidden');
        statusMessage.classList.remove('failure');
    }, 2000);
}
// Success Message
function successMessage(msg) {
    statusMessage.innerHTML = msg;
    statusMessage.classList.remove('hidden');
    statusMessage.classList.add('success');
    setTimeout(() => {
        statusMessage.classList.add('hidden');
        statusMessage.classList.remove('success');
    }, 2000);
}