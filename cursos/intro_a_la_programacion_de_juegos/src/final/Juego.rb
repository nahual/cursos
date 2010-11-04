require 'nahual'

class Jugador
  
  def initialize(j,teclaIzq, teclaDer, teclaPinia, teclaPatada, teclaGuardia)
    @estadoJugador = @EstadoEnGuardia
    @x = 0
    @y = 0
    @teclaIzq = teclaIzq
    @teclaDer = teclaDer
    @teclaPinia = teclaPinia
    @teclaPatada = teclaPatada
    @teclaGuardia = teclaGuardia
    if ( j == "1" ) 
    @sonido_pinia=crear_sonido("PUNCH.wav")
    @imagen_atras = crearSprite("j1_atras.png")  
    @imagen_guardia = crearSprite("j1_guardia.png")
    @imagen_pinia = crearSprite("j1_pinia.png")
    @imagen_patada = crearSprite("j1_patada.png")
    @imagen_atras = crearSprite("j1_atras.png")
    else
    @sonido_pinia=crear_sonido("PUNCH.wav")
    @imagen_atras = crearSprite("j1_atras.png")  
    @imagen_guardia = crearSprite("j2_guardia.png")
    @imagen_pinia = crearSprite("j1_pinia.png")
    @imagen_patada = crearSprite("j1_patada.png")
    @imagen_atras = crearSprite("j1_atras.png")
      
    end
    @imagen_activa = @imagen_guardia
    @imagenes = [@imagen_guardia, @imagen_pinia, @imagen_patada, @imagen_atras]
  end
 
  def obtener_imagen_activa
      return @imagen_activa
  end
  
  def mover_imagenes(x,y)
    @x = @x + x
    @y = @y + y
    @imagenes.each do |imagen| 
      imagen.mover(x, y) 
    end
  end

  def mover
    dibujarGuardia = true
    if ( presiono? @teclaDer ) 
      if (@x<750)
      mover_imagenes(10, 0)      
      end
    end

    if ( presiono? @teclaIzq ) 
      puts @x
      if (@x>0)
        mover_imagenes(-10, 0)
      end
    end

    if ( presiono? @teclaPinia ) 
      reproducir(@sonido_pinia)
      @imagen_pinia.dibujar($pantalla)
      dibujarGuardia = false
      @imagen_activa = @imagen_pinia
    else
      if ( presiono? @teclaPatada ) 
        @imagen_patada.dibujar($pantalla) 
        dibujarGuardia = false
        @imagen_activa = @imagen_patada
      end
      if ( presiono? @teclaGuardia ) 
        @imagen_atras.dibujar($pantalla) 
        dibujarGuardia = false
        @imagen_activa = @imagen_atras
      end
      if(dibujarGuardia)
          @imagen_guardia.dibujar($pantalla) 
          dibujarGuardia = false
          @imagen_activa = @imagen_guardia
      end
    end
  end

end



$pantalla = crearPantalla(800,600)

$fondo = crearSprite("FondoPelea.jpg")

$font = crear_fuente("font.bmp")

x = 200
y = 350
$jugador1 = Jugador.new("1",TECLA_A, TECLA_D,  TECLA_V, TECLA_X, TECLA_S)
$jugador1.mover_imagenes(x,y);

x = 350
y = 350

 imagen_guardia2 = crearSprite("j2_guardia.png")

$jugador2 = Jugador.new("2",TECLA_J, TECLA_L,  TECLA_M, TECLA_N, TECLA_K)
$jugador2.mover_imagenes(x,y);



salir = false


while (salir == false)
  evento = obtenerEvento()
 
  limpiarPantalla($pantalla)
  
  $fondo.dibujar($pantalla)
  
  $font.textout($pantalla,"Bienvenido!!! "  ,300,200)
  $font.textout($pantalla,"JUGADOR 1"  ,200,215)
  $font.textout($pantalla,"D: Derecha"  ,200,230)
  $font.textout($pantalla,"A. Izquierda "  ,200,245)
  $font.textout($pantalla,"X: Patada Voladora "  ,200,260)
  $font.textout($pantalla,"V: Pi�a "  ,200,275)
  $font.textout($pantalla,"S: Esquivo"  ,200,290)
  $font.textout($pantalla,"Q: Salir"  ,200,305)

  $font.textout($pantalla,"JUGADOR 2"  ,400,215)
  $font.textout($pantalla,"L: Derecha"  ,400,230)
  $font.textout($pantalla,"J. Izquierda "  ,400,245)
  $font.textout($pantalla,"N: Patada Voladora "  ,400,260)
  $font.textout($pantalla,"M. Pi�a "  ,400,275)
  $font.textout($pantalla,"K: Esquivo"  ,400,290)
  $font.textout($pantalla,"Q: Salir"  ,400,305)

  
  $jugador1.mover
  $jugador2.mover
  
  redibujarPantalla($pantalla)

  if ( presiono? TECLA_Q ) 
    salir = true
  end
  
end

