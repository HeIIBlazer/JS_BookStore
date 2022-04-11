var debug = true;
function isDebug(message) {
    if(debug) console.log(message);
}

// МОЙ ВАРИАНТ
/*

const info = document.getElementById("info");
const bookShop = document.getElementById("book_shop");
const menuAdminPanel = document.getElementById("menu_admin_panel");
const menuAddAuthor = document.getElementById("menu_add_author");
const menuAddBook = document.getElementById("menu_add_book");
const menuPurchase = document.getElementById("menu_purchase");
const menuProfile = document.getElementById("menu_profle");
const menuLogin = document.getElementById("menu_login");
menuLogin.addEventListener('click', toggleBtnLogin);
const menuLogout = document.getElementById("menu_logout");
menuLogout.addEventListener('click', toggleBtnLogin);
bookShop.addEventListener('click', toggleMainBtn);
menuAdminPanel.addEventListener('click', activeAdminPanel);
menuAddAuthor.addEventListener('click', activeAddAuthor);
menuAddBook.addEventListener('click', activeAddBook);
menuPurchase.addEventListener('click', activePurchase);
menuProfile.addEventListener('click', activeProfile);


function activeAdminPanel() {
    if(!menuAdminPanel.classList.contains("active")) {
        removeAllActive();
        menuAdminPanel.classList.add("active");
    }
}

function activeAddAuthor() {
    if(!menuAddAuthor.classList.contains("active")) {
        removeAllActive();
        menuAddAuthor.classList.add("active");
    }
}

function activeAddBook() {
    if(!menuAddBook.classList.contains("active")) {
        removeAllActive();
        menuAddBook.classList.add("active");
    }
}

function activeProfile() {
    if(!menuProfile.classList.contains("active")) {
        removeAllActive();
        menuProfile.classList.add("active");
    }
}

function activePurchase() {
    if(!menuPurchase.classList.contains("active")) {
        removeAllActive();
        menuPurchase.classList.add("active");
    }
}
*/


//АДАПТИВНЫЙ ВАРИАНТ


const bookShop = document.getElementById("book_shop");
bookShop.addEventListener('click', e => {
    e.preventDefault();
    deactiveMenu(bookShop);
});
const menuAddAuthor = document.getElementById("menu_add_author");
menuAddAuthor.addEventListener('click', e => {
    e.preventDefault();
    activeBtnMenu(menuAddAuthor);
});
const menuAddBook = document.getElementById("menu_add_book");
menuAddBook.addEventListener('click', e=>{
    e.preventDefault();
    activeBtnMenu(menuAddBook);
});
const menuPurchase = document.getElementById("menu_purchase");
menuPurchase.addEventListener('click', e => {
    e.preventDefault();
    activeBtnMenu(menuPurchase);
});
const menuProfile = document.getElementById("menu_profle");
menuProfile.addEventListener('click', e => {
    e.preventDefault();
    activeBtnMenu(menuProfile);
});
const menuAdminPanel = document.getElementById("menu_admin_panel");
menuAdminPanel.addEventListener('click', e => {
    e.preventDefault();
    activeBtnMenu(menuAdminPanel);
});
const info = document.getElementById("info");
const menuLogin = document.getElementById("menu_login");
menuLogin.addEventListener('click',toggleBtnLogin);
const menuLogout = document.getElementById("menu_logout");
menuLogout.addEventListener('click',toggleBtnLogin);

function activeBtnMenu(activeMenuBtn){
    if(!activeMenuBtn.classList.contains("active")){
        activeMenuBtn.classList.add("active");
    }
    deactiveMenu(activeMenuBtn);
}
function deactiveMenu(activeMenuBtn){
    const listNavLinks = document.getElementsByClassName('nav-link');
    for(let i = 0; i < listNavLinks.length; i++){
        if(listNavLinks[i] !== activeMenuBtn && listNavLinks[i].classList.contains('active')){
            listNavLinks[i].classList.remove('active');
        }
    }
}

function toggleMainBtn() {
    removeAllActive();
}
function toggleBtnLogin(){
    isDebug("Переключаем меню входа");
    if(menuLogin.classList.contains("d-none")){
        showBtnLogin();
        toggleShowMenu();
        info.innerHTML = "Вы вышли";
    }else{
        hiddenBtnLogin();
        toggleShowMenu();
        info.innerHTML = "Вы вошли";
    }
}
function showBtnLogin(){
    isDebug("Показываем кнопку Вход");
    menuLogin.classList.remove("d-none");
    menuLogout.classList.add("d-none");
}
function hiddenBtnLogin(){
    isDebug("Прячем кнопку Вход");
    menuLogin.classList.add("d-none");
    menuLogout.classList.remove("d-none");
}
function toggleShowMenu(){
    if(menuAddAuthor.classList.contains("d-none")){
        showBtnsMenu();
    }else{
        hiddenBtnsMenu();
    }
}
function showBtnsMenu(){
    menuAddAuthor.classList.remove("d-none");
    menuAddBook.classList.remove("d-none");
    menuPurchase.classList.remove("d-none");
    menuProfile.classList.remove("d-none");
    menuAdminPanel.classList.remove("d-none");
}
function hiddenBtnsMenu(){
    menuAddAuthor.classList.add("d-none");
    menuAddBook.classList.add("d-none");
    menuPurchase.classList.add("d-none");
    menuProfile.classList.add("d-none");
    menuAdminPanel.classList.add("d-none");
}
function removeAllActive() {
    menuAdminPanel.classList.remove("active");
    menuAddBook.classList.remove("active");
    menuAddAuthor.classList.remove("active");
    menuPurchase.classList.remove("active");
    menuProfile.classList.remove("active");
}

function showLoginForm() {
    const content = document.getElementById('content');
    content.innerHTML = `
<div class="card" style="width: 25em; margin: 5em auto;">
    <div class="card-body">
        <form>
            <div class="card-header py-2" style="text-align: center; font-weight: 500; font-size: 32px">AUTHORIZATION</div>
            <div class="form-group">
              <label for="login" class="form-label mt-4">Login</label>
              <input type="login" class="form-control" id="exampleInputEmail1" placeholder="Enter login">
            </div>
            <div class="form-group">
              <label for="password" class="form-label mt-4">Password</label>
              <input type="password" class="form-control" id="password" placeholder="Enter password">
            </div>
            <button type="submit" class="btn my-4 w-100 btn-primary">Submit</button>
        </form>
    </div>
</div>`;
    const buttonLogin = document.getElementById("button_login");
    buttonLogin.addEventListener('click', (e)=>{
        e.preventDefault();
        sendCredentials();
    })
}
function sendCredentials() {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const credential = {
        "login": login,
        "password": password,
    }
    const response = fetch('login', {
       method: 'POST',
       headers: {
           'ContentType': 'application/json;charset:utf8'
       },
       body: JSON.stringify(credential)
    });
    if(response.ok) {
        const result = response.json();
        document.getElementById('info').innerHTML = result.info;
    }
}