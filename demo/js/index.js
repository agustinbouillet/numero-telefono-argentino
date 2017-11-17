$(document).foundation();

// PRESENTATION ///////////////////////////////////////////////////////////////
// NO FORMA PARTE DE SCRIPT ///////////////////////////////////////////////////

function draw(str) {
    $('#debug').empty();
    var a = $('#resultados');
    $('#debug').append('<h2>Return</h2>');

    ta = new TelefonoArgentino(str);

    if (ta.isValid()) {
        $('<table/>', {
            id: 'debug_results',
            class: 'debug',
        }).appendTo('#debug');

        $.each(ta.getData(), function(k, v) {
            $('#debug_results')
                .append('<tr><th>' + k + '</th><td>' + v + '</td></tr>');
        });

        if (ta.getGeoPolitc()) {
            geo = ta.getGeoPolitc();

            $.each(geo, function(k, v) {
                $('#debug_results')
                    .append('<tr><th>' + k + '</th><td>' + v + '</td></tr>');
            });
            //tooltip
            $('.area_code').attr('title', geo.ciudad + ', ' + geo.provincia);
        }

        a.html('<span class="valid">Válido</i>').fadeIn();
    } else {
        $('#debug').append('<p>False</p>');
        a.html('<span class="invalid">Inválido</i>').fadeIn();

        if (ta.invalidChars().length > 0) {
            $('#debug').append('<h3>Caracteres inválidos</h3>');
            $('<table/>', {
                id: 'debug_results',
                class: 'debug',
            }).appendTo('#debug');

            $.each(ta.invalidChars(), function(k, v) {
                $('#debug_results').append('<tr><td>' + v + '</td></tr>');
            });

        }
    }
}

/**
 * Resetea el input.
 */
$('#sample').keydown(function() {
    $('#resultados').fadeOut();
    $('#debug').empty();
});

$('#ver').click(function() {
    draw($('#sample').val());
});

$('.ejemplo li').click(function(e) {
    e.preventDefault();
    $('.alert').fadeOut();
    var valor = $(this).text();
    $('#sample').val(valor);
    draw($('#sample').val());
});