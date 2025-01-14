document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
  
      // Toggle the active class for the button
      button.classList.toggle('active');
  
      // Adjust the max-height to toggle visibility
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
      } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });