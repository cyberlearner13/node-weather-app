const weatherForm = document.querySelector("form");
const searchTerm = document.querySelector("input");

const p1 = document.querySelector("#msg1");
const p2 = document.querySelector("#msg2");

weatherForm.addEventListener('submit',e =>{
    e.preventDefault();
    let location = searchTerm.value;
    p1.innerText = "Loading...";
    p2.innerText = "";
    fetch(`http://localhost:3000/weather?address=${location}`)
        .then(res => res.json())
        .then(data => {
            if(data.error){
                p1.innerText = data.error;
                p2.innerText = "";
            }
            else{
                p1.innerText = data.location;
                p2.innerText = data.forecast;
            }
        })
        .catch(err => console.log(err))


})
