from PIL import Image, ImageDraw

def pngToJson(n):
    file = open('map'+str(n)+'.json', 'w')
    im = Image.open('grille'+str(n)+'.png')
    width, height = im.size
    pixels = im.load()
    file.write('{ "width": ' + str(width) + ', "height": ' + str(height) + ', "data": [')

    for y in range(height):
        for x in range(width):
            r, g, b = pixels[x, y]
            if r == 255 and g != 255 and b != 255:
                file.write('{ "x": ' + str(40) + ', "y": ' + str(40) + ', "position": { "x": ' + str(x*40) + ', "y": ' + str(y*40) + ' }, "color": "#FF0000" },')
            if r != 255 and g == 255 and b != 255:
                file.write('{ "x": ' + str(40) + ', "y": ' + str(40) + ', "position": { "x": ' + str(x*40) + ', "y": ' + str(y*40) + ' }, "color": "#00FF00" },')
            if r != 255 and g != 255 and b == 255:
                file.write('{ "x": ' + str(40) + ', "y": ' + str(40) + ', "position": { "x": ' + str(x*40) + ', "y": ' + str(y*40) + ' }, "color": "#0000FF" },')
            if r == 0 and g == 0 and b == 0:
                file.write('{ "x": ' + str(40) + ', "y": ' + str(40) + ', "position": { "x": ' + str(x*40) + ', "y": ' + str(y*40) + ' }, "color": "#000000" },')
            if r==255 and g==255 and b!=255:
                file.write('{ "x": ' + str(40) + ', "y": ' + str(40) + ', "position": { "x": ' + str(x*40) + ', "y": ' + str(y*40) + ' }, "color": "#FFFF00" },')
            if r!=255 and g==255 and b==255:
                file.write('{ "x": ' + str(40) + ', "y": ' + str(40) + ', "position": { "x": ' + str(x*40) + ', "y": ' + str(y*40) + ' }, "color": "#00FFFF" },')
            if r==255 and g!=255 and b==255:
                file.write('{ "x": ' + str(40) + ', "y": ' + str(40) + ', "position": { "x": ' + str(x*40) + ', "y": ' + str(y*40) + ' }, "color": "#FF00FF" },')

    
    print(']}')
    file.write(']}')
    file.close()



pngToJson(18)

#print('{ "x": 100, "y": 100, "position": { "x": 200, "y": 200 }, "color": "#000000" }')