const cookie = document.getElementById('cookie');
const cookieBtn = document.querySelector('.cookie__btn');

fadeInCookie();
function fadeInCookie(opacity = 0){
    setInterval(()=>{
        const intervalId = setInterval(() => {
            opacity += 0.1
            if(opacity>0.7){
                clearInterval(intervalId);
                return;
            }
            cookie.style.opacity = opacity.toFixed(1);
        },100);
    }, 1500);
}

cookieBtn.addEventListener('click', (event) => {
    cookie.style.display = 'none';
    event.preventDefault();
});

//Если поля формы пустые
const btnForm = document.querySelector('.form__btn');
btnForm.addEventListener('click', (event) => {
    const form = document.querySelector('.form');
    form.classList.add("error");
});