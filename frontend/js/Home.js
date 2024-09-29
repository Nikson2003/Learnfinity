let toggleBtn = document.getElementById("toggle-btn");
let body = document.body;
let darkMode = localStorage.getItem("dark-mode");

const enableDarkMode = () => {
  toggleBtn.classList.replace("fa-sun", "fa-moon");
  body.classList.add("dark");
  localStorage.setItem("dark-mode", "enabled");
};

const disableDarkMode = () => {
  toggleBtn.classList.replace("fa-moon", "fa-sun");
  body.classList.remove("dark");
  localStorage.setItem("dark-mode", "disabled");
};

if (darkMode === "enabled") {
  enableDarkMode();
}

toggleBtn.onclick = (e) => {
  darkMode = localStorage.getItem("dark-mode");
  if (darkMode === "disabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
};

let profile = document.querySelector(".header .flex .profile");

document.querySelector("#user-btn").onclick = () => {
  profile.classList.toggle("active");
  search.classList.remove("active");
};

let search = document.querySelector(".header .flex .search-form");

document.querySelector("#search-btn").onclick = () => {
  search.classList.toggle("active");
  profile.classList.remove("active");
};

let sideBar = document.querySelector(".side-bar");

document.querySelector("#menu-btn").onclick = () => {
  sideBar.classList.toggle("active");
  body.classList.toggle("active");
};

document.querySelector("#close-btn").onclick = () => {
  sideBar.classList.remove("active");
  body.classList.remove("active");
};

window.onscroll = () => {
  profile.classList.remove("active");
  search.classList.remove("active");

  if (window.innerWidth < 1200) {
    sideBar.classList.remove("active");
    body.classList.remove("active");
  }
};

//search form
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  const searchBox = document.getElementById("search-box");
  const courseBoxes = document.querySelectorAll(".courses .box");

  // Listen for the form submission
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission

    const searchTerm = searchBox.value.toLowerCase().trim();

    // Filter course boxes
    let foundMatch = false; // Flag to check if any course matches
    courseBoxes.forEach((box) => {
      const courseTitle = box.querySelector(".title").textContent.toLowerCase();
      const keywords = box.getAttribute("data-keywords")
        ? box.getAttribute("data-keywords").toLowerCase()
        : "";

      // Check if the search term matches the course title or keywords
      if (courseTitle.includes(searchTerm) || keywords.includes(searchTerm)) {
        box.style.display = "block"; // Show matching course
        foundMatch = true; // Set flag to true
      } else {
        box.style.display = "none"; // Hide non-matching course
      }
    });

    // If no matches are found, display a message
    if (!foundMatch) {
      alert(`No courses found for "${searchTerm}"`);
    }
  });
});

//Teachers form
document.addEventListener("DOMContentLoaded", () => {
  const teacherBoxes = document.querySelectorAll(".teachers .box");
  const searchInput = document.querySelector(".search_tutor input");

  // Event listener for search input
  searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();

    teacherBoxes.forEach((box) => {
      // Get the teacher's name and keywords
      const teacherName = box.querySelector("h3").textContent.toLowerCase();
      const keywords = box.getAttribute("data-keywords").toLowerCase();

      // Check if the search term matches the teacher's name or keywords
      if (teacherName.includes(searchTerm) || keywords.includes(searchTerm)) {
        box.style.display = "block"; // Show the box
      } else {
        box.style.display = "none"; // Hide the box
      }
    });
  });
});

//Fnction for name updation of teachers from teachers to teacher_profile
// Function to get query parameters
function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Update the profile details dynamically on teacher_profile.html
document.addEventListener("DOMContentLoaded", () => {
  // Check if this is the teacher profile page
  if (document.querySelector(".teacher_profile")) {
    const teacherName = getQueryParameter("name");
    const nameElement = document.querySelector(
      ".teacher-profile .details .tutor h3"
    );

    if (teacherName && nameElement) {
      nameElement.textContent = teacherName;
    }
  }
});
