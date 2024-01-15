let currentEl;
let dragging = false;
let currentPos = 0;
let initIdx = -1;
let dropIdx = -1;

function resetDD() {
    currentEl;
    dragging = false;
    currentPos = 0;
    initIdx = -1;
    dropIdx = -1;
}

let items = [{ title: "Item 1" }, { title: "Item 2" }, { title: "Item 3" }];

$(document).ready(() => {
    renderElements(items);
});

function renderElements(arr) {
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        arr[i].order = i;
        let el = `<li class="placeholder">
                    <div class="draggable">
                        <span class="title">${element.title}</span>
                        <button>Use</button>
                        <span class="dragster">drag</span>
                    </div>
                </li>`;

        $("#ddCon ul").append(el);
    }
}

$(document).on("mousedown", ".dragster", (ev) => {
    console.log("mouseDown", ev);
    currentEl = $(ev.currentTarget).parents(".draggable")[0];
    dragging = true;
    let currentPos;
    for (let i = 0; i < placedHolders.length; i++) {
        const ph = placedHolders[i];
        // console.log("ph.x1", ph.x1);
        // console.log("ph.x2", ph.x2);
        // console.log("currentPos", currentPos);
        currentPos = ev.pageY - 7;
        if (ph.x1 < currentPos && ph.x2 > currentPos) {
            initIdx = i;
            console.log("pl initIdx", initIdx);
        }
    }
});

$(document).on("mouseup", (ev) => {
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

    switchElements(initIdx, dropIdx);
    if (currentEl) {
        currentEl.style.position = "relative";
        currentEl.style.top = "initial";
    }

    resetDD();
});

function switchElements(initIdx, dropIdx) {
    if (initIdx != -1 && dropIdx != -1) {
        console.log(initIdx, dropIdx);
        items[initIdx].order = dropIdx;
        items[dropIdx].order = initIdx;

        items.sort((a, b) => a.order - b.order);
        $("#ddCon ul").empty();
        renderElements(items);
    }
}

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

$(window).on("mousemove", (ev) => {
    // console.log("pageX", ev.pageY);
    if (dragging) {
        currentEl.style.position = "absolute";
        currentPos = ev.clientY - 7;
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
        placedHolders.push({
            el,
            x1: $(el).offset().top,
            x2: $(el).offset().top + 20,
        });
    });
});
