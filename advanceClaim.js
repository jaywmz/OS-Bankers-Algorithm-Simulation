// Function to reset all input values and background color
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
  displayMessage('Values reset successfully.', 'info');
}

// Function to load example values into the input fields
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
  displayMessage('Example values loaded successfully.', 'info');
}

// Function to validate all input fields
function validateInput() {
  for (var i = 1; i <= 5; i++) {
    for (var j = 1; j <= 4; j++) {
      if (!document.getElementById('a' + i + j).value || !document.getElementById('m' + i + j).value) {
        displayMessage('Please fill in all Allocation and Max values.', 'danger');
        return false;
      }
    }
  }
  for (var i = 1; i <= 4; i++) {
    if (!document.getElementById('av1' + i).value) {
      displayMessage('Please fill in all Available values.', 'danger');
      return false;
    }
  }
  return true;
}

// Function to calculate the need matrix
function find_need() {
  for (var i = 1; i <= 5; i++) {
    for (var j = 1; j <= 4; j++) {
      document.getElementById('n' + i + j).value = parseInt(document.getElementById('m' + i + j).value) - parseInt(document.getElementById('a' + i + j).value);
    }
  }
  displayMessage('Need matrix calculated.', 'info');
}

// Function to clear the process sequence
function clear_process_sequence() {
  for (var i = 1; i <= 5; i++) {
    document.getElementById('p' + i).value = '';
  }
}

// Function to run the Banker's Algorithm
function run_algo() {
  if (!validateInput()) return;

  var available = [
    parseInt(document.getElementById('av11').value) || 0,
    parseInt(document.getElementById('av12').value) || 0,
    parseInt(document.getElementById('av13').value) || 0,
    parseInt(document.getElementById('av14').value) || 0
  ];

  var work = [...available];
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

  var finish = new Array(5).fill(false);
  var safeSeq = [];
  var log = [];
  var deadlockProcesses = [];

  while (safeSeq.length < 5) {
    var found = false;
    for (var i = 0; i < 5; i++) {
      if (!finish[i]) {
        var j;
        for (j = 0; j < 4; j++) {
          if (need[i][j] > work[j]) break;
        }
        if (j === 4) {
          for (var k = 0; k < 4; k++) work[k] += allocation[i][k];
          safeSeq.push("P" + (i + 1));
          finish[i] = true;
          found = true;
          log.push(`Process P${i + 1} has completed.`);
        } else {
          deadlockProcesses.push("P" + (i + 1));
        }
      }
    }
    if (!found) {
      displayMessage('Deadlock detected!', 'danger');
      document.body.style.backgroundColor = "#ff7171";
      clear_process_sequence();
      document.getElementById('deadlockProcesses').innerHTML = `<strong>Processes involved in deadlock:</strong> ${deadlockProcesses.join(', ')}`;
      $('#deadlockModal').modal('show');
      console.error('Deadlock detected:', { available, allocation, need, work, safeSeq });
      return;
    }
  }

  for (var i = 1; i <= 5; i++) {
    document.getElementById('p' + i).value = safeSeq[i - 1];
  }
  document.body.style.backgroundColor = "#28df99";
  displayMessage('System is in a safe state.', 'success');
  console.log('Safe sequence found:', safeSeq);
  log.forEach(msg => console.log(msg));
}

// Wrapper function to run the algorithm
function run_algo_wrapper() {
  find_need();
  run_algo();
}

// Function to display messages
function displayMessage(message, type) {
  const messageBox = document.getElementById('messageBox');
  messageBox.innerHTML = message;
  messageBox.className = `alert alert-${type}`;
  messageBox.style.display = 'block';
  setTimeout(() => {
    messageBox.style.display = 'none';
  }, 3000);
}

// Update button click handler to use the wrapper function
document.querySelector('.btn-secondary[onclick="run_algo()"]').setAttribute('onclick', 'run_algo_wrapper()');

// GSAP animations for buttons and other elements
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      gsap.to(button, { duration: 1, x: 100, opacity: 0.5 });
    });
  });

  // Example using GSAP for box animation
  gsap.to('.box', { duration: 2, x: 300, rotation: 360, scale: 0.5 });
});
