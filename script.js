function searchUser() {
  const username = document.getElementById('usernameInput').value;

  document.getElementById('resultContainer').innerHTML = '';

  axios.get(`https://api.github.com/users/${username}`)
    .then(response => {
      const user = response.data;


      const userDiv = document.createElement('div');
      userDiv.innerHTML = `
        <h2>${user.login}</h2>
        <img src="${user.avatar_url}" alt="Avatar" style="width: 100px; border-radius: 50%;">
        <p>Followers: ${user.followers}</p>
        <p>Repos: ${user.public_repos}</p>
      `;
      document.getElementById('resultContainer').appendChild(userDiv);

      return axios.get(`https://api.github.com/users/${username}/repos`);
    })
    .then(response => {
      const repositories = response.data;

      const reposDiv = document.createElement('div');
      reposDiv.innerHTML = '<h3>Repositories:</h3>';
      const ul = document.createElement('ul');

      repositories.forEach(repo => {
        const li = document.createElement('li');
        li.textContent = repo.name;
        ul.appendChild(li);
      });

      reposDiv.appendChild(ul);
      document.getElementById('resultContainer').appendChild(reposDiv);
    })
    .catch(error => {
      console.error('Error fetching data from GitHub API:', error);
      alert('Error fetching data from GitHub API. Please check the username and try again.');
    });
}
