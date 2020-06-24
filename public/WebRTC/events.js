import helpers from './helpers.js';
import api from './api.js';

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
            let resultElement = document.getElementById('result');
            let result = resultElement.options[resultElement.selectedIndex].value;
            let data = {
                id: helpers.getQString(location.href, 'id'),
                result: result,
            }
            if (result == 0) alert('Mohon untuk pilih result');
            else api.updateResultCustomer(data);
            window.history.back();
        });
    }

});
