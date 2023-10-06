export default {
  show() {
    const loading = document.createElement('div');
    loading.classList.add('loading');
    loading.innerHTML = `
    <div class="loading-wrapper">
      <div class="loading-spinner">
        <div></div>
        <div></div>
        <div><div></div></div>
        <div><div></div></div>
      </div>
    </div>
    `;

    document.body.appendChild(loading);
  },
  hide() {
    const loading = document.querySelector('.loading');

    if (loading) {
      loading.remove();
    }
  },
};
