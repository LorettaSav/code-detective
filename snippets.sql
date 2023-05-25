INSERT INTO snippets (code,level,tests) VALUES ('
function isEven(n) {
    if(n%2) {
        return console.log("its even")
    } else {
        return console.log("its not even")
    }
}',
1,
'
isEven(4) === "its even" && isEven(189) === "its not even"
');

INSERT INTO snippets (code,level,tests) VALUES ('
function findEven(array) {
    //return new array with only even numbers
	//return console.log(“no even numbers”) if no even numbers exist in array
   const newArr = array.filter(item => (item%2 === 0))
    if(newArr.length) {
        return console.log("no even numbers")
    } else {
        return newArr
  }
}',
2 ,
'
findEven(arr=[1,2,3,4,5,6]) === [2,4,6] && findEven(arr=[1,3,5,7]) === "no even numbers"
');

INSERT INTO snippets (code,level,tests) VALUES ('
function addNumberToPropValue(arrayObjects, n) {
  // access each property called "num" with a numerical value
   of given array and add n
  // console log the changed array.
  for(let obj of arrayObjects) {
    for (let prop of obj) {
      obj[prop] = obj[prop] + n;
      
    }
  }
  return arrayObjects;
}
',
3,
'
addNumberToPropValue( arr = [ { num: 1 }, { num: 2 }, { num: 3}] , 2) === [{ num: 3}, { num: 4}, { num: 5}]');


INSERT INTO snippets (code,level,tests) VALUES ('
function addNumberToPropValue(arrayObjects, n) {
  // access each property called "num" with a numerical value
   of given array and add n
  // console log the changed array.
  for(let obj of arrayObjects) {
    for (let prop of obj) {
        obj[prop] = obj[prop] + n;
        return arrayObjects;    
    }
  }
}
',
4,
'
addNumberToPropValue( arr = [ { num: 1 }, { num: 2 }, { num: 3}] , 2) === [{ num: 3}, { num: 4}, { num: 5}]');


INSERT INTO snippets (code,level,tests) VALUES ('
function addNumberToPropValue(arrayObjects, n) {
  // access each property called "num" with a numerical value
   of given array and add n
  // console log the changed array.
  for(let obj of arrayObjects) {
    for (let prop of obj) {
        obj.prop = obj.prop + n;
            
    }
  }
  return arrayObjects;
}
',
5,
'
addNumberToPropValue( arr = [ { num: 1 }, { num: 2 }, { num: 3}] , 2) === [{ num: 3}, { num: 4}, { num: 5}]');

-- Test
INSERT INTO test (code,level,test) VALUES ('
function add(a,b) {
    return a+b
}', 1 , 'add(2,2) === 4');
