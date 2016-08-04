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
   $("#start").html("<div class=\"input-group\"><span class=\"input-group-addon\" id=\"basic-addon1\">Email</span><input id=\"sess_login\"type=\"text\" class=\"form-control\" placeholder=\"Session Id\" aria-describedby=\"basic-addon1\"></div><div id=\"sess_button_div\"><button id=\'sess_submit\' type=\"button\" class=\"btn btn-default\">Start Session</button></div>");
}

function displayHead()
{
     $("#head").html("<ul class=\"nav nav-pills nav-stacked\"><li role=\"presentation\" class=\"active\"><a href=\"#\">Oneir Solutions</a></li>");
}

function login()
{
    $("#login").html("<ul class=\"nav nav-pills nav-stacked\"><li role=\"presentation\"><a id=\"login_page\" href=\"#\">Login</a></li></ul>");
 
} 

function screenSize()
{
   $('#sc_op').html("<button id=\"sc_normal\" type=\"button\" class=\"btn btn-default\">Normal</button><button id=\"sc_full\" type=\"button\" class=\"btn btn-default\">Fullscreen</button>");
}

function menu()
{
 $("#menu").html("<ul class=\"nav nav-pills nav-stacked\"><li role=\"presentation\"><a href=\"/oneir/Product.etx\" download id=\"product\">Products</a></li><li role=\"presentation\"><a download id=\"customer\" href=\"/oneir/Customer.etx\">Customers</a></li><li role=\"presentation\"><a download id=\"imm\" href=\"/oneir/Cxustomer.etx\">Inventory Management Menu</a></li><li role=\"presentation\"><a download id=\"arsd\" href=\"#\">PROG=ARSD (Customer's Account Status)</a></li><li role=\"presentation\"><a download id=\"insd\" href=\"#\">PROG=INSD (Inventory Status)</a></li></ul>");
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
     });
}

function display_session_name()
{
   $.get("oneir_session_name",function(data){
          if(data.id != 0){
          $('#logout_sess_button').html("<h5>Logout <br>Session Id:<br>"+data.id+"</h5>");
          }
            },"json");
}
