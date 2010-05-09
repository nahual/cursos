class Tester
  def initialize(path)
    @file = path
    @wrong_results = 0
  end

  def test(input, expected_output)
    result = `echo '#{input}' | ruby #{@file}`
    exit_status = `echo $?`.chomp
    if (exit_status != "0")
      puts "Running #{file}: runtime error: #{result}"
      @wrong_results+=1
      return
    end
    
    if ( !result.match /#{expected_output}/ )
      puts "Running #{@file}: Input: #{input}, Output: #{result}, Expected (similar): #{expected_output}"
      @wrong_results+=1
    end
    
  end

  def results
    return @wrong_results
  end
end
