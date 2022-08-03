// Minify wallet address
export const minifyAddress = (address, rate) => {
  if (address == null) return "";
  if (address.length <= 5) return address;
  return (
    address.substring(0, rate || 3) +
    "..." +
    address.substring(address.length - (rate || 3), address.length)
  );
};

//Minify string length
export const minifyString = (str, len) => {
  if (str == null || str == undefined) return "";
  if (str.length <= len + 3) return str;
  return (
    str.substr(0, len) + "..."
  );
}

// Set empty string if param is undefined
export const setValue = (str) => {
  if (str == undefined || str == null) {
    str = "";
  }
  return str;
}

// Get file name and extension from full file path.
export const parseName = (name) => {
  let ext = name.match(/\.[^/.]+$/)
  let file = name.replace(/\.[^/.]+$/, "")
  return {
    ext: ext ? ext[0] : null,
    name: file
  }
}