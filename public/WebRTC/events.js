import helpers from './helpers.js';

window.addEventListener('load', () => {

    //When the video frame is clicked. This will enable picture-in-picture
    document.getElementById('local').addEventListener('click', () => {
        if (!document.pictureInPictureElement) {
            document.getElementById('local').requestPictureInPicture()
                .catch(error => {
                    // Video failed to enter Picture-in-Picture mode.
                    console.error(error);
                });
        }

        else {
            document.exitPictureInPicture()
                .catch(error => {
                    // Video failed to leave Picture-in-Picture mode.
                    console.error(error);
                });
        }
    });

    // event btn endcall 
    const btnEndCall = document.querySelector('#btn-endcall');
    if (btnEndCall !== null) {
        document.querySelector('#btn-endcall').addEventListener('click', (e) => {
            e.preventDefault();
            window.history.back();
            sessionStorage.setItem('btn', null)
        });
    }


    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('expand-remote-video')) {
            helpers.maximiseStream(e);
        }

        else if (e.target && e.target.classList.contains('mute-remote-mic')) {
            helpers.singleStreamToggleMute(e);
        }
    });

    try {
        document.getElementById('closeModal').addEventListener('click', () => {
            helpers.toggleModal('recording-options-modal', false);
        });
    } catch (error) {

    }

});
