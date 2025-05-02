const ENDPOINT = "http://localhost:3000/apple";
const apple_boxs = document.querySelector("#apple_boxs");
const samsung_boxs = document.querySelector("#samsung_boxs");

const getApple = () => {
    axios.get(ENDPOINT).then(({data}) => {
        data.forEach(({id,name}) => {
            apple_boxs.innerHTML += `
               <div class="box">
            <p>${name}/p>
        </div> `;
        });
    });

};

getApple();
