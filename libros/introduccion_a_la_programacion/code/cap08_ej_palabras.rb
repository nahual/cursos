# Pido al usuario que ingrese una palabra
puts 'Ingrese una palabra'
# Leo del teclado
palabra = gets.chomp
# Defino las palabras
i=0
largo = palabra.length
palabra_al_reves=''
# Mientras no sea el final de la palabra, o sea el largo sea mayor a cero
while largo > 0
  # Leo al reves la palabra y cargo el resultado en palabra_al_reves
  palabra_al_reves[i,1] = palabra[largo - 1,1].to_s
  # Retrocedo un elemento en la cadena
  largo = largo - 1
  # Incremento el contador para la palabra al reves
  i = i + 1
end
# Imprimo el resultado
puts palabra_al_reves
