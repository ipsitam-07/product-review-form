import type { AppState, Review } from '../types/review';
import { ratingsParser } from '../services/ratingsParser';
import { HEADERS } from '../utils/constants';
import { actionsCell } from './TableActions';

export function Table(state: AppState): HTMLElement {
  const section = document.createElement('section');
  section.className = 'table-section';

  const header = document.createElement('header');
  header.className = 'header';

  const heading = document.createElement('h1');
  heading.className = 'header-h1';
  heading.textContent = 'Submitted Reviews';

  const subHeading = document.createElement('p');
  subHeading.className = 'header-p';
  subHeading.textContent = 'Live Data';

  header.appendChild(heading);
  header.appendChild(subHeading);

  section.appendChild(header);

  if (state.reviews.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = 'No records';
    section.appendChild(empty);
    return section;
  }

  const table = document.createElement('table');
  table.className = 'reviews-table';

  table.appendChild(tableHead());
  table.appendChild(tableBody(state.reviews));

  section.appendChild(table);
  return section;
}

//table head helper
function tableHead(): HTMLTableSectionElement {
  const thead = document.createElement('thead');
  const row = document.createElement('tr');

  HEADERS.forEach((text) => {
    const th = document.createElement('th');
    th.textContent = text;
    row.appendChild(th);
  });

  thead.appendChild(row);
  return thead;
}

//table row helper
function rowCell(text: string): HTMLTableCellElement {
  const td = document.createElement('td');
  td.textContent = text;
  return td;
}

function tableRow(review: Review): HTMLTableRowElement {
  const row = document.createElement('tr');

  row.appendChild(rowCell(review.title));
  row.appendChild(rowCell(review.details));
  row.appendChild(rowCell(review.date));

  const ratingsCell = document.createElement('td');
  const ratingLine = ratingsParser(review.rating);

  ratingLine.forEach((line) => {
    const div = document.createElement('div');
    div.className = 'rating-line';
    div.textContent = line;
    ratingsCell.appendChild(div);
  });

  row.appendChild(ratingsCell);

  row.appendChild(rowCell(review.reviewType));

  row.appendChild(tagsCell(review.tags));
  row.appendChild(rowCell(review.recommend));
  row.appendChild(rowCell(review.makePublic ? 'Yes' : 'No'));
  row.appendChild(actionsCell(review.id));

  return row;
}
function tableBody(reviews: Review[]): HTMLTableSectionElement {
  const tbody = document.createElement('tbody');

  reviews.forEach((review) => {
    tbody.appendChild(tableRow(review));
  });

  return tbody;
}

function tagsCell(tags: string[]): HTMLTableCellElement {
  const td = document.createElement('td');

  if (tags.length === 0) {
    td.textContent = '—';
    return td;
  }
  const container = document.createElement('div');
  container.className = 'tags-container';

  tags.forEach((tag) => {
    const span = document.createElement('span');
    span.className = 'tag-pill';
    span.textContent = tag;
    container.appendChild(span);
  });

  td.appendChild(container);
  return td;
}
