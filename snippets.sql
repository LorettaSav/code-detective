--LEVEL 1

--1
INSERT INTO snippets (code,level,tests) VALUES ('
function isEven(n) {
    if(n%2) {
        return "its even"
    } else {
        return "its not even"
    }
}',
1,
'
results.push(isEven(4) === "its even" && isEven(189) === "its not even")
');

--BUG: !n%2 or n%2 === 0 or reverse return statements // rn isEven(4) === "its not even"


--2
INSERT INTO snippets (code,level,tests) VALUES ('
function findEven(array) {
    //return new array with only even numbers
	//return console.log(“no even numbers”) if no even numbers exist in array
    const newArr = array.filter(item => (item%2 === 0))
    if(newArr.length) {
        return "no even numbers"
    } else {
        return newArr;
  }
}',
2 ,
'
results.push(findEven(arr=[1,2,3,4,5,6]).join() === "2,4,6"  &&  findEven(arr=[1,3,5]) === "no even numbers")
');

--BUG: newArr.length === 0 or !newArr.length


--3
INSERT INTO snippets (code,level,tests) VALUES ('
function greetPerson(str) {
    if( typeof(str) !== string) {
        return "please provide a name"
    } else {
        return `hello,${str}`; 
    }
}
',
1,
'results.push(greetPerson(1) === "please provide a name" && greetPerson("mary") === "hello,mary")');

--BUG:  not checking typeof as string (without "")


--4
INSERT INTO snippets (code,level,tests) VALUES ('
function greetPerson(str) {
    if( typeof(str) !== "string") {
        return "please provide a name"
    } else {
        return "hello,${str}"; 
    }
}
',
1,
'results.push(greetPerson(1) === "please provide a name" && greetPerson("mary") === "hello,mary")');

--BUG:  return statement with "" not ``


--LEVEL 2

--1
INSERT INTO snippets (code,level,tests) VALUES ('
function getSum(arr) {
    //CALCULATES SUM OF NUMBERS IN ARRAY
    let sum = 0;
    for (let num of arr) {
        if( typeof(num) !== number) {  
            return "array of numbers needed"
        } else {  
            sum += num //sum += arr
        }
    }
    return sum;
}
',
2,
'results.push(getSum([2,3,4,5])===14 && getSum([1,2,3,"s"]) === "array of numbers needed")');

--BUG: //typeof(num) !== number without ""


--2
INSERT INTO snippets (code,level,tests) VALUES ('
function getSum(arr) {
    //CALCULATES SUM OF NUMBERS IN ARRAY
    let sum = 0;
    for (let num of arr) {
        if( typeof(num) !== number) {  
            return "array of numbers needed"
        } else {  
            sum =+ num; 
        }
    }
    return sum;
}
',
2,
'results.push(getSum([2,3,4,5])===14 && getSum([1,2,3,"s"]) === "array of numbers needed")');

--BUG: sum =+ num instead of sum += num


--3
INSERT INTO snippets (code,level,tests) VALUES ('
function getSum(arr) {
    //CALCULATES SUM OF NUMBERS IN ARRAY
    let sum = 0;
    for (let num of arr) {
        if( typeof(num) !== number) {  
            return "array of numbers needed"
        } else {  
            sum =+ num;
            return sum; 
         }
    } 
}
',
2,
'results.push(getSum([2,3,4,5])===14 && getSum([1,2,3,"s"]) === "array of numbers needed")');

--BUG: return statement in for loop



--4
INSERT INTO snippets (code,level,tests) VALUES ('
function factorial(x) {
  // base case
  if (x === 0) {
    return x
  }
  return x * factorial(x-1);
}
',
2,
'results.push(factorial(3) === 6');

--BUG: returns x instead of 1





--LEVEL 3

--1
INSERT INTO snippets (code,level,tests) VALUES ('
function capitaliseFirstLetter(str) {
    //will capitalise every first letter
    //Assume first words letter is already in upperCase.
    let newArr = [];
    for(let i=0; i < str.length; i++) {
        if( str[i-1] !== ' ') { 
            newArr.push(str[i]);
        } else {
            let temp = str[i].toUpperCase();
            newArr.push(temp);
        }      
    }
    return newArr.join("")
}
',
3,
'results.push(capitaliseFirstLetter("Hello everyone i am loretta") === "Hello Everyone I Am Loretta") ');

--BUG: should be str[i-1]


--2
INSERT INTO snippets (code,level,tests) VALUES ('
function getTotal(numArray) {
    //Calculates the total of all numbers in an array
    const total = numArray.reduce((sum, num) => 
        sum + num );
    return total;
}
',
3,
'results.push(getTotal([1, 34, 83, 65, 3, 24, 98]) === 308) ');

--BUG: missing second arg in reduce (,0)


--3
INSERT INTO snippets (code,level,tests) VALUES ('
function map(arr, cb) {
    
    for(let i=0; i < arr.length; i++) {
        arrResult.push(cb(arr[i])) 
        return arrResult;
  }
}
',
3,
'results.push(map([5, 6, 7], e => e * 2).join("") === "101214") ');

--BUG: not defining arrResult


--4
INSERT INTO snippets (code,level,tests) VALUES ('
function filter(arr, cb) {
    let resultArr = [];
    for(let i = 0; i < arr.length; i++) {
        cb(arr[i]) ? resultArr.push(arr[i])   
    }
    return resultArr;
}
',
3,
'results.push(map([5, 6, 7], e => e * 2).join("") === "101214") ');

--BUG: missing : false ; 


--LEVEL 4

--1
INSERT INTO snippets (code,level,tests) VALUES ('
function checkPalindromes(arrayList) {
    //Checks if in an array the strings provides are palindromes
    return arrayList.forEach((e) => {
        return (e.split("").reverse().join("") === e)
    });
  }
',
4,
'results.push(checkPalindromes(["deified", "civic", "radar", "level", "rotor"]) === true &&
checkPalindromes(["kayak", "reviver", "racecar", "reader", "madam"]) === false) ');

--BUG: arrayList.every not forEach


--2
INSERT INTO snippets (code,level,tests) VALUES ('
function checkPalindromes(arrayList) {
    //Checks if in an array the strings provides are palindromes
    return arrayList.filter((e) => {
        return (e.split("").reverse().join("") === e)
    });
  }
',
4,
'results.push(checkPalindromes(["deified", "civic", "radar", "level", "rotor"]) === true &&
checkPalindromes(["kayak", "reviver", "racecar", "reader", "madam"]) === false) ');

--BUG: arrayList.every not filter

--3
INSERT INTO snippets (code,level,tests) VALUES ('
function addUpTo(n) {
    // base case
    if(n === 1) return 1;
    // recursive case
    return  addUpTo(n-1)
}   
',
4,
'results.push(addUpTo(3) === 6) ');

--BUG: return statement should be n + addUpTo(n-1)