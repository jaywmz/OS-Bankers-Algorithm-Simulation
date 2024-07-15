// Function to clear the process sequence
function clear_process_sequence() {
  const sequenceContainer = document.getElementById('process-sequence');
  sequenceContainer.innerHTML = '';
  const logContainer = document.getElementById('process-log');
  logContainer.innerHTML = '';
}

// Function to enforce numeric input on specified fields
function enforceNumericInput() {
  const inputs = document.querySelectorAll('input[type="text"]');
  inputs.forEach(input => {
    input.addEventListener('input', function(e) {
      this.value = this.value.replace(/[^0-9]/g, '');
    });
  });
}

// Call this function on document ready
document.addEventListener('DOMContentLoaded', () => {
  enforceNumericInput();
});

// Function to reset all input values and background color
function reset() {
  for (var i = 1; i <= 5; i++) {
    for (var j = 1; j <= 4; j++) {
      document.getElementById('a' + i + j).value = '';
      document.getElementById('m' + i + j).value = '';
      document.getElementById('n' + i + j).value = '';
    }
  }
  document.getElementById('av11').value = '';
  document.getElementById('av12').value = '';
  document.getElementById('av13').value = '';
  document.getElementById('av14').value = '';
  document.getElementById('resourceA').value = '';
  document.getElementById('resourceB').value = '';
  document.getElementById('resourceC').value = '';
  document.getElementById('resourceD').value = '';
  document.body.style.background = "linear-gradient(to right, #2c3e50, #4ca1af)"; // Reset background to default gradient
  clear_process_sequence(); // Reset the process sequence
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

  var total = [3, 10, 11, 14];

  for (var i = 1; i <= 5; i++) {
    for (var j = 1; j <= 4; j++) {
      document.getElementById('a' + i + j).value = sam[i - 1][j - 1];
      document.getElementById('m' + i + j).value = max[i - 1][j - 1];
    }
  }

  document.getElementById('resourceA').value = total[0];
  document.getElementById('resourceB').value = total[1];
  document.getElementById('resourceC').value = total[2];
  document.getElementById('resourceD').value = total[3];
  updateAvailableResources(); // Update available resources based on total and allocation
  displayMessage('Example values loaded successfully.', 'info');
}

// Function to update available resources based on total and allocation
function updateAvailableResources() {
  const totalResources = [
    parseInt(document.getElementById('resourceA').value) || 0,
    parseInt(document.getElementById('resourceB').value) || 0,
    parseInt(document.getElementById('resourceC').value) || 0,
    parseInt(document.getElementById('resourceD').value) || 0
  ];

  const allocation = [0, 0, 0, 0];
  for (var i = 1; i <= 5; i++) {
    for (var j = 1; j <= 4; j++) {
      allocation[j - 1] += parseInt(document.getElementById('a' + i + j).value) || 0;
    }
  }

  const available = totalResources.map((total, index) => total - allocation[index]);

  document.getElementById('av11').value = available[0];
  document.getElementById('av12').value = available[1];
  document.getElementById('av13').value = available[2];
  document.getElementById('av14').value = available[3];
}

// Function to validate all input fields
function validateInput() {
  const maxAllowedValue = 100; // Set a threshold for unusually high values
  let valid = true;
  let warningMessage = '';

  for (var i = 1; i <= 5; i++) {
    for (var j = 1; j <= 4; j++) {
      const allocation = document.getElementById('a' + i + j).value;
      const maximum = document.getElementById('m' + i + j).value;
      
      if (!allocation || !maximum) {
        displayMessage('Please fill in all Allocation and Max values.', 'danger');
        return false;
      }

      if (parseInt(allocation) > maxAllowedValue || parseInt(maximum) > maxAllowedValue) {
        warningMessage = 'Warning: Unusually high values entered. This may lead to unrealistic scenarios.';
        valid = false;
      }
    }
  }
  for (var i = 1; i <= 4; i++) {
    const available = document.getElementById('av1' + i).value;
    if (!available) {
      displayMessage('Please fill in all Available values.', 'danger');
      return false;
    }

    if (parseInt(available) > maxAllowedValue) {
      warningMessage = 'Warning: Unusually high values entered. This may lead to unrealistic scenarios.';
      valid = false;
    }
  }

  if (warningMessage) {
    displayMessage(warningMessage, 'warning');
  }

  return valid;
}

// Function to calculate the need matrix
function find_need() {
  for (var i = 1; i <= 5; i++) {
    for (var j = 1; j <= 4; j++) {
      document.getElementById('n' + i + j).value = parseInt(document.getElementById('m' + i + j).value) - parseInt(document.getElementById('a' + i + j).value);
    }
  }
  displayMessage('Need matrix calculated.', 'info');
  updateAvailableResources(); // Update available resources after calculating the need matrix
}

// Function to animate the process sequence step-by-step
function animateProcessSequence(sequence) {
  const sequenceContainer = document.getElementById('process-sequence');
  sequenceContainer.innerHTML = ''; // Clear previous sequence

  sequence.forEach((process, index) => {
    const processElement = document.createElement('span');
    processElement.innerHTML = process;
    processElement.className = 'process-step mx-1';

    sequenceContainer.appendChild(processElement);

    // Animate the process step with a delay
    gsap.fromTo(
      processElement,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.5, delay: index * 0.5 }
    );
  });
}

// Function to log process sequence steps
function logProcessSequence(message) {
  const logContainer = document.getElementById('process-log');
  const logEntry = document.createElement('div');
  logEntry.className = 'log-entry';
  logEntry.innerText = message;
  logContainer.appendChild(logEntry);
}

// Function to log detailed calculation process
function logCalculationProcess(process, workBefore, need, allocation, workAfter, enoughResources) {
  const logContainer = document.getElementById('process-log');
  const logEntry = document.createElement('div');
  logEntry.className = 'log-entry';

  const needStr = need.join(', ');
  const workBeforeStr = workBefore.join(', ');
  const allocationStr = allocation.join(', ');
  const workAfterStr = workAfter.join(', ');

  let message = `<strong>${process}</strong><br>
                 Need: [${needStr}]<br>
                 Available before: [${workBeforeStr}]<br>
                 Allocation: [${allocationStr}]<br>`;

  if (enoughResources) {
    message += `Available after: [${workAfterStr}]`;
  } else {
    message += `Not enough available resources.`;
  }

  logEntry.innerHTML = message;
  logContainer.appendChild(logEntry);
}

// Function to reset the modal state
function resetModal() {
  document.getElementById('deadlockProcesses').innerHTML = '';
  $('#deadlockModal').modal('hide'); // Ensure the modal is hidden
}

// Function to run the Banker's Algorithm
function run_algo() {
  if (!validateInput()) return;

  resetModal(); // Reset modal state before running the algorithm

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
          const workBefore = [...work];
          for (var k = 0; k < 4; k++) work[k] += allocation[i][k];
          const workAfter = [...work];
          logCalculationProcess(`P${i + 1}`, workBefore, need[i], allocation[i], workAfter, true);

          safeSeq.push("P" + (i + 1));
          finish[i] = true;
          found = true;
          log.push(`Process P${i + 1} has completed.`);
          logProcessSequence(`Process P${i + 1} has completed.`);
        } else {
          const workBefore = [...work];
          logCalculationProcess(`P${i + 1}`, workBefore, need[i], allocation[i], work, false);
          if (!deadlockProcesses.includes(`P${i + 1}`)) {
            deadlockProcesses.push(`P${i + 1}`);
          }
        }
      }
    }
    if (!found) {
      const deadlockCause = deadlockProcesses[0];
      displayMessage('Deadlock detected!', 'danger');
      document.body.style.background = 'red'; // Change background to gradient + red color
      clear_process_sequence();
      document.getElementById('deadlockProcesses').innerHTML = `<strong>Processes involved in deadlock:</strong> ${deadlockProcesses.join(', ')}. <br> Process ${deadlockCause} caused the deadlock.`;
      $('#deadlockModal').modal('show');
      console.error('Deadlock detected:', { available, allocation, need, work, safeSeq });
      logProcessSequence(`Deadlock detected. Process ${deadlockCause} caused the deadlock.`);
      return;
    }
  }

  animateProcessSequence(safeSeq);
  document.body.style.background = "green"; // Change background to cool green for safe state
  displayMessage('System is in a safe state.', 'success');
  console.log('Safe sequence found:', safeSeq);
  log.forEach(msg => console.log(msg));
  logProcessSequence('Safe sequence found: ' + safeSeq.join(', '));
}

// Wrapper function to run the algorithm
function run_algo_wrapper() {
  find_need();
  updateAvailableResources(); // Update available resources before running the algorithm
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

document.addEventListener('DOMContentLoaded', () => {
  enforceNumericInput();
  updateAvailableResources(); // Initialize available resources based on current inputs
  // Initialize tooltips
  $('[data-toggle="tooltip"]').tooltip();
});
