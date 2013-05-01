require 'nahual'

puts "Arranca el programa"

pantalla = crearPantalla(800,600)

jugador1 = crearSprite("jugador1.png")
jugador1.moverA(0,200)

jugador2 = crearSprite("jugador2.png")
jugador2.moverA(650,200)

cancha = crearSprite("cancha.jpg")
cancha.moverA(40,40)

pelota = crearSprite("pelota.jpg")
pelota.moverA(80,250)

pelotaEnJuego = false

velocidad=5
sentido1=1
sentido2=1

puntosJugador1 = 0
gamesJugador1 = 0
puntosJugador2 = 0
gamesJugador2 = 0

puntaje = [15,30,40,"Adv","Deuce"]

fuerza1=0
fuerza2=0

dx = velocidad*sentido1
dy = velocidad*sentido2

def manejarMovimientos(evento, jugador1, jugador2)
  
  jugador1.mover(0,10) if (presiono? TECLA_S)
  
  jugador1.mover(0,-10) if (presiono? TECLA_W)
 
  jugador1.mover(10,0) if (presiono? TECLA_D)

  jugador1.mover(-10,0) if (presiono? TECLA_A)
    
  jugador2.mover(0,10) if (presiono? TECLA_K)

  jugador2.mover(0,-10) if (presiono? TECLA_I)

  jugador2.mover(10,0) if (presiono? TECLA_L)

  jugador2.mover(-10,0) if (presiono? TECLA_J)
 
end

waveJugador1=crear_sonido("jugador1.wav")
waveJugador2=crear_sonido("jugador2.wav")

font = crear_fuente("font.bmp")
turno = 1

while true  
  
  evento = obtenerEvento()

  manejarMovimientos(evento, jugador1, jugador2)
  
  if (evento == 0)
    cerrarPantalla() 
  end
  
  if ( evento == "c" ) 
      pelotaEnJuego = true      
      turno = 2
      dx = 10      
  end

  fuerza1+= 0.03 if (presiono? TECLA_Q)
  fuerza2+= 0.03 if (presiono? TECLA_B)
 
  if ( pelota.x > 800 ) 
      pelotaEnJuego = false
      pelota.moverA(80,250)
      puntosJugador1+=1
    end
    
   if ( pelota.x < 0 ) 
      pelotaEnJuego = false
      pelota.moverA(80,250)
      puntosJugador2+=1
    end 
    
  if ( pelotaEnJuego == false)
    dx = 0
    dy = 0
  end
  
   
  distanciaJugador1 = distancia(jugador1,pelota)
  
  distanciaJugador2 = distancia(jugador2,pelota)
  
  if ( distanciaJugador1 < 15 && turno ==1)
    turno =2 
    reproducir(waveJugador1)
    dx = velocidad*sentido1*fuerza1    
    dy = -dy -  (jugador1.y - pelota.y).to_f/3
    fuerza1=0
  end
  
  if ( distanciaJugador2 < 15 && turno == 2) 
    turno=1
    
    reproducir(waveJugador2)
    
    dx = -velocidad*sentido1*fuerza2
    dy =  -dy - (jugador2.y - pelota.y).to_f/3
    fuerza2=0
  end
  
  if(pelota.y < 50 || pelota.y >= cancha.y + cancha.height)
    dy = -dy
  end
  
  pelota.mover(dx,dy)
 
  limpiarPantalla(pantalla)
  
  cancha.dibujar(pantalla)
  
  jugador1.dibujar(pantalla)
  
  jugador2.dibujar(pantalla)
  
  pelota.dibujar(pantalla)
  
  font.textout(pantalla,"Jugador1: " + puntosJugador1.to_s + ", Jugador2:" + puntosJugador2.to_s + " ",350,15)
  font.textout(pantalla,"Fuerza1: " + fuerza1.to_s ,150,15)
  font.textout(pantalla,"Fuerza2: " + fuerza2.to_s ,550,15)
  
  redibujarPantalla(pantalla)
end


