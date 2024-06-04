// All my researches shows that logic like this is impossible to create without js
// What problems should js solve ?
//   1. Turn on hover when it is needed and turn off when it is unnecessary
//   2. To calculate items number that don't fit in first line

const legend = document.querySelector(".legend");
const countBox = document.querySelector(".item-count-box");
const legendHeight = legend.clientHeight;
const legendItems = Array.from(legend.children);
const hoverClassName = "legend-hover";
const countBoxHideClassName = "hide-box";

let resizeObserver = new ResizeObserver(() => {
  const outlierItemsCount = getOutlierItemsCount(legendHeight, legendItems);

  if (outlierItemsCount > 0) {
    // turn on hover
    legend.classList.add(hoverClassName);

    // unhide counter box
    countBox.classList.remove(countBoxHideClassName);

    countBox.innerText = `+${outlierItemsCount}`;
  } else {
    // turn off hover
    legend.classList.remove(hoverClassName);

    // hide counter box
    countBox.classList.add(countBoxHideClassName);
  }
});

resizeObserver.observe(legend);

function getOutlierItemsCount(height, items) {
  return items.reduce((count, item) => {
    if (item.offsetTop >= height) {
      count += 1;
    }

    return count;
  }, 0);
}
