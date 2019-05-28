from builtins import enumerate

import svgwrite

size = (800, 600)
margin = 50
center_line = size[1]/2
dwg = svgwrite.Drawing('timeline.svg', profile='full', size=[f"{dim}px" for dim in size])
stroke_width = 5

events = {1996: 'iframes',
          1999: 'ActiveX\nhttp 1.1',
          2002: 'Oddpost',
          2004: 'Gmail',
          2005: 'AJAX',
          2006: 'Comet',
          2011: 'WebSocket',
          2019: ''}

dwg.add(dwg.line((margin, center_line), (size[0]-margin, center_line), stroke=svgwrite.rgb(10, 10, 16, '%'), stroke_width=stroke_width))
start_year = 1996
end_year = 2019
current_year = start_year
text_height = 32
text_offset = 10
above = True
year_spacing = (size[0]-2*margin)/(end_year - start_year)
while current_year <= end_year:
    x_location = margin + (current_year-start_year)*year_spacing
    if current_year in events:
        dwg.add(dwg.circle(center=(x_location, center_line), r=stroke_width*2, fill="white", stroke_width=stroke_width, stroke=svgwrite.rgb(10, 10, 16, '%')))
        if above:
            dwg.add(
                dwg.text(f"{current_year}", insert=(x_location-text_offset, center_line+text_offset+text_height), style=f"font: italic {text_height}px sans-serif"))
            text_parts = events[current_year].split("\n")
            for i, text_part in enumerate(text_parts):
                dwg.add(
                    dwg.text(f"{text_part}", insert=(x_location-text_offset, center_line+ text_offset + text_height*(i+2)),
                         style=f"font: bold {text_height}px sans-serif"))
        else:
            dwg.add(
                dwg.text(f"{current_year}", insert=(x_location-text_offset, center_line+text_offset-text_height), style=f"font: italic {text_height}px sans-serif"))
            text_parts = events[current_year].split("\n")
            for i, text_part in enumerate(text_parts):
                dwg.add(
                    dwg.text(f"{text_part}", insert=(x_location-text_offset, center_line+text_offset - text_height*(i+2)),
                         style=f"font: bold {text_height}px sans-serif"))
        above = not above
    current_year += 1

dwg.save()