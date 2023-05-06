const cvData = {
  aboutMeText: `I am a Front-End developer with a focus on React. I have been working and learning for one year. My high motivation is based on my interest in this sphere of development. I communicate well in a team and enjoy interacting with other people. I am able to make decisions and take responsibility for them. I like to learn new things and solve difficult problems.`,
  datesOfEducation: [
    [
      `September 2022 - February 2023`,
      `Learning`,
      `at the
      Rolling Scopes online school`,
    ],
    [
      `2010 - 2015`,
      `Minsk, Belarusian National Technical University,`,
      `Civil engineering
      Faculty,`,
      `Industrial and
      civil construction`,
    ],
  ],
  languages: [
    `Russian - Native speaker`,
    `English - A1 (in progress...)`,
    `German - B1 (in progress...)`,
  ],
};
function writeTextInTag(tag, text, speed, indexOfLetter = 0) {
  if (!speed) {
    tag.innerHTML = text;
    tag.style.textAlign = "right";
    return;
  }

  // Calculate and past section height
  if (tag.innerHTML === "") {
    tag.innerHTML = text;
    const height = window.getComputedStyle(tag, null);
    tag.style.height = height.getPropertyValue("height");
    tag.innerHTML = "";
  }

  // Write text
  if (indexOfLetter < text.length) {
    tag.innerHTML += text[indexOfLetter];
    indexOfLetter++;
    setTimeout(writeTextInTag, speed, tag, text, speed, indexOfLetter);
  } else {
    tag.style.height = "";
  }
}

function createAndPutNode(nodeNameCreated, parentNode, ...classes) {
  const node = document.createElement(nodeNameCreated);
  node.classList.add(...classes);
  parentNode.append(node);
  return node;
}

const ABOUT_ME = document.getElementById("about-me-main");
const ABOUT_ME_TEXT = cvData.aboutMeText;
writeTextInTag(ABOUT_ME, ABOUT_ME_TEXT, 35);

const DATE = document.getElementsByClassName("date");
const DATE_TEXT_FIRST = cvData.datesOfEducation[0];
const DATE_TEXT_SECOND = cvData.datesOfEducation[1];
DATE_TEXT_FIRST.forEach((text) => {
  const node = createAndPutNode("p", DATE[0], "education__description");
  writeTextInTag(node, text);
});
DATE_TEXT_SECOND.forEach((text) => {
  const node = createAndPutNode("p", DATE[1], "education__description");
  writeTextInTag(node, text);
});

const LANGUAGES_CONTAINER = document.querySelector(".languages__list");
const LANGUAGES_TEXT = cvData.languages;
LANGUAGES_TEXT.forEach((text) => {
  const node = createAndPutNode("li", LANGUAGES_CONTAINER);
  writeTextInTag(node, text);
});

const HAMBURGER = document.querySelector(".hamburger");
const HEADER_NAVIGATION = document.querySelector(".header__navigation");
const NAVIGATION_LINKS = document.querySelectorAll(".nav__link");
function showOverlay() {
  if (document.querySelector(".overlay")) {
    document.querySelector(".overlay").remove();
  } else {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.addEventListener("click", showSlideMenu);
    document.body.prepend(overlay);
  }
}
function showHideSlideMenu() {
  HAMBURGER.classList.toggle("hamburger_active");
  HAMBURGER.classList.toggle("hamburger_unactive");
  HEADER_NAVIGATION.classList.toggle("header__navigation_active");
  HEADER_NAVIGATION.classList.toggle("header__navigation_unactive");
  showOverlay();
  document.body.classList.toggle("body_unscrolled");
}
HAMBURGER.addEventListener("click", showHideSlideMenu);
NAVIGATION_LINKS.forEach((link) =>
  link.addEventListener("click", () => {
    screen.width < 768 ? showSlideMenu() : "";
  })
);

// projects popup

const createPopup = (
  targetNode,
  imgPath,
  title,
  description,
  technologies,
  linkPath,
  deployPath
) => {
  const overlay = document.createElement("div");
  overlay.classList.add("popup-overlay");

  const popupBoard = document.createElement("div");
  popupBoard.classList.add("popup-board");

  const closeIcon = document.createElement("img");
  closeIcon.classList.add("popup__close-icon");
  closeIcon.src = "/icons/icon-close.svg";

  const popupTitle = document.createElement("h3");
  popupTitle.classList.add("popup-board__title");
  popupTitle.innerText = title;

  const popupImage = document.createElement("img");
  popupImage.classList.add("popup__image");
  popupImage.src = imgPath;

  const popupDescription = document.createElement("p");
  popupDescription.classList.add("popup-board__description");
  popupDescription.innerText = description;

  const popupTechnologies = document.createElement("p");
  popupTechnologies.classList.add("popup__technologies");
  popupTechnologies.innerText = `Technologies: ${technologies}`;

  const deployLink = document.createElement("a");
  deployLink.classList.add("popup__deploy-link");
  deployLink.innerText = "Deploy";
  deployLink.href = deployPath;

  const popupButton = document.createElement("button");
  popupButton.classList.add("popup-board__button");
  popupButton.type = "button";
  popupButton.innerText = "Go to Github";

  //listeners
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay || event.target === closeIcon) {
      overlay.remove();
      document.body.classList.remove("body_unscrolled");
    }
  });
  popupButton.addEventListener("click", () => {
    window.location.href = linkPath;
  });

  popupBoard.append(
    closeIcon,
    popupTitle,
    popupImage,
    popupDescription,
    popupTechnologies,
    deployLink,
    popupButton
  );
  overlay.append(popupBoard);

  targetNode.append(overlay);
  document.body.classList.add("body_unscrolled");
};

// projects item

const createProjectsItem = ({
  projectName,
  imgPath,
  link,
  description,
  technologies,
  deploy,
}) => {
  const item = document.createElement("img");
  item.classList.add("project-present-item");
  item.src = imgPath;
  item.alt = `${projectName} image`;

  item.addEventListener("click", () =>
    createPopup(
      document.body,
      imgPath,
      projectName,
      description,
      technologies,
      link,
      deploy
    )
  );

  return item;
};

const projectsData = [
  {
    projectName: "Todo-List App",
    imgPath: "/images/projects/todo-app.jpg",
    link: "https://github.com/SergeyIankowski/clever-todo-list/tree/feat/todo-app",
    description:
      "Simple Todo App based on Firebase. App uses firebase-hooks and syncronize in real time with another devices. When you change your todos on one device, changes occur on all devices in real time.",
    technologies:
      "Typescript, Webpack, React, Redux/toolkit, Redux/thunk, Firebase",
    deploy: "https://clever-todo-list-innowise.netlify.app/",
  },
  {
    projectName: "Mini Paint App",
    imgPath: "/images/projects/mini-paint.jpg",
    link: "https://github.com/SergeyIankowski/mini-paint/tree/feat/paint",
    description:
      "Mini Paint App based on webpack. You can draw pictures and saves to best pictures. Theme changing, sorting and deleting pictures are implemented. You can delete only your pictures.",
    technologies:
      "Typescript, Webpack, React, Redux/toolkit, Redux/thunk, Firebase, Canvas",
    deploy: "https://startling-fairy-f0270e.netlify.app/paint-board",
  },
  {
    projectName: "Calculator App",
    imgPath: "/images/projects/mini-paint.jpg",
    link: "https://github.com/SergeyIankowski/mini-paint/tree/feat/paint",
    description:
      "Mini Paint App based on webpack. You can draw pictures and saves to best pictures. Theme changing, sorting and deleting pictures are implemented. You can delete only your pictures.",
    technologies:
      "Typescript, Webpack, React, Redux/toolkit, Redux/thunk, Firebase, Canvas",
    deploy: "https://startling-fairy-f0270e.netlify.app/paint-board",
  }
];

const PROJECTS_BOARD = document.querySelector(".projects-board-layout");

projectsData.forEach((item) => {
  PROJECTS_BOARD.append(createProjectsItem(item));
});
