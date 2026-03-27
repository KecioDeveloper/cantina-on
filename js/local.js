(function(){
  const cards = document.querySelectorAll('.card');
  const info = document.getElementById('selectedInfo');
  const confirmBtn = document.getElementById('confirmBtn');
  const limparBtn = document.getElementById('limparBtn');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');
  let selectedId = localStorage.getItem('cantina_on_selected') || null;

  function updateUI(){
    cards.forEach(card => {
      const id = card.dataset.id;
      if(id === selectedId){ card.classList.add('selected'); }
      else { card.classList.remove('selected'); }
    });
    if(selectedId){
      const el = document.querySelector(`.card[data-id="${selectedId}"]`);
      info.textContent = 'Selecionado — ' + el.querySelector('.title').textContent;
      confirmBtn.disabled = false;
    } else {
      info.textContent = 'Nenhum local selecionado';
      confirmBtn.disabled = true;
    }
  }

  function showToast(message){
    toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      selectedId = (selectedId === id) ? null : id;
      if(selectedId) localStorage.setItem('cantina_on_selected', id);
      else localStorage.removeItem('cantina_on_selected');
      updateUI();
    });
  });

  confirmBtn.addEventListener('click', () => {
    if(!selectedId) return;
    const el = document.querySelector(`.card[data-id="${selectedId}"]`);
    showToast('Retirada confirmada em: ' + el.querySelector('.title').textContent + '.');
  });

  limparBtn.addEventListener('click', () => {
    selectedId = null;
    localStorage.removeItem('cantina_on_selected');
    updateUI();
    showToast('Seleção limpa.');
  });

  updateUI();
})();