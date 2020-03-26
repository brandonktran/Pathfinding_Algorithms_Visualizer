function recursive_div(top, bottom, left ,right) {
  //cut horizontally
  let start_range = top + 2;
  let end_range = bottom - 1;
  y = Math.floor(map(Math.random(), 0, 1, start_range, end_range));

  if (y%2 !=0) {
    y=y-1;
  }
  // y = random.randrange(start_range, end_range, 2)


  for (i=0; i<col; i++) {
    if (mesh[i][y].isGap == false || mesh[i][y] != source || mesh[i][y] != target) {
      mesh[i][y].isObstacle = true;
      mesh[i][y].display('black');
    }
  }

  //cut vertically
  start_range = left + 2;
  end_range = right - 1;
  x = Math.floor(map(Math.random(), 0, 1, start_range, end_range));

  if (x % 2 != 0) {
    x = x - 1;
  }
  // y = random.randrange(start_range, end_range, 2)

  for (i = 0; i < col; i++) {
    if (mesh[x][i].isGap == false || mesh[x][i] != source || mesh[x][i] != target) {
      mesh[x][i].isObstacle = true;
      mesh[x][i].display('black');
    }
  }


  let wall = Math.floor(map(Math.random(), 0, 1, 0, 4));
  if (wall != 0) {
    let gap = Math.floor(map(Math.random(), 0, 1, left + 1, x));
    if (gap % 2 == 0) {
      gap = gap + 1;
    }
    if (mesh[gap][y] != source || mesh[gap][y] != target) {
      mesh[gap][y].isObstacle = false;
      mesh[gap][y].isGap = true;
      mesh[gap][y].display('white');
    }
  }
  if (wall != 1) {
    let gap = Math.floor(map(Math.random(), 0, 1, x + 1, right));
    if (gap % 2 == 0) {
      gap = gap + 1;
    }
    if (mesh[gap][y] != source || mesh[gap][y] != target) {
      mesh[gap][y].isObstacle = false;
      mesh[gap][y].isGap = true;
      mesh[gap][y].display('white');
    }
  }

  if (wall != 2) {
    let gap = Math.floor(map(Math.random(), 0, 1, bottom + 1, y));
    if (gap % 2 == 0) {
      gap = gap + 1;
    }
    if (mesh[x][gap] != source || mesh[x][gap] != target) {
      mesh[x][gap].isObstacle = false;
      mesh[x][gap].isGap = true;
      mesh[x][gap].display('white');
    }
  }

  if (wall != 3) {
    let gap = Math.floor(map(Math.random(), 0, 1, y + 1, top));
    if (gap % 2 == 0) {
      gap = gap + 1;
    }
    if (mesh[x][gap] != source || mesh[x][gap] != target) {
      mesh[x][gap].isObstacle = false;
      mesh[x][gap].isGap = true;
      mesh[x][gap].display('white');
    }
  }


  //  recursive step
  if (bottom > y + 21 && x > left + 21) {
    recursive_div(y, bottom, left, x);
  }

  if (bottom > y + 21 && x + 21 < right) {
    recursive_div(y, bottom, x, right);
  }

  if (top + 21 < y && x + 21 < right) {
    recursive_div(top, y, x, right);
  }

  if (top + 21 < y && x > left + 21) {
    recursive_div(top, y, left, x);
  }

}




//   if (bottom > y + 11 && x + 11 < right) {
//     recursive_div(y, bottom, x, right);
//   }

//   if (top + 11 < y && x + 11 < right) {
//     recursive_div(top, y, x, right);
//   }



// ex vertical split recursive_div(0, 49, 0, 49)
