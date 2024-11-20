// DOM Elements
const loginForm = document.getElementById("loginForm");
const employeeDetailsSection = document.getElementById(
  "employeeDetailsSection"
);
const leaveApplicationSection = document.getElementById(
  "leaveApplicationSection"
);
const managerSection = document.getElementById("managerSection");
const leaveForm = document.getElementById("leaveForm");
const applicationsTable = document.getElementById("applicationsTable");

const proceedToLeaveBtn = document.getElementById("proceedToLeave");
const logoutEmployeeBtn = document.getElementById("logoutEmployee");
const backToDetailsBtn = document.getElementById("backToDetails");
const logoutManagerBtn = document.getElementById("logoutManager");

// Sample Data for Employees
const employeeData = {
  EMP101: {
    name: "John Doe",
    fathersName: "Robert Doe",
    mothersName: "Maria Doe",
    address: "123 Elm St, Springfield",
    designation: "Software Engineer",
    workingHours: "9 AM - 6 PM",
    mobile: "+1234567890",
    experience: "5 years",
    availableLeaves: 15,
  },
  EMP102: {
    name: "Alice Brown",
    fathersName: "David Brown",
    mothersName: "Sophia Brown",
    address: "456 Maple St, Springfield",
    designation: "HR Manager",
    workingHours: "10 AM - 7 PM",
    mobile: "+1234567891",
    experience: "8 years",
    availableLeaves: 12,
  },
  EMP103: {
    name: "Charlie Smith",
    fathersName: "William Smith",
    mothersName: "Emily Smith",
    address: "789 Oak St, Springfield",
    designation: "Frontend Developer",
    workingHours: "9 AM - 5 PM",
    mobile: "+1234567892",
    experience: "3 years",
    availableLeaves: 10,
  },
  EMP104: {
    name: "David Wilson",
    fathersName: "Richard Wilson",
    mothersName: "Linda Wilson",
    address: "321 Pine St, Springfield",
    designation: "Backend Developer",
    workingHours: "11 AM - 8 PM",
    mobile: "+1234567893",
    experience: "4 years",
    availableLeaves: 14,
  },
  EMP105: {
    name: "Ella Johnson",
    fathersName: "James Johnson",
    mothersName: "Grace Johnson",
    address: "654 Birch St, Springfield",
    designation: "QA Engineer",
    workingHours: "9:30 AM - 6:30 PM",
    mobile: "+1234567894",
    experience: "2 years",
    availableLeaves: 13,
  },
  EMP106: {
    name: "Frank Lee",
    fathersName: "Henry Lee",
    mothersName: "Lucy Lee",
    address: "987 Cedar St, Springfield",
    designation: "Data Scientist",
    workingHours: "10 AM - 7 PM",
    mobile: "+1234567895",
    experience: "6 years",
    availableLeaves: 11,
  },
  EMP107: {
    name: "Grace Adams",
    fathersName: "Patrick Adams",
    mothersName: "Diana Adams",
    address: "111 Walnut St, Springfield",
    designation: "UI/UX Designer",
    workingHours: "8 AM - 4 PM",
    mobile: "+1234567896",
    experience: "5 years",
    availableLeaves: 12,
  },
  EMP108: {
    name: "Hannah Martin",
    fathersName: "Daniel Martin",
    mothersName: "Olivia Martin",
    address: "222 Cherry St, Springfield",
    designation: "Marketing Manager",
    workingHours: "9 AM - 6 PM",
    mobile: "+1234567897",
    experience: "9 years",
    availableLeaves: 14,
  },
  EMP109: {
    name: "Ian Carter",
    fathersName: "George Carter",
    mothersName: "Evelyn Carter",
    address: "333 Spruce St, Springfield",
    designation: "DevOps Engineer",
    workingHours: "12 PM - 9 PM",
    mobile: "+1234567898",
    experience: "7 years",
    availableLeaves: 13,
  },
  EMP110: {
    name: "Jane Foster",
    fathersName: "Andrew Foster",
    mothersName: "Charlotte Foster",
    address: "444 Elm St, Springfield",
    designation: "Project Manager",
    workingHours: "9 AM - 6 PM",
    mobile: "+1234567899",
    experience: "10 years",
    availableLeaves: 16,
  },
};

const managerData = {
  MAN001: {
    name: "Jane Smith",
  },
};

let leaveApplications = []; // Stores all leave applications

// Login Logic
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userId = document.getElementById("userId").value.trim();

  // Employee Login
  if (employeeData[userId]) {
    sessionStorage.setItem("loggedInUserId", userId); // Store employee ID in sessionStorage
    displayEmployeeDetails(employeeData[userId]);
    loginForm.classList.add("hidden");
    employeeDetailsSection.classList.remove("hidden");
  }
  // Manager Login
  else if (managerData[userId]) {
    sessionStorage.setItem("loggedInUserId", userId); // Store manager ID in sessionStorage
    displayLeaveApplications();
    loginForm.classList.add("hidden");
    managerSection.classList.remove("hidden");
  } else {
    alert("Invalid ID!");
  }
});

// Display Employee Details
function displayEmployeeDetails(details) {
  document.getElementById("empName").textContent = details.name;
  document.getElementById("empFathersName").textContent = details.fathersName;
  document.getElementById("empMothersName").textContent = details.mothersName;
  document.getElementById("empAddress").textContent = details.address;
  document.getElementById("empDesignation").textContent = details.designation;
  document.getElementById("empWorkingHours").textContent = details.workingHours;
  document.getElementById("empMobile").textContent = details.mobile;
  document.getElementById("empExperience").textContent = details.experience;
  document.getElementById("availableLeaves").textContent =
    details.availableLeaves;
}

// Apply Leave
proceedToLeaveBtn.addEventListener("click", () => {
  employeeDetailsSection.classList.add("hidden");
  leaveApplicationSection.classList.remove("hidden");
});

// Handle Leave Submission
leaveForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const leaveType = document.getElementById("leaveType").value;
  const leaveDays = parseInt(document.getElementById("leaveDays").value, 10);
  const leaveReason = document.getElementById("leaveReason").value;
  const userId = sessionStorage.getItem("loggedInUserId");
  const employee = employeeData[userId];

  if (employee.availableLeaves >= leaveDays) {
    // Add to applications
    leaveApplications.push({
      name: employee.name,
      leaveType,
      leaveDays,
      leaveReason,
      employeeId: userId,
    });

    // Update available leaves for the employee
    employee.availableLeaves -= leaveDays;
    document.getElementById("availableLeaves").textContent =
      employee.availableLeaves;

    alert("Leave application submitted successfully!");
    leaveForm.reset(); // Reset form fields
    leaveApplicationSection.classList.add("hidden");
    employeeDetailsSection.classList.remove("hidden");
  } else {
    alert("Insufficient leave balance!");
  }
});

// Back to Employee Details
backToDetailsBtn.addEventListener("click", () => {
  leaveApplicationSection.classList.add("hidden");
  employeeDetailsSection.classList.remove("hidden");
});

// Logout Employee
logoutEmployeeBtn.addEventListener("click", () => {
  employeeDetailsSection.classList.add("hidden");
  loginForm.classList.remove("hidden");
});

// Display Leave Applications for Manager with feedback
function displayLeaveApplications() {
  applicationsTable.innerHTML = leaveApplications
    .map(
      (application, index) => `
    <tr id="application-${index}">
      <td>${application.name}</td>
      <td>${application.leaveType}</td>
      <td>${application.leaveDays}</td>
      <td>${application.leaveReason}</td>
      <td class="status">${application.status || "Pending"}</td>
      <td>
        <button onclick="acceptLeave(${index})">Accept</button>
        <button onclick="rejectLeave(${index})">Reject</button>
      </td>
    </tr>
  `
    )
    .join("");
}
function editLeaveBalance(employeeId, applicationIndex) {
  const employee = employeeData[employeeId];
  const newBalance = prompt(
    `Enter new available leave balance for ${employee.name}:`,
    employee.availableLeaves
  );

  if (newBalance !== null && !isNaN(newBalance) && newBalance >= 0) {
    employee.availableLeaves = parseInt(newBalance, 10); // Update the employee's leave balance
    document.getElementById("availableLeaves").textContent =
      employee.availableLeaves; // Update display
    alert("Leave balance updated successfully!");
    displayLeaveApplications(); // Re-render the table to show updated balance
  } else {
    alert("Invalid leave balance entered.");
  }
}

// Accept Leave
function acceptLeave(index) {
  const application = leaveApplications[index];
  const employee = employeeData[application.employeeId];

  if (employee) {
    // Confirm if manager really wants to accept leave
    const confirmation = confirm(
      `Are you sure you want to accept the leave request for ${application.name}?`
    );

    if (confirmation) {
      if (employee.availableLeaves >= application.leaveDays) {
        employee.availableLeaves -= application.leaveDays; // Reduce available leaves
        leaveApplications[index].status = "Accepted"; // Update status
        alert("Leave Accepted");
        displayLeaveApplications(); // Re-render table
      } else {
        alert("Insufficient leave balance");
      }
    }
  }
}

// Reject Leave
function rejectLeave(index) {
  const confirmation = confirm(
    `Are you sure you want to reject the leave request for ${leaveApplications[index].name}?`
  );

  if (confirmation) {
    leaveApplications[index].status = "Rejected"; // Update status
    alert("Leave Rejected");
    displayLeaveApplications(); // Re-render table
  }
}

// Logout Manager
logoutManagerBtn.addEventListener("click", () => {
  managerSection.classList.add("hidden");
  loginForm.classList.remove("hidden");
});
// On page load, check if user is already logged in
window.addEventListener("load", () => {
  const loggedInUserId = sessionStorage.getItem("loggedInUserId");
  if (loggedInUserId) {
    if (employeeData[loggedInUserId]) {
      displayEmployeeDetails(employeeData[loggedInUserId]);
      loginForm.classList.add("hidden");
      employeeDetailsSection.classList.remove("hidden");
    } else if (managerData[loggedInUserId]) {
      displayLeaveApplications();
      loginForm.classList.add("hidden");
      managerSection.classList.remove("hidden");
    }
  }
});
