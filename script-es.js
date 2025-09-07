document.getElementById('language-select').addEventListener('change', function() {
  const lang = this.value;
  const currentPage = window.location.pathname.split('/').pop();
  const pageMap = {
    'index.html': 'index-es.html',
    'about.html': 'about-es.html',
    'operation.html': 'operation-es.html',
    'allproducts.html': 'allproducts-es.html',
    'env-safety.html': 'env-safety-es.html',
    'index-es.html': 'index.html',
    'about-es.html': 'about.html',
    'operation-es.html': 'operation.html',
    'allproducts-es.html': 'allproducts.html',
    'env-safety-es.html': 'env-safety.html'
  };
  const targetPage = pageMap[currentPage] || (lang === 'en' ? 'index.html' : 'index-es.html');
  window.location.href = targetPage;
});