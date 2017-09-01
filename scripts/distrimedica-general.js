$(document).ready(function (){
    
    $('ul .dropdown-submenu').hover(
        function() {
          $( this ).addClass( "hover" );
        }, function() {
          $( this ).removeClass( "hover" );
        }
    );
   
    $('.dropdown-submenu').find(".dropdown-menu").css("display", "none");
    
    $('.dropdown-submenu .dropdown-toggle').on("click", function(e){
        $self = $(this);
        $subMenu = $self.siblings(".dropdown-menu");
        if ($subMenu.css("display") == "block") {
            $self.removeClass("hover");
            $subMenu.hide();
        } else {
            $self.addClass("hover");
            $subMenu.show();
        }
        e.stopPropagation();
    });

    $(".menu-content li a").on("click", function(e) {
        $(this).toggleClass("active");
        
    });

    $('.nav-side-scrolleable').slimScroll({
        height: 'auto',
        position: 'right',
        size: "5px",
        color: '#aaa',
        wheelStep: 3
    });

    $('.boton-menu-mobile').on("click", function() {
        $('.nav-side-menu').toggle();
    });

    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })

    $('.dd').nestable({
        maxDepth: 1,
        callback: function(l,e){
            var $productos = $(".dd2").find(".dd-item");
            if ($productos.length > 0) {
                var total = 0;
                $productos.each(function() {
                    var $precio = $(this).find(".dd-precio span").text();
                    var $cantidad = $(this).find(".dd-cantidad").val();
                    if ($cantidad !== 0 && $cantidad !== "") {
                        $precio = $precio * $cantidad;
                    }
                    total += parseFloat($precio); 
                });
                $(".pedido-total-precio").text(total);
            } else {
                $(".pedido-total-precio").text(0);
            }
        }
    });

    $(".dd").find(".dd-cantidad").bind("change keyup", function() {
        var cantidad = $(this).val();
        var lista = $(this).parent().parent().parent();
        if (cantidad !== 0 && cantidad !== "" && lista.hasClass("dd2")) {
            var precio = $(this).parent().find(".dd-precio span").text();
            var total = $(".pedido-total-precio").text();
            var total = parseFloat(total) - parseFloat(precio);
            var total = total = (precio * cantidad);
            $(".pedido-total-precio").text(total);
        }
    });

    $(".pedidos-caja-pedido-boton-listo.boton-warning").on("click", function() {
        confirm("¿Estas seguro de marcar como ACTIVO este pedido?");
    });

    $(".pedidos-caja-pedido-boton-listo.boton-success").on("click", function() {
        confirm("¿Estas seguro de marcar como FINALIZADO este pedido?");
    });

    $(".publicidades-envios-total").text($(".publicidad-envio").length)

    $(".boton-publicidad-agregar").on("click", function() {
        $envio = $(".publicidad-envio:first").clone();
        $envio.appendTo($(".publicidad-envios")).hide().slideDown("fast");
        $(".publicidades-envios-total").text($(".publicidad-envio").length)
    });

    $(".boton-publicidad-eliminar").on("click", function() {
        if ($(".publicidad-envio").length > 1) {
            $(".publicidad-envio:last").slideUp("normal", function() { 
                $(this).remove(); 
                $(".publicidades-envios-total").text($(".publicidad-envio").length)
            });
        }
    });

    function createDonutGraph (selector, labels, datas, colors) {
        var data = [{
            label : labels[0],
            data : datas[0]
        }, {
            label : labels[1],
            data : datas[1]
        }, {
            label : labels[2],
            data : datas[2]
        }, {
            label : labels[3],
            data : datas[3]
        }, {
            label : labels[4],
            data : datas[4]
        }, {
            label : labels[5],
            data : datas[5]
        }];
        var options = {
            series : {
                pie : {
                    show : true,
                    innerRadius : 0.7
                }
            },
            legend : {
                show : true,
                labelFormatter : function(label, series) {
                    return '<div style="font-size:14px;">&nbsp;' + label + '</div>'
                },
                labelBoxBorderColor : null,
                margin : 50,
                width : 20,
                padding : 1
            },
            grid : {
                hoverable : true,
                clickable : true
            },
            colors : colors,
            tooltip : true,
            tooltipOpts : {
                content : "%s, %p.0%"
            }
        };
        $.plot($(selector), data, options);
    }

    if ($(".donut-chart").length > 1) {
        var donutlabels = ["Julio", "Agosto", "Septiembre", "Octubre"];
        var donutdatas = [35, 40, 10, 20];
        var donutcolors = ['#188ae2', '#10c469', "#f9c851", "#ff8acc"];
        createDonutGraph(".donut-chart #donut-chart-container-ventas", donutlabels, donutdatas, donutcolors);

        var donutlabels1 = ["Isidiro S.A.", "Inidora S.A.", "Lisar S.A."];
        var donutdatas1 = [35, 40, 10];
        var donutcolors1 = ['#188ae2', '#10c469', "#f9c851"];
        createDonutGraph(".donut-chart #donut-chart-container-clientes", donutlabels1, donutdatas1, donutcolors1);

        var donutlabels2 = ["Ibuprofeno 600", "Sertal", "Aspirineta", "Curaplus", "Paracetamol 300", "Frenalert Cort"];
        var donutdatas2 = [35, 5, 10, 20, 25, 10];
        var donutcolors2 = ['#188ae2', '#10c469', "#f9c851", "#ff8acc", "#5b69bc", "#35b8e0"];
        createDonutGraph(".donut-chart #donut-chart-container-productos", donutlabels2, donutdatas2, donutcolors2);
    }
});