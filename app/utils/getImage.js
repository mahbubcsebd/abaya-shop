/* eslint-disable no-undef */
function getImgUrl(name) {
  return new URL(`../assets/images/${name}`, import.meta.url).href;
}

function getIconUrl(name) {
  return new URL(`../assets/icons/${name}`, import.meta.url).href;
}

export { getIconUrl, getImgUrl };
