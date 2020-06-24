import api from './api.js';

export default {
    generateRandomString() {
        return Math.random().toString(36).slice(2).substring(0, 15);
    },


    closeVideo(elemId) {
        if (document.getElementById(elemId)) {
            document.getElementById(elemId).remove();
        }
    },


    pageHasFocus() {
        return !(document.hidden || document.onfocusout || window.onpagehide || window.onblur);
    },


    getQString(url = '', keyToReturn = '') {
        url = url ? url : location.href;
        let queryStrings = decodeURIComponent(url).split('#', 2)[0].split('?', 2)[1];

        if (queryStrings) {
            let splittedQStrings = queryStrings.split('&');

            if (splittedQStrings.length) {
                let queryStringObj = {};

                splittedQStrings.forEach(function (keyValuePair) {
                    let keyValue = keyValuePair.split('=', 2);

                    if (keyValue.length) {
                        queryStringObj[keyValue[0]] = keyValue[1];
                    }
                });

                return keyToReturn ? (queryStringObj[keyToReturn] ? queryStringObj[keyToReturn] : null) : queryStringObj;
            }

            return null;
        }

        return null;
    },


    userMediaAvailable() {
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    },


    getUserFullMedia() {
        if (this.userMediaAvailable()) {
            return navigator.mediaDevices.getUserMedia({
                video: true,
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true
                }
            });
        }

        else {
            throw new Error('User media not available');
        }
    },


    getUserAudio() {
        if (this.userMediaAvailable()) {
            return navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true
                }
            });
        }

        else {
            throw new Error('User media not available');
        }
    },



    shareScreen() {
        if (this.userMediaAvailable()) {
            return navigator.mediaDevices.getDisplayMedia({
                video: {
                    cursor: "always"
                },
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                }
            });
        }

        else {
            throw new Error('User media not available');
        }
    },


    getIceServer() {
        return {
            iceServers: [{   
                urls: [ "stun:ss-turn1.xirsys.com" ]
            }, 
                {   
                    username: "J3OyXScrj2xgbIZhJEtaYKofkmZufc9QxoMMOqFQRZ13q4cLWrepizNZws38c8MaAAAAAF7zEbZ3aHlkbjEyMw==",   
                    credential: "7dc775c0-b5f6-11ea-854d-0242ac140004",   
                    urls: [       
                        "turn:ss-turn1.xirsys.com:80?transport=udp",       
                        "turn:ss-turn1.xirsys.com:3478?transport=udp",       
                        "turn:ss-turn1.xirsys.com:80?transport=tcp",       
                        "turn:ss-turn1.xirsys.com:3478?transport=tcp",       
                        "turns:ss-turn1.xirsys.com:443?transport=tcp",       
                        "turns:ss-turn1.xirsys.com:5349?transport=tcp"   
                    ]
                }
            ]
            // iceServers: [
            //     {
            //         username: "muazkh",
            //         credential: "webrtc@live.com",
            //         urls: [
            //             "turn:numb.viagenie.ca",
            //         ]
            //     }
            // ]
        };
    },


    addChat(data, senderType) {
        let chatMsgDiv = document.querySelector('#chat-messages');
        let contentAlign = 'justify-content-end';
        let senderName = 'You';
        let msgBg = 'bg-white';

        if (senderType === 'remote') {
            contentAlign = 'justify-content-start';
            senderName = data.sender;
            msgBg = '';

            // this.toggleChatNotificationBadge();
        }

        let infoDiv = document.createElement('div');
        infoDiv.className = 'sender-info';
        infoDiv.innerHTML = `${senderName} - ${moment().format('Do MMMM, YYYY h:mm a')}`;

        let colDiv = document.createElement('div');
        colDiv.className = `col-10 card chat-card msg ${msgBg}`;
        colDiv.innerHTML = data.msg;

        let rowDiv = document.createElement('div');
        rowDiv.className = `row ${contentAlign} mb-2`;


        colDiv.appendChild(infoDiv);
        rowDiv.appendChild(colDiv);

        chatMsgDiv.appendChild(rowDiv);
    },


    toggleChatNotificationBadge() {
        if (document.querySelector('#chat-pane').classList.contains('chat-opened')) {
            document.querySelector('#new-chat-notification').setAttribute('hidden', true);
        }

        else {
            document.querySelector('#new-chat-notification').removeAttribute('hidden');
        }
    },



    replaceTrack(stream, recipientPeer) {
        let sender = recipientPeer.getSenders ? recipientPeer.getSenders().find(s => s.track && s.track.kind === stream.kind) : false;

        sender ? sender.replaceTrack(stream) : '';
    },



    toggleShareIcons(share) {
        let shareIconElem = document.querySelector('#share-screen');

        if (share) {
            shareIconElem.setAttribute('title', 'Stop sharing screen');
            shareIconElem.children[0].classList.add('text-primary');
            shareIconElem.children[0].classList.remove('text-white');
        }

        else {
            shareIconElem.setAttribute('title', 'Share screen');
            shareIconElem.children[0].classList.add('text-white');
            shareIconElem.children[0].classList.remove('text-primary');
        }
    },


    toggleVideoBtnDisabled(disabled) {
        document.getElementById('toggle-video').disabled = disabled;
    },


    saveRecordedStream(stream, data) {
        let blob = new Blob(stream, { type: 'video/webm' });
        let file = new File([blob], `${data.name}-${moment().unix()}-record.webm`);

        let form = {
            file: file,
            customerid: data.customerId
        }

        api.uploadFileToCustomer(form).then( () => {
            alert("Record screen success saved");
        });
    },

    urltoFile(url, filename, mimeType) {
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
        );
    },

    async saveFileCanvas(b64File, data) {
        let fileCanvas;
        const fileNameCanvas = `${data.name}-${moment().unix()}-lembar-persetujuan.png`;
        await this.urltoFile(b64File, fileNameCanvas, 'image/png')
            .then((file) => { fileCanvas = file })
            .catch(err => { })

        let formData = new FormData();
        formData.append('file', fileCanvas);

        $.ajax(`/upload-file/${data.customerId}`, {
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                alert('Lembar Persetujuan berhasil diupload');
            }
        });
    },

    setLocalStream(stream, mirrorMode = true) {
        const localVidElem = document.getElementById('local');

        localVidElem.srcObject = stream;
        mirrorMode ? localVidElem.classList.add('mirror-mode') : localVidElem.classList.remove('mirror-mode');
    },

    disableButton(btn, event) {
        // let { btnEndCall, btnVideoCall, btnDocument, btnResult, btnPen } = btn
        // if (event !== 'enable' || null || '') {
        //     btnEndCall.disabled = true;
        //     btnVideoCall.disabled = false;
        //     btnDocument.disabled = true;
        //     btnResult.disabled = true;
        //     btnPen.disabled = true;
        // } else {
        //     btnEndCall.disabled = false;
        //     btnVideoCall.disabled = true;
        //     btnDocument.disabled = false;
        //     btnResult.disabled = false;
        //     btnPen.disabled = false;
        // }
    }
};
