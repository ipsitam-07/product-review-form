export function scrollToFirstError(): void {
  const firstError = document.querySelector('.error-msg:not(:empty)');

  if (!firstError) {
    return;
  }

  firstError.scrollIntoView({
    behavior: 'instant',
    block: 'center',
  });
}
