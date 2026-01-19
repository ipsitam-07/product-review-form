import { renderApp } from './App';
import type { AppState } from '../types/review';
import { TAG_OPTIONS, RECOMMEND_OPTIONS } from '../utils/constants';

export function TagsAndRecommendSection(state: AppState): HTMLElement {
  const section = document.createElement('section');
  section.className = 'form-section';

  //Tags
  const tags = document.createElement('div');
  tags.className = 'form-group';

  const tagsLabel = document.createElement('label');
  tagsLabel.innerHTML = 'Product Tags <small>(Select all that apply)</small>';
  tags.appendChild(tagsLabel);

  const tagsContainer = document.createElement('div');
  tagsContainer.className = 'tags-container';

  TAG_OPTIONS.forEach((tag) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'tag-btn';
    button.textContent = tag;

    if (state.reviewForm.data.tags.includes(tag)) {
      button.classList.add('tag-btn-selected');
    }

    button.addEventListener('click', () => {
      const tags = state.reviewForm.data.tags;

      state.reviewForm.data.tags = tags.includes(tag)
        ? tags.filter((t) => t !== tag)
        : [...tags, tag];

      renderApp();
    });

    tagsContainer.appendChild(button);
  });

  tags.appendChild(tagsContainer);
  section.appendChild(tags);

  //Recommend
  const recommend = document.createElement('div');
  recommend.className = 'form-group';

  const recommendLabel = document.createElement('label');
  recommendLabel.innerHTML =
    'Would you recommend this product? <span class="required-star">*</span>';
  recommend.appendChild(recommendLabel);

  const radioStack = document.createElement('div');
  radioStack.className = 'radio-stack';

  RECOMMEND_OPTIONS.forEach((option) => {
    const label = document.createElement('label');

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'recommend';
    radio.value = option;
    radio.checked = state.reviewForm.data.recommend === option;

    radio.addEventListener('change', () => {
      state.reviewForm.data.recommend = option;
      renderApp();
    });

    label.appendChild(radio);
    label.append(` ${option}`);
    radioStack.appendChild(label);
  });

  recommend.appendChild(radioStack);

  const recommendError = document.createElement('span');
  recommendError.className = 'error-msg';

  const recommendErrMsg = state.reviewForm.ui.errors.recommend;
  if (recommendErrMsg) {
    recommendError.textContent = recommendErrMsg;
  }

  recommend.appendChild(recommendError);

  section.appendChild(recommend);

  return section;
}
