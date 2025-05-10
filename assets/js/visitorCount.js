/* later on, store and query from DynamoDB */
var n = localStorage.getItem('visitor_counter');
if (n === null) {
  n = 0;
}
n++;

localStorage.setItem("visitor_counter", n);

document.getElementById('visitor-count').textContent = n;

/* also, maybe store visitor's country and display top countries on a stats page? */