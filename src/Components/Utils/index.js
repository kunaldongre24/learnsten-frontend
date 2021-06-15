var hasOwnProperty = Object.prototype.hasOwnProperty;

export function isEmpty(obj) {
  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== "object") return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
}
export function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval;
  interval = seconds / 259200;
  if (interval > 1) {
    return "on " + dateFormat(date);
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}
export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
export function sortByCount(array) {
  var map = array.reduce(function (p, c) {
    p[c] = (p[c] || 0) + 1;
    return p;
  }, {});

  var newTypesArray = Object.keys(map).sort(function (a, b) {
    return map[b] - map[a];
  });
  return newTypesArray;
}
export function dateFormat(date) {
  const DATE_OPTIONS = { day: "numeric", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-IN", DATE_OPTIONS);
}
