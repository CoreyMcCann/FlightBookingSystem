
document.addEventListener('DOMContentLoaded', function () {
    const oneWayButton = document.querySelector('.btn-group .btn:first-child');
    const returnTripButton = document.querySelector('.btn-group .btn:last-child');
    const returnField = document.getElementById('return');

    oneWayButton.addEventListener('click', () => {
        returnField.disabled = true;
        oneWayButton.classList.add('active');
        returnTripButton.classList.remove('active');
    });

    returnTripButton.addEventListener('click', () => {
        returnField.disabled = false;
        returnTripButton.classList.add('active');
        oneWayButton.classList.remove('active');
    });
});
