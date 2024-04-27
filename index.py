from js import Response
import numpy as np
import pandas as pd

async def on_fetch(request, env):
    dates = pd.date_range("20240101", periods=6)
    df = pd.DataFrame(np.random.randn(6, 4), index=dates, columns=list("ABCD"))
    return Response.new(f"Hello \n\n {df}")