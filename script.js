// ---------- User's Account ----------

const account1 = 
{
    username: 'sarah',
    pin: 'sarah123',
    task: [],
    event: [],
    note: ''
}

const account2 = 
{
    username: 'erwin',
    pin: 'erwin123',
    task: [],
    event: [],
    note: ''
}

let accounts = [account1, account2];

// ---------- Selecting DOM Elements ----------

const loginPage = document.querySelector('.login');
const mainAppInterface = document.querySelector('.app');

const labelInvalid = document.querySelector('.message--invalid');
const labelDate = document.querySelector('.date__value');
const labelTime = document.querySelector('.time__value');
const labelWeekDay = document.querySelectorAll('.week__day');
const labelTask = document.querySelectorAll('.task-todo');

const containerTask = document.querySelector('.todo-uTlist');
const containerEvent = document.querySelector('.todo-uElist');
const containerNote = document.querySelector('.note-container');

const inputUsername = document.querySelector('.login__input--username');
const inputPassword = document.querySelector('.login__input--pin');
const inputTask = document.querySelector('.add-input--task');
const inputEvent = document.querySelector('.add-input--event');
const inputNote = document.querySelector('.add-input--note');

const btnLogin = document.querySelector('.btn--login');
const btnSign = document.querySelector('.btn--signup');
const btnSignOut = document.querySelector('.btn-sign-out');
const btnSubmitTask = document.querySelector('.btn-submit--task');
const btnSubmitEvent = document.querySelector('.btn-submit--event');
const btnSubmitNote = document.querySelector('.btn-submit--note');
const btnDeleteAllTask = document.querySelector('.icon-trash--task');
const btnDeleteAllEvent = document.querySelector('.icon-trash--event');

// ---------- Loging into Account ----------

 let currentAccount;

const openAccount = function()
{
    loginPage.classList.add('hidden');
    mainAppInterface.classList.remove('hidden');
    mainFunction();
}

const closeAccount = function()
{
    loginPage.classList.remove('hidden');
    mainAppInterface.classList.add('hidden');
}

btnLogin.addEventListener('click', function(e)
{
    e.preventDefault();
    labelInvalid.textContent = 'Invalid Email or Password';
    const username = inputUsername.value;
    const pass = inputPassword.value;
    currentAccount = accounts.find(acc => username === acc.username);
    if(currentAccount && currentAccount.pin === pass)
    {
        labelInvalid.style.opacity = 0;
        openAccount();  
    }
    else
    {
        labelInvalid.style.opacity = 1;
    }

    inputUsername.value = inputPassword.value = '';
})

btnSign.addEventListener('click', function(e)
{
    e.preventDefault();
    labelInvalid.textContent = 'Username Already Exist!';
    const user = inputUsername.value;
    const pass = inputPassword.value;

    if(user === '' || pass === '')
    {
        labelInvalid.textContent = 'Invalid Email or Password';
        labelInvalid.style.opacity = 1;  
    }
    else if(accounts.find(acc => acc.username === user))
    {
        labelInvalid.style.opacity = 1;
    }
    else
    {
        labelInvalid.style.opacity = 0;
        const newAccount = 
        {
            username: user,
            pin: pass,
            task: [],
            event: [],
            note: ''
        }

        accounts.push(newAccount);
        currentAccount = newAccount;
        openAccount();

    }

    inputUsername.value = inputPassword.value = '';
})

// ---------- Implementing Signup Feature ----------

const mainFunction = function()
{
    // ----------- Implementing Date -----------------
    
    function updateClock() {
    
        var d = new Date();
    
        labelDate.innerHTML =  `${d.getDay()+1}/${d.getMonth()+1}/${d.getFullYear()}`;
        labelTime.innerHTML =  `${d.getHours() < 10 ? '0'+ d.getHours() : d.getHours()}
                                :${d.getMinutes() < 10 ? '0'+ d.getMinutes() : d.getMinutes()}
                                :${d.getSeconds() < 10 ? '0'+ d.getSeconds() : d.getSeconds()}`;
      
        setTimeout(updateClock, 1000);
    }
    
    updateClock(); // initial call
    
    // ---------- Implementing Weekdays ----------
    
    let clicked = false;
    const WeekList = Array.from(labelWeekDay, week => week.addEventListener('click',function(e)
    {
        e.preventDefault();
        if(!clicked)
        {
             week.style.borderBottom = '1px solid #54363b';
             clicked = true;
        }
        else
        {
            week.style.borderBottom = 'none';
            clicked = false;
        }
      
    }));
    
    // ---------- Display Tasks ----------

   // containerTask.innerHTML = '';
    const displayTask = function(task)
    {
        const html = `<li class="todo-item"> <div class="todo-list task-todo">${task}<button class="delete--task delete">&cross;</button></div> </li>`;
        containerTask.insertAdjacentHTML("afterbegin", html);       
    }
    
    // ---------- Display Events ----------
    
    const displayEvent = function(event)
    {
        const html = ` <li class="todo-item"> <div class="todo-list task-todo">${event}<button class="delete--event delete">&cross;</button></div>`;
        containerEvent.insertAdjacentHTML("afterbegin", html);
    }
        
    // ---------- Display Notes ----------
    
    const displayNote = function(note)
    {
        containerNote.innerHTML = '';
        containerNote.textContent = note;
    }
    
    displayNote(currentAccount.note);
    
    // ---------- Submit The Task ----------
    
    btnSubmitTask.addEventListener('click',function(e)
    {
        e.preventDefault();
        if(inputTask.value !== '')
        {
            const newTask = inputTask.value;
            currentAccount.task.push(newTask);
            displayTask(newTask);
        }
    
        inputTask.value = '';
    })
    
    // ---------- Submit The Event ----------
    
    btnSubmitEvent.addEventListener('click',function(e)
    {
        e.preventDefault();
        if(inputEvent.value !== '')
        {
            const newEvent = inputEvent.value;
            currentAccount.event.push(newEvent);
            displayEvent(newEvent);
        }
    
        inputEvent.value = '';
    })
    
    
    btnSubmitNote.addEventListener('click',function(e)
    {
        e.preventDefault();
        if(inputNote.value === '')
        {
            displayNote(currentAccount.note);
        }
        else
        {
            const newNote = inputNote.value;
            currentAccount.note = newNote;
            displayNote(currentAccount.note);
        }
    
        // inputNote.value = '';
    })

    // -------------- IMPLEMENTING CHECKED and Delete FEATURE --------------

   containerTask.addEventListener('click', function(e)
   {
       const item = e.target;
       
       if(item.classList[0] === 'todo-list')
       {
            item.classList.toggle('completed');
       }

       if(item.classList[0] === 'delete--task')
       {
           const todo = item.parentElement;
           todo.remove();
       }

   })

   containerEvent.addEventListener('click', function(e)
   {
       const item = e.target;
       if(item.classList[0] === 'todo-list')
       {
            item.classList.toggle('completed');
       }

       if(item.classList[0] === 'delete--event')
       {
           const todo = item.parentElement;
           todo.remove();
       }
   })
   

    // -------------- IMPLEMENTING DELETE ALL FEATURE --------------

let completedTask;

btnDeleteAllTask.addEventListener('click', function()
   {
       completedTask = Array.from(containerTask.childNodes, child => child).filter(el => el.nodeName === 'LI').filter(li => li.childNodes).map(el => el.childNodes).flatMap(nl => Array.from(nl)).filter(el => el.nodeName === 'DIV');
       completedTask.forEach(task => {

           if(task.classList.contains('completed'))
           {
               task.remove()
           }
       })
   })

 }

 let completedEvent;

 btnDeleteAllEvent.addEventListener('click', function()
   {
       completedEvent = Array.from(containerEvent.childNodes, child => child).filter(el => el.nodeName === 'LI').filter(li => li.childNodes).map(el => el.childNodes).flatMap(nl => Array.from(nl)).filter(el => el.nodeName === 'DIV');
       completedEvent.forEach(event => {
           if(event.classList.contains('completed'))
           {
               event.remove()
           }
       })
   })

    // -------------- IMPLEMENTING SIGN OUT --------------
   
btnSignOut.addEventListener('click' , closeAccount);
