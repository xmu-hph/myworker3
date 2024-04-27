from js import Response

async def on_fetch(request):
    name = (await request.json()).name
    return Response.new(name)