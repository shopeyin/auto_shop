function formValid(x, y, event,result){

								if (x=='' && y==''){
						
									$(result).html('input all fields')
									$(result).css('color', 'red')
									event.preventDefault()
								}
								 else if (x == ''){
									$(result).html('input email')
									$(result).css('color', 'red')
									event.preventDefault()
								} else if (y == '') {
									$(result).html('input password')
									$(result).css('color', 'red')
									event.preventDefault()
								
								}else if (x !== '' && y !== ''){
									$(result).css('color', 'red')
								}


	};



	$(document).ready(function(){
								$('#btn2').click(function(){
									$('#signUp').show()
									$('#signIn').hide()
								})
								$('#btn3').click(function(){
									$('#signUp').hide()
									$('#signIn').show()
								});


								$('#email').focus(function(){
								$(this).css({background:'red', color:'white'})
								})

								$('#pwd').focus(function(){
									$(this).css({background:'red', color:'white'})
								});


	})	



	function formValid2(a,b,c,d,e,f,g,event){
								if(a== '' || b =='' || c == '' || d == '' || e == '' || f == '' || g == '' || $('#check').prop('checked')==false){
									$('#buyerform').html('input all fields')
									$('#buyerform').css('color','red','bold')
									event.preventDefault()
								}else if (f !== g){
									$('#buyerform').html('password do not match')
									$('#buyerform').css('color','red')
									event.preventDefault()
								}else{
									$('#buyerform').html('welcome')
									$('#buyerform').css('color','red')
								}
	};

	function formValid3(a,b,c,d,e,f,g,h){
								if(a== '' || b =='' || c == '' || d == '' || e == '' || f == '' || g == '' || h =='' || $('#chk2').prop('checked')==false){
									
									$('#feedBack').html('input all fields')
									$('#feedBack').css('color','red','bold')
								}else if (f !== g){
									$('#feedBack').html('password do not match')
									$('#feedBack').css('color','red',)
								}else{
									$('#feedBack').html('welcome')
									$('#feedBack').css('color','red',)
								}
		};

	$(document).ready(function(){
								$('#btnsel').click(function(){
									$('#signUp2').show()
									$('#signIn2').hide()
								})

								$('#btnsel2').click(function(){
									$('#signUp2').hide()
									$('#signIn2').show()
								})
	})

	$(document).ready(function(){
								$('#showform').click(function(){
									$('#formh').show()
								});
		
								$('#hideform').click(function(){
									$('#formh').hide()
								});
	})


// homepage form//
	$(document).ready(function(){
		$('#showform').click(function(){
			$('#formh').show()
		});
		
		$('#hideform').click(function(){
			$('#formh').hide()
		})

})

	
			
// buyer dashboard//
$(document).ready(function(){
	$('#ad_btn').click(function(){
		$('#dash').hide()
		$('#dashform').show()
	})
	$('#btn_save').click(function(){
		$('#dashform').hide()
		$('#dash').show()
	})

	$('#ad_btn2').click(function(){
		$('#dash2').hide()
		$('#dashform2').show()


	})

	$('#btn_save2').click(function(){
		$('#dashform2').hide()
		$('#dash2').show()
	})
})


// sellerdashboard js
$(document).ready(function(){
	$('#sel').mouseenter(function(){
	$('#sellform').toggle();

	});


	$('#sel2').mouseenter(function(){
		$('#sellform2').toggle();
	})	


$('#bot').click(function(){
	$('#body').toggleClass('btn-dark')
	$('.br').css('color','black')
	
})

$('#ad_btn').click(function(){
	$('#selldash').toggle()
	$('#ship').hide()
})


$('#ad_confirm').click(function(){
	$('#ship').show()
	$('#selldash').hide()
})

$('#sell_home').click(function(){
	$('#venform').show()
	$('#ad_product').hide()
	$('#dis_prod').hide()
})


$('#ad_book').click(function(){
	$('#ship').show()
	$('#selldash').hide()
})

$('#show_prod').click(function(){
	$('#ad_product').show()
	$('#venform').hide()
	$('#dis_prod').hide()
	// show(function(){
	// 	$('#venform').toggle()
	// })

})

$('#view_prod').click(function(){
	$('#dis_prod').show()
	$('#ad_product').hide()
	$('#venform').hide()
})
})



	






