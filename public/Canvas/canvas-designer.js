const designer = new CanvasDesigner();

designer.widgetHtmlURL = '/Canvas/widget.html';
designer.widgetJsURL = '/Canvas/widget.min.js';

designer.setSelected('pencil');

designer.setTools({
    pencil: true,
    text: true,
    image: true,
    pdf: true,
    eraser: true,
    line: true,
    arrow: true,
    dragSingle: true,
    dragMultiple: true,
    arc: true,
    rectangle: true,
    quadratic: false,
    bezier: true,
    marker: true,
    zoom: true,
    lineWidth: false,
    colorsPicker: true,
    extraOptions: false,
    code: false,
    undo: true
});


const canvasContainer = document.getElementById('canvas-container');

const btnVideoCall = document.getElementById('btn-video-call');
const btnPen = document.getElementById('btn-pen');

btnPen.addEventListener('click', (e) => {
    e.preventDefault();
    btnPen.disabled = true;
    document.getElementById('wrapper-camera').hidden = true;
    document.getElementById('canvas-container').hidden = false;
    if (!canvasContainer.classList.contains('vh-100')) {
        canvasContainer.classList.add('vh-100')
        designer.appendTo(canvasContainer);
    }
})

btnVideoCall.addEventListener('click', (e) => {
    e.preventDefault();
    btnPen.disabled = false;
    document.getElementById('wrapper-camera').hidden = false;
    document.getElementById('canvas-container').hidden = true;
})