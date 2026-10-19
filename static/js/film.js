
function dec () {
    const verticalScrollPosition = window.pageYOffset;  
    if (verticalScrollPosition >= 400) {
        const logo = document.querySelector('.logo2');
        for (let i = 0; i < logo.length; i++) {
            logo[i].style.width = '40%';

        }
    }
}

function startCh() {  
    let ch = setInterval(() => {
            dec();
        }, 300);
}

startCh();
