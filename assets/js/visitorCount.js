/* Call API Gateway to increment visitor count by country */
fetch('https://ttkp7mg2o7.execute-api.eu-west-1.amazonaws.com/track', { method: 'POST' })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    document.getElementById('visitor-message').textContent = data.message;
  }).catch(err => console.error('Failed to update country count:', err));

/* Fetch top visitors by country */
//TODO