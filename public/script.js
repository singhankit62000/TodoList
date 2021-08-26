const taskList = document.querySelector('.tasks')
const counter = document.querySelector('.task-count')
const listElements = taskList.querySelectorAll("input")

console.log(counter)

document.onload = counterRefresh()

function counterRefresh() {
    let count = 0
    for(let i = 0; i < listElements.length; i++)
    {
        if(listElements[i].type === 'checkbox'  && listElements[i].checked === true)
        count++;        
    }

    let rem = listElements.length - (count + 1)

    if(rem > 1)
    counter.innerText = `${rem} tasks remaining`;
    else if(rem === 0)
    counter.innerText = `Yay! You're done for the day`;
    else
    counter.innerText = `${rem} task remaining`;
}

taskList.addEventListener('click', counterRefresh);