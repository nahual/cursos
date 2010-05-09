require File.join(File.dirname(__FILE__),'test_utils.rb')
tests_run=0
tests_failed=0
puts "Running tests..."
puts __FILE__
dir = File.dirname(__FILE__)
files = Dir.glob(File.join(dir, "cap*.rb"))
files.each do | file |
  file = IO.readlines(file,'').to_s
  result = eval file
  tests_run += 1
  tests_failed += result
end
puts "Tests run: #{tests_run}"
puts "Tests failed: #{tests_failed}"
exit tests_failed
