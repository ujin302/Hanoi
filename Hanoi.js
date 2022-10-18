let NUM_OF_DISKS = 6 // 원반 수
let NUM_OF_COLUMNS = 3 // 움직일 수 있는 구역 수

let diskData; // 디스크 정보 
let grabData; // 잡은 디스크 정보 

let mouseLocation; // 마우스 위치


// 컬럼 초기화
let column = new Array(NUM_OF_COLUMNS); // 컬럼 배열 선언
for (let i = 0; i < column.length; i++) { // 3
  let idText = "column"+i; // 컬럼 id 값 넣을 변수 선언
  column[i] = document.getElementById(idText); // 컬럼 id 값 초기화
}
// 디스크 초기화
let disk = new Array(NUM_OF_DISKS); // 디스크 배열 선언
for (let i = 0; i < disk.length; i++) { // 5
  disk[i] = new Array(NUM_OF_COLUMNS); // 디스크의 컬럼 구역 배열 선언
}

for (let i = 0; i < disk.length; i++) { // 6
  for (let j = 0; j < disk[j].length; j++) {
    var idText = 'disk'+i+j;
    disk[i][j] = document.getElementById(idText);
    console.log(disk[i][j]);
  }
}


var diskWidth = [40,80,110,140,170,200];
var diskColor = ["black","violet","teal","tomato","turquoise","yellowgreen"];

const Init = () => {
  mouseLocation = -1;
  diskData = [
    [1,0,0],
    [2,0,0],
    [3,0,0],
    [4,0,0],
    [5,0,0],
    [6,0,0]
  ];
  grabData = { 'isGrab' : false, 'location' : 0, 'diskValue' : 0 };

  draw();
}

const getDiskInfo = (diskNum) => {
  
let  retrunWidth;
let retrunColor;

  switch(diskNum){
     case 1 :
       retrunWidth = diskWidth[0];
       retrunColor = diskColor[0];
       break;
     case 2 :
       retrunWidth = diskWidth[1];
       retrunColor = diskColor[1];
       break;
     case 3 :
       retrunWidth = diskWidth[2];
       retrunColor = diskColor[2];
       break;
     case 4 :
       retrunWidth = diskWidth[3];
       retrunColor = diskColor[3];
       break;
     case 5 :
       retrunWidth = diskWidth[4];
       retrunColor = diskColor[4];
       break;
     case 6 :
       retrunWidth = diskWidth[5];
       retrunColor = diskColor[5];
       break;
   }
   return { retrunWidth, retrunColor };
}

const draw = () => {
  for (var i = 0; i < diskData.length; i++) { // 6
    for (var j = 0; j < diskData[0].length; j++) { //3
      if(diskData[i][j] == 0){
        disk[i][j].style.width = 0+'px';
      }else {
        disk[i][j].style.width = getDiskInfo(diskData[i][j]).retrunWidth;
        disk[i][j].style.backgroundColor = getDiskInfo(diskData[i][j]).retrunColor;
      }
    }
  }
}

Init();

const grabDisk = (columnNum) => {
  for (var i = 0; i < NUM_OF_DISKS; i++) {
    if(diskData[i][columnNum] > 0){
      grabData.isGrab = true;
      grabData.location = columnNum;
      grabData.i = i;
      grabData.diskValue = diskData[i][columnNum];
      diskData[i][columnNum] = 0;
      break;
    }
  }
}

const dropDisk = (columnNum) => {
  if(diskData[NUM_OF_DISKS-1][columnNum] == 0){ // [6-1]
    grabData.isGrab = false;
    diskData[NUM_OF_DISKS-1][columnNum] = grabData.diskValue;
    return;
  }

  for(var i = 0; i < NUM_OF_DISKS; i++){
    console.log(i);
    if(diskData[i][columnNum] > 0){
      if(diskData[i][columnNum] > grabData.diskValue){
        grabData.isGrab =  false;
        diskData[i-1][columnNum] = grabData.diskValue;
        break;
      }else{
        alert("안돼!");
        grabData.isGrab = false;
        diskData[grabData.i][grabData.location] = grabData.diskValue;
        break;
      }
    }
  }
  draw();
}

const mouseOver = (columnNum) => {
  mouseLocation = columnNum;
  draw();
}

const mouseOut = () => {
  mouseLocation = -1
  draw()
}

const mouseClick = (columnNum) => {
  if(grabData.isGrab == false){
    grabDisk(columnNum);
    
  }else{
    dropDisk(columnNum)
  }
  draw()
}

column[0].onmouseOver = function(){mouseOver(0)}
column[0].onmouseOut = function(){mouseOut(0)}
column[0].onclick = function(){mouseClick(0)}

column[1].onmouseOver = function(){mouseOver(1)}
column[1].onmouseOut = function(){mouseOut(1)}
column[1].onclick = function(){mouseClick(1)}

column[2].onmouseOver = function(){mouseOver(2)}
column[2].onmouseOut = function(){mouseOut(2)}
column[2].onclick = function(){mouseClick(2)}
