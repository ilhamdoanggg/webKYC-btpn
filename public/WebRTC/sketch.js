// let socket
let color = '#000';
let strokeWidth = 1;
let cv;

let socket = io('/stream');
const room = getQString(location.href, 'id');
const username = sessionStorage.getItem('username');

function setup() {
    // Creating canvas
    cv = createCanvas(600, 765)
    const canvas = document.getElementById('defaultCanvas0')
    canvas.classList.add('border');
    document.getElementById('content-canvas').appendChild(canvas)

    // Callback function
    socket.on('mouse', data => {
        stroke(data.color)
        strokeWeight(data.strokeWidth)
        line(data.x, data.y, data.px, data.py)
    })

    socket.on('clear-canvas', () => {
        clear();
    })
}

function mouseDragged() {
    // Draw
    stroke(color)
    strokeWeight(strokeWidth)
    line(mouseX, mouseY, pmouseX, pmouseY)

    // Send the mouse coordinates
    sendmouse(mouseX, mouseY, pmouseX, pmouseY)
}

// Sending data to the socket
function sendmouse(x, y, pX, pY) {
    const data = {
        x: x,
        y: y,
        px: pX,
        py: pY,
        color: color,
        strokeWidth: strokeWidth,
        room: room
    }

    socket.emit('mouse', data)
}

// event click
document.getElementById('btn-clear-canvas').addEventListener('click', (e) => {
    e.preventDefault();
    clear();
    socket.emit('clear-canvas');
})

document.getElementById('btn-save-canvas').addEventListener('click', (e) => {
    e.preventDefault();
    saveCanvas(cv, `${data.name}-${moment().unix()}-lembar-persetujuan`, 'png');
});

// function helper
function getQString(url = '', keyToReturn = '') {
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
}