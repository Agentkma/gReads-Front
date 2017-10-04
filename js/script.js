$(document).ready( ()=>{

'use strict';

// jQuery Variables*************************************************************************************************************************************************//

const $authorAndBookResultsContainer = $('#authorAndBookResultsContainer');
const $mainBookOrAuthor = $('#mainBookOrAuthor');
const $allBookResults = $('#allBookResults');
const $viewBooksBtn = $('#viewBooksBtn');
const $viewAuthorsBtn = $('#viewAuthorsBtn');





// Global Variables*************************************************************************************************************************************************//

const dbUrl = "https://warm-badlands-88841.herokuapp.com/";


// Functions*************************************************************************************************************************************************//

function createAllBookResults (bookData) {

    //array of objects
    // console.log(bookData);

    bookData.forEach((book)=>{
        let bookId = book.book_id
        let bookTitle = book.book_title;
        let authorNames=book.authors;
        let bookGenre= book.book_genre;
        let bookDescription= book.book_description;
        let bookCover = book.book_cover_url;



        const bookResultDiv = `<div class="row mb-3 ${bookTitle}">
            <div class="col-md-6">
                <div class="card mb-3 ">
                    <img class="bookImage" src="${bookCover}" height="250" width="300" alt="book cover image">
                </div>
            </div>
            <div class="col-md-6 ">
                <div class="card mb-3 ">
                    <div class="card-body " id="cardBody">
                        <h4 id="bookTitle" class="card-title ">${bookTitle}</h4>
                        <h6 id="${bookId}" class="card-subtitle "><strong>AUTHOR(S)</strong></h6>
                        <h6 class="card-subtitle "><strong>GENRE  </strong>${bookGenre}</h6>
                        <p class="card-text "><strong>DESCRIPTION  </strong>${bookDescription}</p>
                        <p class="card-text "><small class="text-muted ">Books being added as we speak.</small></p>
                        <a id="editBtn" href="# " class="btn btn-dark ">Edit</a>
                        <a id="deleteBtn" href="# " class="btn btn-dark ">Delete</a>
                    </div>
                </div>
            </div>
        </div>
        <hr></hr>`;

        $allBookResults.append(bookResultDiv);

        authorNames.forEach((author)=>{

            let firstName = author.first_name;
            let lastName = author.last_name;
            let authorName = `<span>${firstName} ${lastName}<span>    `;
            $(`#${bookId}`).append(authorName);

        });

    });
}


// EVENT / CLICK HANDLERS*************************************************************************************************************************************************//

$viewBooksBtn.click( (event)=>{
    event.preventDefault();
    getAllBooks();
    $mainBookOrAuthor.hide();
    $authorAndBookResultsContainer.show();
    $( 'html, body' ).animate( {
        scrollTop: $allBookResults.offset().top
    }, 1000 );
});

$viewAuthorsBtn.click( (event)=>{

    event.preventDefault();

});


//AJAX CALLS*************************************************************************************************************************************************//

//GET all books

function getAllBooks (){
    let daTa;
    $.ajax({
        type: "GET",
        url: `${dbUrl}book`,
        data: daTa,
        async: true,
        crossDomain: true,
        success: function ( response ) {
            createAllBookResults(response);
        }
    });
}


});
