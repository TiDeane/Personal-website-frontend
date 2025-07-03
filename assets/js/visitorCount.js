/* Increment visitor count by country */
fetch('https://${CLOUDFRONT_DNS}.cloudfront.net/track', {
  method: 'POST'
}).catch(err =>
  console.error('Failed to update country count:', err)
);

/* Fetch top visitors by country */
fetch('https://${HTTP_API_ID}.execute-api.${AWS_REGION}.amazonaws.com/top')
  .then(res => res.json())
  .then(data => {
    const countries = data.topCountries.map(c => `${c.countryName} (${c.count})`);
    document.getElementById('visitor-message').textContent = `Top countries by visitor count: ${countries.join(', ')}`;
  }).catch(() =>
    document.getElementById('visitor-message').textContent = ''
  );
