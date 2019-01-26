require 'uri'
require 'net/http'
require 'json'

def translate(from, to, text)
  url = "
    https://translate.googleapis.com/translate_a/single
      ?client=gtx
      &ie=UTF-8
      &oe=UTF-8
      &dt=t
      &sl=#{URI.escape(from)}
      &tl=#{URI.escape(to)}
      &q=#{URI.escape(text)}
  "
  .gsub(/\s/, '')

  res = Net::HTTP.get(URI(url))
  json = JSON.parse(res)
  if (json[0] && json[0][0] && json[0][0][0]) 
    return json[0][0][0]
  else
    raise res
  end
end

def test(from, to, text)
  begin
    result = translate(from, to, text)
    puts result
  rescue Exception => err
    puts "ERROR #{err}"
  end
end

test("en-US", "da-DK", "Hello, world!")
