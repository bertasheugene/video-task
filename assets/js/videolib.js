export default class Videolib{

    constructor(){
        this.render();

        this.popupVideo = document.querySelector('.video-popup');
        this.popupVideoWrapper = document.querySelector('.video-popup__wrapper');
        this.popupVideoiFrame = document.querySelector('.video-popup__iframe');
        this.buttonPlay = document.querySelectorAll('.video-button');
        this.buttonClose = document.querySelector('.video-popup__close');

        this.openModalFunction = (e) => this.openModal(e);
        this.closeModalFunction = () => this.closeModal();
        this.closeModalKeypressFunction =  (e) => this.closeModalKeypress(e);

    }

    init(){

        for (var i = 0; i < this.buttonPlay.length; i++) {
            this.buttonPlay[i].addEventListener('click', this.openModalFunction);
        }

        this.buttonClose.addEventListener('click', this.closeModalFunction);

        document.addEventListener('keypress', this.closeModalKeypressFunction); 
    }

    destroy(){
        for (var i = 0; i < this.buttonPlay.length; i++) {
            this.buttonPlay[i].removeEventListener('click', this.openModalFunction);
        }
        this.buttonClose.removeEventListener('click', this.closeModalFunction);

        document.removeEventListener('keypress', (e) => this.closeModalKeypressFunction); 
    }

    openModal(e){

        let mainBlock = document.querySelector('main');
        mainBlock.setAttribute('inert', '');

        this.popupVideo.style.display = 'block';
        this.popupVideoWrapper.style.opacity = 1;

        let videoUrl = e.target.dataset.videoSource;
        
        if(!videoUrl){
            videoUrl = searchSorce(e.target);
        }

        this.popupVideoiFrame.innerHTML = '<iframe width="100%" height="100%" frameborder="0" allow="autoplay" allowfullscreen title="Video" src="https://www.youtube.com/embed/' + videoUrl + '?autoplay=1&amp;start=0&amp;rel=0"></iframe>';

        function searchSorce(element){
            if(element.parentNode.dataset.videoSource){
                return element.parentNode.dataset.videoSource;
            } else {
                searchSorce(element.parentNode);  
            }
        }

    }

    closeModalKeypress(e){

        let mainBlock = document.querySelector('main');
        mainBlock.removeAttribute('inert');

        let keyCode = e.keyCode;
        console.log(keyCode);
        if (keyCode === '27') {
            this.popupVideo.style.display = 'none';
            this.popupVideoWrapper.style.opacity = 0;
            this.popupVideoiFrame.innerHTML = '';
        }
    }

    closeModal(){

        let mainBlock = document.querySelector('main');
        mainBlock.removeAttribute('inert');

        this.popupVideo.style.display = 'none';
        this.popupVideoWrapper.style.opacity = 0;
        this.popupVideoiFrame.innerHTML = '';
    }

    render(){

        const bodyElement = document.querySelector('body');

        let mainBlock = document.createElement('div'),
            popupWrapper = document.createElement('div'),
            popupContent = document.createElement('div'),
            closeButton = document.createElement('div'),
            videoiFrame = document.createElement('div');   

        popupWrapper.append(popupContent);
        popupContent.append(closeButton);
        popupContent.append(videoiFrame);
        mainBlock.append(popupWrapper);

        mainBlock.classList.add('video-popup');
        popupWrapper.classList.add('video-popup__wrapper');
        popupContent.classList.add('video-popup__content');
        videoiFrame.classList.add('video-popup__iframe');
        closeButton.classList.add('video-popup__close');

        mainBlock.setAttribute('role', 'dialog')        
        bodyElement.append(mainBlock);
    }

}