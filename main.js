const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const carousel = $('.carousel');
firstImg = carousel.querySelectorAll('img')[0];
arrowIcons = $$('.icon');

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;


const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    // if(carousel.scrollLeft == 0){                        (Cách viết đầy đủ)
    //     arrowIcons[0].style.display = "none";
    // }else{
    //     arrowIcons[0].style.display = "block";
    // }; 
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
    // if(carousel.scrollLeft == scrollWidth){
    //     arrowIcons[1].style.display = "none";
    // }else{
    //     arrowIcons[1].style.display = "block";
    // }
}

arrowIcons.forEach(icon => {
    let firstImgWidth = firstImg.clientWidth + 14; //getting first img width & adding 14 margin value
    icon.onclick = (() => {
        if(icon.id == "left"){
            carousel.scrollLeft -= firstImgWidth;
        }else {
            carousel.scrollLeft += firstImgWidth;
        }
        setTimeout(() => showHideIcons(), 60);
    });
});

const autoSlide = () => { //img ở ngay giữa khi di chuyển
    if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;

    positionDiff = Math.abs(positionDiff); //Giá trị của positionDiff thành dương
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft){ //Khi dịch sang phải
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
        // if(positionDiff > firstImgWidth / 3){ 
        //     return carousel.scrollLeft += valDifference;
        // }else{
        //     return carousel.scrollLeft -= positionDiff;
        // }
    } 
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;// Khi dịch sang trái
}

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add('dragging');
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove('dragging');

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);

