import axios from 'axios';
import izitoast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const quoteElement = document.querySelector('.quotes-quote');
const authorElement = document.querySelector('.quotes-author');

const checkDates = (d1, d2) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const shouldFetchQuote = () => {
  const storageDateString = window.localStorage.getItem('quote_date');
  const storageQuoteString = window.localStorage.getItem('quote_data');
  if (!storageDateString || !storageQuoteString) {
    return true;
  }
  const storageDate = new Date(Number(storageDateString));
  const nowDate = new Date();
  const isDatesTheSameDay = checkDates(storageDate, nowDate);
  return !isDatesTheSameDay;
};

const getLocalQuote = () => {
  const storageQuote = window.localStorage.getItem('quote_data');
  return JSON.parse(storageQuote);
};

const setLocalQuote = quote => {
  if (!quote) {
    return;
  }
  window.localStorage.setItem('quote_date', new Date().getTime());
  window.localStorage.setItem('quote_data', JSON.stringify(quote));
};

const fetchQuote = async () => {
  const { data } = await axios.get('https://energyflow.b.goit.study/api/quote');
  return data;
};

const checkQuote = async () => {
  try {
    const shouldFetch = shouldFetchQuote();
    let quoteData;
    if (shouldFetch) {
      quoteData = await fetchQuote();
      setLocalQuote(quoteData);
    } else {
      quoteData = getLocalQuote();
    }

    quoteElement.textContent = quoteData.quote;
    authorElement.textContent = quoteData.author;
  } catch (error) {
    izitoast.error({
      title: 'Something went wrong while getting quote of the day',
      position: 'topRight',
      backgroundColor: '#f53d3d',
      titleColor: 'white',
      progressBar: false,
      icon: '',
    });
    window.localStorage.removeItem('quote_date');
    window.localStorage.removeItem('quote_data');
  }
};

checkQuote();
