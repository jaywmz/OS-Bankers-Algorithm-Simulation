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
    [0, 0, 1, 2],
    [1, 0, 0, 0],
    [1, 3, 5, 4],
    [0, 6, 3, 2],
    [0, 0, 1, 4]
  ];

  var max = [
    [0, 0, 1, 2],
    [1, 7, 5, 0],
    [2, 3, 5, 6],
    [0, 6, 5, 2],
    [1, 6, 5, 6]
  ];

  var available = [1, 5, 2, 0];

  for (var i = 1; i <= 5; i++) {
    for (var j = 1; j <= 4; j++) {
      document.getElementById('a' + i + j).value = sam[i - 1][j - 1];
      document.getElementById('m' + i + j).value = max[i - 1][j - 1];
    }
  }

  document.getElementById('av11').value = available[0];
  document.getElementById('av12').value = available[1];
  document.getElementById('av13').value = available[2];
  document.getElementById('av14').value = available[3];
}

function find_need() {
  for (var i = 1; i <= 5; i++) {
    for (var j = 1; j <= 4; j++) {
      document.getElementById('n' + i + j).value = parseInt(document.getElementById('m' + i + j).value) - parseInt(document.getElementById('a' + i + j).value);
    }
  }
}

function run_algo() {
  // Retrieve initial available resources
  var available = [
    parseInt(document.getElementById('av11').value) || 0,
    parseInt(document.getElementById('av12').value) || 0,
    parseInt(document.getElementById('av13').value) || 0,
    parseInt(document.getElementById('av14').value) || 0
  ];

  // Make a copy of available resources to avoid modifying the original values
  var work = [...available];

  // Retrieve allocated resources and need matrix
  var allocation = [];
  var need = [];
  for (var i = 1; i <= 5; i++) {
    var alloc = [];
    var n = [];
    for (var j = 1; j <= 4; j++) {
      alloc.push(parseInt(document.getElementById('a' + i + j).value) || 0);
      n.push(parseInt(document.getElementById('n' + i + j).value) || 0);
    }
    allocation.push(alloc);
    need.push(n);
  }

  // Initialize finish array and safe sequence
  var finish = new Array(5).fill(false);
  var safeSeq = [];

  // Banker's Algorithm main loop
  while (safeSeq.length < 5) {
    var found = false;
    for (var i = 0; i < 5; i++) {
      if (!finish[i]) {
        var j;
        for (j = 0; j < 4; j++) {
          if (need[i][j] > work[j]) break;
        }
        if (j === 4) {
          // If all needs are met, allocate resources and mark process as finished
          for (var k = 0; k < 4; k++) work[k] += allocation[i][k];
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

  // Display the safe sequence
  for (var i = 1; i <= 5; i++) {
    document.getElementById('p' + i).value = safeSeq[i - 1];
  }
  document.body.style.backgroundColor = "#28df99";
  alert("Safe!!");
}

function run_algo_wrapper() {
  find_need();
  run_algo();
}

// Ensure the button calls the wrapper function
document.querySelector('.btn-secondary[onclick="run_algo()"]').setAttribute('onclick', 'run_algo_wrapper()');