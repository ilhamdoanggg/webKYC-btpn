const canvas = document.querySelector('canvas');
const signaturePad = new SignaturePad(canvas);

canvas.width = 700;
canvas.height = 893;


signaturePad.minWidth = 1;
signaturePad.maxWidth = 2;
signaturePad.penColor = "rgb(0,0,0)";

// function resizeCanvas() {
//     var ratio = Math.max(window.devicePixelRatio || 1, 1);
//     canvas.width = canvas.offsetWidth * ratio;
//     canvas.height = canvas.offsetHeight * ratio;
//     canvas.getContext("2d").scale(ratio, ratio);
//     signaturePad.clear(); // otherwise isEmpty() might return incorrect value
// }

// document.getElementById('btn-save-canvas').addEventListener('click', saveCanvas);
document.getElementById('btn-clear-canvas').addEventListener('click', clearCanvas);

// function saveCanvas() {
//     if (signaturePad.isEmpty()) {
//         alert("Please provide a signature first.");
//     } else {
//         var dataURL = signaturePad.toDataURL("image/jpeg");
//         download(dataURL, "signature.jpg");
//     }
// }

function clearCanvas() {
    signaturePad.clear();
}

function download(dataURL, filename) {
    if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
        window.open(dataURL);
    } else {
        var blob = dataURLToBlob(dataURL);
        var url = window.URL.createObjectURL(blob);

        var a = document.createElement("a");
        a.style = "display: none";
        a.href = url;
        a.download = filename;

        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
    }
}

function dataURLToBlob(dataURL) {
    // Code taken from https://github.com/ebidel/filer.js
    var parts = dataURL.split(';base64,');
    var contentType = parts[0].split(":")[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}

// window.onresize = resizeCanvas;