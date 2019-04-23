function toRpString(input) {
  let nilai = input.toString();
  let output = "";
  let l = nilai.length;
  for (let i = 0; i < l; i++) {
    if (i % 3 == 0 && i != 0)
      output = '.'.concat(output);
    output = nilai.charAt(l-1-i).concat(output);
  }
  return (`Rp ${output},00`);
}

