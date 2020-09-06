$("#chart")[0].innerHTML = '<canvas id="canvas" style="width: 100%; height: 40vh"></canvas>'

const form = $("#newEntryForm")
const canvas = $('#canvas')
const ctx = canvas[0].getContext('2d')
form[0].elements["newEntryForm:r_input"].value = getBeforeValues()[1].R
form[0].elements["newEntryForm:r_hinput"].value = getBeforeValues()[1].R

function getFormData() {
    const x_item = form[0].elements["newEntryForm:x_input"]
    const y_item = form[0].elements["newEntryForm:y"]
    const r_item = form[0].elements["newEntryForm:r_input"]
    return {
        x: x_item.value,
        y: y_item.value,
        r: r_item.value
    }
}

function canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);

    context.beginPath();
    context.lineWidth = 2;
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    context.stroke();
}

function draw_coordinates(ctx) {
    let R = ctx.canvas.height / 4
    let R_text;
    try {
        R_text = parseFloat(getFormData()['r'])
    } catch (e) {
        R_text = '1'
    }
    if (isNaN(R_text)) {
        R_text = 1
    }
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    //Вертикальные черты
    ctx.fillText(-R_text / 2, Math.round((ctx.canvas.width / 2.05 + ctx.canvas.width / 40)), Math.round(ctx.canvas.height / 2 + R / 2 + 2))
    ctx.fillText(-R_text, Math.round(ctx.canvas.width / 2.05 + ctx.canvas.width / 40), Math.round(ctx.canvas.height / 2 + R + 2))
    ctx.fillText(R_text / 2, Math.round(ctx.canvas.width / 2.05 + ctx.canvas.width / 40), Math.round(ctx.canvas.height / 2 - R / 2 + 2))
    ctx.fillText(R_text, Math.round(ctx.canvas.width / 2.05 + ctx.canvas.width / 40), Math.round(ctx.canvas.height / 2 - R + 2))
    ctx.beginPath()
    ctx.moveTo(ctx.canvas.width / 2.05, ctx.canvas.height / 2 + R / 2)
    ctx.lineTo(ctx.canvas.width / 1.95, ctx.canvas.height / 2 + R / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(ctx.canvas.width / 2.05, ctx.canvas.height / 2 + R)
    ctx.lineTo(ctx.canvas.width / 1.95, ctx.canvas.height / 2 + R)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(ctx.canvas.width / 2.05, ctx.canvas.height / 2 - R / 2)
    ctx.lineTo(ctx.canvas.width / 1.95, ctx.canvas.height / 2 - R / 2)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(ctx.canvas.width / 2.05, ctx.canvas.height / 2 - R)
    ctx.lineTo(ctx.canvas.width / 1.95, ctx.canvas.height / 2 - R)
    ctx.stroke()
    // Горизонтальные черты
    ctx.fillText(-R_text / 2, Math.round(ctx.canvas.width / 2 - R / 2 - 6), Math.round(ctx.canvas.height / 2.2))
    ctx.fillText(-R_text, Math.round(ctx.canvas.width / 2 - R - 3), Math.round(ctx.canvas.height / 2.2))
    ctx.fillText(R_text / 2, Math.round(ctx.canvas.width / 2 + R / 2 - 6), Math.round(ctx.canvas.height / 2.2))
    ctx.fillText(R_text, Math.round(ctx.canvas.width / 2 + R - 3), Math.round(ctx.canvas.height / 2.2))
    ctx.beginPath()
    ctx.moveTo(ctx.canvas.width / 2 - R / 2, ctx.canvas.height / 2.1)
    ctx.lineTo(ctx.canvas.width / 2 - R / 2, ctx.canvas.height / 1.9)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(ctx.canvas.width / 2 - R, ctx.canvas.height / 2.1)
    ctx.lineTo(ctx.canvas.width / 2 - R, ctx.canvas.height / 1.9)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(ctx.canvas.width / 2 + R / 2, ctx.canvas.height / 2.1)
    ctx.lineTo(ctx.canvas.width / 2 + R / 2, ctx.canvas.height / 1.9)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(ctx.canvas.width / 2 + R, ctx.canvas.height / 2.1)
    ctx.lineTo(ctx.canvas.width / 2 + R, ctx.canvas.height / 1.9)
    ctx.stroke()
    // Стрелки

    canvas_arrow(ctx, ctx.canvas.width * 0.1, ctx.canvas.height / 2, ctx.canvas.width * 0.9, ctx.canvas.height / 2)
    ctx.fillText('X', ctx.canvas.width * 0.9, ctx.canvas.height / 2.1)
    canvas_arrow(ctx, ctx.canvas.width / 2, ctx.canvas.height * 0.9, ctx.canvas.width / 2, ctx.canvas.height * 0.1)
    ctx.fillText('Y', ctx.canvas.width / 2.2, ctx.canvas.height * 0.1)
}


function draw(ctx) {


    if (ctx) {
        ctx.canvas.width = ctx.canvas.offsetWidth
        ctx.canvas.height = ctx.canvas.offsetHeight

        let R = ctx.canvas.height / 4
        ctx.font = Math.round(ctx.canvas.width / 50) + 'px verdana';
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)


        // Сектор

        ctx.beginPath();
        ctx.moveTo(ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, R, 0, Math.PI / 2, false);
        ctx.closePath();
        ctx.strokeStyle = "rgba(91,95,201,0.58)";
        ctx.fillStyle = "rgba(91,95,201,0.58)";
        ctx.fill();
        ctx.stroke();

        // Прямоугольник

        ctx.fillRect(ctx.canvas.width / 2 - R / 2, ctx.canvas.height / 2 - R, R / 2, R)

        // Треугольник

        ctx.beginPath()
        ctx.moveTo(ctx.canvas.width / 2 + R / 2, ctx.canvas.height / 2)
        ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height / 2 - R)
        ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height / 2)
        ctx.lineTo(ctx.canvas.width / 2 + R / 2, ctx.canvas.height / 2)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        // Рисуем координатные оси

        draw_coordinates(ctx)
        drawPoints(ctx)
        let formData = getFormData()
        drawPoint(ctx, parseFloat(formData["x"]), parseFloat(formData["y"]), 1)
    } else {
        alert("You're using too old browser")
    }
}

function drawPoint(ctx, x, y, alpha) {
    let r_val
    try {
        r_val = parseFloat(getFormData()['r'])
    } catch (e) {
        r_val = 1
    }
    if (isNaN(r_val)) {
        r_val = 1
    }
    let R = ctx.canvas.height / 4 / r_val

    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width / 2 + R * x, ctx.canvas.height / 2 - R * y);
    ctx.arc(ctx.canvas.width / 2 + R * x, ctx.canvas.height / 2 - R * y, ctx.canvas.width / 300, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.strokeStyle = "rgba(255, 0, 0, " + alpha + ")";
    ctx.fillStyle = "rgba(255, 0, 0, " + alpha + ")";
    ctx.fill();
    ctx.stroke();
}


canvas.click(function (event) {
    try {
        let r_val = parseFloat(getFormData()['r'])
        if (isNaN(r_val)) {
            r_val = 1
        }
        let kR = r_val / (ctx.canvas.height / 4)
        const x = event.offsetX,
            y = event.offsetY;
        const rly_x = (x - ctx.canvas.width / 2) * kR;
        let rly_y = (ctx.canvas.height / 2 - y) * kR;
        const x_item = form[0].elements["newEntryForm:x_input"]
        const y_item = form[0].elements["newEntryForm:y"]
        const r_item = form[0].elements["newEntryForm:r_input"]
        const hx_item = form[0].elements["newEntryForm:x_hinput"]
        const hr_item = form[0].elements["newEntryForm:r_hinput"]
        x_item.value = rly_x.toFixed(3).toString()
        y_item.value = rly_y.toFixed(0).toString()
        r_item.value = r_val.toFixed(3).toString()
        hx_item.value = rly_x.toFixed(3).toString()
        hr_item.value = r_val.toFixed(3).toString()
        y_item.forEach(function (currentValue, currentIndex, listObj) {
                if (currentValue.value === parseFloat(rly_y.toFixed(0)).toFixed(0).toString()) {
                    currentValue.checked = true;
                    console.log("Checked " + currentIndex)
                }
                console.log(currentValue.value, rly_y.toFixed(0).toString())
            }
        )
        form[0].elements["newEntryForm:j_idt26"].click()
    } catch (e) {
        alert(e)
    }
});

function getBeforeValues() {
    var myRows = [];
    var $headers = $("#entriesTable th");
    $("#entriesTable tr").each(function (index) {
        $cells = $(this).find("td");
        myRows[index] = {};
        $cells.each(function (cellIndex) {
            myRows[index][$($headers[cellIndex]).html()] = $(this).html().replace(/\s/g, "");
        });
    });
    return myRows
}

function drawPoints(ctx) {
    const myRows = getBeforeValues()
    if (myRows.length === 0)
        return
    const alphastep = myRows.length <= 5 ? 1. / (myRows.length) : 0.2
    let r_val
    try {
        r_val = parseFloat(getFormData()['r'])
    } catch (e) {
        r_val = 1
        console.error(e)
    }
    if (isNaN(r_val)) {
        r_val = 1
    }
    let R = ctx.canvas.height / 4 / r_val
    for (let i = 0; i < myRows.length; i++) {
        const x = myRows[i]['X'],
            y = myRows[i]['Y'];
        ctx.beginPath();
        ctx.moveTo(ctx.canvas.width / 2 + R * x, ctx.canvas.height / 2 - R * y);
        ctx.arc(ctx.canvas.width / 2 + R * x, ctx.canvas.height / 2 - R * y, ctx.canvas.width / 300, 0, 2 * Math.PI);
        ctx.closePath();
        if (myRows[i]['Result'] === 'true') {
            ctx.strokeStyle = "rgba(0, 255, 0, " + (1. - alphastep * i) + ")";
            ctx.fillStyle = "rgba(0, 255, 0, " + (1. - alphastep * i) + ")";
        } else {
            ctx.strokeStyle = "rgba(255, 0, 0, " + (1. - alphastep * i) + ")";
            ctx.fillStyle = "rgba(255, 0, 0, " + (1. - alphastep * i) + ")";
        }
        ctx.fill();
        ctx.stroke();
    }
}

function eventHandler(event) {
    draw(ctx)
}

$(window).on('resize', eventHandler)
$(window).on('load', eventHandler)
