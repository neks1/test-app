let tabs = Array.from(document.querySelectorAll(".fonts__tab_btn"));
let contents = Array.from(document.querySelectorAll(".fonts__block"));

tabs.forEach((element) => {
  element.addEventListener("click", (event) => {
    tabs.forEach((ele) => ele.setAttribute("aria-selected", "false"));
    event.target.setAttribute("aria-selected", "true");

    let findTab = event.target.getAttribute('id');

    contents.forEach((content) => {
      content.setAttribute("aria-hidden", "true");

      if (content.getAttribute('aria-labelledby') == findTab)
        content.setAttribute("aria-hidden", "false");
    });
  });
});

//The URL() constructor returns a newly created URL object representing the URL defined by the parameters.
let parseUrl = (function(url) { return new URL(url) });
let obj = parseUrl('http://ffwagency.com/do/any.php?a=1#foo');

console.log(obj.hash); // -> #foo
console.log(obj.hostname) // -> ffwagency.com
console.log(obj.pathname) // -> do/any.php
