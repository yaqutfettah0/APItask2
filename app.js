const ENDPOINT = "http://localhost:3000";
const apple_boxs = document.querySelector("#apple_boxs");
const samsung_boxs = document.querySelector("#samsung_boxs");
const newUrl = document.querySelector("#newUrl");
const newPhone= document.querySelector("#newPhone");
const newPrice= document.querySelector("#newPrice");
const newUserRole= document.querySelector("#newUserRole");
const addnewUserForm =document.querySelector("#addnewUserForm");


const showData = (url,boxs) => {
    boxs.innerHTML = "";
    axios.get(ENDPOINT + url ).then(({data}) => {
        if(data && data.length>0) {
            data.forEach(({id,image,name,price}) => {
                boxs.innerHTML += `
                   <div class="box" >
                    <img src="${image}" alt="img">
                <p>${name}</p>
                 <p>${price}</p>
                 <div class="edit-delete" >
                 <div class="delete" >
                  <p> <i class="fa-solid fa-trash" onclick="deleteUser('${id}','${url}')"></i> </p>
                  </div>
                  <div class="edit" >
                   <p> <i class="fa-solid fa-pen-to-square"  onclick="editUser('${id}','${url}')"></i> </p>
                   </div>
                   </div>
            </div> `;
            });
         } else {
            boxs.innerHTML = "Melumat tapilmadi.";
         }
    });

};

showData('/apple',apple_boxs);
showData('/samsung',samsung_boxs);

addnewUserForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newUser = {
        name: newPhone.value,
        price: newPrice.value,  
        image: newUrl.value,                                                  
    };
   
    const url = newUserRole.value == 0 ? "/apple" : "/samsung";
    const boxs = newUserRole.value == 0 ? apple_boxs :  samsung_boxs;  
    axios.post(ENDPOINT + url,newUser).then((res) => {
      newPhone.value = "";
      newPrice.value = "";
      newUrl.value = "";
      showData(url,boxs);
      
    })
    
    
})

const deleteUser = (id,url) => {
    Swal.fire({
        title: "Silmek istediyinize eminsiniz?",
        text: "Bir daha geri qayitmayacaq!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sil!",
        cancelButtonText: "Legv et!"
      }).then((result) => {
        if (result.isConfirmed) {
       axios.delete(ENDPOINT + url + '/' + id).then((res) => {
        if(res.status === 200) {
            Swal.fire({
                title: "Silindi!",
                text: "Your file has been deleted.",
                icon: "success"
              });

              if (url === '/apple') {
                showData('/apple',apple_boxs);
               }
              else if (url === '/samsung'){
                showData('/samsung',samsung_boxs);
              }
        }
       })
        }
      });
}

const editUser = (id,url) => {
  axios.get(ENDPOINT + url + "/" + id).then(({data}) => {
    const newData = prompt("deyisdireceyiniz modelin adinin yazin", data.name);
    const newData1 = prompt("deyisdireceyiniz modelin qiymetini yazin", data.price);
    const newData2 = prompt("deyisdireceyiniz modelin url'ni atin:", data.image);

    if(newData,newData1,newData2) {
      const data = {
        name:newData,
        price:newData1,
        image:newData2,
      };

      axios.put(ENDPOINT + url + "/" + id,data).then((res) => {
        if(res.status ===200) {
          const boxs = newUserRole.value == 0 ? apple_boxs :  samsung_boxs; 
          
          showData(url,boxs);
        }  
      });
    }
  });
  
}
