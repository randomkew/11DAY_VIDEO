const player=document.querySelector('.player');
const video=player.querySelector('.viewer'); 
const progress=player.querySelector('.progress');
const progressBar=player.querySelector('.progress__filled'); 
const toggle=player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges=player.querySelectorAll('.player__slider');

function toggleplay() {
    const method=video.paused ? 'play':'pause';
    video[method]();
    /*
    if(video.paused){
        video.play();
    } else{
        video.pause();
    }
    */
}
function updateButton() {
    const icon=this.paused ? '►':'❚ ❚';
    console.log('Update the button');
    toggle.textContent=icon;
}
function skip() {
    
    video.currentTime+=parseFloat(this.dataset.skip);
}
function handleRange() {
    video[this.name]=this.value;
   
}
function handleprogress() {
    const percent=(video.currentTime/video.duration)*100;
    progressBar.style.flexBasis=`${percent}%`;
}
function scrub(e) {
    const scrubTime=(e.offsetX/progress.offsetWidth)*video.duration;
    video.currentTime=scrubTime;
    console.log(e);
}
video.addEventListener('click',toggleplay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleprogress);

toggle.addEventListener('click',toggleplay);
ranges.forEach(range =>range.addEventListener('click', handleRange));
ranges.forEach(range =>range.addEventListener('mousemove', handleRange));

let mousedown=false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove', (e)=>mousedown&&scrub(e));
progress.addEventListener('mousedown', ()=>mousedown=true);
progress.addEventListener('mouseup', ()=>mousedown=false);

skipButtons.forEach(button => button.addEventListener('click', skip));