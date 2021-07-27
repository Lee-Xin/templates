import navConfig from "./nav.config";

const LOAD_MAP = {
  "zh-CN": name => {
    return r =>
      require.ensure(
        [],
        () => r(require(`../pages/zh-CN/${name}.vue`)),
        "zh-CN"
      );
  }
};
const LOAD_DOCS_MAP = {
  "zh-CN": path => {
    return r =>
      require.ensure([], () => r(require(`../docs/zh-CN${path}.md`)), "zh-CN");
  }
};

const loadDocs = function(lang, path) {
  return LOAD_DOCS_MAP[lang](path);
};

const load = function(lang, path) {
  return LOAD_MAP[lang](path);
};

const registerRoute = navConfig => {
  let route = [];
  Object.keys(navConfig).forEach((lang, index) => {
    let navs = navConfig[lang];
    route.push({
      path: `/${lang}/component`,
      redirect: `/${lang}/component/install`,
      component: load(lang, "component"),
      children: []
    });
    navs.forEach(nav => {
      if (nav.href) return;
      if (nav.groups) {
        nav.groups.forEach(group => {
          group.list.forEach(navItem => {
            addRoute(navItem, lang, index);
          });
        });
      } else if (nav.children) {
        nav.children.forEach(navItem => {
          addRoute(navItem, lang, index);
        });
      } else {
        addRoute(nav, lang, index);
      }
    });
  });

  function addRoute(page, lang, index) {
    const component = loadDocs(lang, page.path);
    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
        lang
      },
      name: "component-" + lang + (page.title || page.name),
      component: component.default || component
    };
    route[index].children.push(child);
  }

  return route;
};

let route = registerRoute(navConfig);

route = route.concat([
  {
    path: "/",
    redirect: "/zh-CN",
    children: [
      {
        path: "/zh-CN",
        redirect: "/zh-CN/component"
      }
    ]
  }
]);

export default route;
