document.addEventListener('DOMContentLoaded', function () {
  loadItems();
  addAuthor();
});


var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("add_btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.addEventListener('click', function () {
  modal.style.display = "block";
})

var submit = document.getElementById("submit")

submit.addEventListener('click', function () {
  modal.style.display = "none";
  
})

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


const formEl = document.querySelector(".form");

formEl.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(formEl);
  const data = Object.fromEntries(formData);
  console.log(data);
  fetch('https://wt.ops.labs.vu.nl/api23/41ba78fd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(function() {
    loadItems();
    addAuthor();
    location.reload();
  })

})


let refreshBtn = document.getElementById("refresh_btn");

refreshBtn.addEventListener('click', function () {
  loadItems();
  location.reload();
})

async function loadItems() {
  let tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";
  let response = await fetch("https://wt.ops.labs.vu.nl/api23/41ba78fd");
  let data = await response.json();
  data.forEach(row => {
    tableBody.innerHTML += `
    <tr>
    <td>
      <figure>
        <img src="${row.image}"
          alt="${row.alt}" width="100">
        <figcaption><em>${row.author}</em></figcaption>
      </figure>
    </td>
    <td>
      <h3>${row.author}</h3>
    </td>
    <td>
      <p>${row.alt}</p>
    </td>
    <td>
      <ul>
        <li>${row.tags}</li>
      </ul>
    </td>
    <td>
      <p>${row.description}</p>
    </td>
  </tr>
    `;
  });
  let authorName = document.querySelectorAll("h3");

  authorName.forEach(author => {
    author.addEventListener("click", (event) => {
      filter(author.innerHTML);
    });
  });
 
}



function filter(author) {
  let filteredName = document.querySelectorAll("h3");

  filteredName.forEach(compareName => {
    if (author !== compareName.innerHTML) {
      compareName.parentNode.parentNode.classList.add("d-none");
    }

  })
}


let rstBtn = document.getElementById("reset_btn")

rstBtn.addEventListener('click', function () {
  reset();
});

async function reset() {
  let tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";
  let response = await fetch('https://wt.ops.labs.vu.nl/api23/41ba78fd/reset');

  let second_response = await fetch("https://wt.ops.labs.vu.nl/api23/41ba78fd");
  let data = await second_response.json();
  data.forEach(row => {
    tableBody.innerHTML += `
    <tr>
    <td>
      <figure>
        <img src="${row.image}"
          alt="${row.alt}" width="100">
        <figcaption><em>${row.author}</em></figcaption>
      </figure>
    </td>
    <td>
      <h3>${row.author}</h3>
    </td>
    <td>
      <p>${row.alt}</p>
    </td>
    <td>
      <ul>
        <li>${row.tags}</li>
      </ul>
    </td>
    <td>
      <p>${row.description}</p>
    </td>
  </tr>
    `;
  });

}


let searchBar = document.querySelector(".searchBar");

searchBar.addEventListener("input", event => {
  let someName = event.currentTarget.value;
  if(someName === someName.toUpperCase()) {
    filteringValue(someName.toLowerCase());
  }else if (someName === someName.toLowerCase()) {
    filteringValue(someName);
  }else {
    filteringValue(someName.toLowerCase());
  }
  
});

function filteringValue(someName) {
  remover();
  let filteredName = document.querySelectorAll("h3");
  filteredName.forEach(compareName => {
    let nameAuthorLowerCase = compareName.innerHTML.toLocaleLowerCase();
    if (nameAuthorLowerCase.indexOf(someName) === -1) {
      compareName.parentNode.parentNode.classList.add("d-none");
    }
  })
}

function remover() {
  let remover = document.querySelectorAll(".d-none");
  remover.forEach(item => {
    item.classList.remove("d-none");
  })
}

function addAuthor() {
  fetch('https://wt.ops.labs.vu.nl/api23/41ba78fd')
  .then(response => response.json())
  .then(jsonData => {
    var authorList = [];
    jsonData.forEach(function(item) {
      if(!authorList.includes(item.author)) {
        authorList.push(item.author);
      };
  });
  let list = document.querySelector("ul");

  for (let author of authorList) {
    var listItem = document.createElement('li');
    listItem.innerHTML = author;
    list.appendChild(listItem);
  }
  });

  const myList = document.getElementById("myList");
  myList.addEventListener("click", async function(event) {
    await loadItems1();
  if (event.target.nodeName === "LI") {
    console.log(event.target.textContent);
    filter(event.target.textContent);
  }
});
}

async function loadItems1() {
  let tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";
  let response = await fetch("https://wt.ops.labs.vu.nl/api23/41ba78fd");
  let data = await response.json();
  data.forEach(row => {
    tableBody.innerHTML += `
    <tr>
    <td>
      <figure>
        <img src="${row.image}"
          alt="${row.alt}" width="100">
        <figcaption><em>${row.author}</em></figcaption>
      </figure>
    </td>
    <td>
      <h3>${row.author}</h3>
    </td>
    <td>
      <p>${row.alt}</p>
    </td>
    <td>
      <ul>
        <li>${row.tags}</li>
      </ul>
    </td>
    <td>
      <p>${row.description}</p>
    </td>
  </tr>
    `;
  });
}
