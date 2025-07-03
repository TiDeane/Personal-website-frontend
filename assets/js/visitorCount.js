/* Increment visitor count by country */
fetch('https://d3f2t5moya606c.cloudfront.net/track', {
  method: 'POST'
}).catch(err =>
  console.error('Failed to update country count:', err)
);

/* Fetch top visitors by country */
fetch('https://epgcnl1cpf.execute-api.eu-west-1.amazonaws.com/top')
  .then(res => res.json())
  .then(data => {
    const countries = data.topCountries.map(c => `${c.countryName} (${c.count})`);
    document.getElementById('visitor-message').textContent = `Top countries by visitor count: ${countries.join(', ')}`;
  }).catch(() =>
    document.getElementById('visitor-message').textContent = ''
  );
