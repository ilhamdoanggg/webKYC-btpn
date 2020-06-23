import h from './helpers.js';

window.addEventListener('load', () => {

    const canvas = document.querySelector('canvas');
    const signaturePad = new SignaturePad(canvas);

    let socket = io('/stream');
    const room = h.getQString(location.href, 'id');
    const username = sessionStorage.getItem('username');

    canvas.width = 700;
    canvas.height = 893;


    signaturePad.minWidth = 1;
    signaturePad.maxWidth = 2;
    signaturePad.penColor = "rgb(0,0,0)";

    function resizeCanvas() {
        var ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
        signaturePad.clear(); // otherwise isEmpty() might return incorrect value
    }

    document.getElementById('btn-save-canvas').addEventListener('click', saveCanvas);
    document.getElementById('btn-clear-canvas').addEventListener('click', clearCanvas);

    function saveCanvas() {
        if (signaturePad.isEmpty()) {
            alert("Please provide a signature first.");
        } else {
            html2canvas(document.getElementById('content-canvas'))
                .then(canvas => {
                    let data = {
                        name: username,
                        room: room,
                        msg: `Berhasil Upload File Persetujuan`,
                        sender: 'BTPN Info',
                        customerId: h.getQString(location.href, 'id')
                    };

                    const fileB64 = canvas.toDataURL("image/png");
                    socket.emit('chat', data) // emit chat 
                    h.saveFileCanvas(fileB64, data); // save file to strorage
                    const fileNameCanvas = `${data.name}-${moment().unix()}-lembar-persetujuan.png`;
                    const a = document.createElement("a"); //Create <a>
                    a.href = fileB64 //Image Base64 Goes here
                    a.download = fileNameCanvas; //File name Here
                    a.click(); //Downloaded file
                })
        }
    }

    function clearCanvas() {
        signaturePad.clear();
    }

    window.onresize = resizeCanvas;
})