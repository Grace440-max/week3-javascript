//task1
const resources = [
    {
        id: 1,
        title: "JavaScript Basics",
        category: "JavaScript",
        description: "Learn variables and data types.",
        completed: false
    },
    {
        id: 2,
        title: "CSS Fundamentals",
        category: "CSS",
        description: "Learn how to style webpages.",
        completed: false
    },
    {
        id: 3,
        title: "Git and GitHub",
        category: "Git & GitHub",
        description: "Learn version control and repositories.",
        completed: false
    },
    {
        id: 4,
        title: "JavaScript Functions",
        category: "JavaScript",
        description: "Understand functions and how to use them.",
        completed: false
    },
    {
        id: 5,
        title: "Communication Skills",
        category: "Career Skills",
        description: "Improve professional communication.",
        completed: false
    },
    {
        id: 6,
        title: "CSS Layouts",
        category: "CSS",
        description: "Learn Flexbox and Grid layouts.",
        completed: false
    }
];



console.log(resources.length);
//task2

const resourceList = document.querySelector("#resource-list");

function displayResources(list) {
  resourceList.innerHTML = "";   

  list.forEach(function(resource) {
    const card = document.createElement("div");
    card.classList.add("resource-card");

    const title = document.createElement("h3");
    title.textContent = resource.title;

    const category = document.createElement("p");
    category.textContent = "Category: " + resource.category;

    const description = document.createElement("p");
    description.textContent = resource.description;

    const status = document.createElement("p");
    status.textContent = resource.completed ? "Completed" : "Not completed";

    const button = document.createElement("button");
    button.dataset.id = resource.id;
    button.textContent = resource.completed ? "Mark as Incomplete" : "Mark as Completed";  

    card.append(title, category, description, status, button);
    resourceList.appendChild(card);
  });
}

displayResources(resources);

//task3 and task4

const searchInput = document.querySelector("#search-input");
const categoryFilter = document.querySelector("#category-filter");
const emptyMessage = document.querySelector("#empty-message");

function applyFilters() {
  const query = searchInput.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;

  const filtered = resources.filter(function(resource) {
    const matchesSearch =
      resource.title.toLowerCase().includes(query) ||
      resource.description.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === "all" || resource.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  emptyMessage.hidden = filtered.length !== 0;

  displayResources(filtered);
}

searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);

//task5

resourceList.addEventListener("click", function(event) {
  const button = event.target.closest("button");

  if (!button) {
    return;   
  }

  const id = Number(button.dataset.id);

  const resource = resources.find(function(item) {
    return item.id === id;
  });

  if (resource) {
    resource.completed = !resource.completed;

    applyFilters();
  }
});
//task6
const resourceCount = document.querySelector("#resource-count");
const completedCount = document.querySelector("#completed-count");

function updateProgress(filteredList) {
  const completed = resources.filter(function(resource) {
    return resource.completed;
  });

  resourceCount.textContent = "Resources: " + filteredList.length;
  completedCount.textContent = "Completed: " + completed.length;
}
function applyFilters() {
  const query = searchInput.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;

  const filtered = resources.filter(function(resource) {
    const matchesSearch =
      resource.title.toLowerCase().includes(query) ||
      resource.description.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === "all" || resource.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (filtered.length === 0) {
    emptyMessage.hidden = false;
  } else {
    emptyMessage.hidden = true;
  }

  updateProgress(filtered);
  displayResources(filtered);
}