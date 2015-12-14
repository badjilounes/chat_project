$(function () {
    /* BOOTSNIPP FULLSCREEN FIX */
	$('#chat_window_1').hide();
	
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
    $('a[href="#cant-do-all-the-work-for-you"]').on('click', function(event) {
        event.preventDefault();
        $('#cant-do-all-the-work-for-you').modal('show');
        
        $('#contact-list').append("")
        
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
    
    $('#list_grp').on('click', function(event) {
    		$('#chat_window_1').show();
    });
    
    $('#close').on('click', function(event) {
		$('#chat_window_1').hide();
    });
    
    $('#btn-chat').on('click', function(event) {
    	var d = new Date();
    	var text = document.getElementById("btn-input").value;
    	$('<div class="row msg_container base_sent" id="msg_send"><div class="col-md-10 col-xs-10 "><div class="messages msg_sent"><p>'+text+'</p><time datetime="'+ d.getHours()+':'+ d.getMinutes()+'">Timothy • 51 min</time></div></div><div class="col-md-2 col-xs-2 avatar"><img src="img/default_pic.jpg" class=" img-responsive "></div></div>').appendTo('#msg_container');
    	
    });
    
});


////<!--                     <li class="list-group-item" id="list_grp"> -->
//<!--                         <div class="col-xs-12 col-sm-3" > -->
//<!--                             <img src="http://api.randomuser.me/portraits/men/49.jpg" alt="Scott Stevens" class="img-responsive img-circle" /> -->
//<!--                         </div> -->
//<!--                         <div class="col-xs-12 col-sm-9"> -->
//<!--                             <span class="name">Scott Stevens</span><br/> -->
//<!--                             <span class="glyphicon glyphicon-map-marker text-muted c-info" data-toggle="tooltip" title="5842 Hillcrest Rd"></span> -->
//<!--                             <span class="visible-xs"> <span class="text-muted">5842 Hillcrest Rd</span><br/></span> -->
//<!--                             <span class="glyphicon glyphicon-earphone text-muted c-info" data-toggle="tooltip" title="(870) 288-4149"></span> -->
//<!--                             <span class="visible-xs"> <span class="text-muted">(870) 288-4149</span><br/></span> -->
//<!--                             <span class="fa fa-comments text-muted c-info" data-toggle="tooltip" title="scott.stevens@example.com"></span> -->
//<!--                             <span class="visible-xs"> <span class="text-muted">scott.stevens@example.com</span><br/></span> -->
//<!--                         </div> -->
//<!--                         <div class="clearfix"></div> -->
//<!--                     </li> -->
//<!--  
