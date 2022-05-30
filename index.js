function writeTextInTag(tag, text, speed, indexOfLetter = 0) {


  if (tag.innerHTML === '') {
    tag.innerHTML = text;
    const height = window.getComputedStyle(tag, null);
    tag.style.height = height.getPropertyValue('height');
    tag.innerHTML = '';

  }

  if (indexOfLetter < text.length) {
    tag.innerHTML += text[indexOfLetter];
    indexOfLetter++;
    setTimeout(writeTextInTag, speed, tag, text, speed, indexOfLetter);
  } else {
    tag.style.height = '';
  }


}

function createAndPutNode(nodeNameCreated, parentNode, ...classes) {
  const node = document.createElement(nodeNameCreated);
  node.classList.add(...classes);
  parentNode.append(node);
  return node;
}


const ABOUT_ME = document.getElementById('about-me-main');
const ABOUT_ME_TEXT = `Hi! I am learning web development. I want to
upgrade my skills. I have good interpersonal skills and am good
working in group. I like learn and
discover new engineering
solutions. I worked as a civil engineer last 5 years. I realized that I wanted to find a new
field
of work.
Front-end development has become interesting to me. My goal is to progress and work in Front-End
development
direction.`;

writeTextInTag(ABOUT_ME, ABOUT_ME_TEXT, 15);


const DATE = document.getElementsByClassName('date');
const DATE_TEXT_FIRST = [`June 2022 - August 2022`, `Programming in Front-End JavaScript Stage#0 courses`, `at the
Rolling Scopes online school`];
const DATE_TEXT_SECOND = [`2010 - 2015`, `Minsk, Belarusian National Technical University,`, `Civil engineering
Faculty,`, `Industrial and
civil construction`];

DATE_TEXT_FIRST.forEach(text => {
  const node = createAndPutNode('p', DATE[0], 'education__description');
  writeTextInTag(node, text, 35);
});
DATE_TEXT_SECOND.forEach(text => {
  const node = createAndPutNode('p', DATE[1], 'education__description');
  writeTextInTag(node, text, 35);
});

const LANGUAGES_CONTAINER = document.querySelector('.languages__list')
const LANGUAGES_TEXT = [`Russian - Native speaker`, `English - A1 (in progress...)`, `German (B1)`];

LANGUAGES_TEXT.forEach(text => {
  const node = createAndPutNode('li', LANGUAGES_CONTAINER);
  writeTextInTag(node, text, 35);
});

const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('hamburger_active');
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.prepend(overlay);
  
})