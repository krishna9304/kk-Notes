console.log("Console is working");
showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myobj = {
        Title : addTitle.value,
        Text : addTxt.value,
        bookmark : false
    }
    notesObj.push(myobj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = '';
    

    

    notesObj.forEach(function (element, index) {
        let src = "";

        if(element.bookmark === true){
            src = "active.png"
        }else{
            src = "notactive.png"
        }

        html += `<div class="noteCard my-2 mx-2 card" style="width: 12rem;">
        <div class="card-body">
          <div class="noteTitle">
          <h5 class="card-title">${element.Title}</h5>
            <img style="position:relative; left: -88px; top: -25px" onclick="higlightBookmark(this , ${index})"  src="${src}" width="30" height="30" />
          <svg id= ${index} onclick= "deleteNote(this.id)" width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
        </div>
          <p class="card-text">${element.Text}</p>
        </div>
      </div>`;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show here, Click on "Add Note" above to add something.`;
    }
}

function higlightBookmark(img , idx){

    //http://127.0.0.1:5500/active.png

    let temp = img.src.split('/')

     if(temp[temp.length - 1] === 'active.png'){
        img.src = "notactive.png"
        changeBookmark(false , idx)
     }else{
        img.src = "active.png"
        changeBookmark(true , idx)
     }

}

function changeBookmark(bool , idx) {
    let notes = JSON.parse(localStorage.getItem('notes'))

    notes[idx].bookmark = bool

    localStorage.setItem("notes" , JSON.stringify(notes))

}

function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

let searchText = document.getElementById('searchText');
searchText.addEventListener('input', function () {
    let val = searchText.value.toLowerCase();
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function (element) {
        let cardTitle = element.getElementsByClassName('card-title')[0].innerText;
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if (cardTxt.includes(val) | cardTitle.includes(val)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})