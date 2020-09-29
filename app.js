const form = document.getElementById('form');
const userQuery = document.getElementById('userQuery');
const outputDiv = document.getElementById('grid');
function showError(message) {
  const h1 = document.getElementById('error');
  h1.innerHTML = message;
  setTimeout(() => {
    h1.innerHTML = '';
  }, 2000);
}

async function fetchRedditData(e) {
  e.preventDefault();
  if (userQuery.value === '') {
    showError('Enter a correct value');
  } else {
    const QUERY = userQuery.value;
    const API_URL = `https://www.reddit.com/search.json?q=${QUERY}`;
    const res = await fetch(`${API_URL}`);
    const data = await res.json();
    console.log(data);
    showRedditData(data);
  }
}

function truncateText(text, limit) {
  const shortended = text.indexOf(' ', limit);
  if (shortended === -1) return text;
  return text.substring(0, shortended);
}

function showRedditData(data) {
  let output = '';
  data.data.children.map((item) => {
    output += `
    <div class="card">
    <div class="card-img-container">
      <img src="${item.data.thumbnail}" alt="">
    </div>
    <p> ${item.data.title}</p>
    <br /> 
    <br /> 
    <p>Subreddit: ${item.data.subreddit}</p>
    <br /> 
    <br /> 
    <br /> 
    <div class="badge-container">
      <span class="badge badge-primary">Votes: ${item.data.ups}</span>
      <span class="badge badge-success">Score: ${item.data.score}</span>
    </div>
  </div>
    `;
  });
  outputDiv.innerHTML = output;
}

// EVENT LISTENERS
form.addEventListener('submit', fetchRedditData);
