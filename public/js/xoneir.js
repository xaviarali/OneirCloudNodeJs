var windowSize = 0;

$(function(){
    displayHead();
    session_login();
    $.get("login_check",function(data){ 
		if(data.id==0)
		{
		      start();
		}
		else
		{
		       $('#sLogIn').hide();
		       $('#oneirHome').show();
               login(); 
               logout();
               events();
               display_session_name();       
		}
	},"json");
    
       
    }); 
    
function events()
{
    $(document).on('click',"#login",function(e){
                 e.preventDefault();
                 $.get("oneir_commands",{q:1},function(d){});  
                 menu(); $('#menu').show();
                 $('#login').hide();
                 });
    
    $(document).on('click',"#customer",function(e){
                 e.preventDefault();  
                 $.get("oneir_commands",{q:2},function(d){});
                 });
    
    $(document).on('click',"#product",function(e){
                 e.preventDefault();  
                 $.get("oneir_commands",{q:3},function(d){});
                 });
    $(document).on('click',"#imm",function(e){
                 e.preventDefault();  
                 $.get("oneir_commands",{q:4},function(d){});
                 });
    $(document).on('click',"#arsd",function(e){
                 e.preventDefault();  
                 $.get("oneir_commands",{q:5},function(d){});
                 });
    $(document).on('click',"#insd",function(e){
                 e.preventDefault();  
                 $.get("oneir_commands",{q:6},function(d){});
                 });
}

function start()
{
   $('#oneirHome').hide();
   $("#start").html("<div class=\"form-group\"><div class=\"icon-addon addon-md\"><input type=\"text\" placeholder=\"Username\" class=\"form-control\" id=\"sess_login\"name=\"username\" pattern=\".{4,}\" required title=\"4 characters minimum\"><label for=\"username\" class=\"fa fa-user\" rel=\"tooltip\" title=\"Username\"></label></div></div><div id=\"sess_butt_pos\"><input id=\'sess_submit\' type=\"submit\" value=\"Sign In\" class=\"btn btn-primary btn-lg\"/></div>");
}

function displayHead()
{
     $("#head").html("<ul class=\"nav nav-pills nav-stacked\"><li role=\"presentation\" class=\"active\"><a href=\"#\">Oneir Solutions</a></li>");
}

function login()
{
    $("#login").html("<li id=\"customer\"><a href=\"#\"><i class=\"fa fa-list-alt\"></i>Login</a></li>");
 
} 

function screenSize()
{
   $('#sc_op').html("<button id=\"sc_normal\" type=\"button\" class=\"btn btn-default\">Normal</button><button id=\"sc_full\" type=\"button\" class=\"btn btn-default\">Fullscreen</button>");
}

function menu()
{
 $("#menu").html("<li id=\"customer\"><a href=\"#\"><i class=\"fa fa-list-alt\"></i>Products</a></li><li id=\"product\"><a href=\"#\"><i class=\"fa fa-list-alt\"></i>Customers</a></li><li id=\"imm\"><a href=\"#\"><i class=\"fa fa-list-alt\"></i>Inventory Management Menu</a></li><li id=\"arsd\"><a href=\"#\"><i class=\"fa fa-list-alt\"></i>Customer's Account Status (T)</a></li><li id=\"insd\"><a href=\"#\"><i class=\"fa fa-list-alt\"></i>Inventory Status (T)</a></li>");
}

function session_login()
{
      $(document).on('click',"#sess_submit",function(e){
           $.get("oneir_session_login",{id:$("#sess_login").val()},function(data){
                if(data.id != 0){
                  login();
                  $("#login").show();
                  logout();
                  $('#start').hide();  
                  $('#logout_sess').show();
                  display_session_name();
                  $('#sLogIn').hide();
		          $('#oneirHome').show();
                  events();
                 }
           });
      });
}

function logout()
{       
    $('#logout_sess').html("<button type=\"button\" id=\'logout_sess_button\' class=\"btn btn-primary btn-lg btn-block\">Logout</button>");
     $(document).on('click',"#logout_sess_button",function(e){
         $.get("oneir_logout");
         $('#login').hide();
         $('#menu').hide();
         start();
         $('#start').show();
         $('#logout_sess').hide();
         $('#sLogIn').show();
     });
}

function display_session_name()
{
   $.get("oneir_session_name",function(data){
          if(data.id != 0){
          $('#username').html(data.id);
          }
            },"json");
}
