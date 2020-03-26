function recursive_div(top, bottom, left ,right) {
  let source_x = source.i;
  let source_y = source.j;
  let target_x = target.i;
  let target_y = target.j;

  //cut horizontally
  let start_range = top + 2;
  let end_range = bottom - 1;
  y = Math.floor(map(Math.random(), 0, 1, start_range, end_range));

  while (y == source_y ||  y == target_y) {
    y = Math.floor(map(Math.random(), 0, 1, start_range, end_range));
  }

  if (y%2 !=0) {
    y=y-1;
  }


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

  while (x == source_x || x == target_x) {
    x = Math.floor(map(Math.random(), 0, 1, start_range, end_range));
  }

  if (x % 2 != 0) {
    x = x - 1;
  }


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
      mesh[gap][y].display(200);
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
      mesh[gap][y].display(200);
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
      mesh[x][gap].display(200);
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
      mesh[x][gap].display(200);
    }
  }


  //  recursive step
  if (bottom > y + 17 && x > left + 17) {
    recursive_div(y, bottom, left, x);
  }

  if (bottom > y + 17 && x + 17 < right) {
    recursive_div(y, bottom, x, right);
  }

  if (top + 17 < y && x + 17 < right) {
    recursive_div(top, y, x, right);
  }

  if (top + 17 < y && x > left + 17) {
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
