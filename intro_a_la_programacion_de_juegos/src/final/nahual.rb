require 'sdl'

TECLA_A = SDL::Key::A
TECLA_D = SDL::Key::D
TECLA_S = SDL::Key::S
TECLA_W = SDL::Key::W
TECLA_J = SDL::Key::J
TECLA_K = SDL::Key::K
TECLA_L = SDL::Key::L
TECLA_I = SDL::Key::I
TECLA_Q = SDL::Key::Q
TECLA_B = SDL::Key::B
TECLA_V = SDL::Key::V
TECLA_X = SDL::Key::X
TECLA_N = SDL::Key::N
TECLA_M = SDL::Key::M


def distancia(sprite1,sprite2)
  distanciax=sprite1.x-sprite2.x
  distanciay=sprite1.y-sprite2.y
  return Math.sqrt(distanciax*distanciax+distanciay*distanciay)
end

def crear_sonido(archivo)
  wave=SDL::Mixer::Wave.load(archivo)  
end

def crear_fuente(archivo)
  font = SDL::BMFont.open(archivo,SDL::BMFont::TRANSPARENT)
end

def presiono?(key)
  SDL::Key.press? key
end

def reproducir(sonido)
  SDL::Mixer.playChannel(0,sonido,0)
end



def crearPantalla(x,y)

SDL::init(SDL::INIT_AUDIO|SDL::INIT_VIDEO)
screen = SDL::setVideoMode(x,y,16,SDL::SWSURFACE)
SDL::Mixer.open



SDL::WM::setCaption('Pantalla','')
  screen.fillRect(0,0,x,y,0)
  # seteo para que se permita repetir
  SDL::Key.enable_key_repeat(10,10)
  SDL::Event.enable_unicode
  return screen
end   

def limpiarPantalla(pantalla)
  pantalla.fillRect(0,0,800,600,0)
end


def redibujarPantalla(pantalla)
  pantalla.updateRect(0,0,0,0)
end

def crearImagen(archivo)
  image = SDL::Surface.loadBMP(archivo)
  image.setColorKey( SDL::SRCCOLORKEY ,0)
  return image.displayFormat
end

def crearImagenConTransparencia(archivo)
image = SDL::Surface.load(archivo)
image.setColorKey( SDL::SRCCOLORKEY ,0)
return image.displayFormatAlpha

end


def obtenerEvento
  SDL::Key.scan
  while event = SDL::Event2.poll
    case event 
    when SDL::Event2::Quit
      return 0
    when SDL::Event2::MouseButtonDown
      return 1
    when SDL::Event2::KeyDown
        key = 'q'
        
        if (  event.sym  == SDL::Key::A) 
          return 'a'
        end
        if (  event.sym  == SDL::Key::S) 
          return 's'
        end
        if (  event.sym  == SDL::Key::D) 
          return 'd'
        end  
        if (  event.sym  == SDL::Key::W) 
          return 'w'
        end
        if (  event.sym  == SDL::Key::J) 
          return 'j'
        end
        if (  event.sym  == SDL::Key::K) 
          return 'k'
        end
        if (  event.sym  == SDL::Key::L) 
          return 'l'
        end
        if (  event.sym  == SDL::Key::I) 
          return 'i'
        end
        if (  event.sym  == SDL::Key::C) 
          return 'c'
        end
        return key
    end
  end
end

def cerrarPantalla
  exit
end


def crearSprite(archivo)
  return Sprite.new(archivo)
end


class Sprite
  def initialize(archivo)
    @imagen = crearImagenConTransparencia(archivo)      
    @x=0
    @y=0
    @dx=5
    @dy=5
  end
  
  def height
    return @imagen.h
  end
  
  def width
    return @imagen.w
  end
  
  
  def mover(x,y)
    @x += x
    @y += y
  end
  
  def x
    return @x
  end
  
  def y
    return @y
  end
  
  def moverA(x,y)
    @x = x
    @y = y
  end
  
  def dibujar(screen)
    #SDL.blitSurface(@image,0,0,32,32,screen,@x,@y)
    SDL.blitSurface(@imagen,0,0,@imagen.w,@imagen.h,screen,@x,@y)
    end
end
