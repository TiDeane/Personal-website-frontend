/* Increment visitor count by country */
fetch('https://ttkp7mg2o7.execute-api.eu-west-1.amazonaws.com/track', {
  method: 'POST'
}).catch(err =>
  console.error('Failed to update country count:', err)
);

/* Fetch top visitors by country */
fetch('https://ttkp7mg2o7.execute-api.eu-west-1.amazonaws.com/top')
  .then(res => res.json())
  .then(data => {
    const countries = data.topCountries.map(c => `${c.countryCode} (${c.count})`);
    document.getElementById('visitor-message').textContent = `Top countries by visitor count: ${countries.join(', ')}`;
  }).catch(() =>
    document.getElementById('visitor-message').textContent = ''
  );
