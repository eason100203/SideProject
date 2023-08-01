

function prev_click() {
    var p = document.getElementById('prev_btn');
    var n = document.getElementById('next_btn');

    p.style.display = 'none';
    n.style.display = 'block';
}

function next_click() {
    var p = document.getElementById('prev_btn');
    var n = document.getElementById('next_btn');

    p.style.display = 'block';
    n.style.display = 'none';
}