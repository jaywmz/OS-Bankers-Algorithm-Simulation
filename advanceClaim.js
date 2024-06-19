function reset() {
  for (var i = 1; i <= 5; i++) {
    for (var j = 1; j <= 4; j++) {
      document.getElementById('a' + i + j).value = '';
      document.getElementById('m' + i + j).value = '';
      document.getElementById('n' + i + j).value = '';
    }
    document.getElementById('p' + i).value = '';
  }
  document.getElementById('av11').value = '';
  document.getElementById('av12').value = '';
  document.getElementById('av13').value = '';
  document.getElementById('av14').value = '';
  document.getElementById('resourceA').value = '';
  document.getElementById('resourceB').value = '';
  document.getElementById('resourceC').value = '';
  document.getElementById('resourceD').value = '';
  document.body.style.backgroundColor = "#ffffff";
}

function example() {
  var sam = [
    [0, 1, 0, 2],
    [2, 0, 0, 3],
    [3, 0, 2, 1],
    [2, 1, 1, 2],
    [0, 0, 2, 4]
  ];

  var max = [
    [7, 5, 3, 4],
    [3, 2, 2, 2],
    [9, 0, 2, 6],
    [2, 2, 2, 2],
    [4, 3, 3, 5]
  ];

  for (var i = 1; i <= 5; i++) {
    for (var j = 1; j <= 4; j++) {
      document.getElementById('a' + i + j).value = sam[i - 1][j - 1];
      document.getElementById('m' + i + j).value = max[i - 1][j - 1];
    }
  }
  document.getElementById('resourceA').value = 10;
  document.getElementById('resourceB').value = 5;
  document.getElementById('resourceC').value = 7;
  document.getElementById('resourceD').value = 8;
}

function find_avai() {
  var a = document.getElementById('resourceA').value;
  var b = document.getElementById('resourceB').value;
  var c = document.getElementById('resourceC').value;
  var d = document.getElementById('resourceD').value;
  var x = 0;
  var y = 0;
  var z = 0;
  var w = 0;
  for (var i = 1; i <= 5; i++) {
    x = x + parseInt(document.getElementById('a' + i + '1').value);
    y = y + parseInt(document.getElementById('a' + i + '2').value);
    z = z + parseInt(document.getElementById('a' + i + '3').value);
    w = w + parseInt(document.getElementById('a' + i + '4').value);
  }
  document.getElementById('av11').value = a - x;
  document.getElementById('av12').value = b - y;
  document.getElementById('av13').value = c - z;
  document.getElementById('av14').value = d - w;
}

function find_need() {
  for (var i = 1; i <= 5; i++) {
    for (var j = 1; j <= 4; j++) {
      document.getElementById('n' + i + j).value = parseInt(document.getElementById('m' + i + j).value) - parseInt(document.getElementById('a' + i + j).value);
    }
  }
}

function run_algo() {
  find_avai();
  find_need();
  var k = 1;
  var q = 1;
  var safeSeq = [];
  var available = [
    parseInt(document.getElementById('av11').value),
    parseInt(document.getElementById('av12').value),
    parseInt(document.getElementById('av13').value),
    parseInt(document.getElementById('av14').value)
  ];

  var allocation = [];
  var need = [];
  for (var i = 1; i <= 5; i++) {
    var alloc = [];
    var n = [];
    for (var j = 1; j <= 4; j++) {
      alloc.push(parseInt(document.getElementById('a' + i + j).value));
      n.push(parseInt(document.getElementById('n' + i + j).value));
    }
    allocation.push(alloc);
    need.push(n);
  }

  var finish = new Array(5).fill(false);

  while (safeSeq.length < 5) {
    var found = false;
    for (var i = 0; i < 5; i++) {
      if (!finish[i]) {
        var j;
        for (j = 0; j < 4; j++) {
          if (need[i][j] > available[j]) break;
        }
        if (j === 4) {
          for (var k = 0; k < 4; k++) available[k] += allocation[i][k];
          safeSeq.push("P" + (i + 1));
          finish[i] = true;
          found = true;
        }
      }
    }
    if (!found) {
      alert("Deadlock!!");
      document.body.style.backgroundColor = "#ff7171";
      return;
    }
  }
  for (var i = 1; i <= 5; i++) {
    document.getElementById('p' + i).value = safeSeq[i - 1];
  }
  document.body.style.backgroundColor = "#28df99";
  alert("Safe!!");
}
