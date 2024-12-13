from PIL import Image, ImageDraw

def create_checkerboard(filename, size, square_size):

    image = Image.new("RGB", (size, size), "white")
    draw = ImageDraw.Draw(image)


    for y in range(0, size, square_size):
        for x in range(0, size, square_size):

            if (x // square_size + y // square_size) % 2 == 0:
                draw.rectangle([x, y, x + square_size - 1, y + square_size - 1], fill="black")


    image.save(filename)



create_checkerboard("grilles40.png", 800, 40)



#print('{ "x": 100, "y": 100, "position": { "x": 200, "y": 200 }, "color": "#000000" }')