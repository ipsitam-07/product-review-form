export function ReviewForm(): HTMLFormElement {
  const form = document.createElement('form');

  form.innerHTML = `
    <input name="title" value="text" />
    <button type="submit">
      Submit Item
    </button>
  `;

  form.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();
    // mutate state
    // persist
    // renderApp()
  });

  return form;
}
