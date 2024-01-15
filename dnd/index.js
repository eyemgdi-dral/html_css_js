let currentEl;
let dragging = false;
let currentPos = 0;
let dropIdx = -1;

$(".dragster").mousedown((ev) => {
    console.log("mouseDown", ev);
    currentEl = $(ev.currentTarget).parents(".draggable")[0];
    dragging = true;
});

$(document).mouseup((ev) => {
    console.log("mouseup", ev);

    for (let i = 0; i < placedHolders.length; i++) {
        const ph = placedHolders[i];
        // console.log("ph.x1", ph.x1);
        // console.log("ph.x2", ph.x2);
        // console.log("currentPos", currentPos);
        currentPos = ev.pageY - 7;
        if (ph.x1 < currentPos && ph.x2 > currentPos) {
            dropIdx = i;
            console.log("pl mouseup", dropIdx);
        }
    }

    console.log("dropIdx", dropIdx);

    currentEl.style.position = "relative";
    currentEl.style.top = "initial";
    dragging = false;
});

$(".dragster").click(() => {
    console.log("click");
});

// $(".placeholder").mouseover((ev) => {
//     console.log("mouseover");
//     ev.currentTarget.style.background = "#ccc";
// });
// $(".placeholder").mouseout((ev) => {
//     console.log("mouseover");
//     ev.currentTarget.style.background = "#fff";
// });

$(window).mousemove((ev) => {
    // console.log("pageX", ev.pageY);
    if (dragging) {
        currentEl.style.position = "absolute";
        currentPos = ev.pageY - 7;
        currentEl.style.top = currentPos + "px";
        for (let i = 0; i < placedHolders.length; i++) {
            const ph = placedHolders[i];
            // console.log("ph.x1", ph.x1);
            // console.log("ph.x2", ph.x2);
            // console.log("currentPos", currentPos);

            if (ph.x1 < currentPos && ph.x2 > currentPos) {
                ph.el.style.background = "#ccc";
            } else {
                ph.el.style.background = "#fff";
                // dropIdx = -1;
            }
        }
    }
});

let placedHolders = [];
$(document).ready(() => {
    $(".placeholder").each((idx, el) => {
        console.log("el", $(el).offset());
        placedHolders.push({el, x1: $(el).offset().top, x2: $(el).offset().top + 20});
    });
});
