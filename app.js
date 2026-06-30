// const checkBtn = document.querySelector('.check-btn');

// checkBtn.addEventListener("click", () => {
//     task.classList.toggle("completed");
// });

const deleteBtn = document.querySelectorAll('.delete-btn');

deleteBtn.forEach(button => {
    button.addEventListener('click', () => {
        button.parentElement.remove();
    })
})