# Banker's Algorithm Project

## Project Overview

This project implements the Banker's Algorithm for deadlock avoidance in the context of an Operating Systems course (CSC1107) at the University of Glasgow, Singapore. The algorithm simulates a system with five processes and four types of resources, each with multiple instances. The primary objective is to visualize and understand how the Banker's Algorithm ensures that the system remains in a safe state and avoids deadlock.

## Objectives

- **Educational Purpose:** To provide an interactive tool that helps students learn and understand the Banker's Algorithm through visualization and interaction.
- **Practical Implementation:** To implement the Banker's Algorithm in a web-based interface, allowing users to input different scenarios and observe the algorithm's behavior.

## Features

- **Interactive Input:** Users can input the allocation, maximum, and available resources for each process.
- **Dynamic Calculation:** The algorithm dynamically calculates the Need matrix and checks for a safe sequence.
- **Error Handling:** Provides informative error messages for invalid inputs and deadlock situations.
- **Visual Feedback:** Changes the background color and displays messages to indicate the system's state (safe or deadlock).
- **Deadlock Explanation:** A modal dialog provides detailed information about why a deadlock occurred and how to prevent it.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Bootstrap 4

## Installation and Usage

1. Clone the repository to your local machine using the following command:
    git clone <repository-url>
2. Open index.html in a web browser.

## Project Files

- `index.html`: The main HTML file containing the structure of the application.
- `style.css`: The CSS file for styling the application.
- `advanceClaim.css`: Additional CSS file for specific styling.
- `advanceClaim.js`: JavaScript file containing the logic for the Banker's Algorithm and interactive features.
- `README.md`: This file.

## How to Use

### Input Values

1. Enter the allocation and maximum resource values for each process.
2. Enter the available instances for each resource type.

### Run Algorithm

1. Click the "Run Algorithm" button to check if the system is in a safe state.
2. If a deadlock is detected, a modal will explain the reasons and suggest preventive measures.

### Example Values

- Click the "Example" button to load predefined values for demonstration.

### Reset Values

- Click the "Reset Values" button to clear all inputs.

## Error Handling

- **Invalid Inputs:** If any input fields are left empty or contain negative values, an error message will prompt the user to correct the inputs.
- **Deadlock Detection:** If a deadlock is detected, the background color changes to red, and a modal dialog provides detailed information about the deadlock and involved processes.

## Deadlock Avoidance with Banker's Algorithm

### Key Concepts

- **Available:** Vector of length m indicating the number of available instances of each resource type.
- **Max:** n x m matrix indicating the maximum demand of each process for each resource type.
- **Allocation:** n x m matrix indicating the current allocation of resources to each process.
- **Need:** n x m matrix calculated as Need[i, j] = Max[i, j] - Allocation[i, j].

### Algorithm Steps

1. Check if the request can be granted based on the Need matrix.
2. Check if the resources are available to fulfill the request.
3. Temporarily allocate the requested resources and check if the system remains in a safe state.
4. If the system is safe, allocate the resources. Otherwise, revert to the previous state and make the process wait.

## References

- Operating Systems Lecture Notes: Lecture 5 - Deadlocks, Pages 29-34.
- University of Glasgow, Singapore: CSC1107 - Operating Systems Course Materials.
- Dijkstra's Banker Algorithm: A theoretical approach for deadlock avoidance in resource allocation.

## Contribution

Feel free to fork this repository, open issues, and submit pull requests.

## License

This project is licensed under the MIT License.