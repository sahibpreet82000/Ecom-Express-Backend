function change() {
  let set = document.getElementById("set-eye-button");
  set.style.overflow = "visible";
  //  set.style.zIndex= '2';
  if (set.style.zIndex != 2) {
    set.style.zIndex = "2";
  } else {
    set.style.zIndex = "-1";
  }
  let hidden = document.getElementById("set-eye-button2");
  if (hidden.style.zIndex != -1) {
    hidden.style.zIndex = "-1";
    document.getElementById("register-icon-set2").type = "text";
  } else {
    hidden.style.zIndex = "2";
    document.getElementById("register-icon-set2").type = "password";
  }
}
//  function changetext(){
//    let text = document.querySelector('#register-icon-set2');
//  }
