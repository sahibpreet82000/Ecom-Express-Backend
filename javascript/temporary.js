// function greet(name) {
//   console.log(name + " is a good boy");
// }
// var name = "Sahib";
// var age = "20";
// var temp = `My name is ${name} and i am ${age} years old.`;
// var len = name.length;
// console.log(`length of name is ${len}`);
// // document.getElementById('content').innerHTML = ' <h3> this is a heading </h3> '
// let name1 = "mehak";
// let name2 = "mithi";
// let name3 = "jesse";
// greet(name);
// greet(name1);
// greet(name2);
// greet(name3);
// function sum(a, b, c) {
//   let add = a + b + c;
//   return add;
// }
// let returnval = sum(2, 7, 4);
// console.log(returnval);

// ALERT AND PROMPT

// alert

// alert("PLEASE LOGIN TO CONTINUE");

// PROMPT




// CONFIRM
//  let confirmation = prompt("enter your age?" , "");
//  console.log(confirmation);
//  if(confirmation>18){
//   confirmation =  confirm("Your Age has been Confirmed");

//  }
//  else {
//   confirmation =  confirm("You are Resticted from this website");
//  }

// LOOPS
// let list = ["mehak", "anmol", "sahib"];
// // for (Element of list){
// //     console.log("Good Morning " + Element);
// // }
// list.forEach((element)=>{
//     console.log("Good Morning " + element);
// })
// for(let i = 0; i<list.length; i++){
//     console.log("Good Morning" + list[i]);
// }

// let employee = {
//     name: "saahib",
//     class: 10,
//     rollno: 120
// }
// for (key in employee){
//     console.log(`the ${key} of employee is ${employee[key]}`)
// }

// let element = document.querySelectorAll('ul');
// console.log(element);

// EVENTS

// TimeOut
// function help(name , bye){
//   console.log("hello " + name + " " + bye);
// }
// timeout = setTimeout(help, 2000, "sahib", "takecare");
//   console.log(timeout);

// intervalit = setInterval(help , 1000, "sahib", "takecre");
// console.log(intervalit);

// SET DATE AND Time
// function displayTime(){
//    time= new Date();
//   //  console.log(time);
//    document.getElementById('time').innerHTML = time;
//   }
//   setInterval( displayTime , 1000);

//   let half = (name20 , bye) => console.log("sahb" + " " + name20 +" "+ bye);
//   timeout= setTimeout(half, 2000,"sag","byee");
//   // console.log(timeout);

//   let obj1 = {
//     names: ["rimm","kaur","mehal"],
//     speak(){
//       this.names.forEach((students)=>{
//         console.log("good night " + students);

//       })
//     }

//   }
//   obj1.speak();

window.addEventListener("scroll", function () {
    var element = document.querySelector(".section-content");
    var position = element.getBoundingClientRect();
  
    // checking for partial visibility
    if (position.top < window.innerHeight && position.bottom >= 0) {
      element.style.visibility = "visible";
      element.style.animation = "slide-up 1s";
    }
  });