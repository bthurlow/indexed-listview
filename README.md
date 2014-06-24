Indexed ListView
================

Kendo UI Mobile indexed listview for AppBuilder

This is a sample project attempting to replicate iOS sectionIndexTitlesForTableView.

================

####Key files:
- scripts/vendor/listViewIndex.js
- styles/vendor/listViewIndex.css

Include the above files in your index.html.

####Initialize ListViewIndex
```js
ListViewIndex.init(view, animated, offset);
```
Parameters are:
- view: The view the listview is part of.
- animated (optional default: false): Use animated scrolling.
- offset (optional default:0): Additional offset pixels to use when determining where to scroll to.
 
####Generate Index
In your listview initiliziation, add the dataBound event and call 
```js
ListViewIndex.gi(e.sender.dataSource.view());
```
Your listview must be of type:'group' and your group value is what your index will display.

See app.js -> app.home.init function for more details.
