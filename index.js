console.log("This is project 6")
// hide the params box initially
let parametersBox = document.getElementById("parametersBox")
parametersBox.style.display= "none"



function addingnewDiv(string){
let div= document.createElement("div")
div.innerHTML=string
return div.firstElementChild
}

let addParameter=0
// if the user clicks on params, hide the json box
let paramsRadio = document.getElementById("paramsRadio")
paramsRadio.addEventListener("click", ()=>{
    document.getElementById("requestJsonBox").style.display="none"
    document.getElementById("parametersBox").style.display="block"
})
// if the user clicks on json , hide the params box
let jsonRadio = document.getElementById("jsonRadio")
jsonRadio.addEventListener("click", ()=>{
    document.getElementById("parametersBox").style.display="none"
    document.getElementById("requestJsonBox").style.display="block"
 })  


// If the user click on + add more params
let addParam= document.getElementById("addParam")
addParam.addEventListener("click",()=>{
    let params=document.getElementById("params")
    let string=` <div class="form-row my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter${addParameter+2}</label>
    <div class="col-md-3">
        <input type="text" class="form-control" id="parameterKey${addParameter+2}" placeholder="Enter Parameter${addParameter+2}Key">
    </div>
    
    <div class="col-md-3">
        <input type="text" class="form-control" id="parameterValue${addParameter+2}" placeholder="Enter Parameter${addParameter+2}Value">
    </div>
    <button id="addParam" class="btn btn-primary delete">-</button>
</div>`
  let ParamElement=addingnewDiv(string)
  params.appendChild(ParamElement)
//   Remove the element
  let deleteParam = document.getElementsByClassName("delete")
  for ( item of deleteParam){
    item.addEventListener("click", (e)=>{
        confirm("Do you want to Delete this")
         e.target.parentElement.remove()
    })
  }



  addParameter++
})

// If the user clicks on submit button
let submit = document.getElementById("submit")
submit.addEventListener("click", ()=>{

    document.getElementById("responseJsonText").value="please wait"

    let url=document.getElementById("url").value
   let requestType=document.querySelector("input[name='requestType']:checked").value
   let contentType=document.querySelector("input[name='contentType']:checked").value
   if (contentType == 'params') {
    data = {};
    console.log(addParameter)
    for (let i = 0; i <  addParameter + 1; i++) {
        if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
            let key = document.getElementById('parameterKey' + (i + 1)).value;
            let value = document.getElementById('parameterValue' + (i + 1)).value;
            data[key] = value; 
        }
    }
    data = JSON.stringify(data);
   
}
else {
    data = document.getElementById('requestJsonText').value;
    console.log(data)
  }

   console.log(url)
    console.log(requestType)
    console.log(contentType)
    console.log(data)
// if the request type is post, invoke fetch api to create a post request
if(requestType=="GET"){
 fetch(url, {
  method:'GET',
})
.then(response=>response.text())
.then((text)=>{
  document.getElementById("responseJsonText").value=text
})
}else{
  fetch(url, {
    method:"POST",
    body: data,
    headers: {
        "Content-type": "application/json; charset=UTF-8"
      } 
  })
  .then(response=>response.text())
  .then((text)=>{
    document.getElementById("responseJsonText").value=text 
  })
}

  })