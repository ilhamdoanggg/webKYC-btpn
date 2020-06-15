const designer = new CanvasDesigner();

designer.widgetHtmlURL = '/canvas-designer/widget.html';
designer.widgetJsURL = '/canvas-designer/widget.min.js';

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
    lineWidth: true,
    colorsPicker: true,
    extraOptions: false,
    code: false,
    undo: true
});


const canvasContainer = document.getElementById('canvas-container');

const btnPen = document.getElementById('btn-pen');
btnPen.addEventListener('click', (e) => {
    e.preventDefault();
    btnPen.disabled = true;
    canvasContainer.classList.add('vh-100')
    const btnCloseContainer = document.createElement('div');
    btnCloseContainer.innerHTML = `<button id='btn-close' class='btn btn-primary my-3' style='z-index:9999'>Close canvas</button>`;
    canvasContainer.appendChild(btnCloseContainer);

    designer.appendTo(canvasContainer);

    const btnClose = document.getElementById('btn-close')
    btnClose.addEventListener('click', (e) => {
        e.preventDefault();
        designer.destroy();
        btnClose.remove();
        btnPen.disabled = false;
        canvasContainer.classList.remove('vh-100')
    })

})
