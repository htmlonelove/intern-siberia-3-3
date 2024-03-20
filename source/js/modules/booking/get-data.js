import {renderCards} from './bath-cards-render';

const URL = '../../../api/objects';
const ERROR_TEXT = 'Не удалось получить данные';

async function getResponse(url = URL) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
}

export async function renderBaths() {
  const baths = await getResponse().then((data) => {
    return data.data;
  }).catch(() => {
    throw new Error(ERROR_TEXT);
  });

  renderCards(baths);
}

