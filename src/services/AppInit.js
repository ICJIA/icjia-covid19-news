import config from "@/config.json";
import searchIndex from "../../public/searchIndex.json";
import _ from "lodash";

const computedPublicPath =
  process.env.NODE_ENV === `production` ? config.publicPath : "";

function getSection(key) {
  let root = key.split("/");
  const isRoot = /^.*\.(md)$/i.test(root[1]);
  if (isRoot) {
    return "/";
  } else {
    return `/${root[1]}`;
  }
}
const context = require.context("../../public/markdown", true, /\.md$/);
const siteMeta = context.keys().map(key => ({
  ...context(key),
  path: `/${key.replace(".md", "").replace("./", "")}`,
  root: `${getSection(key)}`
}));

//console.log(funding);

let categories = [];
siteMeta.forEach(item => {
  if (item.root === "/news" && item.attributes.status === "live") {
    categories.push(item.attributes.category);
  }
});
let filteredCategories = Array.from(new Set(categories)).sort();

let news = siteMeta.filter(item => {
  if (item.root === "/news" && item.attributes.status === "live") {
    return item;
  }
});

// news = _.sortBy(news, "attributes.title");

// news = _.sortBy(news, [

// ]).reverse();

news = _.orderBy(
  news,
  [
    function(dateObj) {
      return new Date(dateObj.attributes.posted);
    },
    function(item) {
      return item.attributes.title;
    }
  ],
  ["desc", "asc"]
);

console.log(news);

let myApp = {
  config,
  searchIndex,
  computedPublicPath,
  siteMeta,
  categories: filteredCategories,
  news
};

export { myApp };
