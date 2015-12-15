$(function () {
    /* BOOTSNIPP FULLSCREEN FIX */
	$('.msg_container_base').scrollTop($('.msg_container_base')[0].scrollHeight);
	$(document).on('click', '.panel-heading span.icon_minim', function (e) {
	    var $this = $(this);
	    if (!$this.hasClass('panel-collapsed')) {
	        $this.parents('.panel').find('.panel-body').slideUp();
	        $this.addClass('panel-collapsed');
	        $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
	    } else {
	        $this.parents('.panel').find('.panel-body').slideDown();
	        $this.removeClass('panel-collapsed');
	        $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
	    }
	});
	$(document).on('focus', '.panel-footer input.chat_input', function (e) {
	    var $this = $(this);
	    if ($('#minim_chat_window').hasClass('panel-collapsed')) {
	        $this.parents('.panel').find('.panel-body').slideDown();
	        $('#minim_chat_window').removeClass('panel-collapsed');
	        $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
	    }
	});
	$(document).on('click', '#new_chat', function (e) {
	    var size = $( ".chat-window:last-child" ).css("margin-left");
	     size_total = parseInt(size) + 400;
	    alert(size_total);
	    var clone = $( "#chat_window_1" ).clone().appendTo( ".container" );
	    clone.css("margin-left", size_total);
	});
	$(document).on('click', '.icon_close', function (e) {
	    //$(this).parent().parent().parent().parent().remove();
	    $( "#chat_window_1" ).hide();
	});
	
	$('#chat_window_1').hide();
	$('#addContact').hide();
	
    if (window.location == window.parent.location) {
        $('#back-to-bootsnipp').removeClass('hide');
    }
    
//    $('[data-toggle="tooltip"]').tooltip();
//
//    $('[data-toggle="tooltip"]').tooltip();
    
    $('#fullscreen').on('click', function(event) {
        event.preventDefault();
        window.parent.location = "http://bootsnipp.com/iframe/4l0k2";
    });
    
    $('#close_add').on('click', function(event) {
    	$('#addContact').hide();
    	$('#contact-list').show();
    	$('#search').show();
    	$('a[href="#cant-do-all-the-work-for-you"]').show();
    });
    $('a[href="#cant-do-all-the-work-for-you"]').on('click', function(event) {
        event.preventDefault();
//        $('#cant-do-all-the-work-for-you').modal('show');
//        alert("plus");
        $('a[href="#cant-do-all-the-work-for-you"]').hide();
        $('#search').hide();
        $('#contact-list').hide();
        $('#addContact').show();
        $('#addContact').animate( {
	        left: '200px',
	        top: '100px',
	        width: 'fit-conent' ,
	        height: 'fit-content',
	        opacity: 1
	    } );
        
        
        
    })
    
    $('[data-command="toggle-search"]').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('hide-search');
        
        if ($(this).hasClass('hide-search')) {        
            $('.c-search').closest('.row').slideUp(100);
        }else{   
            $('.c-search').closest('.row').slideDown(100);
        }
    })
    
    $('#contact-list').searchable({
        searchField: '#contact-list-search',
        selector: 'li',
        childSelector: '.col-xs-12',
        show: function( elem ) {
            elem.slideDown(100);
        },
        hide: function( elem ) {
            elem.slideUp( 100 );
        }
    })
    
    $('#contact-list').on('click', function(event) {

    	var txt = $('#contact_name').text();
    
    	$('#panel_title').text("Chat - " + txt);
    	
    	$('#chat_window_1').show();
    	
    });
    
    $('#btn-chat').on('click', function(event) {
    	var d = new Date();
    	var text = document.getElementById("btn-input").value;
    	$('<div class="row msg_container base_sent" id="msg_send"><div class="col-md-10 col-xs-10 "><div class="messages msg_sent"><p>'+text+'</p><time datetime="'+ d.getHours()+':'+ d.getMinutes()+'">Timothy • 51 min</time></div></div><div class="col-md-2 col-xs-2 avatar"><img src="img/default_pic.jpg" class=" img-responsive "></div></div></br>').appendTo('#msg_container');
    	
    });
    
});

