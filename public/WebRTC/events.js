import helpers from './helpers.js';

window.addEventListener('load', () => {
    // deklarasi button
    let btn = {
        btnEndCall: document.querySelector('#btn-endcall'),
        btnVideoCall: document.querySelector('#btn-video-call'),
        btnSendFile: document.querySelector('#btn-send-file'),
        btnDocument: document.querySelector('#btn-document'),
        btnResult: document.querySelector('#btn-result'),
        btnPen: document.querySelector('#btn-pen')
    }
    // disable button
    let event = sessionStorage.getItem('btn');
    helpers.disableButton(btn, event)

    //When the chat icon is clicked
    document.querySelector('#nav-chat-tab').addEventListener('click', (e) => {
        //remove the 'New' badge on chat icon (if any) once chat is opened.
        setTimeout(() => {
            if (document.querySelector('#chat-pane').classList.contains('chat-opened')) {
                helpers.toggleChatNotificationBadge();
            }
        }, 300);
    });


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


    //When the 'Create room" is button is clicked
    btn.btnVideoCall.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(location);

        const { origin, pathname, search } = location;
        // create room link
        let roomLink = `${origin}${pathname}${search}&room=${helpers.generateRandomString()}`;
        window.location.replace(roomLink);
        sessionStorage.setItem('btn', 'enable')
    });

    btn.btnEndCall.addEventListener('click', (e) => {
        e.preventDefault();
        window.history.back();
        sessionStorage.setItem('btn', null)
    });


    //When the 'Enter room' button is clicked.
    document.getElementById('enter-room').addEventListener('click', (e) => {
        e.preventDefault();

        let name = document.querySelector('#username').value;

        if (name) {
            //remove error message, if any
            document.querySelector('#err-msg-username').innerHTML = "";

            //save the user's name in sessionStorage
            sessionStorage.setItem('username', name);

            //reload room
            location.reload();
        }

        else {
            document.querySelector('#err-msg-username').innerHTML = "Please input your name";
        }
    });


    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('expand-remote-video')) {
            helpers.maximiseStream(e);
        }

        else if (e.target && e.target.classList.contains('mute-remote-mic')) {
            helpers.singleStreamToggleMute(e);
        }
    });


    document.getElementById('closeModal').addEventListener('click', () => {
        helpers.toggleModal('recording-options-modal', false);
    });
});
