    $('#tombol').on('click', function() {
        $('#daftar-film').html(''); 
        $.ajax({
            url: 'https://www.omdbapi.com/',
            type: 'get',
            dataType: 'json',
            data: {
                'apikey': '4597f7cb', 
                's': $('#cari').val() 
            },
            success: function(hasil) {
                if (hasil.Response == 'True') {
                    let film = hasil.Search;
                    console.log(film);
                    $.each(film, function(i, data) {
                        $('#daftar-film').append(`
                            <div class="col-md-4 mb-3">
                                <div class="card" style="width: 18rem;">
                                    <img src="${data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/150'}" class="card-img-top" alt="${data.Title}">
                                    <div class="card-body">
                                        <h5 class="card-title">${data.Title}</h5>
                                        <p class="card-text">Year: ${data.Year}</p>
                                        <a href="https://www.imdb.com/title/${data.imdbID}" target="_blank" class="btn btn-info detail" data-id="${data.imdbID}" data-bs-toggle="modal"data-bs-target="#exampleModal">Detail film 🔍</a>
                                    </div>
                                </div>
                            </div>`
                        );
                    });
            } else {
            $('#daftar-film').append(`
                <div class="col">
                <h5 class="text-center text-dange"> ${hasil.Error} </h5>
                </div> 
            `)
            }   
        }
    })
});

// event bundling
$('#daftar-film').on('click', '.detail', function () {
    let id = $(this).data('id')
    console.log(id);
    $.ajax({
        url: 'https://www.omdbapi.com/',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '4597f7cb', 
            'i': $(this).data('id')
        },
        success: function(hasil){
            if(hasil.Response =='True'){
                $('.modal-body').html(`
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${hasil.Poster}" class="img-fluid" alt="">
                        </div>
                        <div class="col-md-8">
                        <ul class="list-group">
                        <li class="list-group-item"><strong>Title: </strong>${hasil.Title}</li>
                        <li class="list-group-item"><strong>release: </strong>${hasil.Release}</li>
                        <li class="list-group-item"><strong>gende: </strong>${hasil.Gende}</li>
                        <li class="list-group-item"><strong>director: </strong>${hasil.Director}</li>
                        <li class="list-group-item"><strong>artors: </strong>${hasil.Artors}</li>
                        <li class="list-group-item"><strong>awards: </strong>${hasil.Awards}</li>
                        </ul>
                        </div>
                    </div>
                    </div>
                `)
            }
        } 
    })
})