// Signup form submission
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get the signup details
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const role = document.querySelector('input[name="signupRole"]:checked').value; // Either 'Instructor' or 'Student'

  // Send signup request to the server
  const response = await fetch("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, role }),
  });

  const data = await response.json();
  console.log(data);
  alert(data.message || "Signup successful!");

  // Optionally, redirect the user to the login page after signup
  if (data.success) {
    document.getElementById("signupSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
  }
});

// Login form submission
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get login details
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const role = document.querySelector('input[name="loginRole"]:checked').value; // 'Instructor' or 'Student'

  // Determine the correct endpoint based on the role
  const endpoint =
    role === "Instructor" ? "/api/instructors/login" : "/api/users/login";

  // Send login request to the server
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, role }),
  });

  const data = await response.json();
  console.log(data);

  // Check login status and navigate to the appropriate dashboard
  if (data.message === "Login successful!") {
    alert("Login successful! Redirecting...");

    // Redirect based on the user's role
    if (role === "Instructor") {
      window.location.href = "Instructor_dash.html"; // Instructor dashboard
    } else if (role === "Student") {
      window.location.href = "Home.html"; // Student dashboard
    }
  } else {
    // If login fails, show an error message
    alert(data.message || "Login failed! Please check your credentials.");
  }
});

// Toggle between Signup and Login forms
document.getElementById("showSignup").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("signupSection").style.display = "block";
});

document.getElementById("showLogin").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("signupSection").style.display = "none";
  document.getElementById("loginSection").style.display = "block";
});
