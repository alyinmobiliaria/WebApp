/* Empezamos con una Función Anónima Closure*/
/* La línea 5 apunta al div#marco porque $this 
es el div#marco y se comprueba con un cosole.log */

;(function($, window, undefined){

	$.fn.roulete = function(prev,sig){
		return this.each(function(){
			$container = $(this).children().eq(0);

			if($container){
				var $slide = $container.children();
				var cantidad = $slide.length;
				var incremento = $slide.outerWidth(true);
				var enRoulete = Math.floor($(this).width() / incremento);
				var primerElemento = 1;
				var estaMoviendo = false;
			}
			$container.css("width", (cantidad + enRoulete) * incremento);
			for(var i = 0; i < enRoulete; i++){
				$container.append($slide.eq(i).clone());
			}
			$(sig).click(function(e){
				e.preventDefault();
				if(primerElemento > cantidad){
					primerElemento = 2;
					$container.css("left", "0px");
				}else {
					primerElemento++;
				}
				if (!estaMoviendo) {
					estaMoviendo = true;
					$container.animate({
						left: "-=" + incremento,
					}, "swing", function(){
						estaMoviendo = false;
					});
				}
			});

			$(prev).click(function(e){
				e.preventDefault();
				if (!estaMoviendo) {
					if(primerElemento == 1){
						$container.css("left", cantidad * incremento * -1);
						primerElemento = cantidad;
					}else{
						primerElemento--;
					}
					estaMoviendo = true;
					$container.animate({
						left: "+=" + incremento,
					}, "swing", function(){
						estaMoviendo = false;
					});
				}
			});
		});
	}
})(jQuery, window)