# Minimal image-slider syntax.
#
# Lets authors write a fenced ```media-slider block instead of the full Swiper markup:
#
#     ```media-slider
#     ![](assets/images/projects/bat/batlatest.jpg)
#     ![](assets/images/projects/bat/bat2.jpg)
#     ![](assets/images/projects/bat/bat3.jpg)
#     ```
#
# Each line may be a markdown image (`![alt](path)`), a markdown link, or a bare
# image path — one per line. The block is expanded to a <swiper-container> with
# one <swiper-slide> per image (rendered through figure.liquid), and the Swiper
# CSS/JS are auto-enabled for the page, so no `images.slider: true` front matter
# is required.

module SliderBlock
  # ```media-slider … ```  (also accepts ~~~ fences; tolerant of indentation/CRLF)
  FENCE = /^[ \t]*(`{3,}|~{3,})[ \t]*media-slider[ \t]*\r?\n(.*?)\r?\n[ \t]*\1[ \t]*$/m

  # markdown image `![alt](url "title")` or link `[text](url)` — capture the
  # whole url (paths may contain spaces, e.g. ".../cyclone separator/model.jpg")
  MD_LINK = /!?\[[^\]]*\]\(([^)]*)\)/

  # Pull a clean image path out of one line (markdown image/link or bare path).
  def self.extract_path(line)
    raw = (m = line.match(MD_LINK)) ? m[1] : line
    raw = raw.strip
    raw = raw[1...-1].to_s.strip if raw.start_with?("<") && raw.end_with?(">")
    raw = raw.sub(/\s+["'][^"']*["']\z/, "") # drop an optional "title"
    raw.strip
  end

  def self.render(content)
    content.gsub(FENCE) do
      body = Regexp.last_match(2)

      slides = body.each_line.filter_map do |line|
        line = line.strip
        next if line.empty?

        path = extract_path(line)
        next if path.empty?

        %(  <swiper-slide>{% include figure.liquid loading="eager" path="#{path}" ) +
          %(class="img-fluid rounded z-depth-1" %}</swiper-slide>)
      end.join("\n")

      %(<swiper-container class="slider" keyboard="true" navigation="true" pagination="true" ) +
        %(pagination-clickable="true" pagination-dynamic-bullets="true" rewind="true">\n) +
        %(#{slides}\n</swiper-container>)
    end
  end
end

Jekyll::Hooks.register [:documents, :pages], :pre_render do |doc|
  content = doc.content
  next unless content && (content.include?("```media-slider") || content.include?("~~~media-slider"))

  doc.content = SliderBlock.render(content)

  # Auto-load the Swiper CSS/JS (head.liquid + imageLayouts.liquid gate on this).
  images = doc.data["images"]
  images = doc.data["images"] = {} unless images.is_a?(Hash)
  images["slider"] = true
end
