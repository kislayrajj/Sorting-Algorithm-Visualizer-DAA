let array = [];
const arraySize = 50; // Number of bars
let isSorting = false; // Flag to control sorting state

// Function to generate a new random array and render it
function generateArray() {
  array = Array.from(
    { length: arraySize },
    () => Math.floor(Math.random() * 300) + 20
  );
  console.log("Generated array:", array); // Debug log
  renderArray();
}

// Function to render the array as bars in the array-container
function renderArray(highlight = []) {
  const container = document.getElementById("array-container");
  container.innerHTML = ""; // Clear previous bars
  array.forEach((value, idx) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value}px`;

    // Highlight the bars being compared/swapped
    if (highlight.includes(idx)) {
      bar.style.backgroundColor = "red";
    } else {
      bar.style.backgroundColor = "#d4e4d8"; // Default color
    }
    container.appendChild(bar);
  });
}

// Sleep function to control the speed of visualization
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Get speed from the slider
function getSpeed() {
  const slider = document.getElementById("speed-slider");
  return 101 - slider.value;
}

// Bubble Sort Algorithm
async function bubbleSort() {
  isSorting = true;
  for (let i = 0; i < array.length - 1 && isSorting; i++) {
    for (let j = 0; j < array.length - i - 1 && isSorting; j++) {
      renderArray([j, j + 1]); // Highlight current comparison
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Swap
        await sleep(getSpeed()); // Control speed
      }
    }
  }
  isSorting = false;
  renderArray(); // Final render after sorting
}

// Selection Sort Algorithm
async function selectionSort() {
  isSorting = true;
  for (let i = 0; i < array.length - 1 && isSorting; i++) {
    let minIdx = i;
    for (let j = i + 1; j < array.length && isSorting; j++) {
      renderArray([minIdx, j]); // Highlight current comparison
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
      await sleep(getSpeed()); // Control speed
    }
    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]]; // Swap
    }
  }
  isSorting = false;
  renderArray(); // Final render after sorting
}

// Insertion Sort Algorithm
async function insertionSort() {
  isSorting = true;
  for (let i = 1; i < array.length && isSorting; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key && isSorting) {
      renderArray([j, j + 1]); // Highlight current comparison
      array[j + 1] = array[j];
      j = j - 1;
      await sleep(getSpeed()); // Control speed
    }
    array[j + 1] = key;
  }
  isSorting = false;
  renderArray(); // Final render after sorting
}

// Function to start sorting based on selected algorithm
function startSort() {
  if (isSorting) return; // Prevent starting a new sort if one is already in progress
  const algorithm = document.getElementById("algorithm-select").value;
  console.log("Start Sort button clicked"); // Debug log
  switch (algorithm) {
    case "bubble":
      bubbleSort();
      break;
    case "selection":
      selectionSort();
      break;
    case "insertion":
      insertionSort();
      break;
    default:
      bubbleSort();
  }
}

// Stop the current sorting process
function stopSort() {
  isSorting = false; // Set flag to false to stop the sorting
}

// Initialize by generating a random array on page load
generateArray();
