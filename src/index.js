import _ from 'lodash';
import './style.css';

const component = () => {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'usom'], ' ');
  element.classList.add('hello');

  return element;
}

document.body.appendChild(component());