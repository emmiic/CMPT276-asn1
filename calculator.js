// get weight
var w = document.getElementsByClassName('weight');

// array of grade numerators
var gn = document.getElementsByClassName('num');

// array of grade numerators
var gd = document.getElementsByClassName('denom');

// array of percents
var p = document.getElementsByClassName('percent');

// get grade
function grade(num,denom) {
    return num/denom;
}

// rows of activities
var rows = 4;

// percent function
function percent(a) {
    var percent = 0;
    if (Number(gd[a].value)>0 && Number(gn[a].value)>=0) {
        percent = Number(gn[a].value)/Number(gd[a].value);
        percent = percent * 100;
        p[a].innerHTML = percent.toFixed(2);
    } else {
        p[a].innerHTML = "invalid";
    }
}

// mean grade function
function mean() {
    var activities =0;
    var total = 0;
    var mean = 0;
    var msg ='';
    for (i=0;i<p.length;i++) {
        if (p[i].innerHTML != ''&& p[i].innerHTML != 'invalid') {
            total += Number(p[i].innerHTML);
            activities ++;
        }
        if (Number(p[i].innerHTML)==0 && p[i].innerHTML != '') {
            msg = "Activities with 0.00 percent were included";
        }
    }
    if (activities != 0) {
        mean = total/activities;
        document.getElementById('result').innerHTML = mean.toFixed(2) + "%";
        document.getElementById('alert').innerHTML = '' + msg;
    } else {
        document.getElementById('result').innerHTML = "No activities input";
        document.getElementById('alert').innerHTML = '';
    }
}

// weighted grade function
function weighted() {
    var total = 0;
    var weight = 0;
    var weighted = 0;
    for (i=0;i<p.length;i++) {
        if (p[i].innerHTML != ''&& p[i].innerHTML != 'invalid' && w[i].value != '') {
            total += Number(p[i].innerHTML)*Number(w[i].value);
            weight += Number(w[i].value);
        }
        if (w[i].value == ''&& p[i].innerHTML != '') {
            document.getElementById('alert').innerHTML = "Activities with empty weight were omitted";
        }
    }

    if (weight == 0) {
        document.getElementById('result').innerHTML = '';
        document.getElementById('alert').innerHTML = "Totaly weight is 0 or no grade input, all activities were omitted";
    } else {
        weighted = total/weight;
        document.getElementById('result').innerHTML = weighted.toFixed(2) + "%";
    }
    
}

// function for add activity
function addactivity() {
    var tbl = document.getElementById("mytbl");
    var row = tbl.insertRow();
    var name = row.insertCell(0);
    var sname = row.insertCell(1);
    var wt = row.insertCell(2);
    var grd = row.insertCell(3);
    var prct = row.insertCell(4);
    rows ++;
    name.innerHTML ="Activity " + rows;
    sname.innerHTML = "A" + rows;
    wt.innerHTML = '<input class="weight" type="number" name="weight" value="">';
    grd.innerHTML = '<input class="num" type="number" name="num" value=""> / <input class="denom" type="number" name="denom" value="">';
    prct.innerHTML = '<div class="percent"></div>';
    for (let i = 0; i <rows; i++) {
        (function() {
            gn[i].addEventListener('change', (evt) => percent(i));
            gd[i].addEventListener('change', (evt) => percent(i));
        }());
    }   
}

// button event listners
document.getElementById('mean').addEventListener("click", mean);
document.getElementById('add').addEventListener("click", addactivity);
document.getElementById('weighted').addEventListener("click", weighted);

// percent event listeners
for (let i = 0; i <rows; i++) {
    (function() {
        gn[i].addEventListener('change', (evt) => percent(i));
        gd[i].addEventListener('change', (evt) => percent(i));
    }());
}

// gn[1].addEventListener('change', (evt) => percent(1));
// gd[1].addEventListener('change', (evt) => percent(1));
// gn[2].addEventListener('change', (evt) => percent(2));
// gd[2].addEventListener('change', (evt) => percent(2));
// gn[3].addEventListener('change', (evt) => percent(3));
// gd[3].addEventListener('change', (evt) => percent(3));


